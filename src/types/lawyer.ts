export interface LawyerInfo {
    legalSpecialties: string[];
    officeInfo: {
        officeName: string;
        officeAddress: string;
        officePhoneNumber: string;
    };
    educations: string[];
    name: string;
    birthDate: string;
    careers: string[];
    username: string;
    phoneNumber: string;
    password: string;
    description: string;
}

export enum ApprovalStatus {
    WAITING = "WAITING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}