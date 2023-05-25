import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  nickname: string;
  email: string;
}

const CreateAccount: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const [loading, setLoading] = useState(false);
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
        alert("Account already exists! Please log in!");
      }
      if (request.status === 201) {
        alert("Account created! Please log in!");
      }
      if (request.status !== 405) {
        router.push("/log-in");
      }

      setLoading(false);
    }
  };

  return (
    <div className="pt-5 ">
      <div className="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40px"
          height="40px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
            fill="#ffffff"
          />
        </svg>
      </div>
      <div className="flex flex-col text-xl font-semibold mt-6 ml-10">
        <span>닉네임과 이메일로</span>
        <span>간편하게 가입하세요!</span>
      </div>
      <form
        className="mt-6 flex-col space-y-3"
        onSubmit={handleSubmit(onValid)}
      >
        <div>
          <div className="flex space-x-2 items-center justify-center">
            <label
              className="text-lg text-gray-500"
              htmlFor="nickname"
            >
              Name
            </label>
            <input
              className="border-b-2 border-gray-500 w-2/3 p-1 pl-2 bg-transparent focus:outline-none focus:border-yellow-500"
              type="text"
              {...register("nickname", {
                required: "사용할 닉네임을 적어주세요",
                maxLength: { value: 10, message: "10글자 이하로 입력해주세요" },
                minLength: { value: 2, message: "2글자 이상으로 입력해주세요" },
              })}
            />
          </div>
          <span className="ml-36 text-sm text-yellow-500">{errors.nickname?.message}</span>
        </div>
        <div>
          <div className="flex space-x-2 items-center justify-center">
            <label className="text-lg text-gray-500" htmlFor="email">
              Email
            </label>
            <input
              className="border-b-2 border-gray-500 w-2/3 p-1 pl-2 bg-transparent focus:outline-none focus:border-yellow-500"
              type="email"
              {...register("email", {required: "사용할 이메일을 적어주세요"})}
            />
          </div>
          <span className="ml-36 text-sm text-yellow-500">{errors.email?.message}</span>
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
