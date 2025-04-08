import React, {useState} from "react";
import { registerGeneral } from "@/api/auth/register";

export const RegisterTest = ():React.JSX.Element => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [nickName, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthdate] = useState("");

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await registerGeneral({
                username: username,
                name: name,
                nickname: nickName,
                password: password,
                birthDate: birthDate,
            });
            console.log(response);
            alert("회원가입 대기중");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="flex flex-col justify-center" onSubmit={handleRegister}>
            <input className="border-2 border-lightGreen rounded-10px" type={"text"} placeholder="이름 입력" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="border-2 border-lightGreen rounded-10px" type={"text"} placeholder="닉네임 입력" value={nickName} onChange={(e) => setNickname(e.target.value)} />
            <input className="border-2 border-lightGreen rounded-10px" type={"text"} placeholder="아아디 입력" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="border-2 border-lightGreen rounded-10px" type={"password"} placeholder="비밀번호 입력" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className="border-2 border-lightGreen rounded-10px" type={"date"} value={birthDate} onChange={(e) => setBirthdate(e.target.value)} />
            <button className="border-2 bg-lightGreen rounded-10px" type={"submit"}>의뢰인 회원가입</button>
        </form>
    )
}