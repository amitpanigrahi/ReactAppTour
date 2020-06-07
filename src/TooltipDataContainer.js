import React from "react";
import s from "./TooltipDataContainer.module.scss";

const NextButton = ({onClick}) => {
    return (
        <div onClick={onClick} className={`mt_20 font_20 font_heavy font_black_light ${s.buttonCta}`}>
            OK!
        </div>
    )
};

const PrevButton = () => {
    return (
        <div>
            PREV
        </div>
    )
};

const TooltipDataContainer = ({handlerEvents, data}) => {
    const {
        onClose,
        onNext,
        onPrev,
    } = handlerEvents;
    return (
        <div className={s.TooltipDataContainer}>
            <div>
                <p className={"font_32 sm_font16 font_heavy font_white"}>{data}</p>
            </div>
            <div className={s.ctaWrapper}>
                {/*<PrevButton onClick={onPrev}/>*/}
                <NextButton onClick={onNext}/>
            </div>
        </div>
    )
};

export default TooltipDataContainer;
