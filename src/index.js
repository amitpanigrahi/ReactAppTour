import React, {useEffect, useRef, useState} from "react";
import Portal from "./Portal";
import {getNodeRect, getWindow} from "../../../utils/helpers/dom";
import SpotLight from "./SpotLight";
import s from "./index.module.scss";
import BasicToolTip from "../ToolTip/BasicToolTip";
import RenderIfTrue from "../../_hoc/RenderIfTrue";
import TooltipDataContainer from "./TooltipDataContainer";

const initialState = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    w: 0,
    h: 0,
};

const AppGuider = props => {
    if (!process.browser) return null;
    const {
        steps = [],
        onComplete
    } = props;
    const initialSpacing = props.spacing || 0;
    const [spacing, setSpacing] = useState(initialSpacing);
    const [showGuide, setGuide] = useState(props["showGuide"] || true);
    const [current, setCurrent] = useState(0);
    const [nodeState, setState] = useState(initialState);
    const [tooltipContent, setTooltipContent] = useState(null);
    let spotLightRef = useRef(null);
    useEffect(() => {
        let resizeId;
        document.body.style.overflow = "hidden";
        window.addEventListener('resize', () => {
            clearTimeout(resizeId);
            resizeId = setTimeout(makeNodeCalculations, 1000);
        });
        return (() => {
            document.body.style.removeProperty("overflow");
            window.removeEventListener('resize', makeNodeCalculations);
            clearTimeout(resizeId);
        })
    }, [current]);

    useEffect(() => {
        makeNodeCalculations();
    }, [current]);

    const makeNodeCalculations = () => {
        const currentRef = steps[current];
        setSpacing(currentRef && currentRef.spacing || initialSpacing);
        const node = currentRef && currentRef.selector ? document.querySelector(currentRef.selector) : null;
        if (node) {
            if ((getNodeRect(node).top + getNodeRect(node).height) > getWindow().h) {
                window.scrollTo(0, getNodeRect(node).top);
            }
            setState(getNodeRect(node));
            if (currentRef.content) setTooltipContent(currentRef.content);
        }
        else {
            handlerEvents.onNext()
        }
    };

    const onFinish = () => {
        if (onComplete) {
            window.scrollTo(0, 0);
            onComplete();
        }
    };

    const handlerEvents = {
        onClose: () => {
            setGuide(false);
            setCurrent(current < steps.length-1 ? current+1 : 0)
        },

        onNext: () => {
            (current + 1 === steps.length) && onFinish();
            setCurrent(current < steps.length - 1 ? current + 1 : 0);
        },
        onPrev: () => setCurrent(current > 0 ? current - 1 : steps.length - 1),
    };

    return (
        showGuide && steps.length ?
        <Portal>
            <div className={s.stepsView}>
                <p className={"sm_font24 font_40 font_white font_heavy"}>Step {current + 1} <span className={"font_light"}>of</span> {steps.length}</p>
            </div>
            <SpotLight
                height={nodeState.height}
                left={nodeState.left}
                top={nodeState.top}
                width={nodeState.width}
                spacing={spacing}
                spotLightRef={spotLightRef}
            />
            <RenderIfTrue condition={tooltipContent}>
                <BasicToolTip toolTipContent={<TooltipDataContainer handlerEvents={handlerEvents} data={tooltipContent}/>} elementRef={spotLightRef} />
            </RenderIfTrue>
        </Portal> : null
    )
};

export default AppGuider;
