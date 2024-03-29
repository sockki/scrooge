import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  myid: string;
  password: string;
}

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {needreload} = router.query;
  const onValid = async (data: IForm) => {
    if (!loading) {
      const request = await fetch("/api/users/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (request.status === 404) {
        setError("myid", {
          type: "custom",
          message: "사용자 id 정보가 존재하지 않습니다.",
        });
      }
      if (request.status === 402) {
        setError("password", {
          type: "custom",
          message: "사용자 비밀번호 정보가 존재하지 않습니다.",
        });
      }
      if (request.status === 200) {
        alert("로그인이 완료 되었습니다.");
        router.push("/");
      } else {
        setLoading(false);
      }
    }
  };
  const onCreateAccount = () => {
    router.push("/create-account");
  };

  useEffect(() => {
    if(needreload) {
      router.reload();
    }
  },[router,needreload])

  return (
    <div className="pt-5">
      <div className="flex flex-col text-xl font-semibold mt-6 ml-10">
        <span>안녕하세요!</span>
        <span>아이디와 비밀번호를 입력해주세요!</span>
      </div>
      <form
        className="mt-10 flex-col space-y-3"
        onSubmit={handleSubmit(onValid)}
      >
        <div>
          <div className="flex items-center justify-center">
            <label
              className="font-mono text-lg mr-14 text-gray-500"
              htmlFor="myid"
            >
              ID:
            </label>
            <input
              className="border-b-2 border-gray-500 w-2/3 p-1 pl-2 bg-transparent focus:outline-none focus:border-yellow-500"
              type="text"
              {...register("myid", { required: "Write your email please." })}
            />
          </div>
          <span className="ml-36 font-mono text-yellow-500">
            {errors?.myid?.message}
          </span>
        </div>
        <div>
          <div className="flex space-x-2 items-center justify-center">
            <label
              className="font-mono text-lg text-gray-500"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="border-b-2 border-gray-500 w-2/3 p-1 pl-2 bg-transparent focus:outline-none focus:border-yellow-500"
              type="password"
              {...register("password", {
                required: "Write your email please.",
              })}
            />
          </div>
          <span className="ml-36 font-mono text-yellow-500">
            {errors?.password?.message}
          </span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <button className="mt-5 w-2/5 rounded-lg bg-yellow-500 text-gray-100 text-lg hover:bg-yellow-600">
            Login
          </button>
          <div
            className="mt-5 w-2/5 rounded-lg bg-yellow-500 text-gray-100 text-lg hover:bg-yellow-600 flex items-center justify-center"
            onClick={onCreateAccount}
          >
            Create-account
          </div>
        </div>
      </form>

     
    </div>
  );
};

export default Login;
