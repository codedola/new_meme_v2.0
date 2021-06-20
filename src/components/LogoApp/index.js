import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants";
export default function LogoApp() {
    return (
        <Link to={PATHS.HOMEPAGE} className='ass1-logo'>
            Meme App
        </Link>
    );
}
