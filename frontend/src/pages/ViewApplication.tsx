import  { useEffect, useRef, useState } from "react";
import TableHeader from "../common/component/header/tableHeader";
import DataTable from "../common/component/table/DataTable";
import DeleteAlert from "../common/component/alerts/deleteAlerts";
import axios from "axios";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Loader from "../common/component/loader/Loader";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type IApplication ={
  job:string,
  _id:string
}

const ViewApplication = () => {
  const [applications, setApplications] = useState<IApplication[]>([]);

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState<IApplication | null>(null);
  const [refetch, setRefetch] = useState(0);
  const [deleteApplicationLoading, setDeleteApllicationLoading] =
    useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const refresh = () => setRefetch((v) => v + 1);

  const getApplication = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/application");
      setLoading(false);
      setApplications([...res.data]);
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
      });
    }
  };
  console.log({ viewapplication: applications });

  const handleEdit = (id: string) => {
    navigate(`/application/edit/${id}`);
  };

  // const rowData = () => {
  //   if (applications) {
  //     const rows = applications.map((item, idx) => {
  //       item.job.map((item) => {
  //         return item.jobTitle;
  //       });
  //     });
  //     setRows(rows);
  //   }
  // };

  const handleDelete = async (id: string) => {
    try {
      setDeleteApllicationLoading(true);
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
      setDeleteApllicationLoading(false);
    }
  };
  const handleDeleteModalOpen = (row) => {
    onOpen();
    setSelectedRow(row);
  };
  const columns = [
    { id: "job", name: "JOB", renderCell: (row) => row.job.jobTitle },
    {
      id: "employee",
      name: "Employee",
      renderCell: (row) => { return row.employee.name},
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
        </div>
      ),
    },
  ];

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
          title="Application"
          buttonLabel="Create Application"
          onClick={() => navigate("/application/add")}
        />
        <div className="px-12 my-4">
          <DataTable rows={applications} columns={columns} />
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
};

export default ViewApplication;
