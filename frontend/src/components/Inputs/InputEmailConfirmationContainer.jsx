import React from 'react';

const InputEmailConfirmationContainer = ({email, emailConfirmation, handleOnChange}) => {
    return (
        <div className='inputFormContainer'>
            <input
                style={emailConfirmation?.length > 0 && email !== emailConfirmation ? { borderBottom: "1px solid red" } : null}
                placeholder='Confirmación de email'
                onChange={handleOnChange}
                value={emailConfirmation}
                name="emailConfirmation"
                required
                type="email" />
            <i className={emailConfirmation ? (emailConfirmation?.length < 1 ? "bi bi-envelope" : emailConfirmation?.length > 0 && email !== emailConfirmation ? "bi bi-envelope-x" : "bi bi-envelope-check") : "bi bi-envelope"} style={emailConfirmation?.length > 0 && email !== emailConfirmation ? { color: "red" } : null}></i>
        </div>
    );
}

export default InputEmailConfirmationContainer;
