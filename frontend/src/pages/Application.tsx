import {
  Button,
  FormControl,
  FormLabel,
  VStack,
  useToast,
} from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
import { useEffect, useState } from "react";
import axios from "axios";
import { Employee } from "./ViewEmployee";
import { Jobs } from "./Jobs";
// import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
// import ErrorText from "../components/ErrorText";

export type IApplication = {
  employee?: Employee[];
  jobs?: Jobs[];
  _id?: string;
};

const Application = () => {
  const [employeeOption, setEmployeeOption] = useState();
  const [jobOption, setJobOption] = useState();
  const [formData, setFormData] = useState<IApplication>({});
  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
 console.log({ formData });

  const handleEmployee = (selectedItem: any) => {
    setFormData((prevData) => ({
      ...prevData,
      employee: selectedItem,
    }));
  };
  const handleJobs = (selectedItem1: any) => {
    setFormData((prevData) => ({
      ...prevData,
      jobs: selectedItem1,
    }));
  };
  const getEmployee = async () => {
    try {
      const res = await axios.get("/employee");
      setEmployeeOption(res.data.data);
    } catch (error) {
      toast({
        title: error.message,
      });
    }
  };
  const getJobs = async () => {
    try {
      const jobres = await axios.get("/jobs");

      setJobOption(jobres.data.jobs);
    } catch (error) {
      toast({
        title: error.message,
      });
    }
  };
  const handleSubmit = async () => {
    try {
      if (id) {
        const response = await axios.put(`/application/${id}`, formData);
        if (response.status === 200) {
          toast({
            title: "Form Updated successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/application");
        }
      } else {
        const response = await axios.post("/application", formData);
        if (response.status === 200) {
          toast({
            title: "Form Created Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/application");
        }
      }
    } catch (error) {
      toast({
        title: (error as Error).message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const getApplication = async () => {
    try {
      const { data } = await axios.get(`/application/${id}`);
      console.log("data",{ data });
      setFormData(data)
    } catch (error) {}
  };
  console.log({jobOption,employeeOption,formData,id});
  
  useEffect(() => {
    getEmployee();
    getJobs();
    if (id) {
      getApplication();
    }
  }, [id]);


  return (
    //FormControl for Select Job
    <form className="p-3 flex justify-center ">
      <div className="w-[90%]">
        <VStack spacing={4} align="stretch">
          <FormControl id="jobTitle" isRequired>
            <FormLabel>Job</FormLabel>
            <CreatableSelect
              getOptionLabel={(option) => option.jobTitle}
              getOptionValue={(option) => option._id}
              isClearable
              options={jobOption}
              value={formData.jobs}
              onChange={handleJobs}
            />
            {/* <ErrorText>{error?.job}</ErrorText> */}
          </FormControl>
          {/* FormCOntrol to select Employee */}
          <FormControl id="employeeTitle" isRequired>
            <FormLabel>Employee </FormLabel>
            <CreatableSelect
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              isClearable
              options={employeeOption}
              value={formData.employee}
              onChange={handleEmployee}
            />
            {/* <ErrorText>{error?.employee}</ErrorText> */}
          </FormControl>
          <Button type="submit" onClick={handleSubmit} colorScheme="blue">
            Submit
          </Button>
        </VStack>
      </div>
    </form>
  );
};
export default Application;
