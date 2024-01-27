import React from "react";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <Sidebar/>
      Dashboard
    </div>
  );
}
