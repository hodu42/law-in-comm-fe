import React, {useRef} from "react";
import Slider, {Settings} from "react-slick";
import {PrevArrowComponent} from "./PrevArrowComponent";
import {NextArrowComponent} from "./NextArrowComponent";
import {RecentQuestionsContent} from "./RecentQuestionsContent";

const testQuestion = {
    legalSpeciality: "폭행",
    title: "동료에게 폭행당한 경우의 법적 대응 방법",
    content: "제가 동료한테 3월9일 오후 9시50분이후 동료한테 맞았는데 경찰은 cctv가안나왔다고 합니다 우선 걔랑 길에서 얘기하다 맞은건 분명한데 (상해진단서 고막파열 있음) 문제는 무엇이나면 동료도 발뺌하고 기억이안나는 골치아픈상황입니다 정황상으로봐도 제가 사촌형한테 전화걸고 동료가 날때렸다(이건 제3자가 때렸다고도했지만 처음동료가 절 때렸다함) 고 울면서말했습니다 \n" +
        "그리고 그다음날 아침에도 아는다른형한테하소연 했구요 여기서 경찰이 쌍방폭행기소하면 제 공무원임용불이익과 전과자 가능성이 걱정이됩니다 그리고 혹시나제3자한테 맞은거면 무고죄가 될까 겁도 나고 무섭습니다 모친께는 말씀드렸습니다",
    firstOccurrenceDate: "2025-02-27",
    viewCount: 64,
    url: "abcde",
}

export const RecentQuestions = ():React.JSX.Element => {
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
        <section className="flex flex-col gap-[28px] max-w-1350px mobile:w-full w-[90%] mobile:mt-[144px] mt-[0px] py-[37.6px] bg-[#F7F7FA]">
            <h1 className="w-full mobile:text-center text-left text-[20px] mobile:text-[26px] text-[#1F2225] font-bold">최근 질문</h1>
            <div className="recentQuestion-slider-container">
                <Slider ref={sliderRef} {...settings}>
                    <RecentQuestionsContent legalSpeciality={testQuestion.legalSpeciality} firstOccurrenceDate={testQuestion.firstOccurrenceDate} title={testQuestion.title} content={testQuestion.content} viewCount={testQuestion.viewCount} url={testQuestion.url}/>
                    <RecentQuestionsContent legalSpeciality={testQuestion.legalSpeciality} firstOccurrenceDate={testQuestion.firstOccurrenceDate} title={testQuestion.title} content={testQuestion.content} viewCount={testQuestion.viewCount} url={testQuestion.url}/>
                    <RecentQuestionsContent legalSpeciality={testQuestion.legalSpeciality} firstOccurrenceDate={testQuestion.firstOccurrenceDate} title={testQuestion.title} content={testQuestion.content} viewCount={testQuestion.viewCount} url={testQuestion.url}/>
                    <RecentQuestionsContent legalSpeciality={testQuestion.legalSpeciality} firstOccurrenceDate={testQuestion.firstOccurrenceDate} title={testQuestion.title} content={testQuestion.content} viewCount={testQuestion.viewCount} url={testQuestion.url}/>
                    <RecentQuestionsContent legalSpeciality={testQuestion.legalSpeciality} firstOccurrenceDate={testQuestion.firstOccurrenceDate} title={testQuestion.title} content={testQuestion.content} viewCount={testQuestion.viewCount} url={testQuestion.url}/>
                </Slider>
            </div>
        </section>
    )
}