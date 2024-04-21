/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean) => ReactNode;
  activeCondition: boolean;
}

const SidebarLinkGroup = ({
  children,
  activeCondition,
}: SidebarLinkGroupProps) => {
  const [open, setOpen] = useState<boolean>(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
};

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const SIDEBAR_ITEMS = {
  1: "Dashboard",
  2: "Employee",
  3: "Employer",
  4: "Jobs",
  5: "Skills",
  6: "Application",
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(
    localStorage.getItem("sidebar-expanded") === "true"
  );
  const [selectedSidebar, setSelectedSidebar] = useState(SIDEBAR_ITEMS[3]);

  const handleSideBarChange = (v: number) => {
    console.log({This:v})
    setSelectedSidebar(SIDEBAR_ITEMS[v]);
  };

  console.log({ selectedSidebar });

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebarOpen || !sidebar.current || !trigger.current) return;
      if (sidebar.current.contains(target) || trigger.current.contains(target))
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (key !== "Escape" || !sidebarOpen) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-[60%] flex-col  overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:w-[18%] lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-4 mr-9 mt-8 flex items-center justify-center gap-2 text-3xl font-bold text-white ">
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG Path */}
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className=" px-4  lg:px-6">
          <div>
            <ul className=" flex flex-col gap-1.5">
              <SidebarLinkGroup activeCondition={true}>
                {(handleClick, open) => {
                  return (
                    <>
                      {/* <Link
                        to="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          open && "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        Dashboard
                      </Link> */}

                      <div
                      // className={`translate transform overflow-hidden ${
                      //   !open && "hidden"
                      // }`}
                      >
                        <ul className="mb-1 mt-1 flex flex-col gap-2.5">
                          <li onClick={() => handleSideBarChange(1)}>
                            <Link
                              to="/dashboard"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white hover:scale-x-110`}
                            >
                              Dashboard
                            </Link>
                          </li>
                          <li onClick={() => handleSideBarChange(2)}>
                            <Link
                              to="/employee"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white hover:scale-x-110`}
                            >
                              Employee
                            </Link>
                          </li>
                          <li onClick={() => handleSideBarChange(3)}>
                            <Link
                              to="/employer/view"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white hover:scale-x-110 `}
                            >
                              Employer
                            </Link>
                          </li>
                          <li onClick={() => handleSideBarChange(4)}>
                            <Link
                              to="/jobs"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white hover:scale-x-110`}
                            >
                              Jobs
                            </Link>
                          </li>
                          <li onClick={() => handleSideBarChange(5)}>
                            <Link
                              to="/skills"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white hover:scale-x-110`}
                            >
                              Skills
                            </Link>
                          </li>
                          <li onClick={() => handleSideBarChange(6)}>
                            <Link
                              to="/application"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white hover:scale-x-110`}
                            >
                              Application
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              {/* Other menu items */}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
