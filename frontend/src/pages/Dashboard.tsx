import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { CheckIcon, BellIcon, CalendarIcon, PlusSquareIcon } from '@chakra-ui/icons'
import DashboardCard from "../common/component/cards/DashboardCard";
import DashboardLinkCard from "../common/component/cards/DashboardLinkCard";
import DashboardTile from "../common/component/cards/DashboardTile";
import { useUser } from "../hooks/useUser";

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
    </div>
  );
};