import React, { useEffect, useState } from "react";
import StepperContainer, { IStep } from "./StepperContainer";
import PersonalDetails from "./PersonalDetails";
import EducationForm from "./Education";
import ExperienceForm from "./Experience";
import { EmployeeDocument } from "../../types/employee";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const Page = () => {
  const [employeeFormData, setEmployeeFormData] = useState<EmployeeDocument>(
    {}
  );
  const toast = useToast();

  const { employeeId } = useParams();

  const handlePartialParameters = (
    partialParameters: Partial<EmployeeDocument>
  ) => {
    setEmployeeFormData({ ...employeeFormData, ...partialParameters });
  };

  const handleFormSubmit = async () => {
    try {
      if (employeeId) {
        const response = await axios.put(
          `/employee/edit/${employeeId}`,
          employeeFormData
        );
        toast({
          title: "Employee updated successfully",
          duration: 5000,
          status: "success",
        });
      } else {
        const response = await axios.post("/employee", employeeFormData);
        toast({
          title: "Employee added successfully",
          duration: 5000,
          status: "success",
        });
      }
    } catch (error) {
      toast({
        title: (error as Error).message,
        duration: 5000,
        status: "error",
      });
    }
  };

  const steps: IStep[] = [
    {
      step: 0,
      title: "Personal Details",
      description: "basic",
      component: ({ goToNext }) => (
        <PersonalDetails
          employeeData={employeeFormData}
          onSubmit={(input: Partial<EmployeeDocument>) => {
            handlePartialParameters(input);
            goToNext();
          }}
        />
      ),
    },
    {
      step: 1,
      title: "Education",
      description: "Education Details",
      component: ({ goToNext }: { goToNext: () => void }) => {
        return (
          <EducationForm
            employeeData={employeeFormData}
            onSubmit={(input: Partial<EmployeeDocument>) => {
              handlePartialParameters(input);
              goToNext();
            }}
          />
        );
      },
    },
    {
      step: 2,
      title: "Experience ",
      description: "Experience Details",
      component: ({ goToPrevious }) => (
        <ExperienceForm
          employeeData={employeeFormData}
          onSubmit={(input: Partial<EmployeeDocument>) => {
            handlePartialParameters(input);
            goToPrevious();
            handleFormSubmit();
          }}
        />
      ),
    },
  ];

  const getEmployee = async () => {
    try {
      const res = await axios.get(`/employee/${employeeId}`);
      setEmployeeFormData(res.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    if (employeeId) {
      getEmployee();
    }
  }, []);

  return <StepperContainer steps={steps} />;
};

export default Page;
