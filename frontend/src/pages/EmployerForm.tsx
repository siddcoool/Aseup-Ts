// import { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
// import {
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
//   VStack,
//   useDisclosure,
//   AlertDialog,
//   AlertDialogBody,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogOverlay,
//   Toast,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { useToast } from "@chakra-ui/react";
// import { useParams } from "react-router-dom";
// import { LineItemRepeater } from "../components/LineItemRepeater";

// interface FormData {
//   companyName: string;
//   industry: string;
//   location: string;
//   employees: string;
// }

// const EmployerForm = () => {
//   const [formData, setFormData] = useState<FormData>({
//     companyName: "",
//     industry: "",
//     location: "",
//     employees: "",
//   });
//   const [submitting, setSubmitting] = useState<boolean>(false);
//   const toast = useToast();
//   const [employerDetails, setEmployerDetails] = useState<any>(); // Update this line to correct type

//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const cancelRef = useRef(null);
//   const { id } = useParams();

//   const handleInputChange = (fieldName: string, value: string) => {
//     setFormData({ ...employerDetails, [fieldName]: value });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (id) {
//       const res = await axios.put(`/employer/${id}`, formData);
//     } else {
//       setSubmitting(true);
//       const res = await axios.post("/employer", formData);
//       console.log({ res });
//       setSubmitting(false);
//       toast({
//         title: "Employer Account created.",
//         description: "We've created your account for you.",
//         status: "success",
//         duration: 9000,
//         isClosable: true,
//       });
//       onClose();
//     }
//   };

//   const getEmployer = async () => {
//     if (id) {
//       const employer = await axios.get(`/employer/${id}`);
//       setEmployerDetails(employer.data);
//       setFormData(employer.data);
//     }
//   };

//   console.log({ formData });
//   useEffect(() => {
//     getEmployer();
//   }, []);

//   return (
//     <div className="p-8 w-[70%] m-auto">
//       <form onSubmit={handleSubmit}>
//         <VStack spacing={4}>
//           <FormControl>
//             <FormLabel>Company Name</FormLabel>
//             <Input
//               type="text"
//               name="companyName"
//               value={formData.companyName}
//               onChange={(e) => handleInputChange("companyName", e.target.value)}
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Industry</FormLabel>
//             <Input
//               type="text"
//               name="industry"
//               value={formData.industry}
//               onChange={(e) => handleInputChange("industry", e.target.value)}
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Location</FormLabel>
//             <Input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={(e) => handleInputChange("location", e.target.value)}
//             />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Number of Employees</FormLabel>
//             <Input
//               type="number"
//               name="employees"
//               value={formData.employees}
//               onChange={(e) => handleInputChange("employees", e.target.value)}
//             />
//           </FormControl>
//           <div className="">
//             <LineItemRepeater>
//               {(index) => {
//                 return (
//                   <FormControl>
//                     <FormLabel>Contact Person {index + 1}</FormLabel>
//                     <Input
//                       type="number"
//                       name="employees"
//                       value={formData.employees}
//                       onChange={(e) =>
//                         handleInputChange("employees", e.target.value)
//                       }
//                     />
//                   </FormControl>
//                 );
//               }}
//             </LineItemRepeater>
//           </div>

//           <>
//             <Button colorScheme="teal" onClick={onOpen}>
//               {id ? "Update" : "Add"} employer
//             </Button>

//             <AlertDialog
//               isOpen={isOpen}
//               leastDestructiveRef={cancelRef}
//               onClose={onClose}
//             >
//               <AlertDialogOverlay>
//                 <AlertDialogContent>
//                   <AlertDialogHeader fontSize="lg" fontWeight="bold">
//                     {id ? "Update" : "Add"} Employer
//                   </AlertDialogHeader>

//                   <AlertDialogBody>Are you sure?</AlertDialogBody>

//                   <AlertDialogFooter>
//                     <Button onClick={onClose}>Cancel</Button>
//                     <Button
//                       colorScheme="blue"
//                       onClick={() => {
//                         handleSubmit();
//                       }}
//                       ml={3}
//                     >
//                       Submit
//                     </Button>
//                   </AlertDialogFooter>
//                 </AlertDialogContent>
//               </AlertDialogOverlay>
//             </AlertDialog>
//           </>
//         </VStack>
//       </form>
//     </div>
//   );
// };

// export default EmployerForm;

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
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { LineItemRepeater } from "../components/LineItemRepeater";

interface FormData {
  companyName: string;
  industry: string;
  location: string;
  employees: string;
  contactName: string;
  contactNumber: string;
}

const EmployerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    industry: "",
    location: "",
    employees: "",
    contactName: "",
    contactNumber: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast(); // Move useToast here

  const cancelRef = useRef(null);
  const { id } = useParams();

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async () => {
    try {
      if (id) {
        const res = await axios.put(`/employer/${id}`, formData);
      } else {
        setSubmitting(true);
        const res = await axios.post("/employer", formData);
        console.log({ res });
        setSubmitting(false);
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
                  <FormControl key={index +1}>
                    <FormLabel>Contact Person Name</FormLabel>
                    <Input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={(e) =>
                        handleInputChange("contactName", e.target.value)
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Contact Person Number</FormLabel>
                    <Input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
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
