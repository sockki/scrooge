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
    const { query: {id}, session: {user}} = req;

    const post = await client.post.findUnique({
        where: {
            id: Number(id),
        },
    });
    if (!post) {
        return res.json({
            ok: false
        })
    }
    console.log("on go")
    const alreadygo = await client.goVote.findFirst({
        where: {
            postId: Number(id),
            userId: user?.id,
        }
    })
    const alreadystop = await client.stopVote.findFirst({
        where: {
            postId: Number(id),
            userId: user?.id
        }
    })
    // govote가 있다면 그것을 삭제, 없다면 stopvote가 있는지 확인후 있다면 삭제후 govote 생성
    if (alreadygo) {
        await client.goVote.delete({
            where: {
                id: alreadygo.id
            }
        })
    }
    else {
        if (alreadystop) {
            await client.stopVote.delete({
                where: {
                    id: alreadystop.id
                }
            })
        }
        await client.goVote.create({
            data: {
                user: {
                    connect: {
                        id: user?.id
                    }
                },
                post: {
                    connect: {
                        id: Number(id),
                    }
                },
            }
        })
    }
    res.json({ ok: true});
    
}

export default withApiSession(handler);