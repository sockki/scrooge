import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/withSession";
import client from "@/libs/client";


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const { myid,password } = req.body;
    const iduser = await client.user.findUnique({
      where: {
        myid,
      }
    });
    const passuser = await client.user.findUnique({
      where: {
        password,
      }
    });
    if (!iduser) {
      return res.status(404).end();
    }
    if (!passuser) {
      return res.status(402).end();
    }
    if(iduser.id === passuser.id) {
      req.session.user = {
        id: iduser.id
      };
      await req.session.save();
      return res.status(200).end();
    }
    
  }
  return res.status(405).end();
}

export default withApiSession(handler);
