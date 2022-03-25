import React from "react";
import { Button } from "../../../types/button";
import style from './Button.module.css';

const Button = ({ children, onClick, buttonStyle }: Button): JSX.Element => {
    return(
        <button 
            onClick={ onClick }
            className={ buttonStyle ? style[buttonStyle] : style.button } 
        >
            { children }
        </button>
    )
}

export default Button;