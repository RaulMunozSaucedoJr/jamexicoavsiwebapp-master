import React from 'react';
const Button = ({id, text, className, type, value, onClick, onSubmit}) => {
    return (
        <>
            <button type={type} id={id} className={className} value={value} onClick={onClick} onSubmit={onSubmit}>
                {text}
            </button>
        </>
    );
}

export default Button;