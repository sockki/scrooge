import useMutation from "@/libs/useMutation";
import { Post } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Iupload {
  price: Number;
  what: string;
  description?: string | null;
}

interface Uploadgea {
  ok: boolean;
  newpost: Post;
}

const VoteUpload: NextPage = () => {
  const router = useRouter();
  const isvote = router.query.isvote === "true";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iupload>();
  const [uploadpost, { data, loading }] = useMutation<Uploadgea>("/api/post");
  const onValid = (form: Iupload) => {
    if (!loading) {
      uploadpost({ ...form, isvote });
    }
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/post/${data.newpost.id}`);
    }
  }, [data, router]);

  return (
    <div className="pt-1 ">
      <div className="relative flex justify-center items-center ">
        <button className="absolute left-2" onClick={() => router.back()}>
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
        <div className="text-xl mt-2">{isvote ? "투표올리기" : "글올리기"}</div>
      </div>
      <div className="flex flex-col justify-center items-center pt-10">
        {isvote ? (
          <form
            className="flex flex-col space-y-5 w-2/3"
            onSubmit={handleSubmit(onValid)}
          >
            <div className="flex flex-col ">
              <span className="text-xl mb-2">얼마인가요?</span>
              <div className="flex">
                <input
                  className="bg-transparent pl-1 border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
                  type="number"
                  {...register("price", { required: "가격을 입력해주세요" })}
                />
                <span>원</span>
              </div>
              <span className="mt-1 font-mono text-yellow-500">
                {errors?.price?.message}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl mb-2">뭐길래 그렇게 비싸요..?</span>
              <input
                className="bg-transparent pl-1 border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
                type="text"
                {...register("what", { required: "무엇인지 입력해주세요" })}
              />
              <span className="mt-1 font-mono text-yellow-500">
                {errors?.what?.message}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl mb-2">더 하실 말씀 있나요?</span>
              <input
                className="bg-transparent pl-1 border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
                type="text"
                {...register("description")}
              />
            </div>
            <div className="mx-auto">
              {loading ? (
                <div className=" bg-yellow-400 border-[1.5px] w-28 flex items-center justify-center rounded-md border-none p-1 shadow-md hover:shadow-xl hover:bg-yellow-500">
                  게시중...
                </div>
              ) : (
                <button className=" bg-yellow-400 border-[1.5px] w-28 flex items-center justify-center rounded-md border-none p-1 shadow-md hover:shadow-xl hover:bg-yellow-500">
                  투표받기!
                </button>
              )}
            </div>
          </form>
        ) : (
          <form
            className="flex flex-col space-y-5 w-2/3"
            onSubmit={handleSubmit(onValid)}
          >
            <div className="flex flex-col ">
              <span className="text-xl mb-2">얼마인가요?</span>
              <div className="flex">
                <input
                  className="bg-transparent pl-1 border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
                  type="number"
                  {...register("price", { required: "가격을 입력해주세요" })}
                />
                <span>원</span>
              </div>
              <span className="mt-1 font-mono text-yellow-500">
                {errors?.price?.message}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl mb-2">...무슨일이 있으셨나요??</span>
              <input
                className="bg-transparent pl-1 border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
                type="text"
                {...register("what", {
                  required: "어떤 물건인지 또는 무슨일이 있으셨는지 써주세요",
                })}
              />
              <span className="mt-1 font-mono text-yellow-500">
                {errors?.what?.message}
              </span>
            </div>

            <div className="mx-auto">
              {loading ? (
                <div className=" bg-yellow-400 border-[1.5px] w-28 flex items-center justify-center rounded-md border-none p-1 shadow-md hover:shadow-xl hover:bg-yellow-500">
                  게시중...
                </div>
              ) : (
                <button className=" bg-yellow-400 border-[1.5px] w-28 flex items-center justify-center rounded-md border-none p-1 shadow-md hover:shadow-xl hover:bg-yellow-500">
                  글올리기!
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default VoteUpload;
