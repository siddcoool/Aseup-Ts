import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { LineItemRepeater } from "../components/LineItemRepeater";
import * as Yup from "yup";
import ErrorText from "../components/ErrorText";
import { error } from "console";
import {
  getIndexAndKey,
  getIndexAndKeyForContact,
} from "../utils/stringOperation";

type IContact = {
  contactName?: string;
  contactNumber?: string;
  contactEmail?: string;
};

interface FormData {
  companyName: string;
  industry: string;
  location: string;
  employees: string;
  contact: IContact[];
}

const EmployerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    industry: "",
    location: "",
    employees: "",
    contact: [
      {
        contactName: "",
        contactNumber: "",
        contactEmail: "",
      },
    ],
  });
  const [errors, setErrors] = useState({
    companyName: "",
    industry: "",
    location: "",
    employees: "",
    contact: [],
  });
  const toast = useToast(); // Move useToast here\
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = Yup.object({
    companyName: Yup.string().required(),
    industry: Yup.string().email().required(),
    location: Yup.number().required(),
    employees: Yup.date().required(),
    contact: Yup.array()
      .of(
        Yup.object().shape({
          contactName: Yup.string().required('contactName is required'),
          contactNumber: Yup.string().required('contactNumber is required'),
          contactEmail: Yup.string().email().required('contactEmail is required'),
        })
      )
      .min(1)
      .required(),
  });
  const validate = async () => {
    try {
      setErrors(null);
      await validationSchema.validate(formData, {
        abortEarly: false,
      });
      return true;
    } catch (error) {
      console.log({ error });
      error.inner.forEach((item) => {
        const { index, key } = getIndexAndKeyForContact(item.path);
        const splitStr = item.path.split("[")[0];
        if (splitStr === "contact") {
          // Ensure contact array is initialized
          setErrors((prevErrors) => {
            const contactErrors = prevErrors.contact || []; // Initialize contact array if undefined
            if (!contactErrors[index]) {
              contactErrors[index] = {}; // Initialize index if undefined
            }
            contactErrors[index][key] = item.message; // Update the error for the specific key
            return {
              ...prevErrors,
              contact: contactErrors,
            };
          });
        } else {
          // Update errors for other fields
          setErrors((prevErrors) => ({
            ...prevErrors,
            [item.path]: item.message,
          }));
        }
      });
      
      return false;
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleContactChange = (
    fieldName: string,
    value: string,
    index?: number
  ) => {
    const updatedContactInfo = [...formData.contact];

    updatedContactInfo[index] = {
      ...(updatedContactInfo[index] ?? {}),
      [fieldName]: value,
    };
    setFormData((prev) => ({ ...prev, contact: updatedContactInfo }));
  };

  const handleDelete = (index: number) => {
    const newData = formData.contact.filter((item, idx) => index != idx);
    setFormData((prev) => ({ ...prev, contact: newData }));
  };

  const handleSubmit = async () => {
    if (await validate()) {
      try {
        if (id) {
          await axios.put(`/employer/${id}`, formData);
          toast({
            title: "Employer data Updated .",
            description: "We've updated your account for you.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/employer/view");
        } else {
          await axios.post("/employer", formData);
          toast({
            title: "Employer Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      return;
    }
  };
  console.log({ new: errors });
  const getEmployer = async () => {
    if (id) {
      const employer = await axios.get(`/employer/${id}`);
      setFormData(employer.data);
    }
  };
  console.log({ formData });
  useEffect(() => {
    getEmployer();
  }, []);

  return (
    <div className="p-8 w-[70%] m-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <VStack spacing={4}>
          <FormControl>
            <div className="text-3xl text-center font-bold">
              Create Employer
            </div>
            <FormLabel>Company Name</FormLabel>
            <Input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
            />
            <ErrorText>{errors?.companyName}</ErrorText>
          </FormControl>
          <FormControl>
            <FormLabel>Industry</FormLabel>
            <Input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={(e) => handleInputChange("industry", e.target.value)}
            />
            <ErrorText>{errors?.industry}</ErrorText>
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
            <ErrorText>{errors?.location}</ErrorText>
          </FormControl>
          <FormControl>
            <FormLabel>Number of Employees</FormLabel>
            <Input
              type="number"
              name="employees"
              value={formData.employees}
              onChange={(e) => handleInputChange("employees", e.target.value)}
            />
            <ErrorText>{errors?.employees}</ErrorText>
          </FormControl>
          <LineItemRepeater
            className="w-full"
            size={formData.contact.length}
            onDelete={handleDelete}
          >
            {(index) => {
              return (
                <div className="w-full">
                  <FormControl key={index + 1}>
                    <FormLabel>Contact Person Name</FormLabel>
                    <Input
                      type="text"
                      name="contactName"
                      value={formData && formData?.contact[index]?.contactName}
                      onChange={(e) =>
                        handleContactChange(
                          "contactName",
                          e.target.value,
                          index
                        )
                      }
                    />
                    <ErrorText>{errors?.contact[index]?.contactName}</ErrorText>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Contact Person Number</FormLabel>
                    <Input
                      type="text"
                      name="contactNumber"
                      value={formData && formData.contact[index]?.contactNumber}
                      onChange={(e) =>
                        handleContactChange(
                          "contactNumber",
                          e.target.value,
                          index
                        )
                      }
                    />
                    <ErrorText>{ errors?.contact[index]?.contactNumber}</ErrorText>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Contact Person Email</FormLabel>
                    <Input
                      type="text"
                      name="contactEmail"
                      value={formData && formData.contact[index]?.contactEmail}
                      onChange={(e) =>
                        handleContactChange(
                          "contactEmail",
                          e.target.value,
                          index
                        )
                      }
                    />
                    <ErrorText>
                      {errors?.contact[index]?.contactEmail}
                    </ErrorText>
                  </FormControl>
                </div>
              );
            }}
          </LineItemRepeater>
          <>
            <Button colorScheme="teal" onClick={handleSubmit}>
              {id ? "Update" : "Add"} employer
            </Button>
          </>
        </VStack>
      </form>
    </div>
  );
};

export default EmployerForm;
