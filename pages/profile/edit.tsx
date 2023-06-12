import useMutation from "@/libs/useMutation";
import useUser from "@/libs/useUser";
import { cls } from "@/libs/utils";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface EditProfileForm {
  nickname?: string;
  myid?: string;
  password?: string;
  formerror?: string;
}

interface Editres {
  ok: boolean;
  error?: string;
  answer?: string;
}

const Edit: NextPage = () => {
  const { user } = useUser();
  const [color, setColor] = useState("");
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileForm>();
  const [editprofile, { data, loading }] =
    useMutation<Editres>(`/api/users/me`);
  useEffect(() => {
    setValue("nickname", user?.nickname);
    setValue("myid", user?.myid);
    setValue("password", user?.password);
    setColor(String(user?.color));
  }, [user, setValue]);
  const onValid = (data: EditProfileForm) => {
    console.log(data);
    if (loading) return;
    editprofile({ ...data, color });
  };
  useEffect(() => {
    if (data && !data.ok) {
      setError("formerror", { message: data.error });
    }
  }, [data, setError]);
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
        <div className="text-xl mt-2">내 정보 수정</div>
      </div>
      <div className="flex flex-col pt-10">
        <form
          className="flex flex-col space-y-10"
          onSubmit={handleSubmit(onValid)}
        >
          <div>
            <div className="flex justify-center">
              <span className="text-xl">닉네임: </span>
              <input
                {...register("nickname", {
                  required: "사용할 닉네임을 적어주세요",
                  minLength: {
                    value: 2,
                    message: "2글자 이상으로 입력해주세요",
                  },
                  maxLength: {
                    value: 10,
                    message: "10글자 이하로 입력해주세요",
                  },
                })}
                className="w-3/5 pl-2 text-xl text-gray-400 bg-transparent border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
                type="text"
              />
            </div>
            {errors.nickname ? (
              <div className=" text-yellow-500 font-bold text-sm flex items-center justify-center">
                {errors?.nickname?.message}
              </div>
            ) : null}
          </div>
          <div>
            <div className="flex justify-center ">
              <span className="text-xl">ID:</span>
              <input
                {...register("myid", {
                  required: "사용할 ID를 적어주세요",
                  minLength: {
                    value: 5,
                    message: "5글자 이상으로 입력해주세요",
                  },
                })}
                className="w-3/5 pl-2 text-xl text-gray-400 bg-transparent border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
                type="text"
              />
            </div>
            {errors.myid ? (
              <div className="text-yellow-500 font-bold text-sm flex items-center justify-center">
                {errors?.myid?.message}
              </div>
            ) : null}
          </div>
          <div>
            <div className="flex justify-center">
              <span className="text-xl">비밀번호: </span>
              <input
                {...register("password", {
                  required: "사용할 비밀번호를 적어주세요",
                  minLength: {
                    value: 5,
                    message: "5글자 이상으로 입력해주세요",
                  },
                })}
                className="w-3/5 pl-2 text-xl text-gray-400 bg-transparent border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
                type="text"
              />
            </div>
            {errors.password ? (
              <div className="text-yellow-500 font-bold text-sm flex items-center justify-center">
                {errors?.password?.message}
              </div>
            ) : null}
          </div>
          <div className="flex justify-center">
            <span className="text-xl mr-2">아바타컬러:</span>
            <div className="flex space-x-2 select-none">
              <div
                className={cls(
                  "w-6 h-6 rounded-full bg-[#e74c3c]",
                  color === "#e74c3c" ? "ring-4 ring-[#e74c3c]" : ""
                )}
                onClick={() => setColor("#e74c3c")}
              />
              <div
                className={cls(
                  "w-6 h-6 rounded-full bg-[#f39c12]",
                  color === "#f39c12" ? "ring-4 ring-[#f39c12]" : ""
                )}
                onClick={() => setColor("#f39c12")}
              />
              <div
                className={cls(
                  "w-6 h-6 rounded-full bg-[#f1c40f]",
                  color === "#f1c40f" ? "ring-4 ring-[#f1c40f]" : ""
                )}
                onClick={() => setColor("#f1c40f")}
              />
              <div
                className={cls(
                  "w-6 h-6 rounded-full bg-[#2ecc71]",
                  color === "#2ecc71" ? "ring-4 ring-[#2ecc71]" : ""
                )}
                onClick={() => setColor("#2ecc71")}
              />
              <div
                className={cls(
                  "w-6 h-6 rounded-full bg-[#3498db]",
                  color === "#3498db" ? "ring-4 ring-[#3498db]" : ""
                )}
                onClick={() => setColor("#3498db")}
              />
              <div
                className={cls(
                  "w-6 h-6 rounded-full bg-[#2c3e50]",
                  color === "#2c3e50" ? "ring-4 ring-[#2c3e50]" : ""
                )}
                onClick={() => setColor("#2c3e50")}
              />
              <div
                className={cls(
                  "w-6 h-6 rounded-full bg-[#9b59b6]",
                  color === "#9b59b6" ? "ring-4 ring-[#9b59b6]" : ""
                )}
                onClick={() => setColor("#9b59b6")}
              />
              <div
                className={cls(
                  "w-6 h-6 rounded-full bg-[#95a5a6]",
                  color === "#95a5a6" ? "ring-4 ring-[#95a5a6]" : ""
                )}
                onClick={() => setColor("#95a5a6")}
              />
            </div>
          </div>
          {errors.formerror ? (
            <div className="text-yellow-500 font-bold text-sm flex items-center justify-center">
              {errors?.formerror?.message}
            </div>
          ) : null}
          {data?.answer ? (
            <div className="text-yellow-500 font-bold text-sm flex items-center justify-center">
              {data?.answer}
            </div>
          ) : null}
          <div className="mx-auto">
            <button className=" bg-yellow-400 border-[1.5px] w-28 flex items-center justify-center rounded-md border-none p-1 shadow-md hover:shadow-xl hover:bg-yellow-500">
              수정하기!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
