import { ReactNode } from "react";

type ICardFour = {
    count: number | string,
    title: string
    icon?: ReactNode
}

const DashboardTile = ({ count = 10, title, icon }: ICardFour) => {
    return (
        <div className="rounded-md border py-4 border-stroke bg-white px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className=" flex items-end mb-4 justify-center">
                <span className="font-normal text-xl text-center">Total <span className="text-meta-12 font-semibold">{title}</span></span>

                {/* <span className="flex items-center gap-1 text-sm font-medium text-meta-5">
              0.95%
              <svg
                className="fill-meta-5"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                  fill=""
                />
              </svg>
            </span> */}
            </div>
            <div className="flex items-center justify-around">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    {icon}
                </div>
                <h4 className="text-3xl font-bold text-black dark:text-yellow dark:text-meta-8 text-center">
                    {count}
                </h4>
            </div>
        </div>
    );
};

export default DashboardTile;
