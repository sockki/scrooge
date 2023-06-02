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
  const mypost = client.post.findMany({
    where: {
      userId: user?.id,
    },
    include: {
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
}

export default withApiSession(handler);
