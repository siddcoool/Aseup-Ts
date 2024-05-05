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
import * as Yup from "yup";
import ErrorText from "../components/ErrorText";

export type IJobs = {
  jobTitle: string;
  jobRequirements: string;
  employer: IEmployers[];
  budget: string;
  noticePeriod: number;
  skills?: ISkills[];
  _id?: string;
};
export interface Jobs{
  jobTitle: string;
  _id: string;
}
const Jobs = () => {
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [formData, setFormData] = useState<IJobs>({
    jobTitle: "",
    jobRequirements: "",
    employer: [],
    budget: "",
    noticePeriod: null,
    skills: [],
  });
  const [employerOptions, setEmployerOptions] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const { id } = useParams();

  const [errors, setErrors] = useState({
    jobTitle: "",
    jobRequirements: "",
    employer: "",
    budget: "",
    noticePeriod: "",
    skills: "",
  });

  const validationSchema = Yup.object({
    jobTitle: Yup.string().required('Job title is required'),
    jobRequirements: Yup.string().required('Job requirements are required'),
    employer: Yup.object().shape({
      _id: Yup.string().required('Employer ID is required'),
      companyName: Yup.string().required('Company name is required'),
      industry: Yup.string().required('Industry is required'),
      location: Yup.string().required('Location is required'),
      employees: Yup.string().required('Number of employees is required'),
      isDeleted: Yup.boolean().required('isDeleted is required'),
      contact: Yup.array()
        .of(
          Yup.object().shape({
            contactName: Yup.string().required('Contact name is required'),
            contactNumber: Yup.string().required('Contact number is required'),
            contactEmail: Yup.string().email('Contact email must be a valid email').required('Contact email is required'),
          })
        )
        .min(1, 'At least one contact is required'),
      createdAt: Yup.date().required('Creation date is required'),
      updatedAt: Yup.date().required('Update date is required'),
      __v: Yup.number().required('__v is required'),
    }).typeError('must be a valid employee').required('Employer information is required'),
    
    budget: Yup.number().typeError('Budget must be a number').required('Budget is required'),
    noticePeriod: Yup.number().typeError('Notice period must be a number').required('Notice period is required'),
    skills: Yup.array().min(1, 'At least one skill is required').required('Skills are required'),
  });
  
  
  const validate = async () => {
    try {
      setErrors(null);
      await validationSchema.validate(formData, {
        abortEarly: false,
      });
      return true;
    } catch (error) {
      error.inner.forEach((item) => {
        setErrors((prev) => ({ ...prev, [item.path]: item.message }));
      });
      return false;
    }
  };

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
  const handleSkillsChange = (selectedValues: any) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: selectedValues,
    }));
  };

  const handleJobRequirement = (value: string) => {
    setFormData((prev) => ({ ...prev, jobRequirements: value }));
  };

  const handleSubmit = async () => {
    if (await validate()) {
      try {
        if (id) {
          const response = await axios.put(`/jobs/${id}`, formData);
          if (response.status === 201) {
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
          if (response.status === 201) {
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
    }
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
            <ErrorText>{errors?.jobTitle}</ErrorText>
          </FormControl>

          <FormControl id="jobRequirements" isRequired>
            <FormLabel>Job Requirements</FormLabel>
            <Editor
              value={formData.jobRequirements}
              onChange={(e) => handleJobRequirement(e.target.value)}
            />
            <ErrorText>{errors?.jobRequirements}</ErrorText>
          </FormControl>
          <FormControl id="employer" isRequired>
            <FormLabel>Employer</FormLabel>

            <CreatableSelect
              getOptionLabel={(option) => option.companyName}
              getOptionValue={(option) => option._id}
              isClearable
              options={employerOptions}
              value={formData.employer}
              onChange={handleEmployeeDropdown}
            />
            <ErrorText>{errors?.employer}</ErrorText>
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
            <ErrorText>{errors?.skills}</ErrorText>
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
            <ErrorText>{errors?.budget}</ErrorText>
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
            <ErrorText>{errors?.noticePeriod}</ErrorText>
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
