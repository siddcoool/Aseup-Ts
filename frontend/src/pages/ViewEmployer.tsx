import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  EditIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewEmployer = () => {
  const [employers, setEmployers] = useState([]);
  const navigate = useNavigate();
  const getEmployer = async () => {
    const res = await axios.get("/employer");
    setEmployers(res.data);
  };

  const handleEdit = () => {
    navigate("/employer/add");
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/employer");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployer();
  }, []);
  return (
    <div className="p-8">
      <div className="font-bold text-3xl text-center mb-4">ViewEmployer</div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("/employer/add")} colorScheme="blue">
          Add Employer
        </Button>
      </div>
      <TableContainer>
        <Table variant="simple">
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
              employers.map((employer, index) => {
                return (
                  <Tr key={index}>
                    <Td>{employer.companyName}</Td>
                    <Td>{employer.employees}</Td>
                    <Td>{employer.industry}</Td>
                    <Td>{employer.location}</Td>
                    <Td>
                      {
                        <div className="flex gap-x-2 cursor-pointer">
                          <div onClick={handleEdit}>
                            <EditIcon />
                          </div>
                          <div onClick={handleDelete}>
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
