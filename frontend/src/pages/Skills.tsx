import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { IEmployers } from './ViewEmployer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../common/component/Loader';

export type ISkills = {
name: string,
_id: string
}

const Skills = () => {
    const navigate = useNavigate()
    const [skills, setSkills] = useState<ISkills[]>([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [id, setId] = useState();
    const getSkills = async () => {
      setLoading(true);
      const res = await axios.get("/skill");
      setLoading(false);
      setSkills(res.data);
    };
  
    const handleEdit = (id: string) => {
      navigate(`/skill/update/${id}`);
    };
  
    const handleDelete = async (id: string) => {
      try {
        const res = await axios.delete(`/skill/${id}`);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getSkills();
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
        <div className="font-bold text-3xl text-center mb-4">View Skills</div>
        <div className="flex justify-end mb-4">
          <Button onClick={() => navigate("/skill/add")} colorScheme="blue">
            Add Skills
          </Button>
        </div>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Action</Th>
                
              </Tr>
            </Thead>
            <Tbody>
              {skills &&
                skills.map((skill: ISkills, index: number) => {
                  return (
                    <Tr key={index}>
                      <Td>{skill.name}</Td>
                      <Td>
                        {
                          <div className="flex gap-x-2 cursor-pointer">
                            <div onClick={() => handleEdit(skill._id)}>
                              <EditIcon />
                            </div>
                            <div
                              onClick={() => {
                                handleDelete(skill._id);
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
  )
}

export default Skills