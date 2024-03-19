import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Select,
} from "@chakra-ui/react";
import { EmployeeDocument } from "../../types/employee";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";

interface IPersonalDetails {
  onSubmit: (input: Partial<EmployeeDocument>) => void;
  employeeData: EmployeeDocument;
}

const PersonalDetails = ({ onSubmit, employeeData }: IPersonalDetails) => {
  const [formData, setFormData] = useState<Partial<EmployeeDocument>>({
    name: "",
    email: "",
    phoneNumber: "",
    DOB: "",
    gender: "",
    skills: [],
  });
  const [skillsOptions, setSkillsOptions] = useState<any[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillsChange = (selectedValues: any, actionMeta: any) => {
    if (actionMeta.action === "create-option") {
      const newSkill = selectedValues[selectedValues.length - 1];

      addSkillToDatabase(newSkill).then(() => {
        getSkills();
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        skills: selectedValues,
      }));
    }
  };

  const addSkillToDatabase = async (newSkill: any) => {
    try {
      await axios.post("/skill", { name: newSkill.label });

      return newSkill;
    } catch (error) {
      console.error("Error adding skill to the database", error);
      throw error;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const getSkills = async () => {
    try {
      const { data: skills } = await axios.get("/skill");
      const options = skills.map((skill: any) => ({
        value: skill._id,
        label: skill.name,
      }));

      setSkillsOptions(options);
      console.log({ skills });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const setSkills = () => {
    if (employeeData && employeeData.skills) {
      const mappedSkills = employeeData.skills.map((skill) => ({
        value: skill._id,
        label: skill.name,
      }));
      return mappedSkills;
    }
  };

  useEffect(() => {
    if (employeeData) {
      const skillSetting = setSkills();
      setFormData({ ...employeeData, skills: skillSetting });
    }
    getSkills();
  }, [employeeData]);
  return (
    <div className="p-8 w-[70%] m-auto">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Date of Birth</FormLabel>
            <Input
              type="date"
              name="DOB"
              value={dayjs(formData.DOB).format("YYYY-MM-DD")}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Select Skills</FormLabel>

            <CreatableSelect
              isClearable
              isMulti
              options={skillsOptions}
              value={formData.skills}
              onChange={handleSkillsChange}
            />
          </FormControl>

          <Button
            colorScheme="teal"
            type="submit"
            onClick={() => onSubmit(formData)}
          >
            Next
          </Button>
        </VStack>
      </form>
    </div>
  );
};

export default PersonalDetails;
