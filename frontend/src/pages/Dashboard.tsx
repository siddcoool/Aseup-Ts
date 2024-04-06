import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button, useToast
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { CheckIcon, BellIcon, CalendarIcon, PlusSquareIcon } from '@chakra-ui/icons'
import DashboardCard from "../common/component/cards/DashboardCard";
import DashboardLinkCard from "../common/component/cards/DashboardLinkCard";
import DashboardTile from "../common/component/cards/DashboardTile";
import { useUser } from "../hooks/useUser";
import DataTable from "../common/component/table/DataTable";

export const Dashboard1 = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [employerCount, setEmployerCount] = useState(0);
  const [jobsCount, setJobsCount] = useState(0);

  const getJobsCount = async () => {
    try {
      const { data, status } = await axios.get('/jobs/count')
      if (status === 200) {
        setJobsCount(data.count)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

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

  useEffect(() => {

    getEmployeeCount();
    getEmployerCount();
    getJobsCount()
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
        <div className="text-center m-3 p-4 border rounded-lg bg-slate-100 hover:bg-slate-300">
          <h1 className="text-2xl py-3">Total Jobs</h1>
          <h2 className="text-3xl">{jobsCount}</h2>
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
            <Button colorScheme="messenger" rightIcon={<AddIcon />}>Create</Button>
          </Link>
        </p>
      </div>
    </div>
  );
};


export const Dashboard = () => {
  const [employeesCount, setEmployeesCount] = useState<number>();
  const [employersCount, setEmployersCount] = useState<number>();
  const [totalAverage, setTotalAverage] = useState<string>();
  const [jobsCount, setJobsCount] = useState<string>();

  const user = useUser();
  const toast = useToast();
  const getCountOfResponsesAndQuizzes = async () => {
    try {
      const { data: jobsCount } = await axios.get('/jobs/count')
      const { data: employeeCount } = await axios.get("/employee/count");
      const { data: employerCount } = await axios.get("/employer/count");

      setEmployeesCount(employeeCount.count)
      setEmployersCount(employerCount.count)
      setJobsCount(jobsCount.count)

    } catch (error) {
      toast({
        title: (error as Error).message,
        status: "error",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    getCountOfResponsesAndQuizzes();
  }, []);

  console.log({
    count: jobsCount
  })

  const rows = [
    { id: 1, productName: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
    { id: 2, productName: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
    // Add more rows as needed
  ];
  
  const columns = [
    { id: 'productName', name: 'Product Name', renderCell: (row) => row.productName },
    { id: 'color', name: 'Color', renderCell: (row) => row.color },
    { id: 'category', name: 'Category', renderCell: (row) => row.category },
    { id: 'price', name: 'Price', renderCell: (row) => row.price },
    // Add more columns as needed
  ];

  return (
    <div className="grid-col-2 grid px-16 py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <DashboardCard name={user ? user.name.toUpperCase() : ''} />
        <DashboardLinkCard />
      </div>
      <div className="my-4 grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <DashboardTile icon={<BellIcon width={6} height={6} />} count={String(jobsCount ?? 0).padStart(2, '0')} title={" Jobs"} />
        <DashboardTile icon={<CalendarIcon width={5} height={5} />} count={String(employeesCount ?? 0).padStart(2, '0')} title={" Employees"} />
        <DashboardTile icon={<CheckIcon width={5} height={5} />} count={String(employersCount ?? 0).padStart(2, '0')} title={" Employers"} />
        <DashboardTile icon={<PlusSquareIcon width={6} height={6} />} count={`${totalAverage ?? 0}%`} title={" Average"} />

      </div>
      <div>
        <DataTable rows={rows} columns={columns} />
      </div>
    </div>
  );
};