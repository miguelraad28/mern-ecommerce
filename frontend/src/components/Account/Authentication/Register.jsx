import { React, useState, useContext } from 'react';
import { AuthContext } from '../../../context/auth/AuthProvider';
import { Link } from 'react-router-dom';
import UsePassword from '../../../hooks/TogglePassword/UsePassword';
import "./Login&Register.scss";
import InputEmailConfirmationContainer from '../../Inputs/InputEmailConfirmationContainer';
import InputPasswordContainer from '../../Inputs/InputPasswordContainer';
import InputPasswordConfirmationContainer from '../../Inputs/InputPasswordConfirmationContainer';
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
                    <div className='inputFormContainer'>
                        <input
                            placeholder='Nombre'
                            onChange={handleOnChange}
                            value={name}
                            name="name"
                            required
                            type="text" />
                        <i class="bi bi-person-vcard"></i>
                    </div>
                    <div className='inputFormContainer'>
                        <input
                            placeholder='Apellido'
                            onChange={handleOnChange}
                            value={surname}
                            name="surname"
                            required
                            type="text" />
                        <i class="bi bi-person-vcard-fill"></i>
                    </div>
                    <div className='inputFormContainer'>
                        <input
                            placeholder='Dirección de email'
                            onChange={handleOnChange}
                            value={email}
                            name="email"
                            required
                            type="email" />
                        <i class="bi bi-envelope"></i>
                    </div>
                    <InputEmailConfirmationContainer email={email} emailConfirmation={emailConfirmation} handleOnChange={handleOnChange}/>
                    <InputPasswordContainer password={password} togglePassword={togglePassword} iconClassName={iconClassName} handleOnChange={handleOnChange} inputType={inputType}/>
                    <InputPasswordConfirmationContainer password={password} passwordConfirmation={passwordConfirmation} handleOnChange={handleOnChange}/>
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
