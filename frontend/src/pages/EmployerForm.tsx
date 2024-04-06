import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { LineItemRepeater } from "../components/LineItemRepeater";
import isEmail from "validator/lib/isEmail";

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
    contact: [],
  });
  const toast = useToast(); // Move useToast here
  const { id } = useParams();

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

  const handleSubmit = async () => {
    const emailChecked = formData.contact.every((oneContact) =>
      isEmail(oneContact.contactEmail)
    );

    if (!emailChecked) {
      toast({
        title: "Email is not valid",
        description: "Please check ",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return
    }

    try {
      if (id) {
        await axios.put(`/employer/${id}`, formData);
        toast({
          title: "Employer Updated created.",
          description: "We've updated your account for you.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
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
  };

  const getEmployer = async () => {
    if (id) {
      const employer = await axios.get(`/employer/${id}`);
      setFormData(employer.data);
    }
  };

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
            <FormLabel>Company Name</FormLabel>
            <Input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Industry</FormLabel>
            <Input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={(e) => handleInputChange("industry", e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Number of Employees</FormLabel>
            <Input
              type="number"
              name="employees"
              value={formData.employees}
              onChange={(e) => handleInputChange("employees", e.target.value)}
            />
          </FormControl>

          <LineItemRepeater className="w-full">
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
