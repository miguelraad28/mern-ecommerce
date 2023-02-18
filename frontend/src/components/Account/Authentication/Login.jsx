import { React, useState, useContext } from 'react';
import { AuthContext } from '../../../context/auth/AuthProvider';
import { Link } from 'react-router-dom';
import UsePassword from '../../../hooks/TogglePassword/UsePassword';
import "./Login&Register.scss";
const Login = () => {
    const { logIn } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const { togglePassword, inputType, iconClassName } = UsePassword()
    const handleOnChange = (e) => {
        e.preventDefault()
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const {
        email,
        password,
    } = user
    return (
        <div className='gridContainer'>
            <div className='logInForm' >
                <h2>INICIAR SESIÓN</h2>
                <form onSubmit={(e) => logIn(e, user)}>
                    <div className='inputFormContainer'>
                        <input
                            placeholder='Dirección de email'
                            onChange={handleOnChange}
                            value={email}
                            name="email"
                            required
                            type="email" />
                        <i className="bi bi-envelope"></i>
                    </div>

                    <div className='inputFormContainer'>
                        <input
                            placeholder='Contraseña'
                            className="inputPasswordToggable"
                            onChange={handleOnChange}
                            value={password}
                            name="password"
                            required
                            type={inputType} />
                        <i className="bi bi-lock"></i>
                        <i onClick={togglePassword} className={iconClassName}></i>
                    </div>
                    <button type='submit' className='pinkButton'>INICIAR</button>
                </form>
                <div className='forgotPasswordContainer'>
                    <div>
                        <p>¿Olvidaste tu contraseña?</p>
                        <Link to="/recoverPassword"><p>Recuperala acá</p></Link>
                    </div>
                    <div>
                        <p>¿No tenés cuenta?</p>
                        <Link to="/register"><p>Regístrate acá</p></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
