import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Select,
} from "@chakra-ui/react";
import { Education, EmployeeDocument } from "../../types/employee";
import dayjs from "dayjs";
import { LineItemRepeater } from "../../components/LineItemRepeater";
import { start } from "repl";

interface IEducationForm {
  onSubmit: (input: Partial<EmployeeDocument>) => void;
  employeeData: EmployeeDocument;
}

const EducationForm = ({ onSubmit, employeeData }: IEducationForm) => {
  const [yearError, setYearError] = useState("");
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    if (name === "endYear") {
      const startYear = formData[index]?.startYear;
      
      
      if (startYear && value <= startYear) {
        console.log(startYear,value);
        setYearError("End year should be greater than start Date");
      } else {
        setYearError("");
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); // Handle form submission
  };
  // const calculatediff = (endYear: string, startYear: string) => {
  //   const startyear = new Date(startYear);
  //   const endyear = new Date(endYear);
  //   console.log(`startyear,${startyear},endyear=${endyear}`);
    
  //   const diff = endyear.getFullYear() - startyear.getFullYear();
  //   console.log(diff,endyear.getFullYear(),startyear.getFullYear());
    
  // return diff;
  // };
  useEffect(() => {
    if (employeeData && Array.isArray(employeeData.educations)) {
      setFormData([...employeeData.educations]);
    }
  }, [employeeData]);

  return (
    <div>
      <LineItemRepeater size={employeeData?.educations?.length}>
        {(index) => {
          return (
            <div className="p-8 w-[70%] m-auto" key={index}>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      type="text"
                      name="title"
                      value={formData[index]?.title}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Field</FormLabel>
                    <Input
                      type="text"
                      name="field"
                      value={formData[index]?.field}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Institute</FormLabel>
                    <Input
                      type="text"
                      name="institute"
                      value={formData[index]?.institute}
                      onChange={(e) => handleChange(e, index)}
                    />
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
                    <div className="text-red-500 font-bold">{yearError}</div>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Grade</FormLabel>
                    <Select
                      name="grade"
                      value={formData[index]?.grade}
                      onChange={(e) => handleChange(e, index)}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="F">F</option>
                    </Select>
                  </FormControl>
                </VStack>
              </form>
            </div>
          );
        }}
      </LineItemRepeater>
      <Button
        colorScheme="teal"
        type="submit"
        onClick={() => onSubmit({ educations: formData })}
      >
        Next
      </Button>
    </div>
  );
};

export default EducationForm;
