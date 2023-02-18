import React from 'react';

const InputPasswordConfirmationContainer = ({password, passwordConfirmation, handleOnChange}) => {
    return (
        <div className='inputFormContainer'>
            <input
                style={(passwordConfirmation?.length > 0 && password !== passwordConfirmation) || ((password?.length < 8 || password?.length > 16) || (passwordConfirmation?.length < 8 || passwordConfirmation?.length > 16)) ? { borderBottom: "1px solid red" } : null}
                placeholder='Confirmación de contraseña'
                onChange={handleOnChange}
                value={passwordConfirmation}
                name="passwordConfirmation"
                required
                type="password" />
            <i className="bi bi-lock" style={(passwordConfirmation?.length > 0 && password !== passwordConfirmation) || ((password?.length < 8 || password?.length > 16) || (passwordConfirmation?.length < 8 || passwordConfirmation?.length > 16)) ? { color: "red" } : null}></i>
        </div>
    );
}

export default InputPasswordConfirmationContainer;
