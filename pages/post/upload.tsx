import useMutation from "@/libs/useMutation";
import { Post } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Iupload {
  price: Number;
  what: string;
  description: string | null;
}

interface Uploadgea {
  ok: boolean;
  newpost: Post;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }} = useForm<Iupload>();
  const [uploadpost, { data, loading }] = useMutation<Uploadgea>("/api/post");
  const onValid = (form:Iupload) => {
    if(loading) return;
    uploadpost(form);
  }
  useEffect(() => {
    if(data && data.ok) {
      router.push(`/post/${data.newpost.id}`)
    };
  }, [data, router])
  return (
    <div className="pt-1 ">
      <div className="relative flex justify-center items-center ">
        <span className="absolute left-2">뒤로</span>
        <div className="text-xl mt-2">글올리기</div>
      </div>
      <div className="flex flex-col justify-center items-center pt-10">
        <form className="flex flex-col space-y-5 w-2/3"
        onSubmit={handleSubmit(onValid)}>
          <div className="flex flex-col ">
            <span className="text-xl mb-2">얼마인가요?</span>
            <div className="flex">
              <input
                className="bg-transparent pl-1 border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
                type="number"
                {...register("price", {required : "가격을 입력해주세요"})}
              />
              <span>원</span>
            </div>
            <span className="mt-1 font-mono text-yellow-500">{errors?.price?.message}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl mb-2">뭐길래 그렇게 비싸요..?</span>
            <input
              className="bg-transparent pl-1 border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
              type="text"
              {...register("what", {required : "무엇인지 입력해주세요"})}
            />
            <span className="mt-1 font-mono text-yellow-500">{errors?.what?.message}</span>
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
            <button className=" bg-yellow-400 border-[1.5px] w-28 flex items-center justify-center rounded-md border-none p-1 shadow-md hover:shadow-xl hover:bg-yellow-500">
              투표받기!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
