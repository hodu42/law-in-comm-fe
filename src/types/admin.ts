export interface PendingLawyers {
  lawyerId: number;
  name: string;
  phoneNumber: string;
  description: string;
  approvalStatus: string;
}

export interface DetailedPendingLawyer {
  lawyerId: number;
  name: string;
  phoneNumber: string;
  description: string;
  career: string[];
  educations: string[];
  officeInfo: {
    officeName: string;
    officeAddress: string;
    officePhoneNumber: string;
  };
  approvalStatus: string;
  licenseImageInfo: {
    id: number;
    name: string;
    contentType: string;
    size: number;
    path: string;
  };
  profileImage: {
    id: number;
    name: string;
    contentType: string;
    size: number;
    path: string;
  };
  createdAt: string;
  updatedAt: string;
}
