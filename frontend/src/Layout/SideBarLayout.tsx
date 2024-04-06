import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function VerticalLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <div className="flex w-full">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex w-full flex-col w-full max-h-screen overflow-y-scroll custom-scrollbar">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
