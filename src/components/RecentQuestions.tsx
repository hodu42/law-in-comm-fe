import React, {useRef} from "react";
import Slider, {Settings} from "react-slick";
import {PrevArrowComponent} from "@/components/PrevArrowComponent";
import {NextArrowComponent} from "@/components/NextArrowComponent";
import {RecentQuestionsContent} from "@/components/RecentQuestionsContent";
import {Question} from "@/types/question";

export const RecentQuestions = ({recentQuestions}:{recentQuestions:Question[]}):React.JSX.Element => {
    let sliderRef:React.RefObject<Slider> = useRef<Slider>(null);
    const settings:Settings = {
        dots: true,
        lazyLoad: "anticipated",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <NextArrowComponent/>,
        prevArrow: <PrevArrowComponent/>,
        autoplay: true,
        autoplaySpeed: 5000,
        appendDots: (dots: any) => (
            <div className="hidden w-full absolute min-[960px]:flex items-center justify-center bottom-6">
                <ul> {dots} </ul>
            </div>
        ),
        dotsClass: 'dots_custom'

    };
    return (
        <section className="flex flex-col gap-[28px] max-w-1350px pc:w-full w-[90%] pc:mt-[144px] mt-[0px] py-[37.6px] bg-[#F7F7FA]">
            <h1 className="w-full pc:text-center text-left text-[20px] pc:text-[26px] text-[#1F2225] font-bold">최근 질문</h1>
            <div className="recentQuestion-slider-container min-w-[100%]">
                <Slider ref={sliderRef} {...settings}>
                    {recentQuestions.map((question) => (
                        <RecentQuestionsContent key={question.questionId} {...question}/>
                    ))}
                </Slider>
            </div>
        </section>
    )
}