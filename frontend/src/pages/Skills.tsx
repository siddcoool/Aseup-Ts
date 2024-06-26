import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../common/component/Loader";
import DataTable from "../common/component/table/DataTable";
import DeleteAlert from "../common/component/alerts/deleteAlerts";
import TableHeader from "../common/component/header/tableHeader";

export type ISkills = {
  name: string;
  _id: string;
};

const Skills = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<ISkills[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [refetch, setRefetch] = useState(0);

  const [selectedRow, setSelectedRow] = useState<ISkills | null>(null);
  const [deleteSkillLoading, setDeleteSkillLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const refresh = () => setRefetch((v) => v + 1);

  const getSkills = async () => {
    setLoading(true);
    const res = await axios.get("/skill");
    setLoading(false);
    setSkills(res.data);
  };

  const handleEdit = (id: string) => {
    navigate(`/skill/update/${id}`);
  };

  const handleDeleteModalOpen = (row) => {
    onOpen();
    setSelectedRow(row);
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleteSkillLoading(true)
      const { status } = await axios.delete(`/skill/${id}`);
      refresh();
      if (status === 200) {
        toast({
          title: "Skill deleted.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Skill deletion failed.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: (error as Error).message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setDeleteSkillLoading(false)
      onClose()
    }
  };

  const columns = [
    {
      id: 'name',
      name: 'Name',
      renderCell: (row) => {
        return row.name
      }
    }, {
      id: 'action',
      name: 'Action',
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

  useEffect(() => {
    getSkills();
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
          title='Skills'
          buttonLabel='Create Skills'
          onClick={() => navigate("/skill/add")}
        />
        <div className="px-12 my-4">
          <DataTable rows={skills} columns={columns} />
        </div>
        <DeleteAlert
          loading={deleteSkillLoading}
          title={selectedRow?.name ?? ""}
          isOpen={isOpen}
          onClose={onClose}
          onClick={() => selectedRow && handleDelete(selectedRow._id)}
          ref={cancelRef}
        />
      </div>
    );
};

export default Skills;
