import { PageResponse } from "@/types/page";
import { DetailedPendingLawyer } from "@/types/admin";
import { getPendingLawyers, getPendingLawyerDetail } from "@/api/users/admin";
import { getUserInfo } from "@/api/users";

const DEFAULT_PAGE = 0;
export const DEFAULT_SIZE = 10;

export const fetchPendingLawyers = async (
  page: number = DEFAULT_PAGE
): Promise<PageResponse<DetailedPendingLawyer>> => {
  const pendingLawyersResponse = await getPendingLawyers(page, 2);

  const pendingLawyers = pendingLawyersResponse.data.content;

  const detailedPendingLawyers = await Promise.all(
    pendingLawyers.map(async (pendingLawyer: DetailedPendingLawyer) => {
      const detailedLawyerResponse = await getPendingLawyerDetail(
        pendingLawyer.lawyerId
      );
      const lawyerInfoResponse = await getUserInfo(pendingLawyer.lawyerId);
      const lawyerProfileImage = lawyerInfoResponse.data.profileImage;

      return {
        ...detailedLawyerResponse.data,
        profileImage: {
          ...lawyerProfileImage,
        },
      };
    })
  );

  return {
    ...pendingLawyersResponse.data,
    content: detailedPendingLawyers,
  };
};
