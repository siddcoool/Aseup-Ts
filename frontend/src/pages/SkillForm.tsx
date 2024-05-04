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
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import ErrorText from "../components/ErrorText";

type ISkill = {
  name: string;
  _id?: string;
};

const SkillForm = () => {
  const [skillName, setSkillName] = useState<ISkill>({
    name: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();

  const [errors, setErrors] = useState({
    name:''
  });

  const validationSchema = Yup.object({
    name: Yup.string().required(),
  });

  const validate = async () => {
    try {
      setErrors(null);
      await validationSchema.validate(skillName, {
        abortEarly: false,
      });
      return true;
    } catch (error) {
      console.log({ error });
      error.inner.forEach((item) => {
        setErrors((prev) => ({ ...prev, [item.path]: item.message }));
      });
      return false;
    }
  };
  console.log({ errors });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkillName((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (await validate()) {
      try {
        if (id) {
          const { status } = await axios.put(`/skill/${id}`, skillName);
          if (status === 200) {
            toast({
              title: "Skill updated successfully!",
              status: "success",
              duration: 5000,
            });
            navigate("/skills");
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
            navigate("/skills");
          }
        }
      } catch (error) {
        console.log(error);
      }
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
          <ErrorText>{errors?.name}</ErrorText>
        </FormControl>
      </VStack>
      <Button colorScheme="teal" onClick={handleSubmit}>
        {id ? "Update" : "Add"} Skill
      </Button>
    </div>
  );
};

export default SkillForm;
