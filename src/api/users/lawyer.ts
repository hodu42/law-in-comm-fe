import { api } from "@/api/index";
import { ImageType } from "@/types/image";

export const getLawyerMypageData = async (id: number) => {
  return api.get<any>(`users/my-page/lawyer/${id}`);
};

export const getLawyerAnswers = async (page: number = 0, size: number = 5) => {
  return api.get<any>(`/users/my-page/lawyer/answers`, { page, size });
};

export const updateLawyerMypageData = async (
  phoneNumber: string,
  description: string,
  legalSpecialities: string[],
  educations: string[],
  careers: string[],
  officeName: string,
  officeAddress: string,
  officePhoneNumber: string
) => {
  return api.put<any>(`/users/my-page/lawyer`, {
    phoneNumber,
    description,
    officeInfo: {
      officeName,
      officeAddress,
      officePhoneNumber,
    },
    careers,
    educations,
    legalSpecialities,
  });
};

export const deleteLawyerProfileImage = async (imageId: number) => {
  return api.delete<any>(`/files/images/${imageId}`);
};

export const addLawyerProfileImage = async (
  profileImage: File | string,
  imageType: ImageType
) => {
  const formData = new FormData();
  formData.append("file", profileImage);
  return api.post<any>(`/files/image`, formData, {
    params: {
      imageType: imageType,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
