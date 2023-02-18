import React from 'react';

const InputPasswordContainer = ({password, togglePassword, iconClassName, handleOnChange, inputType}) => {
    return (
        <div className='inputFormContainer'>
            <input
                style={(password?.length > 0 && password?.length < 8) || password?.length > 16 ? { borderBottom: "1px solid red" } : null}
                placeholder='Contraseña'
                className="inputPasswordToggable"
                onChange={handleOnChange}
                value={password}
                name="password"
                required
                type={inputType} />
            <i className="bi bi-lock" style={(password?.length > 0 && password?.length < 8) || password?.length > 16 ? { color: "red" } : null}></i>
            <i onClick={togglePassword} className={iconClassName} style={(password?.length > 0 && password?.length < 8) || password?.length > 16 ? { color: "red" } : null}></i>
            <p style={(password?.length > 0 && password?.length < 8) || password?.length > 16 ? { marginTop: "-15px", paddingBottom: "20px", textAlign: "center", fontSize: "0.8em", color: "red" } : { marginTop: "-15px", paddingBottom: "20px", textAlign: "center", fontSize: "0.8em" }}>La contraseña debe tener entre 8 y 16 caracteres</p>
        </div>
    );
}

export default InputPasswordContainer;
