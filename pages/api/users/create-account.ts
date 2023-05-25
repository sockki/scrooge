import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const { nickname, email } = req.body;
    const user = await client.user.findUnique({
      where: {
        email
      }
    });
    if (user) {
      return res.status(200).end();
    }
    await client.user.create({
      data: {
        nickname,
        email,
      }
    });
    return res.status(201).end();
  }
  return res.status(405).end();
}
