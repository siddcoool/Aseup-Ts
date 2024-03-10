import { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
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
  Toast,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
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
  const toast = useToast();
  const [employerDetails, setEmployerDetails] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { id } = useParams();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      const res = await axios.put(`/employer/${id}`, employerDetails);
    } else {
      setSubmitting(true);
      const res = await axios.post("/employer", formData);
      console.log({ res });
      setSubmitting(false);
    }
  };

  const getEmployer = async () => {
    if (id) {
      const employer = await axios.get(`/employer/${id}`);
      setEmployerDetails(employer.data);
      setFormData(employer.data);
    }
  };

  useEffect(() => {
    getEmployer();
  }, []);

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
              {id? 'Update': 'Add'} employer
            </Button>

            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  {id? 'Update': 'Add'} Employer
                  </AlertDialogHeader>

                  <AlertDialogBody>Are you sure?</AlertDialogBody>

                  <AlertDialogFooter>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                      colorScheme="blue"
                      onClick={(e) => {
                        handleSubmit(e);
                        toast({
                          title: "Account created.",
                          description: "We've created your account for you.",
                          status: "success",
                          duration: 9000,
                          isClosable: true,
                        });
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
