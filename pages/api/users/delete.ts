import type { NextApiRequest, NextApiResponse } from 'next'
import env from '../../../lib/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        env.prisma.users.delete({
            where: {
                username: req.body
            }
        })
    } else {
        res.json({ message: 'method now allowed' })
    }
}
