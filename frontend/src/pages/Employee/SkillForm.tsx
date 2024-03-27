import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";

const SkillForm = () => {
  const [skill, setSkill] = useState({
    name: "",
  });
  const { id } = useParams();
  const toast = useToast();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkill({ name: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data, status } = await axios.post("/skill", skill);
      console.log({ data, status });
      if (status === 204) {
        toast({
          title: "Skill already exists!",
          status: "warning",
          duration: 5000,
        });
      } else {
        toast({
          title: "Skill added successfully!",
          status: "success",
          duration: 5000,
        });
      }
      console.log();
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="p-8 w-[70%] m-auto space-y-4">
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Skill Name</FormLabel>
          <Input
            type="text"
            name="skillName"
            value={skill.name}
            onChange={handleInputChange}
          />
        </FormControl>
      </VStack>
      <Button colorScheme="teal" onClick={handleSubmit}>
        {id ? "Update" : "Add"} Skill
      </Button>
    </div>
  );
};

export default SkillForm;
