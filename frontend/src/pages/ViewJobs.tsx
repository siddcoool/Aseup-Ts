import {
  useToast,
  useDisclosure,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../common/component/Loader";
import { IJobs } from "./Jobs";
import DeleteAlert from "../common/component/alerts/deleteAlerts";
import DataTable from "../common/component/table/DataTable";
import TableHeader from "../common/component/header/tableHeader";
import { Pagination } from "../components/Pagination";
import { PAGE_LIMIT } from "../constant/app";
import Modal from "../components/Modal";

export interface IEmployers {
  companyName: string;
  employees: string;
  industry: string;
  location: string;
  _id: string;
}

const ViewJobs = () => {
  const [jobs, setJobs] = useState<IJobs[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const toast = useToast();
  const navigate = useNavigate();
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [selectedRow, setSelectedRow] = useState<IJobs | null>(null);
  const [refetch, setRefetch] = useState(0);
  const [deleteEmployeeLoading, setDeleteEmployeeLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const refresh = () => setRefetch((v) => v + 1);
  const getJobs = async () => {
    try {
      if (loading) return;
      if (!jobs.length) {
        setLoading(true);
      }
      setIsTableLoading(true);
      const res = await axios.get(
        `/jobs?pageLimit=${PAGE_LIMIT}&pageNumber=${currentPage}`
      );
      setLoading(false);
      setJobs(res.data.jobs);
      setTotalCount(Math.ceil(res.data.count / PAGE_LIMIT));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsTableLoading(false);
    }
  };

  console.log({ jobs });

  const handleEdit = (id: string) => {
    navigate(`/jobs/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleteEmployeeLoading(true);
      await axios.delete(`/jobs/${id}`);
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
      setDeleteEmployeeLoading(false);
    }
  };
  const handleDeleteModalOpen = (row) => {
    onOpen();
    setSelectedRow(row);
  };
  const columns = [
    { id: "title", name: "Title", renderCell: (row) => row.jobTitle },
    {
      id: "Employer",
      name: "Employer",
      renderCell: (row) =>  row?.employer?.companyName ?? 'Aseup',
    },
    { id: "budget", name: "Budget", renderCell: (row) => row.budget },
    {
      id: "noticePeriod",
      name: "Notice Period",
      renderCell: (row) => row.noticePeriod,
    },
    {
      id: "action",
      name: "Action",
      renderCell: (row) => (
        <div className="flex gap-x-2">
          <div onClick={() => handleEdit(row._id)}>
            <EditIcon />
          </div>
          <div>
            <DeleteIcon onClick={() => handleDeleteModalOpen(row)} />
          </div>
          <div>
            <Button onClick={()=>{}}>Recommended</Button>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getJobs();
  }, [refetch, currentPage]);

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
            <BreadcrumbLink href="#">Jobs</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <TableHeader
          title="Jobs"
          buttonLabel="Create Job"
          onClick={() => navigate("/jobs/add")}
        />
        <div className="px-12 my-4">
          <DataTable rows={jobs} columns={columns} />
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
          title={selectedRow?.jobTitle ?? ""}
          isOpen={isOpen}
          onClose={onClose}
          onClick={() => selectedRow && handleDelete(selectedRow._id)}
          ref={cancelRef}
        />
        
      </div>
    );
};

export default ViewJobs;
