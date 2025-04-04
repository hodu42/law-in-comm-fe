import React, {useState} from "react";
import {PendingLawyers, DetailedPendingLawyer} from "../types/admin";
import axios from "axios";
import {BASE_URL} from "../config/Config";

export const PendingLawyersPage = ():React.JSX.Element => {
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(0);
    const [pendingLawyerIds, setPendingLawyerIds] = useState<number[]>([]);
    const [pendingLawyers, setPendingLawyers] = React.useState<PendingLawyers>();
    const headerName = localStorage.getItem('header');

    const fetchPendingLawyerIds = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (headerName) {
            axios.get(`${BASE_URL}/api/users/admin/confirmations/lawyers`, {
                headers: {
                    [headerName]: `${localStorage.getItem('tokenType')}${localStorage.getItem('accessToken')}`,
                }
                ,params: {
                    page: page,
                    size: size,
                }
            }).then((res) => {
                setPendingLawyers(res.data.data);
            }).catch((error:any) => {
                console.error(error);
            })
        }
    }

    const fetchDetailedPendingLawyers = async (e:React.FormEvent<HTMLFormElement>, lawyerId:number) => {
        e.preventDefault();
        if (headerName) {
            axios.get(`${BASE_URL}/api/users/admin/confirmations/lawyers/${lawyerId}`, {
                headers: {
                    [headerName]: `${localStorage.getItem('tokenType')}${localStorage.getItem('accessToken')}`,
                }
            }).then((res) => {
                setPendingLawyers(res.data.data);
            }).catch((error:any) => {
                console.error(error);
            })
        }
    }

    return (
        <div>
            <h1>변호사 승인 대기 조회</h1>
            <form onSubmit={fetchPendingLawyerIds}>
                <input className="border-2 border-lightGreen" type={"number"} value={page} onChange={(e) => setPage(Number(e.target.value))} placeholder="현재 페이지 입력"/>
                <input className="border-2 border-lightGreen" type={"number"} value={size} onChange={(e) => setSize(Number(e.target.value))} placeholder="페이지당 조회할 개수 입력"/>
                <button className="bg-lightGreen rounded-10px" type={"submit"}>조회하기</button>
            </form>
            {
                pendingLawyers ? (
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
                    : ""
            }
        </div>
    )
}