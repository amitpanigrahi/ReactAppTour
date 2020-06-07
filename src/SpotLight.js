import React from "react";
import s from "./Spotlight.module.scss";

const SpotLight = props => {
    const {
        spacing = 0,
        spotLightRef,
    } = props;
    return (
        <div className={s.overLay}>
            <div ref={spotLightRef} className={`${s.spotlight} spotlight`}/>
            <style jsx>{`
                div.spotlight {
                    height: ${props.height + (spacing * 2)}px;
                    left: ${props.left - spacing}px;
                    top: ${props.top - spacing}px;
                    width: ${props.width + (spacing * 2)}px;
                    z-index: 111;
                }
            `}</style>
        </div>
    )
};

export default SpotLight;
