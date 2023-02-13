import { React, useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from '../../context/auth/AuthProvider';
import "./MyAccount.scss";
const MyAccount = () => {
    const { userLoggedIn, logOut } = useContext(AuthContext);
    const { name, surname, email } = userLoggedIn
    const location = useLocation()
    return (
        <div className='container'>
            <div div className='myAccountContainer' >
                {location?.state?.message ? <p className='messageAccountCreated'>{location.state.message}</p> : null}
                <h2 className='titleh2'>MI CUENTA</h2>
                <div className='myAccountDataContainer'>
                    {/* AccountDataField */}
                    <div className='myAccountFieldName'>Nombre</div>
                    <div className='myAccountData'><p><i className="bi bi-pencil-square"></i>{name}</p></div>
                    {/* AccountDataField */}
                    <div className='myAccountFieldName'>Apellido</div>
                    <div className='myAccountData'><p><i className="bi bi-pencil-square"></i>{surname}</p></div>
                    {/* AccountDataField */}
                    <div className='myAccountFieldName'>Email</div>
                    <div className='myAccountData'><p><i className="bi bi-pencil-square"></i>{email}</p></div>
                    {/* AccountDataField */}
                    <div className='myAccountFieldName'>Contraseña</div>
                    <div className='myAccountData'><p><Link to="/changePassword"><i className="bi bi-pencil-square"></i></Link>●●●●●●●●</p></div>
                </div>
                <div className='myAccountButtonsContainer'>
                    <Link to="/myaccount/courses"><button className='pinkButton'>MIS CURSOS</button></Link>
                    <Link to="/myaccount/purchases"><button className='purpleButton'>MIS COMPRAS</button></Link>
                </div>
                <button className='redButton' onClick={() => logOut()}>CERRAR SESIÓN</button>
            </div >
        </div>
    );
}

export default MyAccount;
