export interface Education {
    title?: string;
    field?: string;
    institute?: string;
    startYear?: string;
    endYear?: string;
    grade?: string
}

export interface Experience {
    companyName?: string;
    positionHeld?: string;
    roleDescription?: string;
    startDate?: string;
    endDate?: string;
    employmentType?: string
}

// Define interface for Employee document
export interface EmployeeDocument {
    name?: string;
    email?: string;
    phoneNumber?: string;
    DOB?: string;
    gender?: string;
    educations?: Education[];
    experience?: Experience[];
    currentCTC?: string;
    expectedCTC?: string;
    noticePeriod?: string;
    skills?: string[]; // Assuming skill IDs are stored as strings
}
