// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import slugify from 'slugify'
import prisma from '../../../lib/prisma'
import { IReminderAdd } from '../reminders/add'

type Data = {
    name: string
}

type postBody = IReminderAdd

const createReminder = async ({
    name,
    description,
    date,
    repeatDays,
}: IReminderAdd) => {
    const newSlug = slugify(name)
    let suffix = 0
    let formattedSlug: string

    do {
        formattedSlug = !suffix ? newSlug : `${newSlug}-${suffix}`

        const existingSlug = await prisma.reminder.findFirst({
            where: {
                slug: {
                    equals: newSlug,
                },
            },
        })

        console.log(existingSlug)

        if (!existingSlug) break

        suffix++
    } while (true)

    const newEntry = await prisma.reminder.create({
        data: {
            name,
            description,
            slug: formattedSlug,
            date,
            repeatDays,
        },
    })

    console.log(newEntry)

    return newEntry
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    //   const { query } = req;

    if (req.method === 'POST') {
        // const body = JSON.parse(req.body);
        // console.log(req, query);
        const prisma = new PrismaClient()

        console.log('REQUEST BODY:', req.body)
        const { name, description, date, repeatDays }: postBody = req.body

        const newReminder = createReminder({
            name,
            description,
            date,
            repeatDays,
        })

        return res.status(200).json({ newReminder })
    } else {
        return res.status(200).json({ name: 'true' })
    }
}
