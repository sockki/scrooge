import { NextPage } from "next";
import Link from "next/link";

const Profile:NextPage = () => {
  return (
    <div className="pt-1 ">
      <div className="relative flex justify-center items-center ">
        <span className="absolute left-2">뒤로</span>
        <div className="text-xl mt-2">내 정보</div>
      </div>
      <div className="flex flex-col pt-10">
        <div className="ml-5">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-slate-500 ml-1" />
            <div className="flex justify-center items-center rounded-lg border-[1.5px] px-1 ml-5">
              <span>내 정보 수정</span>
            </div>
          </div>
          <div className="text-2xl font-semibold">minjun</div>
        </div>
        <div className="flex flex-col mt-10 ml-7">
          <span className="text-lg">scrooge 로 아낀 돈:</span>
          <span className="text-2xl ml-2 my-2 text-yellow-400">20000원</span>
          <span className="text-sm">설마 몰래 쓰신 건 아니죠..?</span>
        </div>
        <div className="mt-16 flex items-center justify-center space-x-4">
          <Link href={`/profile/mypost`} className="border-[1.5px] border-[#161616] hover:border-slate-100 rounded-md p-1">내가 올린 게시물</Link>
          <Link href={`/profile/mycomment`} className="border-[1.5px] border-[#161616] hover:border-slate-100 rounded-md p-1">내가 댓글 단 게시물</Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;