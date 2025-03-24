import React from "react";
import Slider, {Settings} from "react-slick";
import {PrevArrowComponent} from "./PrevArrowComponent";
import {NextArrowComponent} from "./NextArrowComponent";


export const RecentQuestions = ():React.JSX.Element => {
    function PrevArrow(props:any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "red" }}
                onClick={onClick}
            >
                <PrevArrowComponent/>
            </div>
        )
    };
    function NextArrow(props:any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "none" }}
                onClick={onClick}
            >
                <NextArrowComponent/>
            </div>
        )
    }

    const settings:Settings = {
        dots: true,
        lazyLoad: "anticipated",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <NextArrowComponent/>,
        prevArrow: <PrevArrowComponent/>
    };
    return (
        <section className="flex flex-col gap-[28px] w-full mt-[144px] px-[273px] py-[37.6px] bg-[#F7F7FA]">
            <h1 className="w-full text-center text-[26px] text-[#1F2225] font-bold">최근 질문</h1>
            <div className="slider-container">
                <Slider {...settings}>
                    <div className="w-[847px] h-[377px]">
                        <img className="" src={"https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg"} />
                    </div>
                    <div className="w-[847px] h-[377px]">
                        <img className="" src={"https://cdn.britannica.com/39/226539-050-D21D7721/Portrait-of-a-cat-with-whiskers-visible.jpg"} />
                    </div>
                    <div>
                        <img className="w-[847px] h-[377px]" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg"} />
                    </div>
                    <div>
                        <img className="w-[847px] h-[377px]" src={"https://www.vets4pets.com/siteassets/species/cat/cat-close-up-of-side-profile.jpg"} />
                    </div>
                </Slider>
            </div>
        </section>
    )
}