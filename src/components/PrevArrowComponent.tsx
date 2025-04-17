import React from "react";

export const PrevArrowComponent = (props:any):React.JSX.Element => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", background:"none"}}
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="66" fill="none"><path fill="currentColor" fillRule="evenodd" d="M12.707 5.293a1 1 0 0 1 0 1.414L9.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0Z" clipRule="evenodd"/></svg>
        </div>
    )
}