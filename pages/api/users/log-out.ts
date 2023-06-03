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
 const nowuser = await client.user.findUnique({
    where: {
        id: user?.id
    }
 });
 if(!nowuser) {
    return res.json({
        ok:false
    })
 }
 await req.session.destroy();
 console.log("yes")
 return res.json({
    ok:true
 })
}

export default withApiSession(handler);
