import { PageResponse } from "@/types/page";
import { PendingLawyers } from "@/types/admin";
import { getPendingLawyers, getPendingLawyerDetail } from "@/api/users/admin";

const DEFAULT_PAGE = 0;
export const DEFAULT_SIZE = 10;

export const fetchPendingLawyers = async (
  page: number = DEFAULT_PAGE
): Promise<PageResponse<PendingLawyers>> => {
  const pendingLawyersResponse = await getPendingLawyers(page, DEFAULT_SIZE);

  const pendingLawyers = pendingLawyersResponse.data.content;

  const detailedPendingLawyers = await Promise.all(
    pendingLawyers.map(async (pendingLawyer: PendingLawyers) => {
      const detailedLawyerResponse = await getPendingLawyerDetail(
        pendingLawyer.lawyerId
      );
      const detailedLawyer = detailedLawyerResponse.data;

      return {
        pendingLawyer,
        detailedLawyer,
      };
    })
  );

  return {
    ...pendingLawyersResponse.data,
    content: detailedPendingLawyers,
  };
};
