import React, { ChangeEvent, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Select,
  Progress,
} from "@chakra-ui/react";
import { EmployeeDocument } from "../../types/employee";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import * as Yup from "yup";
import ErrorText from "../../components/ErrorText";

interface IPersonalDetails {
  onSubmit: (input: Partial<EmployeeDocument>) => void;
  employeeData: EmployeeDocument;
  employeeId?: string;
}

const PersonalDetails = ({
  onSubmit,
  employeeData,
  employeeId,
}: IPersonalDetails) => {
  const [formData, setFormData] = useState<Partial<EmployeeDocument>>({
    name: "",
    email: "",
    phoneNumber: "",
    DOB: "",
    gender: "",
    skills: [],
    currentCTC: undefined,
    expectedCTC: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [skillsOptions, setSkillsOptions] = useState<any[]>([]);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    DOB: "",
    gender: "",
    skills: [],
    currentCTC: undefined,
    expectedCTC: undefined,
  });

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    phoneNumber: Yup.number().required(),
    DOB: Yup.date().required(),
    gender: Yup.string().required(),
    skills: Yup.array().min(1).required(),
    currentCTC: Yup.number().required(),
    expectedCTC: Yup.number().required(),
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
      console.log(newSkill);
      return newSkill;
    } catch (error) {
      console.error("Error adding skill to the database", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (await validate()) { 
      onSubmit(formData);
    }
  };
  const getSkills = async () => {
    try {
      const { data } = await axios.get("/skill");
      setSkillsOptions(data.listOfSkills);
      console.log({ data });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const EmployeeDataSetting = () => {
    setLoading(true);
    if (employeeData) {
      setFormData({ ...employeeData });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (employeeId) {
      EmployeeDataSetting();
    }
  }, [employeeData]);

  useEffect(() => {
    getSkills();
  }, []);

  if (loading)
    return (
      <div className="mt-8 w-1/2 m-auto">
        <Progress size="xs" isIndeterminate />
      </div>
    );
  else
    return (
      <div className="p-8 w-[70%] m-auto">
        <div>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <ErrorText>{errors?.name}</ErrorText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <ErrorText>{errors?.email}</ErrorText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <ErrorText>{errors?.phoneNumber}</ErrorText>

              {/* <div className="text-red-500 font-bold">{phoneMessage}</div> */}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                name="DOB"
                value={dayjs(formData.DOB).format("YYYY-MM-DD")}
                onChange={handleChange}
              />
              <ErrorText>{errors?.DOB}</ErrorText>

              {/* <div className="text-red-500 font-bold">{ageError}</div> */}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Select"></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
              <ErrorText>{errors?.gender}</ErrorText>
            </FormControl>
            <FormControl>
              <FormLabel>Select Skills</FormLabel>

              <CreatableSelect
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option._id}
                isClearable
                isMulti
                options={skillsOptions}
                value={formData.skills}
                onChange={handleSkillsChange}
              />
              <ErrorText>{errors?.skills}</ErrorText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Current CTC</FormLabel>
              <Input
                type="number"
                name="currentCTC"
                value={formData.currentCTC}
                onChange={handleChange}
              />
              <ErrorText>{errors?.currentCTC}</ErrorText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Expected CTC</FormLabel>
              <Input
                type="number"
                name="expectedCTC"
                value={formData.expectedCTC}
                onChange={handleChange}
              />
              <ErrorText>{errors?.expectedCTC}</ErrorText>
            </FormControl>
            <div className="flex justify-end">
              <Button
                colorScheme="teal"
                type="submit"
                // onClick={() => onSubmit(formData)}
                // onClick={() => {
                //   onSubmit(formData);
                //   validate();
                // }}
                onClick={handleSubmit}
              >
                Next
              </Button>
            </div>
          </VStack>
        </div>
      </div>
    );
};

export default PersonalDetails;
