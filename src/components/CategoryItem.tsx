import React from "react";
import { CategoryIcon } from "./CategoryIcon";

interface CategoryItemProps {
  title: string;
  link: string;
}

export const CategoryItem = ({ title, link }: CategoryItemProps): React.JSX.Element => {
  return (
    <li>
      <a className="flex gap-[11px] mobile:gap-[28px] flex-col items-center group" href={link}>
        <div className="w-[48px] h-[48px] mobile:w-[72px] mobile:h-[72px]">
          <CategoryIcon type={title} className="text-[#656565] group-hover:text-[#9CB395]" />
        </div>
        <span className="block whitespace-nowrap font-normal mobile:font-bold text-[13px] mobile:text-[19px] text-[#656565] group-hover:text-[#9CB395]">
          {title}
        </span>
      </a>
    </li>
  );
}; 