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
    if(req.method === "GET") {
        const posts = await client.post.findMany({
            include: {
                user: {
                    select: {
                        id:true,
                        nickname: true,
                        character: true,
                    },
                },
                _count: {
                    select: {
                        Answer:true,
                        GoVote: true,
                        StopVote: true,
                    }
                }
            }
        });
        res.json({
            ok:true,
            posts,
        })
    }
    if (req.method === "POST") {
        const {
            body: { price,what,description },
            session: { user }
        } = req;
        const newpost = await client.post.create({
            data: {
                money:Number(price),
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