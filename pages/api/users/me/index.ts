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
    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id
      }
    });
    if (myid && myid !== currentUser?.myid) {
      const alreadyExistid = Boolean(
        await client.user.findUnique({
          where: {
            myid,
          },
          select: {
            id:true,
          },
        })
      );
      if(alreadyExistid) {
        return res.json({
          ok:false,
          error: "ID가 이미 존재합니다."
        })
      }
    }
    if (nickname && nickname !== currentUser?.nickname) {
      const alreadyExistnickname = Boolean(
        await client.user.findUnique({
          where: {
            nickname
          },
          select: {
            id:true,
          },
        })
      );
      if(alreadyExistnickname) {
        return res.json({
          ok:false,
          error: "닉네임이 이미 존재합니다."
        })
      }
    }
    if (password && password !== currentUser?.password) {
      const alreadyExistpassword = Boolean(
        await client.user.findUnique({
          where: {
            password
          },
          select: {
            id:true,
          },
        })
      );
      if(alreadyExistpassword) {
        return res.json({
          ok:false,
          error: "패스워드가 이미 존재합니다."
        })
      }
    }
    await client.user.update({
      where: {
        id: user?.id,
      },
      data: {
        nickname,
        myid,
        password,
        color
      }
    })
    return res.json({
      ok:true
    })
  }
}

export default withApiSession(handler);
