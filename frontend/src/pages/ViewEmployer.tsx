import {
  useToast,
  useDisclosure,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import axios from "axios";
import {
  EditIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import  { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../common/component/Loader";
import DeleteAlert from "../common/component/alerts/deleteAlerts";
import DataTable from "../common/component/table/DataTable";
import TableHeader from "../common/component/header/tableHeader";
import { Pagination } from "../components/Pagination";
import { PAGE_LIMIT } from "../constant/app";

export interface IEmployers {
  companyName: string;
  employees: string;
  industry: string;
  location: string;
  _id: string;
}

const ViewEmployer = () => {
  const [employers, setEmployers] = useState<IEmployers[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [selectedRow, setSelectedRow] = useState<IEmployers | null>(null);
  const [refetch, setRefetch] = useState(0);
  const [deleteEmployeeLoading, setDeleteEmployeeLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const refresh = () => setRefetch((v) => v + 1);

  const getEmployer = async () => {
   try {
    if(loading) return
    if(!employers.length){
      setLoading(true);
    }
    setIsTableLoading(true)
    const res = await axios.get(`/employer?pageLimit=${PAGE_LIMIT}&pageNumber=${currentPage}`);
    setLoading(false);
    setEmployers(res.data.employer);
    setTotalCount(Math.ceil(res.data.count / PAGE_LIMIT));
   } catch (error) {
    
   }finally{
    setLoading(false)
    setIsTableLoading(false)
   }

  };
  console.log({totalCount})

  const handleEdit = (id: string) => {
    navigate(`/employer/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleteEmployeeLoading(true)
      await axios.delete(`/employer/${id}`);
      refresh()
      toast({
        title: "Employer deleted.",
        description: "We've deleted selected Employer ",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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

  const handleDeleteModalOpen = (row) => {
    onOpen();
    setSelectedRow(row);
  };

  useEffect(() => {
    getEmployer();
  }, [refetch,currentPage]);

  const columns = [
    {
      name: 'Company Name',
      id: 'companyName',
      renderCell: (row) => {
        return row.companyName
      }
    }, {
      name: 'Total Employees',
      id: 'employees',
      renderCell: (row) => {
        return row.employees
      }
    }, {
      name: 'Industry',
      id: 'industry',
      renderCell: (row) => {
        return row.industry
      }
    }, {
      name: 'Location',
      id: 'location',
      renderCell: (row) => {
        return row.location
      }
    }, {
      name: 'Action',
      id: 'action',
      renderCell: (skill) => {
        return <div className="flex gap-x-2">
          <div onClick={() => handleEdit(skill._id)}>
            <EditIcon />
          </div>
          <div
            onClick={() => handleDeleteModalOpen(skill)}
          >
            <DeleteIcon />
          </div>
        </div>
      }
    },
  ]


  if (loading)
    return (
      <div className="flex justify-center mt-36">
        <Loader />
      </div>
    );
  else
    return (
      <div className="p-8">
        <Breadcrumb className="ml-12">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Employer</BreadcrumbLink>
          </BreadcrumbItem>
          </Breadcrumb>
        <TableHeader title='Employer Details'
          onClick={() => navigate("/employer/add")}
          buttonLabel='Create Employer'
        />
        <div className="px-12 my-4">
          <DataTable rows={employers} columns={columns} />
          <Pagination
            isLoading={isTableLoading}
            initialPage={currentPage}
            totalPages={totalCount}
            onPageChange={(selectedItem) =>
              setCurrentPage(selectedItem.selected)
            }
          />
        </div>
        <DeleteAlert
          loading={deleteEmployeeLoading}
          title={selectedRow?.companyName ?? ""}
          isOpen={isOpen}
          onClose={onClose}
          onClick={() => selectedRow && handleDelete(selectedRow._id)}
          ref={cancelRef}
        />
      </div>
    );
};

export default ViewEmployer;
