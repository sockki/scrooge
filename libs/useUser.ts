import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect} from "react";
import useSWR from "swr";

interface profileRes {
  ok: boolean;
  dbUser: User | null;
}

export default function useUser(pathname?: string) {
  const router = useRouter();
  const url = "/api/users/me";
  const { data, error, mutate } = useSWR<profileRes>(
    (pathname === "/create-account") || (pathname === "/log-in") ? null : url
  );
  useEffect(() => {
    if (data && !data.ok) {
      console.log("onuser")
      mutate()
      router.replace(
        {
          pathname:"/log-in",
          query: {
            needreload:true,
          }
        },
        "/log-in"
      );
    }
  }, [data, router]);
  //return router.replace("/enter");
  return { user: data?.dbUser, isLoading: !data && !error };
}
