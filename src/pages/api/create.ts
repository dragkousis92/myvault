// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
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

        console.log('searching for:', formattedSlug)

        const existingSlug = await prisma.reminder.findUnique({
            where: {
                slug: formattedSlug,
            },
        })

        console.log('found', existingSlug)

        if (!existingSlug) break

        suffix++
    } while (true)

    const newEntry = await prisma.reminder.create({
        data: {
            name,
            description,
            slug: formattedSlug,
            date,
            repeatDays: repeatDays ? parseInt(repeatDays) : undefined,
        },
    })

    console.log(newEntry)
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    //   const { query } = req;

    if (req.method === 'POST') {
        // const body = JSON.parse(req.body);
        // console.log(req, query);

        console.log('REQUEST BODY:', req.body)
        const { name, description, date, repeatDays }: postBody = req.body

        // const eventTypeValue: eventType = [type] as eventType;

        const reminder = await createReminder({
            name,
            description,
            date,
            repeatDays,
        })

        return res.status(200).json({ reminder })
    } else {
        return res.status(200).json({ name: 'true' })
    }
}
