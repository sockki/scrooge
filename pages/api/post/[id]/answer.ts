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
    const { query: {id}, session: {user}, body: {content}} = req;
    const post = await client.post.findUnique({
        where: {
            id: Number(id),
        },
    });
    if(!post) {
        return res.json({
            ok:false
        })
    }

    const newans = await client.answer.create({
        data: {
            user: {
                connect: {
                    id: user?.id,
                },
            },
            post: {
                connect: {
                    id: Number(id),
                }
            },
            content,
        }
    })
    res.json({
        ok:true,
        newans
    })
    
    
}

export default withApiSession(handler);