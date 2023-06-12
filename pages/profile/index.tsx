import { NextPage } from "next";
import Link from "next/link";
import useUser from "@/libs/useUser";
import { useRouter } from "next/router";
import useMutation from "@/libs/useMutation";

interface logoutres {
  ok: boolean;
}

const Profile: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [logout, { data, loading }] =
    useMutation<logoutres>("/api/users/log-out");
  const onlogout = () => {
    if (loading) return;
    logout({});
    console.log(data?.ok);
    if (data && data?.ok) {
      router.replace("/log-in");
    }
  };
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
        <div className="text-xl mt-2">내 정보</div>
      </div>
      <div className="flex flex-col pt-10">
        <div className="ml-5">
          <div className="flex justify-between items-center">
            <div className={`w-14 h-14 rounded-full ml-2 mb-1 bg-[${user?.color}]`}/>
            <div className="flex space-x-5 mr-5">
              <div className="items-center border-[1.5px] border-[#161616] hover:border-slate-100 rounded-md p-1">
                <button onClick={() => router.push("/profile/edit")}>
                  내 정보 수정
                </button>
              </div>
              <div
                className="items-center border-[1.5px] border-[#161616] hover:border-slate-100 rounded-md p-1 "
                onClick={onlogout}
              >
                <span>로그아웃</span>
              </div>
            </div>
          </div>
          <div className="text-2xl font-semibold">{user?.nickname}</div>
        </div>
        <div className="flex flex-col mt-10 ml-7">
          <span className="text-lg">현재까지 사용한 돈:</span>
          <span className="text-2xl ml-2 my-2 text-yellow-400">
            {user?.spended}원
          </span>
          <span className="text-sm">
            {Number(user?.spended) < 10000
              ? "잘 아껴쓰고 계시네요!"
              : Number(user?.spended) < 50000
              ? "...아끼고 계신거 맞죠?"
              : Number(user?.spended) < 100000
              ? "지출이 너무 많으세요..."
              : "부자 되긴 글르셨네요..."}
          </span>
        </div>
        <div className="mt-16 flex items-center justify-center space-x-4">
          <Link
            href={`/profile/mypost`}
            className="border-[1.5px] border-[#161616] hover:border-slate-100 rounded-md p-1"
          >
            내가 올린 게시물
          </Link>
          <Link
            href={`/profile/mycomment`}
            className="border-[1.5px] border-[#161616] hover:border-slate-100 rounded-md p-1"
          >
            내가 댓글 단 게시물
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
