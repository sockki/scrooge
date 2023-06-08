import useUser from "@/libs/useUser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditProfileForm {
  nickname?: string;
  myid?: string;
  password?: string;
}

const Edit: NextPage = () => {
  const {user} = useUser();
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm();
  
  useEffect(()=>{
    setValue("nickname", user?.nickname);
    setValue("myid", user?.myid);
    setValue("password", user?.password);
  },[user, setValue])
  const onValid = (data: EditProfileForm) => {
    console.log(data);
  };
  return (
    <div className="pt-1 ">
      <div className="relative flex justify-center items-center ">
        <button className="absolute left-2" onClick={() => router.back()}>
          뒤로
        </button>
        <div className="text-xl mt-2">내 정보 수정</div>
      </div>
      <div className="flex flex-col pt-10">
        <form
          className="flex flex-col space-y-10"
          onSubmit={handleSubmit(onValid)}
        >
          <div className="flex justify-center">
            <span className="text-xl">닉네임: </span>
            <input
              {...register("nickname")}
              className="w-3/5 pl-2 text-xl text-gray-400 bg-transparent border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex justify-center ">
            <span className="text-xl">ID:</span>
            <input
              {...register("myid")}
              className="w-3/5 pl-2 text-xl text-gray-400 bg-transparent border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex justify-center">
            <span className="text-xl">비밀번호: </span>
            <input
              {...register("password")}
              className="w-3/5 pl-2 text-xl text-gray-400 bg-transparent border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex justify-center">
            <span className="text-xl mr-2">아바타컬러:</span>
            <div className="flex space-x-1">
              <div className="w-7 h-7 rounded-full bg-[#e74c3c] " />
              <div className="w-7 h-7 rounded-full bg-[#f39c12] " />
              <div className="w-7 h-7 rounded-full bg-[#f1c40f] " />
              <div className="w-7 h-7 rounded-full bg-[#2ecc71] " />
              <div className="w-7 h-7 rounded-full bg-[#3498db] " />
              <div className="w-7 h-7 rounded-full bg-[#2c3e50] " />
              <div className="w-7 h-7 rounded-full bg-[#9b59b6] " />
              <div className="w-7 h-7 rounded-full bg-[#95a5a6] " />
            </div>
          </div>
          <div className="mx-auto">
            <div className=" bg-yellow-400 border-[1.5px] w-28 flex items-center justify-center rounded-md border-none p-1 shadow-md hover:shadow-xl hover:bg-yellow-500">
              수정하기!
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
