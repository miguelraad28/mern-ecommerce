import { React, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/auth/AuthProvider';
import { CartContext } from '../../../context/cart/CartProvider';
const CourseCard = ({ _id, name, description, price, offerPrice, source, tumbnail }) => {
    const { userLoggedIn } = useContext(AuthContext);
    const { addToCart, substractFromCart, cart } = useContext(CartContext);
    const { accessTo } = userLoggedIn
    return (
        <div className='courseCard'>
            <p>{name}</p>
            <p>{description}</p>
            <p>{price}</p>
            <p>{offerPrice}</p>
            <img style={{ width: "300px" }} src={`${process.env.REACT_APP_SERVER_URL}/public/courses/explanatoryVideos/${source[1]}`} />
            <img style={{ width: "300px" }} src={`${process.env.REACT_APP_SERVER_URL}/public/courses/thumbnails/${source[0]}`} />
            <div className="coursesButtons">
                {userLoggedIn ?
                    (accessTo.includes(_id) ?
                        <div className='youAllreadyHaveAccessButtons'>
                            <span>Ya tienes acceso a este curso</span>
                            <Link to="/myaccount/courses"><button className='seeMyCoursesButton' >VER MIS CURSOS</button></Link>
                        </div>
                        :
                        <button className={cart.includes(_id) ? "deleteFromCartButton" : 'addToCartButton'} onClick={cart.includes(_id) ? () => substractFromCart(_id) : () => addToCart(_id)}>{cart.includes(_id) ? "ELIMINAR DEL CARRITO" : "AÑADIR AL CARRITO"}</button>)
                    : <button className={cart.includes(_id) ? "deleteFromCartButton" : 'addToCartButton'} onClick={cart.includes(_id) ? () => substractFromCart(_id) : () => addToCart(_id)}>{cart.includes(_id) ? "ELIMINAR DEL CARRITO" : "AÑADIR AL CARRITO"}</button>}
                <Link to={`/courses/${_id}`}><button className='seeProductDetail'>VER DETALLE</button></Link>
            </div>
        </div>
    );
}

export default CourseCard;
