import React, { useEffect, useState } from "react";
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
}

const PersonalDetails = ({ onSubmit, employeeData }: IPersonalDetails) => {
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
  const [message, setMessage] = useState(" ");
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
  const [phoneMessage, setPhoneMessage] = useState(" ");
  const [ageError, setAgeError] = useState(" ");

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    phoneNumber: Yup.number().required(),
    DOB: Yup.date().required(),
    gender: Yup.string().required(),
    skills: Yup.array().required(),
    currentCTC: Yup.number().required(),
    expectedCTC: Yup.number().required(),
  });
  const validate = async () => {
    try {
      const value = await validationSchema.validate(formData, {
        abortEarly: false,
      });
      console.log({ value });
    } catch (error) {
      error.inner.forEach((item) => {
        setErrors((prev) => ({ ...prev, [item.path]: item.message }));
      });
      console.log({ error });
    }
  };

  console.log({ errors, formData });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // if (name === "email" && !isEmailValid(value)) {
    //   setMessage("Invalid Email Address");
    // } else {
    //   setMessage("");
    // }
    // if (name === "phoneNumber" && !isPhoneValid(value)) {
    //   setPhoneMessage("Phone number not valid");
    // } else {
    //   setPhoneMessage(" ");
    // }
    // if (name === "DOB") {
    //   const age = calculateage(value);
    //   if (age < 18) {
    //     setAgeError("Age should be greater that 18");
    //   } else {
    //     setAgeError("");
    //   }
    // }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const isEmailValid = (email: string): boolean => {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const isPhoneValid = (phoneNumber: string): boolean => {
    //Regular expression for phone number validation
    const phoneregex = /^([0-9])\d{9}$/;
    return phoneregex.test(phoneNumber);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    validate()
    console.log({formData});
  };

  const getSkills = async () => {
    try {
      const { data: skills } = await axios.get("/skill");
      setSkillsOptions(skills.listOfSkills);
      console.log({ skills });
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const calculateage = (DOB: string) => {
    const birthdate = new Date(DOB);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    console.log(`before if ${age}`);

    const month = today.getMonth() - birthdate.getMonth();
    //need to ask to piyush
    if (month < 0 || (month === 0 && today.getDay() < birthdate.getDay())) {
      age--;
    }

    return age;
  };

  const EmployeeDataSetting = () => {
    setLoading(true);
    if (employeeData) {
      setFormData({ ...employeeData });
    }
    setLoading(false);
  };

  useEffect(() => {
    EmployeeDataSetting();
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
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <ErrorText>{errors.phoneNumber.length && errors?.phoneNumber}</ErrorText>

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
