import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
import { PAGE_LIMIT } from "../constant/app";
import { Pagination } from "../components/Pagination";

export type ISkills = {
  name: string;
  _id: string;
  label?:string
};

const Skills = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<ISkills[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [refetch, setRefetch] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [selectedRow, setSelectedRow] = useState<ISkills | null>(null);
  const [deleteSkillLoading, setDeleteSkillLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const refresh = () => setRefetch((v) => v + 1);

  const getSkills = async () => {
    try {
      if (loading) return;
      if (!skills.length) {
        setLoading(true);
      }
      setIsTableLoading(true);
      const res = await axios.get(
        `/skill?pageLimit=${PAGE_LIMIT}&pageNumber=${currentPage}`
      );
      console.log({res})
      setLoading(false);
      setSkills(res.data.listOfSkills);
      setTotalCount(Math.ceil(res.data.count/PAGE_LIMIT))
    } catch (error) {
    } finally {
      setLoading(false);
      setIsTableLoading(false);
    }
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
      setDeleteSkillLoading(true);
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
      setDeleteSkillLoading(false);
      onClose();
    }
  };

  const columns = [
    {
      id: "name",
      name: "Name",
      renderCell: (row) => {
        return row.name;
      },
    },
    {
      id: "action",
      name: "Action",
      renderCell: (skill) => {
        return (
          <div className="flex gap-x-2">
            <div onClick={() => handleEdit(skill._id)}>
              <EditIcon />
            </div>
            <div onClick={() => handleDeleteModalOpen(skill)}>
              <DeleteIcon />
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getSkills();
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
            <BreadcrumbLink href="#">Skills</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <TableHeader
          title="Skills"
          buttonLabel="Create Skills"
          onClick={() => navigate("/skill/add")}
        />
        <div className="px-12 my-4">
          <DataTable rows={skills} columns={columns} />
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
