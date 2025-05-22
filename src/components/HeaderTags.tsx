import React from "react";
import { Link, useLocation } from "react-router-dom";
import { headerPaths } from "@/routes/routes";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { getCurrentRole } from "@/hooks/tokenDecoder";
import { Role } from "@/types/role";
import { searchActions } from "@/store/search";

export const HeaderTags = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const userRole = getCurrentRole();

  const handleQuestionListClick = () => {
    dispatch(searchActions.setKeyword(""));
  };

  const visiblePaths = headerPaths.filter((path) => {
    if (!path.roles || path.roles.length === 0) {
      return true;
    }
    if (userRole && path.roles.includes(userRole as Role)) {
      return true;
    }

    return false;
  });

  return (
    <nav className="hidden absolute pc:flex items-center w-full h-[72px] gap-[50px]">
      {visiblePaths.map((path, idx) => (
        <Link
          key={idx}
          to={path.link}
          onClick={handleQuestionListClick}
          className={`text-[#CECFD3] text-[24px] font-bold py-4 h-full hover:text-black hover:border-b-black hover:border-b-2 aria-[current=page]:text-black aria-[current=page]:border-b-black aria-[current=page]:border-b-2 transition-colors`}
          aria-current={
            location.pathname.startsWith(path.currentCheck) ? "page" : undefined
          }
        >
          {path.title}
        </Link>
      ))}
    </nav>
  );
};
