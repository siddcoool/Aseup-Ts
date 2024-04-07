import { Link } from "react-router-dom";

const DashboardLinkCard = () => {
    return (
      <div className="rounded-[15px] border border-stroke bg-cover bg-center bg-no-repeat bg-dashboardprimary shadow-default dark:border-strokedark dark:bg-boxdark text-center gap-4">
        <div className="py-5 px-2 text-white flex flex-col justify-center items-center gap-y-4">
          <h1 className="text-title-md font-bold dark:text-white w-full">
            Want to add a new Admin?
          </h1>
          <span className="my-3 inline-flex rounded-md border border-primary p-1 py-3 text-center text-paragraph-xsm text-black dark:text-white dark:border-white font-bold bg-white dark:bg-meta-10  hover:bg-opacity-90 lg:px-8 xl:px-10">
            <Link to='/register'>SIGN UP</Link>
          </span>
        </div>
      </div>
    );
  };
  
  export default DashboardLinkCard;
  