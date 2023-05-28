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
        const {query: {id}, session: {user}} = req;
        const post = await client.post.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                user: {
                    select : {
                        id: true,
                        nickname: true,
                        character: true
                    }
                },
                Answer: {
                    select: {
                        id:true,
                        content: true,
                        createdAt: true,
                        user: {
                            select: {
                                id: true,
                                nickname: true,
                            }
                        }
                        
                    }
                }
            }
        });
        if (!post) {
            return res.json({
                ok: false
            })
        }
        const isgoed = Boolean(await client.vote.findFirst({
            where: {
                gopostId: post?.id,
                userId: user?.id
            },
            select: {
                id:true
            }
        }));
        const isstoped = Boolean(await client.vote.findFirst({
            where: {
                stoppostId: post?.id,
                userId: user?.id
            },
            select: {
                id:true
            }
        }));
        const goed = await client.post.findFirst({
            where: {
                id: Number(id),
            },
            select: {
                goVote: true,
            }
        });
        const gonum = goed?.goVote.length;
        const stoped = await client.post.findFirst({
            where: {
                id: Number(id),
            },
            select: {
                stopVote: true,
            }
        });
        const stopnum = stoped?.stopVote.length;
        const answered = await client.post.findFirst({
            where: {
                id: Number(id),
            },
            select: {
                Answer: true
            }
        })
        const answernum = answered?.Answer.length;
        res.json({
            ok: true,
            post,
            isgoed,
            isstoped,
            gonum,
            stopnum,
            answernum
        })
    }
    
    
}

export default withApiSession(handler);