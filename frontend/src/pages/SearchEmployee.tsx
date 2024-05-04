// import  { useEffect, useState } from "react";
// import {
//   ChakraProvider,
//   Box,
//   Input,
//   Button,
//   VStack,
//   Text,
//   StackDivider,
// } from "@chakra-ui/react";
// import { EmployeeDocument } from "../types/employee";
// import axios from "axios";

// // Sample data of employees with their skills


// function SearchEmployee() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [employeeData, setEmployeeData] = useState<EmployeeDocument[]>([]);

//   const handleSearch = (searchTerm: string) => {
//     console.log({searchTerm})
//     const filtered = employeeData.filter((employee) =>
//         employee.skills.some((skill) =>
//             skill.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     );
//     setEmployeeData(filtered);
// };



//   const getEmployees = async () => {
//     try {
//       const response = await axios.get("/employee");
//       setEmployeeData(response.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   console.log({ employeeData });
//   useEffect(() => {
//     getEmployees();
//   }, []);

//   return (
//     <ChakraProvider>
//       <Box p="4">
//         <VStack
//           spacing="4"
//           divider={<StackDivider borderColor="gray.200" />}
//           align="stretch"
//         >
//           <Input
//             placeholder="Search by skill"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//          <Button onClick={(e) => handleSearch(e.target.value)}>Search</Button> 
//          {/* this is not working */}
//           {employeeData &&
//             employeeData.map((employee: EmployeeDocument) => (
//               <Box
//                 key={employee.name}
//                 p="4"
//                 borderWidth="1px"
//                 borderRadius="lg"
//               >
//                 <Text fontWeight="bold">{employee.name}</Text>
//                 {employee.skills?.map((skill)=><Text>{skill.name}</Text>)}
                
//               </Box>
//             ))}
//         </VStack>
//       </Box>
//     </ChakraProvider>
//   );
// }

// export default SearchEmployee;


const SearchEmployee = () => {
  return (
    <div>SearchEmployee</div>
  )
}

export default SearchEmployee
