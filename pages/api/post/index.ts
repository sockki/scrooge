import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/withSession";
import client from "@/libs/client";

export interface ResponseType {
    ok: boolean;
    [key: string]: any;
}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    if (req.method === "GET") {
        
    }
    if (req.method === "POST") {
        const {
            body: { price,what,description },
            session: { user }
        } = req;
        const newpost = await client.post.create({
            data: {
                money:price,
                what,
                description, 
                user: {
                    connect: {
                        id: user?.id
                    },
                },
            },
        });
        res.json({
            ok: true,
            newpost
        });
    }
}

export default withApiSession(handler);