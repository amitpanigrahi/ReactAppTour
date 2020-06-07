import React from "react";
import s from "./ToolTip.module.scss";
// import Portal from "./Portal";

const ToolTip = ({onNextClick, onPrevClick}) => {
    return (
        <div className={s.toolTip}>
            <div style={{position: "relative", marginRight: "10px", cursor: "pointer", zIndex: 999999}} onClick={onPrevClick}>PREVIOUS</div>
            <div style={{position: "relative", cursor: "pointer", zIndex: 999999}} onClick={onNextClick}>NEXT</div>
        </div>
    )
};

export default ToolTip;
