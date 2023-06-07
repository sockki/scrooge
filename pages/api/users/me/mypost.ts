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
  const myposts = await client.post.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
          color: true,
        },
      },
      _count: {
        select: {
          Answer: true,
          GoVote: true,
          StopVote: true,
          Like: true,
        },
      },
    },
  });
  res.json({
    ok: true,
    myposts,
  });
}

export default withApiSession(handler);
