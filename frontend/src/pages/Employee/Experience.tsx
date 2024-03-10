import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Select,
} from "@chakra-ui/react";

interface ExperienceFormData {
  companyName: string;
  positionHeld: string;
  roleDescription: string;
  startDate: string;
  endDate: string;
  employmentType: string;
}

const ExperienceForm = () => {
  const [formData, setFormData] = useState<ExperienceFormData>({
    companyName: "",
    positionHeld: "",
    roleDescription: "",
    startDate: "",
    endDate: "",
    employmentType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); // Handle form submission
  };

  return (
    <div className="p-8 w-[70%] m-auto">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Position Held</FormLabel>
            <Input
              type="text"
              name="positionHeld"
              value={formData.positionHeld}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Role Description</FormLabel>
            <Input
              type="text"
              name="roleDescription"
              value={formData.roleDescription}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Start Date</FormLabel>
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>End Date</FormLabel>
            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Employment Type</FormLabel>
            <Select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
            >
              <option value="Contract">Contract</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
            </Select>
          </FormControl>

          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
        </VStack>
      </form>
    </div>
  );
};

export default ExperienceForm;
