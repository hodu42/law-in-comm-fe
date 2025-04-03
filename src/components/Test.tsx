import React from "react";
import axios, {AxiosError} from "axios";
import {BASE_URL} from "../config/Config";

export const Test = ():React.JSX.Element => {
    const [id, setId] = React.useState<string>('');
    const [pw, setPw] = React.useState<string>('');
    const [crtAccessToken, setCrtAccessToken] = React.useState<string>('');
    const [header, setHeader] = React.useState<string>('');
    const [nickname, setNickname] = React.useState<string>('');

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/login`, {
                username: id,
                password: pw,
            })
            const { accessToken } = response.data.data;
            const { type } = response.data.data;
            const { header } = response.data.data;
            console.log(accessToken);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('tokenType', type);
            localStorage.setItem('header', header);
            setHeader(header);
            setCrtAccessToken(accessToken);
        } catch(error:any) {
            if (error.response.status === 401) {
                alert("잘못된 아이디나 비밀번호 입력");
            } else {
                console.error(error);
            }
        }
    }

    const handleClick = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/users/legal-speciality`);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    const handleDuplicationCheck = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${BASE_URL}/api/users/join/nickname/dupe-check`, {
                params: {nickname: nickname}
            });
            console.log(response.data)
            if (response.data.data) {
                alert(`${nickname}은 이미 존재합니다.`);
            } else {
                alert(`${nickname}은 사용가능합니다.`);
            }
        } catch (error:any) {
            console.error(error);
        }
    }

    return (
        <div>
            {
                crtAccessToken ? <p>{crtAccessToken}</p> : <p>로그아웃 상태</p>
            }
            <form onSubmit={handleLogin}>
                <input className="border-2 border-lightGreen" type="text" value={id} onChange={(e) => setId(e.target.value)} />
                <input className="border-2 border-lightGreen" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
                <button className="bg-green-500" type="submit">로그인</button>
            </form>
            <button className="bg-green-500" onClick={handleClick}>테스트</button>
            <div>
                <h1>닉네임 중복체크</h1>
                <form className="flex flex-col" onSubmit={handleDuplicationCheck}>
                    <input type={"text"} value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="중복체크 할 닉네임을 입력하세요"/>
                    <button className="bg-lightGreen rounded-10px" type={"submit"}>중복체크</button>
                </form>
            </div>
        </div>

    )
}