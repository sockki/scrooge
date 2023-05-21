import Layout from "@/components/layout";

export default function post() {
  return (
    <Layout seotitle="post">
      <div className="flex flex-col justify-center items-center py-10">
        <div className="w-4/5 h-60 rounded-md bg-slate-100 flex flex-col">
          <div className="pl-4 py-3 relative">
            <div className="absolute left-3 top-4 flex justify-center items-center space-x-1">
              <div className="w-5 h-5 rounded-full bg-slate-500" />
              <div className="text-black">minjun</div>
            </div>
            <div className="mt-16 flex flex-col">
              <span className="text-gray-800 text-xl font-semibold">
                5000원
              </span>
              <span className="text-gray-800 text-lg">스벅 아메리카노</span>
              <span className="text-gray-800 text-sm">가능할까요</span>
            </div>
            <div className="flex space-x-3 mt-10">
              <div className="flex">
                <div className="text-gray-800 px-1 text-sm rounded-lg border-[1.5px] border-gray-600 hover:shadow-md">
                  Buy!
                </div>
                <span className="text-gray-800 text-sm ml-1">5</span>
              </div>
              <div className="flex">
                <div className="text-gray-800 px-1 text-sm rounded-lg border-[1.5px] border-gray-600 hover:shadow-md">
                  Save!
                </div>
                <span className="text-gray-800 text-sm ml-1">3</span>
              </div>

              <div className="flex space-x-1">
                <span className="mt-1 ml-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#525252"
                    width="18px"
                    height="18px"
                    viewBox="0 0 1920 1920"
                  >
                    <path
                      d="M1662.178 0v1359.964h-648.703l-560.154 560.154v-560.154H0V0h1662.178ZM1511.07 151.107H151.107v1057.75h453.321v346.488l346.489-346.488h560.154V151.107ZM906.794 755.55v117.53H453.32V755.55h453.473Zm302.063-302.365v117.529H453.32V453.185h755.536Z"
                      fill-rule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-gray-800 text-sm">2</span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex flex-col space-y-3 w-4/5 mt-4 mb-52">
          {[1, 1, 1, 1, 1].map((_, i) => (
            <div className="w-full h-24 rounded-md bg-slate-100 flex flex-col">
              <div className="pl-4 py-3 relative">
                <div className="absolute left-3 top-4 flex justify-center items-center space-x-1">
                  <div className="w-5 h-5 rounded-full bg-slate-500" />
                  <div className="text-black">sswoo</div>
                </div>
                <div className="mt-10 ml-4">
                  <span className="text-gray-800">정신 나가셨나요..?</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="fixed border-[1.5px] pt-8 pb-2 shadow-lg w-full max-w-lg h-28 bottom-0 rounded-t-lg bg-slate-100 hover:h-56 group transition">
          <form className="grid gap-4 ">
            <textarea className="h-5 pl-1 border-[1.5px] border-gray-200 rounded-md shadow-sm w-3/4 mx-auto text-gray-900 group-hover:h-32  focus:outline-none focus:ring-2 focus:ring-gray-900 transition" />
            <button className="bg-yellow-500 text-gray-100 font-mono rounded-md py-1 border-black w-40 mx-auto">
              Answer!
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
