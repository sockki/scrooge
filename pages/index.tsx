import Layout from "@/components/layout";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Layout seotitle="title">
        <div className="flex flex-col space-y-6 justify-center items-center py-10">
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
            <Link
              key={i}
              className="w-4/5 h-60 rounded-md bg-slate-100 flex flex-col"
              href={`post/${i}`}
            >
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
            </Link>
          ))}
        </div>
      </Layout>
    </div>
  );
}
