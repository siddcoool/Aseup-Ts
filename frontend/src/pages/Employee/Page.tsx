import React, { useState } from "react";
import StepperContainer, { IStep } from "./StepperContainer";
import PersonalDetails from "./PersonalDetails";
import EducationForm from "./Education";
import ExperienceForm from "./Experience";
import { EmployeeDocument } from "../../types/employee";

const Page = () => {
  const [employeeFormData, setEmployeeFormData] = useState<EmployeeDocument>();

  const steps: IStep[] = [
    {
      step: 0,
      title: "Personal Details",
      description: "basic",
      component: ({ goToNext }) => (
        <PersonalDetails
          onSubmit={() => {
            goToNext();
          }}
        />
      ),
    },
    {
      step: 1,
      title: "Education",
      description: "Education Details",
      component: ({ goToNext }) => (
        <EducationForm onSubmit={() => goToNext()} />
      ),
    },
    {
      step: 2,
      title: "Experience ",
      description: "Experience Details",
      component: () => <ExperienceForm />,
    },
  ];

  return <StepperContainer steps={steps} />;
};

export default Page;
