import React, {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config/Config";
import LawyerSpecialty from "../types/lawyer";

export const LawyerRegisterTest = ():React.JSX.Element => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthdate] = useState("");
    const [career, setCareer] = useState("");
    const [education, setEducation] = useState("");
    const [officeName, setOfficeName] = useState("");
    const [officeAddress, setOfficeAddress] = useState("");
    const [officePhoneNumber, setOfficePhoneNumber] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<string | ArrayBuffer | null> (null);
    const [lawyerSpeciality, setLawyerSpeciality] = useState<LawyerSpecialty[]>([]);
    const [checkedList, setCheckedList] = useState<string[]>([]);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/users/join/general`, {
                username: username,
                name: name,
                password: password,
                birthDate: birthDate,
            })
            console.log(response);
            alert("회원가입 대기중");
        } catch (error) {
            console.error(error);
        }
    }

    const fetchLawyerSpeciality = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/users/legal-speciality`);
            setLawyerSpeciality(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    const checkedItemHandler = (value: string, isChecked: boolean) => {
        if (isChecked) {
            setCheckedList((prev) => [...prev, value]);
            return;
        }

        if (!isChecked  && checkedList.includes(value)) {
            setCheckedList(checkedList.filter((item) => item !== value));
            return;
        }

        return;
    }

    const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setIsChecked(!isChecked);
        checkedItemHandler(value, e.target.checked);
    }

    const checkboxTest = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('checkedList', checkedList);
    }

    useEffect(() => {
        fetchLawyerSpeciality();
    }, []);

    return (
        <div>
            <form className="flex flex-col justify-center" onSubmit={handleRegister}>
                <input className="border-2 border-lightGreen rounded-10px" type={"text"} placeholder="아이디 입력" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="border-2 border-lightGreen rounded-10px" type={"password"} placeholder="비밀번호 입력" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className="border-2 border-lightGreen rounded-10px" type={"text"} placeholder="이름 입력" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="border-2 border-lightGreen rounded-10px" type={"text"} placeholder="폰번호 입력" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <input type={"file"} />
                <input className="border-2 border-lightGreen rounded-10px" type={"text"} placeholder="경력을 입력하세요" value={phoneNumber} onChange={(e) => setCareer(e.target.value)} />
                <input className="border-2 border-lightGreen rounded-10px" type={"text"} placeholder="학력을 입력하세요" value={phoneNumber} onChange={(e) => setEducation(e.target.value)} />
                <input className="border-2 border-lightGreen rounded-10px" type={"date"} value={birthDate} onChange={(e) => setBirthdate(e.target.value)} />
                <input className="border-2 border-lightGreen rounded-10px" type={"text"} placeholder="사무실 이름" value={phoneNumber} onChange={(e) => setOfficeName(e.target.value)} />
                <input className="border-2 border-lightGreen rounded-10px" type={"text"} placeholder="사무실 주소" value={phoneNumber} onChange={(e) => setOfficeAddress(e.target.value)} />
                <input className="border-2 border-lightGreen rounded-10px" type={"text"} placeholder="사무실 전화번호" value={phoneNumber} onChange={(e) => setOfficePhoneNumber(e.target.value)} />
                <button className="border-2 bg-lightGreen rounded-10px" type={"submit"}>변호사 회원가입</button>
            </form>
            <form onSubmit={checkboxTest}>
                <div>
                    {
                        lawyerSpeciality.map((item, idx) => (
                            <div key={idx}>
                                <input type={"checkbox"} id={item.legalSpecialtyName} checked={checkedList.includes(item.legalSpecialtyName)} onChange={(e) => checkHandler(e, item.legalSpecialtyName)}/>
                                <label>{item.legalSpecialtyDescription}</label>
                            </div>
                        ))
                    }
                    <button type={"submit"}>체크박스 테스트</button>
                </div>
            </form>
        </div>
    )
}