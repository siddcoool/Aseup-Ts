import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewEmployeedetails = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/employee/");
        setEmployees(response.data.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    
    fetchData();
  }, []);
  return (
    <div className="">
      <h1 className="text-center text-3xl mt-3 font-medium text-violet-600">
        Employee Details
      </h1>
      <div className="flex justify-end mr-4">
      <button
            onClick={()=>navigate('/employeeForm')}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Employee
          </button>
      </div>
      <div className="m-3 border-2 border-violet-900">
        <table className="border-collapse border border-violet-900 w-full">
          <thead>
            <tr className="border-2 border-violet-900">
              <th className="px-6 py-3 border-2 border-violet-900">Name</th>
              <th className="px-6 py-3 border-2 border-violet-900">Email</th>
              <th className="px-6 py-3 border-2 border-violet-900">Contact NO</th>
              <th className="px-6 py-3 border-2 border-violet-900">DOB</th>
              <th className="px-6 py-3 border-2 border-violet-900">Gender</th>
              <th className="px-6 py-3 border-2 border-violet-900">Current CTC</th>
              <th className="px-6 py-3 border-2 border-violet-900">Expected CTC</th>
              <th className="px-6 py-3 border-2 border-violet-900">Notice Period(days)</th>
              <th className="px-6 py-3 border-2 border-violet-900">Skills</th>
            </tr>
          </thead>
          <tbody>
            { employees.map((employee, index) => (
              <tr key={index} className="border-2 border-violet-900">
                <td className="px-6 py-3 border-2 border-violet-900"key={index}>{employee.name}</td>
                <td className="px-6 py-3 border-2 border-violet-900">{employee.email}</td>
                <td className="px-6 py-3 border-2 border-violet-900">{employee.contact}</td>
                <td className="px-6 py-3 border-2 border-violet-900">{employee.dob}</td>
                <td className="px-6 py-3 border-2 border-violet-900">{employee.gender}</td>
                <td className="px-6 py-3 border-2 border-violet-900">{employee.currentCTC}</td>
                <td className="px-6 py-3 border-2 border-violet-900">{employee.expectedCTC}</td>
                <td className="px-6 py-3 border-2 border-violet-900">{employee.noticePeriod}</td>
                <td className="px-6 py-3 border-2 border-violet-900">{employee.skills}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewEmployeedetails;
