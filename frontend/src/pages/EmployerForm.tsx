

import { useState, useRef, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { LineItemRepeater } from "../components/LineItemRepeater";

type IContact = {
  contactName: string;
  contactNumber: string;
}

interface FormData {
  companyName: string;
  industry: string;
  location: string;
  employees: string;
  contact : IContact[]
  
}

const EmployerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    industry: "",
    location: "",
    employees: "",
    contact : []
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast(); // Move useToast here

  const cancelRef = useRef(null);
  const { id } = useParams();

  const handleInputChange = (fieldName: string, value: string,index?: number) => {
    // if(fieldName === 'contact' && index){
    //   setFormData({...formData, contact[index].contactName: value)
    // }
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async () => {
    try {
      if (id) {
        await axios.put(`/employer/${id}`, formData);
      } else {
         await axios.post("/employer", formData);
        toast({
          title: "Employer Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose();
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
                        handleInputChange("contact", e.target.value)
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
                        handleInputChange("contactNumber", e.target.value)
                      }
                    />
                  </FormControl>
                </div>
              );
            }}
          </LineItemRepeater>

          <>
            <Button colorScheme="teal" onClick={onOpen}>
              {id ? "Update" : "Add"} employer
            </Button>

            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    {id ? "Update" : "Add"} Employer
                  </AlertDialogHeader>

                  <AlertDialogBody>Are you sure?</AlertDialogBody>

                  <AlertDialogFooter>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        handleSubmit();
                      }}
                      ml={3}
                    >
                      Submit
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>
        </VStack>
      </form>
    </div>
  );
};

export default EmployerForm;
