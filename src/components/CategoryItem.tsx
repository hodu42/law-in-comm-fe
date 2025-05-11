import React from "react";
import { CategoryIcon } from "./CategoryIcon";
import { Link } from "react-router-dom";

interface CategoryItemProps {
  title: string;
  value: string;
}

export const CategoryItem = ({
  title,
  value,
}: CategoryItemProps): React.JSX.Element => {
  const content = (
    <Link
      className="flex gap-[11px] pc:gap-[28px] flex-col items-center group"
      to={`/questions?keyword=&category=${value}&page=0`}
    >
      <div className="w-[48px] h-[48px] pc:w-[72px] pc:h-[72px]">
        <CategoryIcon
          type={title}
          className="text-[#656565] group-hover:text-[#9CB395]"
        />
      </div>
      <span className="block whitespace-nowrap font-normal pc:font-bold text-[13px] pc:text-[19px] text-[#656565] group-hover:text-[#9CB395] transition-colors">
        {title}
      </span>
    </Link>
  );

  return (
    <li>
      <div className="flex gap-[11px] pc:gap-[28px] flex-col items-center group hover:cursor-pointer">
        {content}
      </div>
    </li>
  );
};
