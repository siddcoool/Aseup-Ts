import { FcBullish } from "react-icons/fc";
import { RxDashboard } from "react-icons/rx";
import { BsBriefcaseFill, BsPersonFill } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";
import useIsAuthentication from "../hooks/useIsAuthentication";
import { useNavigate } from "react-router-dom";

export default function VerticalLayout({ children }: any) {
  const {deleteAuthenticated} = useIsAuthentication()
  const navigate = useNavigate()
  return (
    <div className="flex ">
      <div className="bg-neutral-800 p-3 w-1/5 flex flex-col">
        {/* Logo */}
        <div className=" flex item-center gap-3 px-2 py-4 ">
          <FcBullish fontSize={28} />
          <span className="text-white text-2xl">AseUP</span>
        </div>
        {/* Main Content */}
        <div className="text-white py-8 px-4">
          <div className="text-xl flex justify-items py-4 gap-3">
            <RxDashboard fontSize={28} />
            DashBaord
          </div>
          <div className="text-xl flex justify-items py-4 gap-3" onClick={()=>navigate('/viewEmployee')}>
            <BsPersonFill fontSize={28} />
            Employee
          </div>
          <div className="text-xl flex justify-items py-4 gap-3">
            <BsBriefcaseFill fontSize={28} /> Employeer
          </div>
        </div>
        {/* Sign Out */}
        <div className="text-white flex justify-items px-4 gap-4 pt-[340px]">
          <PiSignOutBold fontSize={28} />
          <span onClick={deleteAuthenticated}
        className="text-xl">Sign Out</span>
        </div>
      </div>
      <div className="w-4/5"> {children}</div>
    </div>
  );
}
