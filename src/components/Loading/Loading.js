import React, { useEffect } from "react";
import "./loading.scss";
export default function Loading({ isLoading = false }) {
    useEffect(() => {
        let loadingEle = document.querySelector(".loading_page");
        loadingEle.classList.toggle("show", isLoading);
    }, [isLoading]);
    return (
        <div className='loading_page'>
            <svg
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
            </svg>
        </div>
    );
}
