import React, { useEffect, useRef, useState } from "react";
import TableHeader from "../common/component/header/tableHeader";
import DataTable from "../common/component/table/DataTable";
import Application, { IApplication } from "./Application";
import DeleteAlert from "../common/component/alerts/deleteAlerts";
import axios from "axios";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Loader from "../common/component/loader/Loader";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ViewApplication=()=>{

  const [viewapplication, setViewapplication   ] = useState<IApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState<IApplication | null>(null);
  const [refetch, setRefetch] = useState(0);
  const [deleteApplicationLoading, setDeleteApllicationLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const refresh = () => setRefetch((v) => v + 1);

  const getApplication = async () => {
    setLoading(true);
    const res = await axios.get("/application");
    setLoading(false);
    setViewapplication([...res.data]);
  };
  console.log({viewapplication});
  
  const handleEdit = (id: string) => {
    navigate(`/application/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
        setDeleteApllicationLoading(true)
      await axios.delete(`/application/${id}`);
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
      setDeleteApllicationLoading(false)
    }
  };
  const handleDeleteModalOpen = (row) => {
    onOpen();
    setSelectedRow(row);
  };
  const columns = [
    { id: 'jobs', name: 'JOB', renderCell: (row) => row.jobTitle},
    { id: 'employee', name: 'Employee', renderCell: (row) =>{
      console.log({row});
      
      row.employee} },
    {
      id: 'action', name: 'Action', renderCell: (row) => <div className="flex gap-x-2">
        <div
          onClick={() => handleEdit(row._id)}
        >
          <EditIcon />
        </div>
        <div>
          <DeleteIcon onClick={() => handleDeleteModalOpen(row)} />
        </div>
      </div>
    },
  ]

  useEffect(() => {
    getApplication();
  }, [refetch]);

  if (loading)
    return (
      <div className="flex justify-center mt-36">
        <Loader />
      </div>
    );
  else
    return (
      <div className="p-8">
        <TableHeader
          title='Application'
          buttonLabel='Create Application'
          onClick={() => navigate("/application/add")}
        />
        <div className="px-12 my-4">
          <DataTable rows={viewapplication} columns={columns} />
        </div>
        <DeleteAlert
          loading={deleteApplicationLoading}
          title={selectedRow?.job ?? ""}
          isOpen={isOpen}
          onClose={onClose}
          onClick={() => selectedRow && handleDelete(selectedRow._id)}
          ref={cancelRef}
        />
      </div>
    );
}

export default ViewApplication;