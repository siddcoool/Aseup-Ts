import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type ISkill = {
  name: string;
  _id: string;
};

const SkillForm = () => {
  const [skillName, setSkillName] = useState({
    name: "",
  });

  const { id } = useParams();
  const toast = useToast();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkillName((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  console.log({ skillName, id });

  const handleSubmit = async () => {
    try {
      if (id) {
        const { status } = await axios.put(`/skill/${id}`, skillName);
        if (status === 200) {
          toast({
            title: "Skill updated successfully!",
            status: "success",
            duration: 5000,
          });
        } else {
          toast({
            title: "failed updating skill!",
            status: "error",
            duration: 5000,
          });
        }
      } else {
        const { data, status } = await axios.post("/skill", skillName);
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSkill = async () => {
    try {
      const { data } = await axios.get(`/skill/${id}`);
      console.log({ data });
      setSkillName(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (id) {
      fetchSkill();
    }
  }, []);

  return (
    <div className="p-8 w-[70%] m-auto space-y-4">
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Skill Name</FormLabel>
          <Input
            type="text"
            name="skillName"
            value={skillName.name}
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
