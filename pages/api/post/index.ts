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
                        Like: true,
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
            body: { price,what,description,isvote},
            session: { user }
        } = req;
        if (isvote) {
            const newpost = await client.post.create({
                data: {
                    money:Number(price),
                    what,
                    description, 
                    isVote: isvote,
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
        else {
            const newpost = await client.post.create({
                data: {
                    money:Number(price),
                    what, 
                    isVote: isvote,
                    user: {
                        connect: {
                            id: user?.id
                        },
                    },
                },
            });
            const nowuser = await client.user.findFirst({
                where: {
                    id: user?.id
                }
            })
            await client.user.update({
                where: {
                    id: user?.id
                },
                data: {
                    spended: Number(nowuser?.spended) + Number(price)
                }
            })
            res.json({
                ok: true,
                newpost
            });
        }
        
    }
}

export default withApiSession(handler);