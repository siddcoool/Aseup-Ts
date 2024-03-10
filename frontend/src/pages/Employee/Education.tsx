import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Select,
} from "@chakra-ui/react";

interface EducationFormData {
  title: string;
  field: string;
  institute: string;
  startYear: string;
  endYear: string;
  grade: string;
}

const EducationForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const [formData, setFormData] = useState<EducationFormData>({
    title: "",
    field: "",
    institute: "",
    startYear: "",
    endYear: "",
    grade: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Field</FormLabel>
            <Input
              type="text"
              name="field"
              value={formData.field}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Institute</FormLabel>
            <Input
              type="text"
              name="institute"
              value={formData.institute}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Start Year</FormLabel>
            <Input
              type="date"
              name="startYear"
              value={formData.startYear}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>End Year</FormLabel>
            <Input
              type="date"
              name="endYear"
              value={formData.endYear}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Grade</FormLabel>
            <Select name="grade" value={formData.grade} onChange={handleChange}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </Select>
          </FormControl>

          <Button colorScheme="teal" type="submit" onClick={onSubmit}>
            Next
          </Button>
        </VStack>
      </form>
    </div>
  );
};

export default EducationForm;
