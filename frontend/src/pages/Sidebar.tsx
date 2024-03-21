import React from "react";
import { FcBullish } from "react-icons/fc";
import { RxDashboard } from "react-icons/rx";
import { BsBriefcaseFill, BsPersonFill } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";

export default function Sidebar() {
  return (
    <div className="bg-neutral-800 p-3 w-60 flex flex-col">
      {/* Logo */}
      <div className=" flex item-center gap-3 px-2 py-4 ">
        <FcBullish fontSize={28} />
        <span className="text-white text-2xl">AseUP</span>
      </div>
      {/* Main Content */}
      <div className="text-white py-8 px-4">
        <div className="text-xl flex justify-items py-4 gap-3">
          <RxDashboard fontSize={28} />
          Dashboard
        </div>
        <div className="text-xl flex justify-items py-4 gap-3">
          <BsPersonFill fontSize={28} />
          Employee
        </div>
        <div className="text-xl flex justify-items py-4 gap-3">
          <BsBriefcaseFill fontSize={28} /> Employer
        </div>
      </div>
      {/* Sign Out */}
      <div className="text-white flex justify-items px-4 gap-4 pt-[340px] ">
        <PiSignOutBold fontSize={28}/>
        <div className="text-xl cursor-pointer">Sign Out</div>
      </div>
    </div>
  );
}
