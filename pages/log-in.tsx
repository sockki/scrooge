import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
}

const Login:NextPage = () => {
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<IForm>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onValid = async (data: IForm) => {
    if (!loading) {
      const request = await fetch("/api/users/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (request.status === 404) {
        setError("email", { type: "custom", message: "사용자 정보가 존재하지 않습니다." })
      }
      if (request.status === 200) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }
  };
  const onCreateAccount = () => {
    router.push("/create-account")
  }
  
  return (
    <div className="pt-5">
      <div className="flex flex-col text-xl font-semibold mt-6 ml-10">
        <span>
          안녕하세요! 
        </span>
        <span>
          이메일로 로그인 하세요!
        </span>
      </div>
      <form
        className="mt-10 flex-col space-y-3"
        onSubmit={handleSubmit(onValid)}
      >
        <div>
          <div className="flex space-x-2 items-center justify-center">
            <label
              className="font-mono text-lg text-gray-500"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="border-b-2 border-gray-500 w-2/3 p-1 pl-2 bg-transparent focus:outline-none focus:border-yellow-500"
              type="email"
              {...register("email", { required: "Write your email please." })}
            />
          </div>
          <span className="ml-36 font-mono text-sky-700">{errors?.email?.message}</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <button className="mt-5 w-2/5 rounded-lg bg-yellow-500 text-gray-100 text-lg hover:bg-yellow-600">Login</button>
          <div className="mt-5 w-2/5 rounded-lg bg-yellow-500 text-gray-100 text-lg hover:bg-yellow-600 flex items-center justify-center" onClick={onCreateAccount}>Create-account</div>
        </div>
      </form>
    </div>
  );
};


export default Login;