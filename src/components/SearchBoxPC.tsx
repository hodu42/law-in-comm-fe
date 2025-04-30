import React, { useState } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

export const SearchBoxPC = ():React.JSX.Element => {

    const { setKeyword } = useAppDispatch();
    const { keyword } = useAppSelector();
    const navigate = useNavigation();
    const [localKeyword, setLocalKeyword] = useState<string>(keyword);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setKeyword(localKeyword);
        navigate.goToQuestionList();
    }
    return (
        <form className="z-0 hidden pc:flex w-[57%] items-center" method="GET" onSubmit={handleSubmit}>
            <svg className="text-[#9CB395] absolute translate-x-2.5" width="28" height="28"><path fill="currentColor" d="m22.867 24.5-7.35-7.35a7.11 7.11 0 0 1-4.433 1.517c-2.12 0-3.914-.734-5.382-2.202C4.234 14.996 3.5 13.203 3.5 11.083c0-2.12.734-3.913 2.202-5.38C7.17 4.233 8.964 3.5 11.083 3.5c2.12 0 3.913.734 5.382 2.202 1.468 1.468 2.202 3.262 2.202 5.381a7.11 7.11 0 0 1-1.517 4.434l7.35 7.35-1.633 1.633Zm-11.784-8.167c1.459 0 2.698-.51 3.72-1.53 1.02-1.022 1.53-2.261 1.53-3.72 0-1.458-.51-2.698-1.53-3.718-1.022-1.021-2.261-1.532-3.72-1.532-1.458 0-2.698.51-3.718 1.532-1.021 1.02-1.532 2.26-1.532 3.718 0 1.459.51 2.698 1.532 3.72 1.02 1.02 2.26 1.53 3.718 1.53Z"/></svg>
            <input className="focus:outline-none flex w-[100%] h-11 pr-3.5 pl-[61px] border-[2px] rounded-10px border-lightGreen placeholder:text-[#E2E4E5]" value={localKeyword} type="search" placeholder="검색어를 입력해주세요." onChange={(e) => setLocalKeyword(e.target.value)}/>
        </form>
    )
}