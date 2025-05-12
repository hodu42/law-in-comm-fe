export interface RegisterLawyerInfo {
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

export type LawyerInfo = Omit<
  RegisterLawyerInfo,
  "username" | "password" | "birthDate"
> & {
  birth: string;
  profileImage: {
    id: number;
    name: string;
    contentType: string;
    size: number;
    path: string;
  };
};

export enum ApprovalStatus {
  WAITING = "WAITING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
