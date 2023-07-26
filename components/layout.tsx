import useUser from "@/libs/useUser";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

interface LayoutProps {
  seotitle: string;
  children: React.ReactNode;
}

export default function Layout({ seotitle, children }: LayoutProps) {
  const { user } = useUser();
  const [onvote, isOnvote] = useState(false);
  const [onpost, isOnpost] = useState(false);
  return (
    <div>
      <Head>
        <title>{`${seotitle} | scrooge`}</title>
      </Head>
      <div className="bg-[#161616] w-full max-w-lg z-50 px-10 py-3 fixed text-white border-b-0 top-0 flex justify-between">
        <Link href={"/"} className="text-lg font-serif">
          scrooge
        </Link>
        <div className="flex justify-center items-center space-x-2">
          <div className="relative">
            <Link
              onMouseEnter={() => isOnvote(true)}
              onMouseLeave={() => isOnvote(false)}
              href={{
                pathname: `/post/upload`,
                query: {
                  isvote: true,
                },
              }}
              className="w-7 h-7 bg-white rounded-full hover:bg-gray-200 shadow-md flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="#000000"
                height="18px"
                width="18px"
                version="1.1"
                id="Layer_1"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <g>
                      <path d="M383.851,264.917c-0.853-5.141-5.312-8.917-10.517-8.917H352c-5.888,0-10.667,4.779-10.667,10.667v27.243     c0,3.797,2.027,7.296,5.312,9.216c10.048,5.845,16.021,16.128,16.021,27.541c0,17.643-14.357,32-32,32h-256     c-17.643,0-32-14.357-32-32c0-11.392,5.995-21.696,16.021-27.541c3.285-1.92,5.312-5.419,5.312-9.216v-27.243     C64,260.779,59.221,256,53.333,256H32c-5.227,0-9.664,3.776-10.517,8.917L1.643,384h402.069L383.851,264.917z" />
                      <path d="M74.667,341.333h256c5.888,0,10.667-4.779,10.667-10.667S336.555,320,330.667,320H320v-61.355     c0-3.755-1.984-7.253-5.227-9.173c-3.243-1.941-7.253-2.005-10.539-0.213c-23.019,12.523-49.899,7.68-67.115-9.557     c-19.115-19.115-22.101-49.301-7.339-71.424l32.491-44.672c2.368-3.243,2.688-7.531,0.896-11.115     c-1.813-3.563-5.504-5.824-9.515-5.824H96c-5.888,0-10.667,4.779-10.667,10.667V320H74.667C68.779,320,64,324.779,64,330.667     S68.779,341.333,74.667,341.333z" />
                      <path d="M501.333,0c-25.109,0-57.024,16.107-66.475,21.205L298.667,0.363c-19.136,0-65.323,1.237-80.299,12.267L133.035,65.6     c-4.053,2.517-5.931,7.403-4.629,11.989c1.323,4.587,5.504,7.744,10.261,7.744h96c0.853,0,1.685-0.107,2.517-0.299l14.293-3.52     C270.997,78.656,288,94.016,288,113.195c0,7.403-2.304,14.485-6.677,20.459l-33.557,46.101     c-9.365,14.037-7.509,32.896,4.437,44.843c6.699,6.699,15.637,10.411,25.131,10.411c9.493,0,18.411-3.691,25.131-10.411     l54.08-54.08c20.203-1.131,38.677-9.856,52.395-23.957c18.923,17.557,79.552,23.104,91.563,24.043     c0.277,0.064,0.555,0.064,0.832,0.064c2.667,0,5.269-1.003,7.232-2.837c2.197-2.027,3.435-4.864,3.435-7.829V10.667     C512,4.779,507.221,0,501.333,0z" />
                      <path d="M0,501.333C0,507.221,4.779,512,10.667,512h384c5.888,0,10.667-4.779,10.667-10.667v-96H0V501.333z" />
                    </g>
                  </g>
                </g>
              </svg>
            </Link>
            {onvote ? (
            <div className="absolute left-1">
              <div className="text-[10px]">투표하기</div>
            </div>
            ) : null}
          </div>
          <div className="relative">
            <Link
              onMouseEnter={() => isOnpost(true)}
              onMouseLeave={() => isOnpost(false)}
              href={{
                pathname: `/post/upload`,
                query: {
                  isvote: false,
                },
              }}
              className="w-7 h-7 bg-white rounded-full hover:bg-gray-200 shadow-md flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#e0d911"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                stroke="#e1da0e"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <path d="M21,14.571C21,16.465,18.538,18,15.5,18S10,16.465,10,14.571s2.462-3.428,5.5-3.428S21,12.678,21,14.571Zm-5.5,5.286c-3.038,0-5.5-1.535-5.5-3.428v2.142C10,20.465,12.462,22,15.5,22S21,20.465,21,18.571V16.429C21,18.322,18.538,19.857,15.5,19.857Zm-7-11c3.038,0,5.5-1.535,5.5-3.428S11.538,2,8.5,2,3,3.535,3,5.429,5.462,8.857,8.5,8.857Zm-.125,4a5.58,5.58,0,0,1,2.181-2.389,8.44,8.44,0,0,1-2.056.25C5.462,10.714,3,9.179,3,7.286V9.428C3,11.3,5.4,12.811,8.375,12.853ZM8.5,22a8.83,8.83,0,0,0,1.079-.067,4.917,4.917,0,0,1-1.37-2.085C5.307,19.753,3,18.261,3,16.429v2.142C3,20.465,5.462,22,8.5,22ZM8,17.556V15.4c-2.8-.16-5-1.613-5-3.4v2.143C3,15.931,5.2,17.4,8,17.556Z" />
                </g>
              </svg>
            </Link>
            {onpost ? (
            <div className="absolute left-1">
              <div className="text-[10px]">글올리기</div>
            </div>
            ) : null}
          </div>

          <Link
            href={`/profile`}
            className="flex justify-center items-center px-1 py-1 border-[1.5px] rounded-xl hover:bg-gray-600"
          >
            <div className={`w-5 h-5 rounded-full bg-[${user?.color}]`} />
            <div className="ml-1 text-xs font-sans">{user?.nickname}</div>
          </Link>
        </div>
      </div>
      <div className="pt-12">{children}</div>
    </div>
  );
}
