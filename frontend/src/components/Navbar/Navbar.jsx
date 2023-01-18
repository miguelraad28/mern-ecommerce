import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>INICIO</li>
                <li>CURSOS</li>
                <li>PRODUCTOS</li>
            </ul>
            <Link to="/myaccount"><button>My Account</button></Link>
            <Link to="/login"><button>Iniciar sesion</button></Link>
            <Link to="/register"><button>Registrarme</button></Link>
        </nav>
    );
}

export default Navbar;
