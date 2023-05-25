import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/withSession";
import client from "@/libs/client";


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const { email } = req.body;
    const user = await client.user.findUnique({
      where: {
        email
      }
    });
    if (!user) {
      return res.status(404).end();
    }
    req.session.user = {
      id: user.id
    };
    await req.session.save();
    return res.status(200).end();
  }
  return res.status(405).end();
}

export default withApiSession(handler);
