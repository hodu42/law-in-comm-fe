import React from "react";

export const PrevArrowComponent = (props:any):React.JSX.Element => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", background:"none"}}
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="66" fill="none"><path fill="#5C6E56" fill-rule="evenodd" d="m10.391 32.882 19.41 19.41-3.88 3.882L4.568 34.823a2.745 2.745 0 0 1 0-3.882L25.92 9.59l3.882 3.881-19.41 19.411Z" clip-rule="evenodd"/></svg>
        </div>
    )
}