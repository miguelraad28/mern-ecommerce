import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.scss";
import { AuthContext } from '../../context/auth/AuthProvider';
import { CartContext } from '../../context/cart/CartProvider';
import CartWidget from './CartWidget';
import AccountWidget from './AccountWidget';

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
                <AccountWidget userLoggedIn={userLoggedIn} />
                <CartWidget cart={cart} />
            </div>
        </nav>
    );
}

export default Navbar;