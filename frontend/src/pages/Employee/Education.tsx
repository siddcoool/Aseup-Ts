import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Select,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Education, EmployeeDocument } from "../../types/employee";
import dayjs from "dayjs";
import { LineItemRepeater } from "../../components/LineItemRepeater";
import { getIndexAndKey } from "../../utils/stringOperation";
import ErrorText from "../../components/ErrorText";

interface IEducationForm {
  onSubmit: (input: Partial<EmployeeDocument>) => void;
  employeeData: EmployeeDocument;
}

const EducationForm = ({ onSubmit, employeeData }: IEducationForm) => {
  const [/*yearError*/, setYearError] = useState("");
  const [formData, setFormData] = useState<Education[]>([
    {
      title: "",
      field: "",
      institute: "",
      startYear: "",
      endYear: "",
      grade: "",
    },
  ]);
  const [errors, setErrors] = useState([]);
  const validationSchema = Yup.object().shape({
    educations: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        field: Yup.string().required("Field is required"),
        institute: Yup.string().required("Institute is required"),
        startYear: Yup.date().required("Start Year is required"),
        endYear: Yup.date()
          .required("End Year is required")
          .min(
            Yup.ref("startYear"),
            "End Year should be greater than Start Year"
          ),
        grade: Yup.string().oneOf(["A",'B','C','D','E','F'],'Should be a valid grade.')
          .min(1, "Grade is required")
          .required("Grade is required"),
      })
    ),
  });
  const validate = async () => {
    try {
      setErrors([]);
      await validationSchema.validate(
        { educations: formData },
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
    const newData = formData.filter((_, idx) => index != idx);
    setFormData(newData);
  };

  const handleSubmit = async () => {
    if (await validate()) {
      onSubmit({ educations: formData });
    }
  };
  console.log({ errors });
  useEffect(() => {
    if (employeeData && Array.isArray(employeeData.educations)) {
      setFormData([...employeeData.educations]);
    }
  }, [employeeData]);

  return (
    <div>
      <LineItemRepeater
        size={employeeData?.educations?.length}
        onDelete={handleDelete}
      >
        {(index) => {
          return (
            <div className="p-8 w-[70%] m-auto" key={index}>
              <div>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      type="text"
                      name="title"
                      value={formData[index]?.title}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <ErrorText>{errors[index]?.title} </ErrorText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Field</FormLabel>
                    <Input
                      type="text"
                      name="field"
                      value={formData[index]?.field}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <ErrorText>{errors[index]?.field} </ErrorText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Institute</FormLabel>
                    <Input
                      type="text"
                      name="institute"
                      value={formData[index]?.institute}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <ErrorText>{errors[index]?.institute} </ErrorText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Start Year</FormLabel>
                    <Input
                      type="date"
                      name="startYear"
                      value={dayjs(formData[index]?.startYear).format(
                        "YYYY-MM-DD"
                      )}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <ErrorText>{errors[index]?.startYear} </ErrorText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>End Year</FormLabel>
                    <Input
                      type="date"
                      name="endYear"
                      value={dayjs(formData[index]?.endYear).format(
                        "YYYY-MM-DD"
                      )}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <ErrorText>{errors[index]?.endYear} </ErrorText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Grade</FormLabel>
                    <Select
                      name="grade"
                      value={formData[index]?.grade}
                      onChange={(e) => handleChange(e, index)}
                    >
                      ,<option value="select"></option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                    </Select>
                    <ErrorText>{errors[index]?.grade} </ErrorText>
                  </FormControl>
                </VStack>
              </div>
            </div>
          );
        }}
      </LineItemRepeater>
      <div className="flex justify-end">
        <Button colorScheme="teal" type="submit" onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default EducationForm;
