import { useState, ChangeEvent, FormEvent, useRef } from "react";
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

interface FormData {
  companyName: string;
  industry: string;
  location: string;
  employees: string;
}

const EmployerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    industry: "",
    location: "",
    employees: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const res = axios.post("/employer", formData);
    console.log({ res });
    setSubmitting(false);
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
            <FormLabel>Industry</FormLabel>
            <Input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Number of Employees</FormLabel>
            <Input
              type="number"
              name="employees"
              value={formData.employees}
              onChange={handleChange}
            />
          </FormControl>

          <>
            <Button colorScheme="teal" onClick={onOpen}>
              Add employer
            </Button>

            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Add Employer
                  </AlertDialogHeader>

                  <AlertDialogBody>Are you sure?</AlertDialogBody>

                  <AlertDialogFooter>
                    <Button  onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={(e) => {
                        handleSubmit(e);
                        onClose();
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
