import Layout from "@/components/layout";
import useMutation from "@/libs/useMutation";
import { cls } from "@/libs/utils";
import { Answer, Post, User } from "@prisma/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import client from "@/libs/client";

interface AnswerWithUser extends Answer {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  Answer: AnswerWithUser[];
}

interface IPostDetail {
  ok: boolean;
  post: PostWithUser;
  isgoed: boolean;
  isstoped: boolean;
  isliked: boolean;
  gonum: number;
  stopnum: number;
  likenum: number;
  answernum: number;
}

interface Ianswer {
  content: string;
}

interface ansMutation {
  ok: boolean;
  newans: Answer;
}

const VotePost: NextPage<IPostDetail> = ({post}) => {
  const router = useRouter();
  // post 데이터
  const { data, mutate } = useSWR<IPostDetail>(
    router.query.id ? `/api/post/${router.query.id}` : null
  );

  // 댓글 달기
  const [uploadans, { data: ansdata, loading: ansloading }] =
    useMutation<ansMutation>(`/api/post/${router.query.id}/answer`);

  // go투표
  const [togglego, { loading: goloading }] = useMutation(
    `/api/post/${router.query.id}/govote`
  );

  // stop투표
  const [togglestop, { loading: stoploading }] = useMutation(
    `/api/post/${router.query.id}/stopvote`
  );

  // 좋아요
  const [togglelike, { loading: likeloading }] = useMutation(
    `/api/post/${router.query.id}/like`
  );

  // 댓글 다는 process
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Ianswer>();
  const onValid = (data: Ianswer) => {
    if (ansloading) return;
    uploadans(data);
  };
  useEffect(() => {
    if (ansdata && ansdata.ok) {
      reset();
      mutate();
    }
  }, [ansdata, reset]);

  // 투표 process
  const ongoClick = () => {
    if (!goloading) {
      togglego({});
    }
    if (!data) return;

    if (data.isstoped) {
      mutate(
        {
          ...data,
          isgoed: !data.isgoed,
          isstoped: !data.isstoped,
          stopnum: data.isstoped ? data.stopnum - 1 : data.stopnum + 1,
          gonum: data.isgoed ? data.gonum - 1 : data.gonum + 1,
        },
        false
      );
    } else {
      mutate(
        {
          ...data,
          isgoed: !data.isgoed,
          gonum: data.isgoed ? data.gonum - 1 : data.gonum + 1,
        },
        false
      );
    }
  };

  const onstopClick = () => {
    if (!stoploading) {
      togglestop({});
    }
    if (!data) return;

    if (data.isgoed) {
      mutate(
        {
          ...data,
          isgoed: !data.isgoed,
          isstoped: !data.isstoped,
          stopnum: data.isstoped ? data.stopnum - 1 : data.stopnum + 1,
          gonum: data.isgoed ? data.gonum - 1 : data.gonum + 1,
        },
        false
      );
    } else {
      mutate(
        {
          ...data,
          isstoped: !data.isstoped,
          stopnum: data.isstoped ? data.stopnum - 1 : data.stopnum + 1,
        },
        false
      );
    }
  };
  // 좋아요 progress
  const onlikeClick = () => {
    if (!goloading) {
      togglelike({});
    }
    if (!data) return;
    mutate(
      {
        ...data,
        isliked: !data.isliked,
        likenum: data.isliked ? data.likenum - 1 : data.likenum + 1,
      },
      false
    );
  };

  return (
    <Layout seotitle="post">
      <div className="flex flex-col justify-center items-center py-10">
        {data?.post.isVote ? (
          <div className="w-4/5 h-auto rounded-md pt-1 flex flex-col">
            <div className="">
              <div className="flex flex-col ">
                <div className="flex items-center space-x-1">
                  <div className={`w-5 h-5 rounded-full bg-[${post?.user?.color}]`} />
                  <div className="text-slate-100 font-bold">
                    {post?.user?.nickname}
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white px-2 py-4 rounded-xl flex justify-center items-center flex-col">
                <span className="text-gray-800 text-xl font-semibold">
                  {`${post?.money}원`}
                </span>
                <span className="text-gray-800 text-lg">
                  {post?.what}
                </span>
                <span className="text-gray-800 text-sm">
                  {post?.description}
                </span>
              </div>
              <div className="flex justify-between mt-2 ml-1">
                <div className="flex space-x-2">
                  <div className="flex">
                    <button
                      className={cls(
                        "px-1 text-sm font-bold rounded-lg border-[1.5px] border-pink-600",
                        data.isgoed
                          ? "bg-pink-600 text-[#161616]"
                          : "text-pink-600"
                      )}
                      onClick={ongoClick}
                    >
                      Buy!
                    </button>
                    <span className="text-pink-600 text-sm ml-1">{`${data?.gonum}`}</span>
                  </div>
                  <div className="flex">
                    <button
                      className={cls(
                        "px-1 text-sm font-bold rounded-lg border-[1.5px] border-teal-600",
                        data.isstoped
                          ? "bg-teal-600 text-[#161616]"
                          : "text-teal-600"
                      )}
                      onClick={onstopClick}
                    >
                      Save!
                    </button>
                    <span className="text-teal-600 text-sm ml-1">{`${data?.stopnum}`}</span>
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
                    <span className="text-slate-10 text-sm">{`${data?.answernum}`}</span>
                  </div>
                </div>
                <div className="text-slate-10 text-[1px] mr-4 ">{`${String(
                  post?.createdAt
                ).substring(0, 10)}  ${String(post?.createdAt).substring(
                  11,
                  16
                )}`}</div>
              </div>
            </div>
            <div></div>
          </div>
        ) : (
          <div className="w-4/5 h-auto rounded-md flex flex-col">
            <div className="py-3">
              <div className="flex flex-col ">
                <div className="flex  items-center space-x-1">
                  <div className={`w-5 h-5 rounded-full bg-[${post?.user?.color}]`} />
                  <div className="text-slate-100 font-bold">
                    {post?.user?.nickname}
                  </div>
                </div>
              </div>
              <div className="mt-1 bg-white p-2 rounded-xl flex flex-col">
                <span className="text-gray-800 text-xl font-semibold">
                  {`-${post?.money}원`}
                </span>
                <span className="text-gray-800 text-lg">
                  {post?.what}
                </span>
                <span className="text-gray-800 text-sm">
                  {post?.description}
                </span>
              </div>
              <div className="flex justify-between space-x-3 mt-1 ml-1">
                <div className="flex space-x-2">
                  <div className="flex" onClick={onlikeClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22px"
                      height="22px"
                      viewBox="0 0 24 24"
                      fill={cls(data?.isliked ? "#f4f814" : "none")}
                    >
                      <path
                        d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                        stroke="#f4f814"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[#f4f814] text-sm ml-1">{`${data?.likenum}`}</span>
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
                    <span className="text-slate-100  text-sm ml-1">{`${data?.answernum}`}</span>
                  </div>
                </div>
                <div>
                  <div className="text-slate-100 text-[1px] mr-4">
                    {`${String(post?.createdAt).substring(
                      0,
                      10
                    )}  ${String(post?.createdAt).substring(11, 16)}`}
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        )}
        <div className="flex flex-col space-y-3 w-4/5 mt-4 mb-52">
          {post?.Answer?.map((ans) => (
            <div
              key={ans.id}
              className="w-full h-auto rounded-md flex flex-col"
            >
              <div className="">
                <div className="flex flex-col ">
                  <div className="flex space-x-1">
                    <div className={`w-5 h-5 rounded-full bg-[${ans?.user?.color}]`} />
                    <div className="text-slate-100 font-bold">
                      {ans?.user?.nickname}
                    </div>
                  </div>
                </div>
                <div className="mt-1 bg-white p-2 rounded-xl">
                  <span className="text-gray-800">{ans?.content}</span>
                </div>
                <div className="flex justify-between space-x-3 mt-1 ml-1">
                  <div className="flex space-x-2">
                    <div></div>
                  </div>
                  <div>
                    <div className="text-slate-100 text-[1px] mr-4">
                      {`${String(ans?.createdAt).substring(
                        0,
                        10
                      )}  ${String(ans?.createdAt).substring(11, 16)}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="fixed border-[1.5px] pt-8 shadow-lg w-full max-w-md h-28 bottom-0 pb-3 rounded-t-lg bg-white hover:h-56 group transition">
          <form className="grid gap-2" onSubmit={handleSubmit(onValid)}>
            <textarea
              className="h-5 pl-1 border-[1.5px] border-gray-200 rounded-md shadow-sm w-3/4 mx-auto text-gray-900 text-sm group-hover:h-32  focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              {...register("content", {
                required: true,
                minLength: {
                  message: "5자 이상 입력하세요!",
                  value: 5,
                },
              })}
            />
            <span className="flex items-center justify-center font-mono text-yellow-600 text-sm">
              {errors?.content?.message}
            </span>
            <button className="bg-yellow-400 text-gray-100 font-mono rounded-md py-1 border-black w-40 mx-auto">
              Answer!
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};


export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}


export const getStaticProps: GetStaticProps = async(ctx) => {
  if (!ctx?.params?.id) {
    return {
      props: {},
    };
  }
  const post = await client.post.findUnique({
    where: {
        id: Number(ctx?.params?.id),
    },
    include: {
        user: {
            select : {
                id: true,
                nickname: true,
                color: true
            }
        },
        Answer: {
            select: {
                id:true,
                content: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        nickname: true,
                        color:true,
                    }
                }
                
            }
        }
    }
});
  if (!post) {
    return {
      props: {}
    };
  }
  return {
    props: {post: JSON.parse(JSON.stringify(post)),},
  };
}

export default VotePost;
