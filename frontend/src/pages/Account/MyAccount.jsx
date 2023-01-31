import { React, useContext } from 'react';
import {Link} from "react-router-dom";
import { AuthContext } from '../../context/auth/AuthProvider';
const MyAccount = () => {
    const { userLoggedIn, logOut } = useContext(AuthContext);
    const { name, lastname, email } = userLoggedIn
    return (
        <div>
            <div>
                <p>{name}</p>
                <p>{lastname}</p>
                <p>{email}</p>
                <div>
                    <Link to="/myaccount/purchases"><button>Mis compras</button></Link>
                    <Link to="/myaccount/courses"><button>Mis cursos</button></Link>
                    <button onClick={() => logOut()}>Cerrar sesión</button>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;
