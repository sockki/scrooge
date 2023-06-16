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
 const {user} = req.session;
 
 if (!user) {
    return res.status(401).end()
 }
 await req.session.destroy();
 return res.status(201).end()
}

export default withApiSession(handler);
