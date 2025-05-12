import React from "react";

export const PrevArrowComponent = (props: any): React.JSX.Element => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} group`}
      style={{ ...style, display: "block", background: "none" }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="66"
        fill="none"
        viewBox="0 0 33 66"
      >
        <path
          fill="#555555"
          fillRule="evenodd"
          d="M21 50a2 2 0 0 0 1.414-3.414L11.828 36l10.586-10.586a2 2 0 1 0-2.828-2.828l-12 12a2 2 0 0 0 0 2.828l12 12A1.994 1.994 0 0 0 21 50z"
          clipRule="evenodd"
          className="group-hover:fill-[#9CB395] transition-colors"
        />
      </svg>
    </div>
  );
};
