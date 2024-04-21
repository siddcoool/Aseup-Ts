import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../common/component/Loader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import DataTable from "../common/component/table/DataTable";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import DeleteAlert from "../common/component/alerts/deleteAlerts";
import TableHeader from "../common/component/header/tableHeader";

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


const ViewEmployeeDetails = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedRow, setSelectedRow] = useState<Employee | null>(null);
  const [refetch, setRefetch] = useState(0);
  const [deleteEmployeeLoading, setDeleteEmployeeLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const navigate = useNavigate();
  const toast = useToast();

  const refresh = () => setRefetch((v) => v + 1);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/employee/");
      setEmployees(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      toast({
        title: (error as Error).message,
        status: "error",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refetch]);

  const handleDeleteModalOpen = (row) => {
    onOpen();
    setSelectedRow(row);
  };

  const deleteEmployee = async (id: string) => {
    try {
      setDeleteEmployeeLoading(true)
      await axios.delete(`/employee/${id}`);
      refresh();
    } catch (error) {
      toast({
        title: (error as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      onClose();
      setDeleteEmployeeLoading(false)
    }
  };

  const columns = [
    { id: 'name', name: 'Employee Name', renderCell: (row) => row.name },
    { id: 'email', name: 'Email', renderCell: (row) => row.email },
    { id: 'contact', name: 'Contact', renderCell: (row) => row.phoneNumber },
    { id: 'dob', name: 'DOB', renderCell: (row) => dayjs(row.DOB).format("DD-MM-YYYY") },
    { id: 'gender', name: 'Gender', renderCell: (row) => row.gender },
    {
      id: 'action', name: 'Action', renderCell: (row) => <div className="flex gap-x-2">
        <div
          onClick={() =>
            navigate(`/employeeForm/${row._id}`)
          }
        >
          <EditIcon />
        </div>
        <div>
          <DeleteIcon onClick={() => handleDeleteModalOpen(row)} />
        </div>
      </div>
    },
  ]

  if (loading) {
    return <div className="flex  justify-center mt-36 "><Loader /></div>;
  } else
    return (
      <div className="my-4">
         <Breadcrumb className="ml-12">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Employee</BreadcrumbLink>
          </BreadcrumbItem>
          </Breadcrumb>
        <TableHeader title='Employee Details'
          onClick={() => navigate("/employeeForm")}
          buttonLabel='Create Employee'
        />
        <div className="px-12 my-4">
          <DataTable rows={employees} columns={columns} />
        </div>
        <DeleteAlert
          loading={deleteEmployeeLoading}
          title={selectedRow?.name ?? ""}
          isOpen={isOpen}
          onClose={onClose}
          onClick={() => selectedRow && deleteEmployee(selectedRow._id)}
          ref={cancelRef}
        />
      </div>
    );
};

export default ViewEmployeeDetails;
