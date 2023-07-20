// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { TYPE } from '@prisma/client'
type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const feed = await prisma.event.create({
        data: {
            name: 'Prisma Day',
            description:
                'Prisma Day is a full day of talks and networking centered around the Prisma ecosystem.',
            slug: 'lasdsa',
            date: new Date(),
            reminderFrom: new Date(),
            type: TYPE.event,
        },
    })

    res.status(200).json(feed)
}
