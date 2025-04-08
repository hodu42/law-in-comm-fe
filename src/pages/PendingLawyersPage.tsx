import React, {useState} from "react";
import {PendingLawyers, DetailedPendingLawyer} from "../types/admin";
import { getPendingLawyers, getPendingLawyerDetail } from "../api";

export const PendingLawyersPage = ():React.JSX.Element => {
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(0);
    const [pendingLawyers, setPendingLawyers] = React.useState<PendingLawyers>();
    const [detailedPendingLawyer, setDetailedPendingLawyer] = React.useState<DetailedPendingLawyer>();
    const [selectedLawyerId, setSelectedLawyerId] = React.useState<number>(0);

    const fetchPendingLawyerIds = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await getPendingLawyers(page, size);
            setPendingLawyers(response.data);
        } catch (error:any) {
            console.error(error);
        }
    }

    const fetchDetailedPendingLawyers = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await getPendingLawyerDetail(selectedLawyerId);
            setPendingLawyers(response.data);
        } catch (error:any) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-10px">
            <h1>변호사 승인 대기 조회</h1>
                <form onSubmit={fetchPendingLawyerIds}>
                <input className="border-2 border-lightGreen" type={"number"} value={page} onChange={(e) => setPage(Number(e.target.value))} placeholder="현재 페이지 입력"/>
                <input className="border-2 border-lightGreen" type={"number"} value={size} onChange={(e) => setSize(Number(e.target.value))} placeholder="페이지당 조회할 개수 입력"/>
                <button className="bg-lightGreen rounded-10px" type={"submit"}>조회하기</button>
            </form>
            {
                pendingLawyers && (
                    <>
                        <h1>{`총 페이지 수 : ${pendingLawyers.totalPages}`}</h1>
                        <h1>{`총 개수 : ${pendingLawyers.totalElements}`}</h1>
                        <h1>{`첫번째인가? : ${pendingLawyers.first}`}</h1>
                        <h1>{`마지막인가? : ${pendingLawyers.last}`}</h1>
                        <h1>{`사이즈 : ${pendingLawyers.size}`}</h1>
                        <h1>{`현재 페이지 : ${pendingLawyers.number}`}</h1>
                        <h1>대략적인 정보</h1>
                        {
                            pendingLawyers.content.map((item, idx) => (
                                <div className="border-2 border-lightGreen rounded-10px flex flex-col">
                                    <p>{`아이디 : ${item.lawyerId}`}</p>
                                    <p>{`이름 : ${item.name}`}</p>
                                    <p>{`전화번호 : ${item.phoneNumber}`}</p>
                                    <p>{`자기소개 : ${item.description}`}</p>
                                    <p>{`상태 : ${item.approvalStatus}`}</p>
                                </div>
                            ))
                        }
                    </>
                )

            }
            </div>
            <div>
                <h1>변호사 승인 대기 상세 조회</h1>
                <form onSubmit={fetchDetailedPendingLawyers}>
                    <div>
                        <label>변호사 아이디 입력</label>
                        <input className="border-2 border-lightGreen" type={"number"} value={selectedLawyerId} onChange={(e) => setSelectedLawyerId(Number(e.target.value))}/>
                    </div>
                    <button className="bg-lightGreen rounded-10px" type={"submit"}>조회하기</button>
                </form>
                {
                    detailedPendingLawyer && (
                        <div className="border-2 border-lightGreen rounded-10px flex flex-col">
                            <h1>변호사 상세 정보</h1>
                            <p>{`아이디 : ${detailedPendingLawyer.lawyerId}`}</p>
                            <p>{`이름 : ${detailedPendingLawyer.name}`}</p>
                            <p>{`전화번호 : ${detailedPendingLawyer.phoneNumber}`}</p>
                            <p>{`자기소개 : ${detailedPendingLawyer.description}`}</p>
                            <p>{`상태 : ${detailedPendingLawyer.approvalStatus}`}</p>
                            <p>{`경력 : ${detailedPendingLawyer.career}`}</p>
                            <p>{`학력 : ${detailedPendingLawyer.educations}`}</p>
                            <p>{`사무소 이름 : ${detailedPendingLawyer.officeInfo.officeName}`}</p>
                            <p>{`사무소 주소 : ${detailedPendingLawyer.officeInfo.officeAddress}`}</p>
                            <p>{`사무소 전화번호 : ${detailedPendingLawyer.officeInfo.officePhoneNumber}`}</p>
                            <img src={detailedPendingLawyer.licenseImageInfo.path} alt="자격증 이미지" className="w-32 h-32 object-cover rounded-full"/>
                            <p>{`생성일 : ${detailedPendingLawyer.createdAt}`}</p>
                            <p>{`수정일 : ${detailedPendingLawyer.updatedAt}`}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}