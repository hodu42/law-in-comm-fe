import React from "react";
import { CategoryItem } from "./CategoryItem";
import { LegalSpecialityLabels } from "@/types/speciality";

export const QuestionCategories = (): React.JSX.Element => {
  const categories = [
    { label: LegalSpecialityLabels.SEXUAL_CRIMES, value: "SEXUAL_CRIMES" },
    {
      label: LegalSpecialityLabels.PROPERTY_CRIMES_EMBEZZLEMENT,
      value: "PROPERTY_CRIMES_EMBEZZLEMENT",
    },
    { label: LegalSpecialityLabels.ASSAULT_GENERAL, value: "ASSAULT_GENERAL" },
    { label: LegalSpecialityLabels.FAMILY_DIVORCE, value: "FAMILY_DIVORCE" },
    { label: LegalSpecialityLabels.CORPORATE_LAW, value: "CORPORATE_LAW" },
    {
      label: LegalSpecialityLabels.TRAFFIC_ACCIDENT_HIT_RUN,
      value: "TRAFFIC_ACCIDENT_HIT_RUN",
    },
    {
      label: LegalSpecialityLabels.ASSAULT_DEFAMATION,
      value: "ASSAULT_DEFAMATION",
    },
  ];

  return (
    <div className="flex w-[90%] justify-center py-[30px] mb-[80px] pc:m-0 mt-[3rem]">
      <nav className="flex flex-col gap-[28px] w-full justify-center max-w-1350px">
        <h1 className="text-[#1F2225] text-[20px] pc:text-[28px] font-bold">
          분야별 질문글 찾기
        </h1>
        <ul className="question-categories-container flex w-full gap-[20px] justify-between px-[19px] pb-[20px] overflow-auto">
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              title={category.label}
              value={category.value}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};
