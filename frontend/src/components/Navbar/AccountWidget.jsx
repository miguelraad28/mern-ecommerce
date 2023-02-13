import React from 'react';
import { Link } from 'react-router-dom';
import "./NavbarWidgets.scss"
const AccountWidget = ({userLoggedIn}) => {
    return (
        <>
            {
                userLoggedIn ?
                    <Link to="/myaccount">< i className="bi bi-person-circle" ></i ></Link >
                    :
                    <>
                        <Link to="/login"><button className='pinkButton buttonLogInAndSignUp'>INICIAR</button></Link>
                        <Link to="/register"><button className='purpleButton buttonLogInAndSignUp'>CREAR CUENTA</button></Link>
                    </>}
        </>
    );
}

export default AccountWidget;
