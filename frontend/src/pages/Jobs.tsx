import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";

import { IEmployers } from "./ViewEmployer";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { ISkills } from "./Skills";

export type IJobs = {
  jobTitle: string;
  jobRequirements: string;
  employer: IEmployers[];
  budget: string;
  noticePeriod: number;
  skills?: ISkills[];
};

const Jobs = () => {
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [formData, setFormData] = useState<IJobs>({
    jobTitle: "",
    jobRequirements: "",
    employer: [],
    budget: "",
    noticePeriod: undefined || 0,
    skills: [],
  });
  const [employerOptions, setEmployerOptions] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const { id } = useParams();

  console.log({ formData });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmployeeDropdown = (selectedValues: any, actionMeta: any) => {
    setFormData((prevData) => ({
      ...prevData,
      employer: selectedValues,
    }));
  };
  const fetchEmployers = async () => {
    try {
      const { data } = await axios.get("/employer");

      setEmployerOptions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getJobs = async (id: string) => {
    try {
      const response = await axios.get(`/jobs/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const getSkills = async () => {
    try {
      const { data } = await axios.get("/skill");
      setSkillsOptions(data);
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
      });
    }
  };
  console.log({ formData, employerOptions });
  const handleSkillsChange = (selectedValues: any, actionMeta: any) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: selectedValues,
    }));
  };

  useEffect(() => {
    fetchEmployers();
    getSkills();
  }, []);

  useEffect(() => {
    if (id) {
      getJobs(id);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (id) {
        const response = await axios.put(`/jobs/${id}`, formData);
        if (response.status === 200) {
          toast({
            title: "Form Updated successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate('/jobs')
        }
      } else {
        const response = await axios.post("/jobs", formData);
        if (response.status === 200) {
          toast({
            title: "Form Submitted",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
        navigate("/jobs");
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

  return (
    <form onSubmit={handleSubmit} className="p-8 flex justify-center ">
      <div className="w-[60%]">
        <div className="font-bold text-3xl text-center m-4">
          {id ? "Edit" : "Create"} a Job
        </div>
        <VStack spacing={4} align="stretch">
          <FormControl id="jobTitle" isRequired>
            <FormLabel>Job Title</FormLabel>
            <Input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Enter job title"
            />
          </FormControl>

          <FormControl id="jobRequirements" isRequired>
            <FormLabel>Job Requirements</FormLabel>
            <Textarea
              name="jobRequirements"
              value={formData.jobRequirements}
              onChange={handleChange}
              placeholder="Enter job requirements"
            />
          </FormControl>
          <FormControl id="employer" isRequired>
            <FormLabel>Employer</FormLabel>
            {/* <Select
              name="employer"
              // value={employerOptions.find(
              //   (option) => option.value === formData.employer?.value
              // )}
              value={formData.employer}
              onChange={(option) =>
                setFormData((prevData) => ({ ...prevData, employer: option }))
              }
              options={employerOptions}
            /> */}
            <CreatableSelect
              getOptionLabel={(option) => option.companyName}
              getOptionValue={(option) => option._id}
              isClearable
              options={employerOptions}
              value={formData.employer}
              onChange={handleEmployeeDropdown}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Select Skills</FormLabel>

            <CreatableSelect
              isClearable
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              isMulti
              options={skillsOptions}
              value={formData.skills}
              onChange={handleSkillsChange}
            />
          </FormControl>

          <FormControl id="budget" isRequired>
            <FormLabel>Budget</FormLabel>
            <Input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Enter budget"
            />
          </FormControl>

          <FormControl id="noticePeriod" isRequired>
            <FormLabel>Notice Period</FormLabel>
            <Input
              type="number"
              name="noticePeriod"
              value={formData.noticePeriod}
              onChange={handleChange}
              placeholder="Enter Notice period in days"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </VStack>
      </div>
    </form>
  );
};

export default Jobs;
