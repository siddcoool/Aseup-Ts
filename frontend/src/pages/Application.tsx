import { Button, FormControl, FormLabel, useToast,  } from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
import React, { useEffect, useState } from "react";
import axios from "axios";


export type IApplication = {
  job: string;
  employee: string;
  _id: string;
  usesta;
};

const Application = () => {
  const[Application,setApplication]=useState(" ");
  const [Jobs, setJobs] = useState(" ");
  const [Employee, setEmployee] = useState(" ");
  const toast=useToast()
  const handlechnage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
const getApplications=async () => {
  try {
    const res=await axios.get("/application")
  } catch (error) {
    toast({
      title: error.message,
    });
  }
}
  useEffect(()=>{
    getApplications()
  },[])
  return (
    //FormControl for Select Job
    <>
    hello
    </>
  );
};
export default Application;
