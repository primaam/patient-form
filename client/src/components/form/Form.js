import React from "react";
import "./Form.css";

const Form = (props) => {
    const { labelForm, children } = props;
    return (
        <div className="form">
            <label>{labelForm}</label>
            {children}
        </div>
    );
};

export default Form;
