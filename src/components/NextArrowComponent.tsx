import React from "react";

export const NextArrowComponent = (props:any):React.JSX.Element => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", background:"none"}}
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="66" fill="none"><path fill="#5C6E56" fill-rule="evenodd" d="M22.61 32.882 3.2 52.292l3.88 3.882 21.352-21.351a2.745 2.745 0 0 0 0-3.882L7.081 9.59 3.199 13.47l19.41 19.411Z" clip-rule="evenodd"/></svg>
        </div>
    )
}