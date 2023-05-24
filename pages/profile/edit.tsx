import { NextPage } from "next";

const Edit: NextPage = () => {
  return (
    <div className="pt-1 ">
      <div className="relative flex justify-center items-center ">
        <span className="absolute left-2">뒤로</span>
        <div className="text-xl mt-2">내 정보 수정</div>
      </div>
      <div className="flex flex-col justify-center items-center pt-10">
        <form className="flex flex-col space-y-10 w-2/3">
          <div className="flex mx-auto">
            <span className="text-xl">닉네임: </span>
            <div className="flex">
              <input
                className="bg-transparent border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
                type="text"
              />
            </div>
          </div>
          <div className="flex mx-auto">
            <span className="text-xl">이메일:</span>
            <input
              className="bg-transparent border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex mx-auto">
            <span className="text-xl">아바타:</span>
            <input
              className="bg-transparent border-b-2 border-gray-200 focus:border-yellow-400 focus:outline-none"
              type="text"
            />
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
