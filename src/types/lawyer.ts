export default interface LawyerSpeciality {
    legalSpecialtyName: string;
    legalSpecialtyDescription: string;
}

export interface LawyerInfo {
    name: string,
    nickname: string,
    profileImage: {
      id: number,
      name: string,
      contentType: string,
      size: number,
      path: string
    }
}