import React, { useCallback } from "react";
import "./ontotop.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
export default function OnToTop() {
    const handleOnToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    return (
        <div className='OnToTop' onClick={handleOnToTop}>
            <FontAwesomeIcon icon={faAngleDoubleUp} />
        </div>
    );
}
