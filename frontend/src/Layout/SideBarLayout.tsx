import { FcBullish } from "react-icons/fc";
import { RxDashboard } from "react-icons/rx";
import { BsBriefcaseFill, BsPersonFill } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";
import useIsAuthentication from "../hooks/useIsAuthentication";
import { useNavigate } from "react-router-dom";
import { Switch } from "@chakra-ui/react";

export default function VerticalLayout({ children }: any) {
  const { deleteAuthenticated } = useIsAuthentication();
  const navigate = useNavigate();
  return (
    <div className="flex h-screen">
      <div className="bg-neutral-800 pl-2 w-1/5 flex flex-col">
        {/* Logo */}
        <div className=" flex item-center gap-3 py-4 ">
          <FcBullish fontSize={28} />
          <span className="text-white text-2xl">AseUP</span>
        </div>
        {/* Main Content */}
        <div className="text-white py-8 ">
          <div className="text-xl flex justify-items py-4 gap-3 hover:bg-white hover:text-black hover:cursor-pointer" onClick={() => navigate('/Dashboard')}>
            <RxDashboard fontSize={28} className="pl-1"/>
            Dashboard
          </div>
          <div className="text-xl flex justify-items py-4 gap-3 hover:bg-white hover:text-black hover:cursor-pointer" onClick={() => navigate('/viewEmployee')}>
            <BsPersonFill fontSize={28} className="pl-1" />
            Employee
          </div>
          <div className="text-xl flex justify-items py-4 gap-3 hover:bg-white hover:text-black hover:cursor-pointer" onClick={() => navigate('/employer/view')}>
            <BsBriefcaseFill fontSize={28} className="pl-1" /> Employer
          </div>
          <div className="text-xl flex justify-items py-4 gap-3 hover:bg-white hover:text-black hover:cursor-pointer" onClick={() => navigate('/jobs')}>
            <BsBriefcaseFill fontSize={28} className="pl-1" /> Jobs
          </div>
          <div className="text-xl flex justify-items py-4 gap-3 hover:bg-white hover:text-black hover:cursor-pointer" onClick={() => navigate('/skills')}>
            <BsBriefcaseFill fontSize={28} className="pl-1"/> Skills
          </div>
        </div>
        {/* Sign Out */}
       
        <div className="text-white flex justify-items gap-2 hover:cursor-pointer">
          <PiSignOutBold fontSize={28} className="pl-1" />
          <span onClick={deleteAuthenticated} className="text-xl">Sign Out</span>
        </div>
      </div>
      <div className="w-4/5 overflow-y-scroll">{children}</div>
    </div>
  );
}
