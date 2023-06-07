import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const { myid,password,nickname } = req.body;
    console.log(myid,password,nickname);
    const iduser = await client.user.findUnique({
      where: {
        myid
      }
    });
    const passuser = await client.user.findUnique({
      where: {
        password
      }
    });
    if (iduser && passuser && iduser?.id === passuser?.id) {
      return res.status(200).end();
    }
    await client.user.create({
      data: {
        myid,
        password,
        nickname
      }
    });
    return res.status(201).end();
  }
  return res.status(405).end();
}
