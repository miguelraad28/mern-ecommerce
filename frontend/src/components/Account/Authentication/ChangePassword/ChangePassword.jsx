import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import UsePassword from '../../../../hooks/TogglePassword/UsePassword';
const ChangePassword = () => {
    const [passwords, setPasswords] = useState({});
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
                    <div className='inputFormContainer'>
                        <input
                            style={(newPassword?.length > 0 && newPassword?.length < 8) || newPassword?.length > 16 ? { borderBottom: "1px solid red" } : null}
                            placeholder='Nueva contraseña'
                            className='inputPasswordToggable'
                            onChange={handleOnChange}
                            value={newPassword}
                            name="newPassword"
                            required
                            type={inputType} />
                        <i className="bi bi-lock" style={(newPassword?.length > 0 && newPassword?.length < 8) || newPassword?.length > 16 ? { color: "red" } : null}></i>
                        <i onClick={togglePassword} className={iconClassName} style={(newPassword?.length > 0 && newPassword?.length < 8) || newPassword?.length > 16 ? { color: "red" } : null}></i>
                        <p style={(newPassword?.length > 0 && newPassword?.length < 8) || newPassword?.length > 16 ? { marginTop: "-15px", paddingBottom: "20px", textAlign: "center", fontSize: "0.8em", color: "red" } : { marginTop: "-15px", paddingBottom: "20px", textAlign: "center", fontSize: "0.8em" }}>La contraseña debe tener entre 8 y 16 caracteres</p>
                    </div>
                    <div className='inputFormContainer'>
                        <input
                            placeholder='Confirmar nueva contraseña'
                            onChange={handleOnChange}
                            value={newPasswordConfirmation}
                            style={(newPasswordConfirmation?.length > 0 && newPassword !== newPasswordConfirmation) || ((newPassword?.length < 8 || newPassword?.length > 16) || (newPasswordConfirmation?.length < 8 || newPasswordConfirmation?.length > 16)) ? { borderBottom: "1px solid red" } : null}
                            name="newPasswordConfirmation"
                            required
                            type="password" />
                        <i className="bi bi-lock" style={(newPasswordConfirmation?.length > 0 && newPassword !== newPasswordConfirmation) || ((newPassword?.length < 8 || newPassword?.length > 16) || (newPasswordConfirmation?.length < 8 || newPasswordConfirmation?.length > 16)) ? { color: "red" } : null}></i>
                    </div>
                    <button type='submit' className='salmonButton'>CAMBIAR CONTRASEÑA</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
