import Head from "next/head";

interface LayoutProps {
  seotitle: string;
  children: React.ReactNode;
}

export default function Layout({ seotitle, children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{seotitle} | scrooge</title>
      </Head>
      <div className="bg-[#161616] w-full max-w-lg z-50 px-10 py-3 fixed text-white border-b-0 top-0 flex justify-between">
        <span className="text-lg font-serif">scrooge</span>
        <div className="flex justify-center items-center space-x-2">
          <div className="w-7 h-7 bg-white rounded-full hover:bg-gray-200 shadow-md flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#e0d911"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              stroke="#e1da0e"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path d="M21,14.571C21,16.465,18.538,18,15.5,18S10,16.465,10,14.571s2.462-3.428,5.5-3.428S21,12.678,21,14.571Zm-5.5,5.286c-3.038,0-5.5-1.535-5.5-3.428v2.142C10,20.465,12.462,22,15.5,22S21,20.465,21,18.571V16.429C21,18.322,18.538,19.857,15.5,19.857Zm-7-11c3.038,0,5.5-1.535,5.5-3.428S11.538,2,8.5,2,3,3.535,3,5.429,5.462,8.857,8.5,8.857Zm-.125,4a5.58,5.58,0,0,1,2.181-2.389,8.44,8.44,0,0,1-2.056.25C5.462,10.714,3,9.179,3,7.286V9.428C3,11.3,5.4,12.811,8.375,12.853ZM8.5,22a8.83,8.83,0,0,0,1.079-.067,4.917,4.917,0,0,1-1.37-2.085C5.307,19.753,3,18.261,3,16.429v2.142C3,20.465,5.462,22,8.5,22ZM8,17.556V15.4c-2.8-.16-5-1.613-5-3.4v2.143C3,15.931,5.2,17.4,8,17.556Z" />
              </g>
            </svg>
          </div>
          <div className="flex justify-center items-center px-1 py-1 border-[1.5px] rounded-xl hover:bg-gray-800">
            <div className="w-5 h-5 bg-slate-300 rounded-full" />
            <div className="ml-1">me</div>
          </div>
        </div>
      </div>
      <div className="pt-12">{children}</div>
    </div>
  );
}
