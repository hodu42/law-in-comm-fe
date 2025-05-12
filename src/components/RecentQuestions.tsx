import React, { useRef } from "react";
import Slider, { Settings } from "react-slick";
import { PrevArrowComponent } from "@/components/PrevArrowComponent";
import { NextArrowComponent } from "@/components/NextArrowComponent";
import { RecentQuestionsContent } from "@/components/RecentQuestionsContent";
import { Question } from "@/types/question";

interface RecentQuestionsProps {
  recentQuestions: Question[];
}

export const RecentQuestions = ({
  recentQuestions,
}: RecentQuestionsProps): React.JSX.Element => {
  let sliderRef: React.RefObject<Slider> = useRef<Slider>(null);
  const settings: Settings = {
    dots: true,
    lazyLoad: "anticipated",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrowComponent />,
    prevArrow: <PrevArrowComponent />,
    autoplay: true,
    autoplaySpeed: 5000,
    appendDots: (dots: any) => (
      <div className="hidden w-full absolute min-[960px]:flex items-center justify-center bottom-6">
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "dots_custom",
  };

  return (
    <section className="flex flex-col gap-[28px] max-w-1350px pc:w-full w-[90%] pc:mt-[144px] mt-[0px] py-[37.6px] bg-[#F7F7FA]">
      <h1 className="w-full pc:text-center text-left text-[20px] pc:text-[26px] text-[#1F2225] font-bold">
        최근 질문
      </h1>
      <div className="recentQuestion-slider-container min-w-[100%]">
        {recentQuestions.length === 0 ? (
          <div className="flex items-center justify-center font-bold text-[#5C6E56] text-[20px] pc:text-[26px] w-[350px] min-h-[250px] pc:w-[848px] pc:h-[396px] bg-white rounded-[10px] mx-auto p-[20px] pc:p-[30px] border-2 border-[#5C6E56] transition-all relative">
            최근 질문이 없습니다.
          </div>
        ) : recentQuestions.length === 1 ? (
          <RecentQuestionsContent {...recentQuestions[0]} />
        ) : (
          <Slider ref={sliderRef} {...settings}>
            {recentQuestions.map((question) => (
              <RecentQuestionsContent key={question.questionId} {...question} />
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};
