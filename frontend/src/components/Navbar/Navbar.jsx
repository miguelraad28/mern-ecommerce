import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.scss";
import { AuthContext } from '../../context/auth/AuthProvider';
import { CartContext } from '../../context/cart/CartProvider';

const Navbar = () => {
    const { userLoggedIn } = useContext(AuthContext)
    const { cart } = useContext(CartContext)
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
                    <Link to="/myaccount"><i className="bi bi-person-circle"></i></Link>
                    :
                    <>
                        <Link to="/login"><button className='pinkButton buttonLogInAndSignUp'>INICIAR</button></Link>
                        <Link to="/register"><button className='purpleButton buttonLogInAndSignUp'>CREAR CUENTA</button></Link></>}
                <Link to="/cart"><div className='cartIcon'><i className={cart.length < 1 ? "bi bi-basket" : "bi bi-basket-fill"}></i>{cart.length > 0 ? <span><p>{cart.length}</p></span> : null}</div></Link>
            </div>
        </nav>
    );
}

export default Navbar;