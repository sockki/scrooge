import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  myid: string;
  password: string;
  nickname: string;
}

const CreateAccount: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const [loading, setLoading] = useState(false);
  const [isshowed, setIsshowed] = useState(false);
  const router = useRouter();
  const onValid = async (data: IForm) => {
    if (!loading) {
      setLoading(true);
      const request = await fetch("/api/users/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (request.status === 200) {
        alert("계정이 이미 존재 합니다. 로그인 해주세요!");
      }
      if (request.status === 201) {
        alert("계정이 만들어졌습니다. 로그인 해주세요!");
      }
      if (request.status !== 405) {
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

      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsshowed(!isshowed);
  }
  return (
    <div className="pt-5 ">
      <div className="ml-2" onClick={() => router.back()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40px"
          height="40px"
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
      </div>
      <div className="flex flex-col text-xl font-semibold mt-6 ml-10">
        <span>아이디, 비밀번호, 닉네임을</span>
        <span>각각 입력해주세요!</span>
      </div>
      <form
        className="mt-6 flex-col space-y-3"
        onSubmit={handleSubmit(onValid)}
      >
        <div>
          <div className="flex space-x-2 items-center justify-center">
            <label className="text-lg text-gray-500  mr-14" htmlFor="myid">
              ID
            </label>
            <input
              className="border-b-2 border-gray-500 w-2/3 p-1 pl-2 bg-transparent focus:outline-none focus:border-yellow-500"
              type="text"
              {...register("myid", {
                required: "사용할 ID를 적어주세요",
                minLength: { value: 5, message: "5글자 이상으로 입력해주세요" },
              })}
            />
          </div>
          <span className="ml-36 text-sm text-yellow-500">
            {errors.myid?.message}
          </span>
        </div>
        <div>
          <div className="flex space-x-2 items-center justify-center relative">
            <label className="text-lg text-gray-500" htmlFor="password">
              Password
            </label>
            <input
              className="border-b-2 border-gray-500 w-2/3 p-1 pl-2 bg-transparent focus:outline-none focus:border-yellow-500"
              type={isshowed ? "text" : "password"}
              {...register("password", {
                required: "사용할 비밀번호를 적어주세요",
                minLength: { value: 5, message: "5글자 이상으로 입력해주세요" },
              })}
            />
            <div
              className="absolute inset-y-0 right-6 flex items-center px-4 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {isshowed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </div>
          </div>
          <span className="ml-36 text-sm text-yellow-500">
            {errors.password?.message}
          </span>
        </div>
        <div>
          <div className="flex space-x-2 items-center justify-center">
            <label className="text-lg text-gray-500" htmlFor="nickname">
              Nickname
            </label>
            <input
              className="border-b-2 border-gray-500 w-2/3 p-1 pl-2 bg-transparent focus:outline-none focus:border-yellow-500"
              type="text"
              {...register("nickname", {
                required: "사용할 닉네임을 적어주세요",
                minLength: { value: 2, message: "2글자 이상으로 입력해주세요" },
                maxLength: { value: 10, message: "10글자 이하로 입력해주세요" },
              })}
            />
          </div>
          <span className="ml-36 text-sm text-yellow-500">
            {errors.nickname?.message}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <button className="mt-5 w-2/5 rounded-lg bg-yellow-500 text-gray-100 text-lg hover:bg-yellow-600">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
