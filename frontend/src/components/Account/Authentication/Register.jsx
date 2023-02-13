import { React, useState, useContext } from 'react';
import { AuthContext } from '../../../context/auth/AuthProvider';
import { Link } from 'react-router-dom';
import UsePassword from '../../../hooks/TogglePassword/UsePassword';
import "./Login&Register.scss";
const Register = () => {
    const { signUp } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const { togglePassword, inputType, iconClassName } = UsePassword()
    const handleOnChange = (e) => {
        e.preventDefault()
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const { name,
        surname,
        email,
        emailConfirmation,
        password,
        passwordConfirmation
    } = user
    return (
        <div className='container'>
            <div className='signUpForm'>
                <h2>CREAR CUENTA</h2>
                <form onSubmit={(e) => signUp(e, user)}>
                    <label>Nombre</label>
                    <input
                        onChange={handleOnChange}
                        value={name}
                        name="name"
                        required
                        type="text" />
                    <label>Apellido</label>
                    <input
                        onChange={handleOnChange}
                        value={surname}
                        name="surname"
                        required
                        type="text" />
                    <label>Email</label>
                    <input
                        onChange={handleOnChange}
                        value={email}
                        name="email"
                        required
                        type="email" />
                    <label>Confirmación de email</label>
                    <input
                        onChange={handleOnChange}
                        value={emailConfirmation}
                        name="emailConfirmation"
                        required
                        type="email" />
                    <label>Contraseña</label>
                    <div className='inputPasswordContainer'>
                        <input
                            className="inputPasswordToggable"
                            onChange={handleOnChange}
                            value={password}
                            name="password"
                            required
                            type={inputType} /><i onClick={togglePassword} className={iconClassName}></i>
                    </div>
                    <label>Confirmación de contraseña</label>
                    <input
                        onChange={handleOnChange}
                        value={passwordConfirmation}
                        name="passwordConfirmation"
                        required
                        type="password" />
                    <button type='submit' className='purpleButton'>REGISTRARME</button>
                </form>
                <div className='forgotPasswordContainer'>
                    <p>¿Ya tenés cuenta?</p>
                    <Link to="/login"><p>Inicia sesión acá</p></Link>
                </div>

            </div>
        </div>

    );
}

export default Register;
