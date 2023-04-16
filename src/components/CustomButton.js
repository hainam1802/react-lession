import React from 'react';
import Spinner from "react-bootstrap/Spinner";
const CustomButton = (props) => {
    const {color, className,isLoading, ...other} = props;
    const buttonClass = `btn btn-${color} ${className}`;
    return (
        <button type='button' {...other} className={buttonClass}>
            {
                isLoading ?
                    (
                        <Spinner animation="border" variant="danger" size="sm" />
                    ): (
                        ""
                    )
                }
            {props.children}
        </button>
    )
}

export default CustomButton;