import { React, useContext, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from '../../context/auth/AuthProvider';
import "./MyAccount.scss";
const MyAccount = () => {
    const { userLoggedIn, logOut } = useContext(AuthContext);
    const { name, surname, email } = userLoggedIn
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <div className='container'>
            <div div className='myAccountContainer' >
                <h2 className='titleh2'>MI CUENTA</h2>
                <div className='myAccountDataContainer'>
                    {/* AccountDataField */}
                    <div className='myAccountFieldName'>Nombre</div>
                    <div className='myAccountData'><p>{name}<i className="bi bi-pencil-square"></i></p></div>
                    {/* AccountDataField */}
                    <div className='myAccountFieldName'>Apellido</div>
                    <div className='myAccountData'><p>{surname}<i className="bi bi-pencil-square"></i></p></div>
                    {/* AccountDataField */}
                    <div className='myAccountFieldName'>Email</div>
                    <div className='myAccountData'><p>{email}<i className="bi bi-pencil-square"></i></p></div>
                    {/* AccountDataField */}
                    <div className='myAccountFieldName'>Contraseña</div>
                    <div className='myAccountData'><p>●●●●●●●●<Link to="/changePassword"><i className="bi bi-pencil-square"></i></Link></p></div>
                </div>
                <div className='myAccountButtonsContainer'>
                    <Link to="/myaccount/courses"><button className='pinkButton'>MIS CURSOS</button></Link>
                    <Link to="/myaccount/purchases"><button className='purpleButton'>MIS COMPRAS</button></Link>
                </div>
                <button className='redButton' onClick={() => logOut()}>CERRAR SESIÓN</button>
                {location?.state?.message ? <p className='locationMessageMyAccount'><i class="bi bi-patch-check-fill"></i>{location.state.message}<i class="bi bi-patch-check-fill"></i></p> : null}
            </div >
        </div>
    );
}

export default MyAccount;
