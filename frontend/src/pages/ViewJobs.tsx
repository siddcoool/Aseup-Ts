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
    useToast,
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
  import Loader from "../common/component/Loader";
import { IJobs } from "./Jobs";
  
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
    const toast = useToast();
    const [id, setId] = useState();
    const navigate = useNavigate();
    const getJobs = async () => {
      setLoading(true);
      const res = await axios.get("/jobs");
      setLoading(false);
      setJobs(res.data);
    };
  
    const handleEdit = (id: string) => {
      navigate(`/jobs/edit/${id}`);
    };
  
    const handleDelete = async (id: string) => {
      try {
        const res = await axios.delete(`/jobs/${id}`);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getJobs();
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
          <div className="font-bold text-3xl text-center mb-4">View Employer</div>
          <div className="flex justify-end mb-4">
            <Button onClick={() => navigate("/jobs/add")} colorScheme="blue">
              Add Jobs
            </Button>
          </div>
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>jobTitle</Th>
                  <Th>jobRequirements</Th>
                  <Th>employer</Th>
                  <Th>budget</Th>
                  <Th>noticePeriod</Th>
                </Tr>
              </Thead>
              <Tbody>
                {jobs &&
                  jobs.map((job: IJobs, index: number) => {
                    return (
                      <Tr key={index}>
                        <Td>{job.jobTitle}</Td>
                        <Td>{job.jobRequirements}</Td>
                        {/* <Td>{job.employer}</Td> */}
                        <Td>{job.budget}</Td>
                        <Td>{job.noticePeriod}</Td>

                        <Td>
                          {
                            <div className="flex gap-x-2 cursor-pointer">
                              <div onClick={() => handleEdit(job._id)}>
                                <EditIcon />
                              </div>
                              <div
                                onClick={() => {
                                  handleDelete();
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
  
  export default ViewJobs;
  