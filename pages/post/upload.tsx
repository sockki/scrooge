import useMutation from "@/libs/useMutation";
import { Post } from "@prisma/client";
import { NextPage } from "next";
import { useForm } from "react-hook-form";

interface Iupload {
  price: Number;
  what: string;
  description: string;
}

interface Uploadgea {
  ok: boolean;
  newpost: Post;
}

const Upload: NextPage = () => {
  const { register, handleSubmit, formState: { errors }} = useForm<Iupload>();
  const [uploadpost, { data, loading }] = useMutation<Uploadgea>("/api/post");
  const onValid = () => {

  }
  return (
    <div className="pt-1 ">
      <div className="relative flex justify-center items-center ">
        <span className="absolute left-2">뒤로</span>
        <div className="text-xl mt-2">글올리기</div>
      </div>
      <div className="flex flex-col justify-center items-center pt-10">
        <form className="flex flex-col space-y-5 w-2/3"
        onSubmit={handleSubmit}>
          <div className="flex flex-col ">
            <span className="text-xl mb-2">얼마인가요?</span>
            <div className="flex">
              <input
                className="bg-transparent border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
                type="number"
              />
              <span>원</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl mb-2">뭐길래 그렇게 비싸요..?</span>
            <input
              className="bg-transparent border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl mb-2">추가 설명이 있나요?</span>
            <input
              className="bg-transparent border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
              type="text"
            />
          </div>
          <div className="mx-auto">
            <div className=" bg-yellow-400 border-[1.5px] w-28 flex items-center justify-center rounded-md border-none p-1 shadow-md hover:shadow-xl hover:bg-yellow-500">
              투표받기!
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
