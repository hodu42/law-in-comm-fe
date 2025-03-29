import React from "react";
import axios from "axios";
import {BASE_URL} from "../config/Config";

export const Test = ():React.JSX.Element => {
    const [id, setId] = React.useState<string>('');
    const [pw, setPw] = React.useState<string>('');
    const [crtAccessToken, setCrtAccessToken] = React.useState<string>('');

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/login`, {
                username: id,
                password: pw,
            })
            const { accessToken } = response.data.data;
            const { type } = response.data.data;
            console.log(accessToken);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('tokenType', type);
            setCrtAccessToken(accessToken);
        } catch(e) {
            console.error(e);
        }
    }

    const handleClick = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/users/legal-speciality`, {
                headers: {
                    'auth-test': `${localStorage.getItem('tokenType')}${localStorage.getItem('accessToken')}`,
                }
            })
            console.log(response.data)
            localStorage.removeItem('accessToken');
        } catch (error) {
            console.error(error);
            localStorage.removeItem('accessToken');
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
        </div>

    )
}