import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.scss";
import { AuthContext } from '../../context/auth/AuthProvider';

const Navbar = () => {
    const { userLoggedIn } = useContext(AuthContext)
    return (
        <nav>
            <div className='navbarNavigation'>
                <ul>
                    <Link to="/"><li>INICIO</li></Link>
                    <Link to="/courses"><li>CURSOS</li></Link>
                    <Link to="/products"><li>PRODUCTOS</li></Link>
                </ul>
            </div>
            <div className='navbarButtons'>
                {userLoggedIn ?
                    <Link className='myAccountIcon' to="/myaccount"><i className="bi bi-person-circle"></i></Link>
                    :
                    <>
                        <Link className="logInButton" to="/login"><button>Iniciar</button></Link>
                        <Link className="signUpButton" to="/register"><button>Registrarme</button></Link></>}
                <Link to="/cart">Cart</Link>
            </div>
        </nav>
    );
}

export default Navbar;