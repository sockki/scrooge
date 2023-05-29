import Layout from "@/components/layout";
import { NextPage } from "next";
import Link from "next/link";
import  useSWR from "swr";
import { Post, User } from "@prisma/client";

interface PostWithUser extends Post {
  user: User;
  _count: {
    Answer:Number;
    GoVote: Number;
    StopVote: Number;
  }
}

interface PostsRes {
  posts:PostWithUser[];
}

const Home:NextPage = () => {
  const { data }  = useSWR<PostsRes>(`/api/post`);
  return (
    <div>
      <Layout seotitle="title">
        <div className="flex flex-col space-y-6 justify-center items-center py-10">
          {data?.posts?.slice(0)?.reverse().map((post) => (
            <Link
              key={post?.id}
              className="w-4/5 h-60 rounded-md bg-white flex flex-col"
              href={`post/${post?.id}`}
            >
              <div className="pl-4 py-3 relative">
                <div className="absolute left-3 top-4 flex flex-col ">
                  <div className="flex  items-center space-x-1">
                    <div className="w-5 h-5 rounded-full bg-slate-500" />
                    <div className="text-gray-800 text-sm font-bold">{post?.user?.nickname}</div>
                  </div>
                  <div className="text-black text-[1px] ml-4">{`${String(post?.createdAt).substring(0,10)}  ${String(post?.createdAt).substring(11,16)}`}</div>
                </div>
                <div className="mt-16 flex flex-col">
                  <span className="text-gray-800 text-xl font-semibold">
                    {`${post?.money}원`}
                  </span>
                  <span className="text-gray-800 text-lg">{post?.what}</span>
                  <span className="text-gray-800 text-sm">{post?.description}</span>
                </div>
                <div className="flex space-x-3 mt-10">
                  <div className="flex">
                    <div className="text-gray-800 px-1 text-sm rounded-lg border-[1.5px] border-gray-600">
                      Buy!
                    </div>
                    <span className="text-gray-800 text-sm ml-1">{`${post?._count?.GoVote}`}</span>
                  </div>
                  <div className="flex">
                    <div className="text-gray-800 px-1 text-sm rounded-lg border-[1.5px] border-gray-600">
                      Save!
                    </div>
                    <span className="text-gray-800 text-sm ml-1">{`${post?._count?.StopVote}`}</span>
                  </div>

                  <div className="flex space-x-1">
                    <span className="mt-1 ml-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#525252"
                        width="18px"
                        height="18px"
                        viewBox="0 0 1920 1920"
                      >
                        <path
                          d="M1662.178 0v1359.964h-648.703l-560.154 560.154v-560.154H0V0h1662.178ZM1511.07 151.107H151.107v1057.75h453.321v346.488l346.489-346.488h560.154V151.107ZM906.794 755.55v117.53H453.32V755.55h453.473Zm302.063-302.365v117.529H453.32V453.185h755.536Z"
                          fillRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-800 text-sm">{`${post?._count?.Answer}`}</span>
                  </div>
                </div>
              </div>
              <div></div>
            </Link>
          ))}
        </div>
      </Layout>
    </div>
  );
}


export default Home;