import type { NextApiRequest, NextApiResponse } from 'next'
import env from '../../../lib/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const newValue = req.body.newValue;
        env.prisma.users.update({
            where: {
                username: req.body
            },
            data: {
                password: newValue
            }
        })
    } else {
        res.json({ message: 'method now allowed' })
    }
}
