interface Education {
    title: string;
    field: string;
    institute: string;
    startYear: Date;
    endYear: Date;
    grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
}

interface Experience {
    companyName: string;
    positionHeld: string;
    roleDescription: string;
    startDate: Date;
    endDate: Date;
    employmentType: 'Contract' | 'Full-Time' | 'Part-Time';
}

// Define interface for Employee document
export interface EmployeeDocument extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    DOB: Date;
    gender: string;
    educations: Education[];
    experience: Experience[];
    currentCTC: string;
    expectedCTC: string;
    noticePeriod: string;
    skills: string[]; // Assuming skill IDs are stored as strings
}