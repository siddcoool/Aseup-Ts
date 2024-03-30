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
import { LineItemRepeater } from "../../components/LineItemRepeater";

interface IExperienceForm {
  employeeData: EmployeeDocument;
  onSubmit: (input: Partial<EmployeeDocument>) => void;
}

const ExperienceForm = ({ employeeData, onSubmit }: IExperienceForm) => {
  const[expError,setExpError]=useState("")
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    if(name==="endDate"){
      const startdate=formData[index]?.startDate;
      if(startdate && value<= startdate){
        setExpError("End year should be greater than start Date")
      }
      else{
        setExpError("")
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

  useEffect(() => {
    if (employeeData && Array.isArray(employeeData.experience)) {
      setFormData([...employeeData.experience]);
    }
  }, [employeeData]);

  return (
    <div>
      <LineItemRepeater size={employeeData?.experience?.length}>
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
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Position Held</FormLabel>
                    <Input
                      type="text"
                      name="positionHeld"
                      value={formData[index]?.positionHeld}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Role Description</FormLabel>
                    <Input
                      type="text"
                      name="roleDescription"
                      value={formData[index]?.roleDescription}
                      onChange={(e) => handleChange(e, index)}
                    />
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
        onClick={() => {
          onSubmit({ experience: formData });
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default ExperienceForm;
