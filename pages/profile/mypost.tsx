import Layout from "@/components/layout";
import { Post, User } from "@prisma/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

interface myPostWithUser extends Post {
  user: User;
  _count: {
    Answer: Number;
    Like: Number;
    GoVote: Number;
    StopVote: Number;
  };
}

interface myPostsRes {
  myposts: myPostWithUser[];
}

const myPost: NextPage = () => {
  const router = useRouter()
  const { data } = useSWR<myPostsRes>(`/api/users/me/mypost`);
  return (
    <div>
      <div className="relative flex justify-center items-center ">
        <button className="absolute mt-1 left-2" onClick={() => router.back()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
            fill="#ffffff"
          />
        </svg>
        </button>
        <div className="text-xl mt-2">내 정보</div>
      </div>
      <div className="flex flex-col space-y-6 justify-center items-center py-10">
          {data?.myposts?.map((mypost) =>
              mypost.isVote ? (
                <div
                  onClick={() => router.push(`/post/${mypost?.id}`)}
                  key={mypost?.id}
                  className="w-4/5 h-auto rounded-md cursor-pointer flex flex-col"
                >
                  <div className="">
                    <div className="flex flex-col ">
                      <div className="flex items-center space-x-1">
                        <div className={`w-5 h-5 rounded-full bg-[${mypost?.user?.color}]`} />
                        <div className="text-slate-100 font-bold">
                          {mypost?.user?.nickname}
                        </div>
                      </div>
                     
                    </div>
                    <div className="mt-1 bg-white px-2 py-4 rounded-xl flex justify-center items-center flex-col">
                      <span className="text-gray-800 text-xl font-semibold">
                        {`${mypost?.money}원`}
                      </span>
                      <span className="text-gray-800 text-lg">
                        {mypost?.what}
                      </span>
                      <span className="text-gray-800 text-sm">
                        {mypost?.description}
                      </span>
                    </div>
                    <div className="flex justify-between mt-2 ml-1">
                      <div className="flex space-x-2">
                        <div className="flex">
                          <div className="text-pink-600 px-1 text-sm font-bold rounded-lg border-[1.5px] border-pink-600">
                            Buy!
                          </div>
                          <span className="text-pink-600 text-sm ml-1">{`${mypost?._count?.GoVote}`}</span>
                        </div>
                        <div className="flex">
                          <div className="text-teal-600 px-1 text-sm font-bold rounded-lg border-[1.5px] border-teal-600">
                            Save!
                          </div>
                          <span className="text-teal-600 text-sm ml-1">{`${mypost?._count?.StopVote}`}</span>
                        </div>
                        <div className="flex space-x-1">
                          <span className="mt-1 ml-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#ffffff"
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
                          <span className="text-slate-10 text-sm">{`${mypost?._count?.Answer}`}</span>
                        </div>
                      </div>
                      <div className="text-slate-10 text-[1px] mr-4 ">
                        {`${String(mypost?.createdAt).substring(0, 10)}  ${String(mypost?.createdAt).substring(11,16)}`}
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              ) : (
                <div
                  key={mypost?.id}
                  className="w-4/5 h-auto rounded-md cursor-pointer flex flex-col"
                  onClick={() => router.push(`/post/${mypost?.id}`)}
                >
                  <div className="py-3">
                    <div className="flex flex-col ">
                      <div className="flex  items-center space-x-1">
                        <div className={`w-5 h-5 rounded-full bg-[${mypost?.user?.color}]`} />
                        <div className="text-slate-100 font-bold">
                          {mypost?.user?.nickname}
                        </div>
                      </div>
                    </div>
                    <div className="mt-1 bg-white p-2 rounded-xl flex flex-col">
                      <span className="text-gray-800 text-xl font-semibold">
                        {`-${mypost?.money}원`}
                      </span>
                      <span className="text-gray-800 text-lg">
                        {mypost?.what}
                      </span>
                      <span className="text-gray-800 text-sm">
                        {mypost?.description}
                      </span>
                    </div>
                    <div className="flex justify-between space-x-3 mt-1 ml-1">
                      <div className="flex space-x-2">
                        <div className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22px"
                            height="22px"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                              stroke="#f4f814"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-[#f4f814] text-sm ml-1">{`${mypost?._count?.GoVote}`}</span>
                        </div>
                        <div className="flex">
                          <span className="mt-1 ml-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#ffffff"
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
                          <span className="text-slate-100  text-sm ml-1">{`${mypost?._count?.Answer}`}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-100 text-[1px] mr-4">
                          {`${String(mypost?.createdAt).substring(0,10)}  ${String(mypost?.createdAt).substring(11, 16)}`}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              )
            )}
        </div>
    </div>
  );
};

export default myPost;
