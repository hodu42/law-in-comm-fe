import React, {useEffect} from "react";
import axios from "axios";
import {BASE_URL} from "../config/Config";
import LawyerSpeciality from "../types/lawyer";

export const WriteTest = ():React.JSX.Element => {
    const [title, setTitle] = React.useState<string>("");
    const [isAnonymous, setIsAnonymous] = React.useState<boolean>(false);
    const [category, setCategory] = React.useState<string>("");
    const [occurenceDate, setOccurenceDate] = React.useState<string>("");
    const [content, setContent] = React.useState<string>("");
    const [lawyerSpeciality, setLawyerSpeciality] = React.useState<LawyerSpeciality[]>([]);

    useEffect(() => {
        fetchLawyerSpeciality();
    }, []);

    const fetchLawyerSpeciality = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/users/legal-speciality`);
            setLawyerSpeciality(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    const setSelectedCategory = () => {
        const selectedCategory = document.getElementById('category');

        if (selectedCategory) {
            const selectedCategoryValue = (selectedCategory as HTMLSelectElement).value;
            setCategory(selectedCategoryValue);
        }
    }

    const writeQuestion = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const header =  localStorage.getItem('header');
        const currentDate = new Date();
        if (header) {
            await axios.post(`${BASE_URL}/api/questions`, {
                title: title,
                legalSpeciality: category,
                content: content,
                firstOccurrenceDate: occurenceDate,
                anonymous: isAnonymous,
            }, {
                headers: {
                    [header]:  `${localStorage.getItem('tokenType')}${localStorage.getItem('accessToken')}`,
                },
            }).then((res) => {
                console.log(res);
            }).catch((error) => {
                console.error(error);
            })
        }
    }

    return (
        <form className="flex flex-col gap-[30px]" onSubmit={writeQuestion}>
            <div>
                <label>익명</label>
                <input type={"checkbox"} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setIsAnonymous((prev) => !prev)}/>
            </div>
            <input className="border-2 border-lightGreen rounded-10px" type={"text"} placeholder="제목을 입력하세요" value={title} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}/>
            <select id='category' className="border-2 border-lightGreen rounded-10px" onChange={setSelectedCategory}>
                {
                    lawyerSpeciality.map((item, idx) => (
                        <option key={idx} value={item.legalSpecialtyName}>{item.legalSpecialtyDescription}</option>
                    ))
                }
            </select>
            <div>
                <label>첫 발생일</label>
                <input className="border-2 border-lightGreen rounded-10px" type={"date"} value={occurenceDate} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setOccurenceDate(e.target.value)}/>
            </div>
            <input className="border-2 border-lightGreen rounded-10px" type={"text"} placeholder="내용을 입력하세요." value={content} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}/>
            <button className="bg-lightGreen rounded-10px" type={"submit"}>등록하기</button>
        </form>
    )
}