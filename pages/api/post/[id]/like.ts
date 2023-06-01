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
    const alreadylike = await client.like.findFirst({
        where: {
            postId: Number(id),
            userId: user?.id,
        }
    })
    
    if (alreadylike) {
        await client.like.delete({
            where: {
                id: alreadylike.id
            }
        })
    }
    else {
        await client.like.create({
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
                }
            }
        })
    }
    
    res.json({ ok: true});
}

export default withApiSession(handler);