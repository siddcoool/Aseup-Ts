import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import {
  EditIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../common/component/Loader";

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
  const getEmployer = async () => {
    setLoading(true);
    const res = await axios.get("/employer");
    setLoading(false);
    setEmployers(res.data);
  };

  const handleEdit = (id: string) => {
    navigate(`/employer/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/employer/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployer();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-36">
        <Loader />
      </div>
    );
  else
    return (
      <div className="p-8">
        <div className="font-bold text-3xl text-center mb-4">Employer Details</div>
        <div className="flex justify-end mb-4">
          <Button onClick={() => navigate("/employer/add")} colorScheme="blue">
            Add Employer
          </Button>
        </div>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>companyName</Th>
                <Th>employees</Th>
                <Th>industry</Th>
                <Th>location</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employers &&
                employers.map((employer: IEmployers, index: number) => {
                  return (
                    <Tr key={index}>
                      <Td>{employer.companyName}</Td>
                      <Td>{employer.employees}</Td>
                      <Td>{employer.industry}</Td>
                      <Td>{employer.location}</Td>
                      <Td>
                        {
                          <div className="flex gap-x-2 cursor-pointer">
                            <div onClick={() => handleEdit(employer._id)}>
                              <EditIcon />
                            </div>
                            <div
                              onClick={() => {
                                handleDelete(employer._id);
                                toast({
                                  title: "Employer deleted.",
                                  description: "We've deleted your account ",
                                  status: "error",
                                  duration: 9000,
                                  isClosable: true,
                                });
                              }}
                            >
                              <DeleteIcon />
                            </div>
                          </div>
                        }
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    );
};

export default ViewEmployer;
