import React, { useEffect } from "react";
import "./loading.scss";
export default function LoadingChange({
    isLoading = false,
    text = "Đang tải ...",
}) {
    useEffect(() => {
        let loadingEle = document.querySelector(".loading-change_page");
        const bodyElement = document.querySelector("body");
        bodyElement.style.overflow = isLoading ? "hidden" : "auto";
        loadingEle.classList.toggle("show", isLoading);
    }, [isLoading]);
    return (
        <div className='loading-change_page'>
            <p>{text}</p>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                style={{
                    margin: "auto",
                    background: "rgba(255, 255, 255, 0)",
                    display: "block",
                }}
                width='91px'
                height='91px'
                viewBox='0 0 100 100'
                preserveAspectRatio='xMidYMid'
            >
                <g transform='translate(20 50)'>
                    <circle cx={0} cy={0} r={4} fill='#969696'>
                        <animateTransform
                            attributeName='transform'
                            type='scale'
                            begin='-0.19946808510638298s'
                            calcMode='spline'
                            keySplines='0.3 0 0.7 1;0.3 0 0.7 1'
                            values='0;1;0'
                            keyTimes='0;0.5;1'
                            dur='0.5319148936170213s'
                            repeatCount='indefinite'
                        />
                    </circle>
                </g>
                <g transform='translate(40 50)'>
                    <circle cx={0} cy={0} r={4} fill='#bdbdbd'>
                        <animateTransform
                            attributeName='transform'
                            type='scale'
                            begin='-0.13297872340425532s'
                            calcMode='spline'
                            keySplines='0.3 0 0.7 1;0.3 0 0.7 1'
                            values='0;1;0'
                            keyTimes='0;0.5;1'
                            dur='0.5319148936170213s'
                            repeatCount='indefinite'
                        />
                    </circle>
                </g>
                <g transform='translate(60 50)'>
                    <circle cx={0} cy={0} r={4} fill='#9d9d9d'>
                        <animateTransform
                            attributeName='transform'
                            type='scale'
                            begin='-0.06648936170212766s'
                            calcMode='spline'
                            keySplines='0.3 0 0.7 1;0.3 0 0.7 1'
                            values='0;1;0'
                            keyTimes='0;0.5;1'
                            dur='0.5319148936170213s'
                            repeatCount='indefinite'
                        />
                    </circle>
                </g>
                <g transform='translate(80 50)'>
                    <circle cx={0} cy={0} r={4} fill='#bdbdbd'>
                        <animateTransform
                            attributeName='transform'
                            type='scale'
                            begin='0s'
                            calcMode='spline'
                            keySplines='0.3 0 0.7 1;0.3 0 0.7 1'
                            values='0;1;0'
                            keyTimes='0;0.5;1'
                            dur='0.5319148936170213s'
                            repeatCount='indefinite'
                        />
                    </circle>
                </g>
            </svg>
            {/* <svg
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                style={{ margin: "auto", display: "block" }}
                width='224px'
                height='224px'
                viewBox='0 0 100 100'
                preserveAspectRatio='xMidYMid'
            >
                <circle
                    cx={50}
                    cy={50}
                    r={0}
                    fill='none'
                    stroke='#1bbcdb'
                    strokeWidth={4}
                >
                    <animate
                        attributeName='r'
                        repeatCount='indefinite'
                        dur='1.0989010989010988s'
                        values='0;40'
                        keyTimes='0;1'
                        keySplines='0 0.2 0.8 1'
                        calcMode='spline'
                        begin='-0.5494505494505494s'
                    />
                    <animate
                        attributeName='opacity'
                        repeatCount='indefinite'
                        dur='1.0989010989010988s'
                        values='1;0'
                        keyTimes='0;1'
                        keySplines='0.2 0 0.8 1'
                        calcMode='spline'
                        begin='-0.5494505494505494s'
                    />
                </circle>

                <circle
                    cx={50}
                    cy={50}
                    r={0}
                    fill='none'
                    stroke='#3be2f5'
                    strokeWidth={4}
                >
                    <animate
                        attributeName='r'
                        repeatCount='indefinite'
                        dur='1.0989010989010988s'
                        values='0;40'
                        keyTimes='0;1'
                        keySplines='0 0.2 0.8 1'
                        calcMode='spline'
                    />
                    <animate
                        attributeName='opacity'
                        repeatCount='indefinite'
                        dur='1.0989010989010988s'
                        values='1;0'
                        keyTimes='0;1'
                        keySplines='0.2 0 0.8 1'
                        calcMode='spline'
                    />
                </circle>
            </svg> */}
        </div>
    );
}
