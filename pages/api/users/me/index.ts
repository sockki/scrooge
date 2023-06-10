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
    const {
      session: { user },
    } = req;
    if(user === undefined) {
      return res.json({
        ok:false
      })
    }
    const dbUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    return res.json({
      ok: true,
      dbUser,
    });
  }
  if (req.method === "POST") {
    const {session: {user}, body: {nickname, myid, password, color}} = req;
  }
}

export default withApiSession(handler);
