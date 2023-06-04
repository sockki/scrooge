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
  const {
    session: { user },
  } = req;
  const mycomments = await client.answer.findMany({
    where: {
      userId: user?.id
    },
    include: {
      post: {
        select: {
          id:true,
          isVote:true,
          money:true,
          what:true,
          description:true,
          createdAt:true,
          user: {
            select: {
              id:true,
              character: true,
              nickname: true,
            }
          },
          _count: {
            select: {
              Like: true,
              GoVote: true,
              StopVote: true,
              Answer: true,
            }
          }
        }
      }
    }
  });
  res.json({
    ok:true,
    mycomments
  })
}

export default withApiSession(handler);
