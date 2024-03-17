import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { stat } from "fs";

export const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [employerCount, setEmployerCount] = useState(0);
  useEffect(() => {
    const getEmployeeCount = async () => {
      try {
        const { data, status } = await axios.get("/employee/count");
        if (status === 200) {
          console.log(data);

          setEmployeeCount(data.count);
        }
      } catch (unknownError) {
        console.log(unknownError);
      }
    };
    const getEmployerCount = async () => {
      try {
        const { data, status } = await axios.get("/employer/count");
        if (status === 200) {
          setEmployerCount(data.count);
        }
      } catch (unknownError) {
        console.log(unknownError);
      }
    };
    getEmployeeCount();
    getEmployerCount();
  }, []);

  return (
    <div>
      <h1 className="text-xl text-center mt-5">Dashbaord</h1>
      <div className="grid grid-cols-2 ">
        <div className="text-center m-3 p-4 border rounded-lg bg-slate-100 hover:bg-slate-300">
          <h1 className="text-2xl py-3">Total Employee</h1>
          <h2 className="text-3xl">{employeeCount}</h2>
        </div>
        <div className="text-center m-3 p-4 border rounded-lg bg-slate-100 hover:bg-slate-300">
          <h1 className="text-2xl py-3">Total Employeer</h1>
          <h2 className="text-3xl">{employerCount}</h2>
        </div>
      </div>
    </div>
  );
};
