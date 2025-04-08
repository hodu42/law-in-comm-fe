import React from "react";
import { api, login, getUserInfo } from "@/api";
import { LawyerInfo } from "@/types/lawyer";

export const Test = ():React.JSX.Element => {
    const [id, setId] = React.useState<string>('');
    const [pw, setPw] = React.useState<string>('');
    const [crtAccessToken, setCrtAccessToken] = React.useState<string>('');
    const [nickname, setNickname] = React.useState<string>('');
    const [userId, setUserId] = React.useState<number>(0);
    const [userInfo, setUserInfo] = React.useState<LawyerInfo | null>(null);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await login(id, pw);
            console.log(response.data);
            const { accessToken, type, header } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('tokenType', type);
            localStorage.setItem('header', header);
            setCrtAccessToken(accessToken);
        } catch(error:any) {
            if (error.response?.status === 401) {
                alert("잘못된 아이디나 비밀번호 입력");
            } else {
                console.error(error);
            }
        }
    }

    const fetchLawyerSpeciality = async () => {
        try {
            const response = await api.get<any>('/api/users/legal-speciality');
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDuplicationCheck = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api.get<any>('/api/users/join/nickname/dupe-check', { nickname });
            console.log(response.data);
            if (response.data) {
                alert(`${nickname}은 이미 존재합니다.`);
            } else {
                alert(`${nickname}은 사용가능합니다.`);
            }
        } catch (error:any) {
            console.error(error);
        }
    }

    const fetchUserInfo = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await getUserInfo(userId);
            console.log(response.data);
            setUserInfo(response.data);
        } catch (error:any) {
            console.error(error);
        }
    }
    return (
        <div className="flex flex-col gap-10px">
            {
                crtAccessToken ? <p>{crtAccessToken}</p> : <p>로그아웃 상태</p>
            }
            <form onSubmit={handleLogin}>
                <input className="border-2 border-lightGreen" type="text" value={id} onChange={(e) => setId(e.target.value)} />
                <input className="border-2 border-lightGreen" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
                <button className="bg-green-500" type="submit">로그인</button>
            </form>
            <button className="bg-green-500" onClick={fetchLawyerSpeciality}>테스트</button>
            <div>
                <h1>닉네임 중복체크</h1>
                <form className="flex flex-col" onSubmit={handleDuplicationCheck}>
                    <input type={"text"} value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="중복체크 할 닉네임을 입력하세요"/>
                    <button className="bg-lightGreen rounded-10px" type={"submit"}>중복체크</button>
                </form>
            </div>
            <div className="border-2 border-black rounded-10px p-10px">
                <h1>사용자의 일반정보 조회</h1>
                <form className="flex flex-col" onSubmit={fetchUserInfo}>
                    <div>
                        <input type={"number"} value={userId} onChange={(e) => setUserId(Number(e.target.value))}/>
                    </div>
                    <button className="bg-lightGreen rounded-10px" type={"submit"}>조회</button>
                </form>
                {
                    userInfo && (
                        <div className="flex flex-col gap-10px">
                            <p>{`이름: ${userInfo.name}`}</p>
                            <p>{`닉네임: ${userInfo.nickname}`}</p>
                            <div className="flex flex-col gap-10px">
                                <img 
                                    src={userInfo.profileImage.path} 
                                    alt="프로필 이미지"
                                    className="w-32 h-32 object-cover rounded-full"
                                />
                                <p>{`프로필이미지 id: ${userInfo.profileImage.id}`}</p>
                                <p>{`프로필이미지 이름: ${userInfo.profileImage.name}`}</p>
                                <p>{`프로필이미지 타입: ${userInfo.profileImage.contentType}`}</p>
                                <p>{`프로필이미지 크기: ${userInfo.profileImage.size}`}</p>
                                <p>{`프로필이미지 경로: ${userInfo.profileImage.path}`}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>

    )
}