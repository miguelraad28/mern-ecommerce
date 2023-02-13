import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import UsePassword from '../../../../hooks/TogglePassword/UsePassword';
const ChangePassword = () => {
    const [passwords, setPasswords] = useState({
        newPassword: "",
        newPasswordConfirmation: ""
    });
    const { togglePassword, inputType, iconClassName } = UsePassword()
    const navigate = useNavigate()
    const handleOnChange = (e) => {
        e.preventDefault()
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        })
    }
    const changePassword = async (e, passwords) => {
        e.preventDefault()
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/changePassword`, passwords, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem("x-access-token"))
            }
        })
        if (res.data.pending) {
            Swal.fire(res.data.message)
        } else {
            navigate(res.data.navigate, { state: { message: res.data.message } })
        }
    }
    const { newPassword, newPasswordConfirmation } = passwords
    return (
        <div className='container'>
            <div className='logInForm' >
                <h2>CAMBIAR CONTRASEÑA</h2>
                <form onSubmit={(e) => changePassword(e, passwords)}>
                    <label>Nueva contraseña</label>
                    <div className='inputPasswordContainer'>
                        <input
                            className='inputPasswordToggable'
                            onChange={handleOnChange}
                            value={newPassword}
                            name="newPassword"
                            required
                            type={inputType} /><i onClick={togglePassword} className={iconClassName}></i>
                    </div>
                    <label>Confirmar nueva contraseña</label>
                    <input
                        onChange={handleOnChange}
                        value={newPasswordConfirmation}
                        name="newPasswordConfirmation"
                        required
                        type="password" />
                    <button type='submit' className='orangeButton'>CAMBIAR CONTRASEÑA</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
