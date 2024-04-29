import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { IEmployers } from "./ViewEmployer";
import Editor from "react-simple-wysiwyg";
import { useNavigate, useParams } from "react-router-dom";
import { ISkills } from "./Skills";

export type IJobs = {
  jobTitle: string;
  jobRequirements: string;
  employer: IEmployers[];
  budget: string;
  noticePeriod: number;
  skills?: ISkills[];
  _id?: string;
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmployeeDropdown = (selectedValues: any) => {
    console.log({ selectedValues });
    setFormData((prevData) => ({
      ...prevData,
      employer: selectedValues,
    }));
  };
  const fetchEmployers = async () => {
    try {
      const { data } = await axios.get("/employer");

      setEmployerOptions(data.employer);
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
      setSkillsOptions(data.listOfSkills);
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
      });
    }
  };
  const handleSkillsChange = (selectedValues: any, actionMeta: any) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: selectedValues,
    }));
  };

  const handleJobRequirement = (value: string) => {
    setFormData((prev) => ({ ...prev, jobRequirements: value }));
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

  const handleSubmit = async () => {
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
          navigate("/jobs");
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
    <div className="p-8 flex justify-center ">
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
            <Editor
              value={formData.jobRequirements}
              onChange={(e) => handleJobRequirement(e.target.value)}
            />
            {/* <Textarea
              name="jobRequirements"
              value={formData.jobRequirements}
              onChange={handleChange}
              placeholder="Enter job requirements"
            /> */}
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

            <Select
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

          <Button type="submit" onClick={handleSubmit} colorScheme="blue">
            Submit
          </Button>
        </VStack>
      </div>
    </div>
  );
};

export default Jobs;
