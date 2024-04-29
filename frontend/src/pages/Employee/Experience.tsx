import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Select,
} from "@chakra-ui/react";
import { EmployeeDocument, Experience } from "../../types/employee";
import dayjs from "dayjs";
import * as Yup from "yup";
import { LineItemRepeater } from "../../components/LineItemRepeater";
import { getIndexAndKey } from "../../utils/stringOperation";
import ErrorText from "../../components/ErrorText";

interface IExperienceForm {
  employeeData: EmployeeDocument;
  onSubmit: (input: Partial<EmployeeDocument>) => void;
}

const ExperienceForm = ({ employeeData, onSubmit }: IExperienceForm) => {
  const [expError, setExpError] = useState("");
  const [formData, setFormData] = useState<Experience[]>([
    {
      companyName: "",
      positionHeld: "",
      roleDescription: "",
      startDate: "",
      endDate: "",
      employmentType: "",
    },
  ]);

  const [errors, setErrors] = useState([]);
  const validationSchema = Yup.object().shape({
    experience: Yup.array().of(
      Yup.object().shape({
        companyName: Yup.string().required("Title is required"),
        positionHeld: Yup.string().required("Field is required"),
        roleDescription: Yup.string().required("Institute is required"),
        startDate: Yup.date().required("Start Year is required"),
        endDate: Yup.date()
          .required("End Year is required")
          .min(
            Yup.ref("startYear"),
            "End Year should be greater than Start Year"
          ),
        employmentType: Yup.string()
          .oneOf(
            ["Contract", "Full-Time", "Part-Time"],
            "Should be a valid type."
          )
          .min(1, "Grade is required")
          .required("Grade is required"),
      })
    ),
  });
  const validate = async () => {
    try {
      setErrors([]);
      await validationSchema.validate(
        { experience: formData },
        { abortEarly: false }
      );
      return true;
    } catch (error) {
      console.log({ error });
      if (error.inner) {
        let prevErrors = [];

        error.inner.forEach((err) => {
          const { index, key } = getIndexAndKey(err.path);
          prevErrors[index] = { ...prevErrors[index], [key]: err.message };
        });
        setErrors([...prevErrors]);
      }
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    if (name === "endDate") {
      const startdate = formData[index]?.startDate;
      if (startdate && value <= startdate) {
        setExpError("End year should be greater than start Date");
      } else {
        setExpError("");
      }
    }
    setFormData((prevData) => {
      const updatedFormData = [...prevData];
      updatedFormData[index] = {
        ...updatedFormData[index],
        [name]: value,
      };
      return updatedFormData;
    });
  };

  const handleDelete = (index: number) => {
    const newData = formData.filter((item, idx) => index != idx);
    setFormData(newData);
  };

  const handleSubmit = async () => {
    if (await validate()) {
      onSubmit({ experience: formData });
    }
  };
  console.log({formData})

  useEffect(() => {
    if (employeeData && Array.isArray(employeeData.experience)) {
      setFormData([...employeeData.experience]);
    }
  }, [employeeData]);

  return (
    <div>
      <LineItemRepeater
        size={employeeData?.experience?.length}
        onDelete={handleDelete}
      >
        {(index) => {
          return (
            <div className="p-8 w-[70%] m-auto" key={index}>
              <form>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Company Name</FormLabel>
                    <Input
                      type="text"
                      name="companyName"
                      value={formData[index]?.companyName}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <ErrorText>{errors[index]?.companyName} </ErrorText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Position Held</FormLabel>
                    <Input
                      type="text"
                      name="positionHeld"
                      value={formData[index]?.positionHeld}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <ErrorText>{errors[index]?.positionHeld} </ErrorText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Role Description</FormLabel>
                    <Input
                      type="text"
                      name="roleDescription"
                      value={formData[index]?.roleDescription}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <ErrorText>{errors[index]?.roleDescription} </ErrorText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Start Date</FormLabel>
                    <Input
                      type="date"
                      name="startDate"
                      value={dayjs(formData[index]?.startDate).format(
                        "YYYY-MM-DD"
                      )}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <ErrorText>{errors[index]?.startDate} </ErrorText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>End Date</FormLabel>
                    <Input
                      type="date"
                      name="endDate"
                      value={dayjs(formData[index]?.endDate).format(
                        "YYYY-MM-DD"
                      )}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <ErrorText>{errors[index]?.endDate} </ErrorText>

                    <div className="text-red-500 font-bold">{expError}</div>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Employment Type</FormLabel>
                    <Select
                      name="employmentType"
                      value={formData[index]?.employmentType}
                      onChange={(e) => handleChange(e, index)}
                    >
                      <option value="Contract">Contract</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                    </Select>
                    <ErrorText>{errors[index]?.employmentType} </ErrorText>
                  </FormControl>
                </VStack>
              </form>
            </div>
          );
        }}
      </LineItemRepeater>
      <div className="flex justify-center">
        <Button colorScheme="teal" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ExperienceForm;
