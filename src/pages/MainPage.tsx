import React from "react";
import {MainHeader} from "../components/MainHeader";
import {RecentQuestions} from "../components/RecentQuestions";

export const MainPage= ():React.JSX.Element => {
    return (
        <div className="flex">
            <MainHeader/>
            <RecentQuestions/>
        </div>
    )
}