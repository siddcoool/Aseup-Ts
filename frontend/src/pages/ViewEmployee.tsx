import axios from "axios";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../common/component/Loader";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import dayjs from "dayjs";

enum Grade {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
}

enum EmploymentType {
  Contract = "Contract",
  FullTime = "Full-Time",
  PartTime = "Part-Time",
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/employee/");
      setEmployees(response.data.data);
      setLoading(false);

      console.log({ response });
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  console.log({ employees });
  useEffect(() => {
    fetchData();
  }, []);
  const deleteEmployee = async (id: string) => {
    try {
      await axios.delete(`/employee/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id)); // Assuming each employee object has an "id" field
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };
  if (loading) {
    return <div className="flex  justify-center mt-36 "><Loader /></div>;
  } else
    return (
      <div className="">
        <h1 className="font-bold text-3xl text-center m-4">
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
        {loading ? (
          <Loader />
        ) : (
          <div className="m-3 border-2 border-gray-300">
            <TableContainer>
              <Table >
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Contact NO</Th>
                    <Th>DOB</Th>
                    <Th>Gender</Th>
                    <Th>Current CTC</Th>
                    <Th>Expected CTC</Th>
                    <Th>Notice Period(days)</Th>
                    <Th>Skills</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employees.map((employee, index) => (
                    <Tr key={index}>
                      <Td>{employee.name}</Td>
                      <Td>{employee.email}</Td>
                      <Td>{employee.phoneNumber}</Td>
                      <Td>{dayjs(employee.DOB).format("DD-MM-YYYY")}</Td>
                      <Td>{employee.gender}</Td>
                      <Td>{employee.currentCTC}</Td>
                      <Td>{employee.expectedCTC}</Td>
                      <Td>{employee.noticePeriod}</Td>
                      <Td>
                        {employee.skills.map((skill, index) => (
                          <div key={index}>{skill.name}</div>
                        ))}
                      </Td>
                      <Td className="flex gap-x-4">
                        <Button
                          colorScheme="blue"
                          onClick={() =>
                            navigate(`/employeeForm/${employee._id}`)
                          }
                        >
                          Update
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => deleteEmployee(employee._id)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    );
};

export default ViewEmployeedetails;
