import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

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
      <div className="grid grid-cols-2 mt-4">
        <div className="text-center m-3 p-4 border rounded-lg bg-slate-100 hover:bg-slate-300">
          <h1 className="text-2xl py-3">Total Employees</h1>
          <h2 className="text-3xl">{employeeCount}</h2>
        </div>
        <div className="text-center m-3 p-4 border rounded-lg bg-slate-100 hover:bg-slate-300">
          <h1 className="text-2xl py-3">Total Employers</h1>
          <h2 className="text-3xl">{employerCount}</h2>
        </div>
      </div>
      <div>
       
        <p className="mt-8 text-xl font-bold text-center text-gray-700 flex flex-col justify-center gap-y-4">
          Want to add an admin account?
          {/*  */}
          <Link
            to="/register"
            className="font-medium text-base text-purple-600 hover:underline"
          >
            <Button colorScheme="messenger" rightIcon={<AddIcon/>}>Create</Button>
          </Link>
        </p>
      </div>
    </div>
  );
};
