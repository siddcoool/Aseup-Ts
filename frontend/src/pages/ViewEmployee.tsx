import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

enum Grade {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F'
}

enum EmploymentType {
  Contract = 'Contract',
  FullTime = 'Full-Time',
  PartTime = 'Part-Time'
}

interface Education {
  title: string;
  field: string;
  institute: string;
  startYear: number;
  endYear: number;
  grade: Grade;
}

interface Experience {
  companyName: string;
  positionHeld: string;
  roleDescription: string;
  startDate: string; // Start date of employment in format yyyy-mm
  endDate: string; // End date of employment or null if current employee
  employmentType: EmploymentType;
}

export interface Employee {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  DOB: string;
  gender: string;
  educations: Education[];
  experience: Experience[];
  currentCTC: string;
  expectedCTC: string;
  noticePeriod: string;
  skills: string[]; // Assuming skill IDs are strings
}



const ViewEmployeedetails = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get("/employee/");
      setEmployees(response.data.data);
      console.log({ response });
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [employees]);
  const deleteEmployee = async (id: string) => {
    try {
      await axios.delete(`/employee/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id)); // Assuming each employee object has an "id" field
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };
  return (
    <div className="">
      <h1 className="text-center text-3xl mt-3 font-medium text-violet-600">
        Employee Details
      </h1>
      <div className="flex justify-end mr-4">
        <button
          onClick={() => navigate("/employeeForm")}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Employee
        </button>
      </div>
      <div className="m-3 border-2 border-violet-900">
        <table className="border-collapse border border-violet-900 w-full">
          <thead>
            <tr className="border-2 border-violet-900">
              <th className="px-4 py-3 border-2 border-violet-900">Name</th>
              <th className="px-4 py-3 border-2 border-violet-900">Email</th>
              <th className="px-4 py-3 border-2 border-violet-900">
                Contact NO
              </th>
              <th className="px-4 py-3 border-2 border-violet-900">DOB</th>
              <th className="px-4 py-3 border-2 border-violet-900">Gender</th>
              <th className="px-4 py-3 border-2 border-violet-900">
                Current CTC
              </th>
              <th className="px-4 py-3 border-2 border-violet-900">
                Expected CTC
              </th>
              <th className="px-4 py-3 border-2 border-violet-900">
                Notice Period(days)
              </th>
              <th className="px-4 py-3 border-2 border-violet-900">Skills</th>
              <th className="px-4 py-3 border-2 border-violet-900">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index} className="border-2 border-violet-900">
                <td
                  className="px-6 py-3 border-2 border-violet-900"
                  key={index}
                >
                  {employee.name}
                </td>
                <td className="px-6 py-3 border-2 border-violet-900">
                  {employee.email}
                </td>
                <td className="px-6 py-3 border-2 border-violet-900">
                  {employee.phoneNumber}
                </td>
                <td className="px-6 py-3 border-2 border-violet-900">
                  {employee.DOB}
                </td>
                <td className="px-6 py-3 border-2 border-violet-900">
                  {employee.gender}
                </td>
                <td className="px-6 py-3 border-2 border-violet-900">
                  {employee.currentCTC}
                </td>
                <td className="px-6 py-3 border-2 border-violet-900">
                  {employee.expectedCTC}
                </td>
                <td className="px-6 py-3 border-2 border-violet-900">
                  {employee.noticePeriod}
                </td>
                <td className="px-6 py-3 border-2 border-violet-900">
                  {employee.skills}
                </td>
                <td className="px-6 py-3 border-2 border-violet-900">
                  <button 
                  onClick={()=>navigate(`/employeeForm/${employee._id}`)}
                  className="text-white bg-blue-700 px-2 py-2 rounded-lg hover:text-slate-950 hover:bg-indigo-500 mb-2">
                    Update
                  </button>
                  <button
                    onClick={() => {
                      deleteEmployee(employee._id);
                    }}
                    className="text-white bg-red-600 px-2 py-2 rounded-lg hover:text-slate-950 hover:bg-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewEmployeedetails;
