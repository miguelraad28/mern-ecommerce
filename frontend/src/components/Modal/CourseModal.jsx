import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/auth/AuthProvider';
import { CartContext } from '../../context/cart/CartProvider';
import { Link } from 'react-router-dom';
import "./Modal.scss"
const CourseModalDetail = ({ modal, toggleModal, _id, name, description, price, offerPrice, source }) => {
    const { cart, substractFromCart, addToCart } = useContext(CartContext);
    const { userLoggedIn } = useContext(AuthContext);
    const { accessTo } = userLoggedIn
    return (
        <>
            {modal ?
                <div className="modalBackground">
                    <div className="modalContainer">
                        <div className='titleAndCloseButton'>
                            <h2 className='titleh2'>{name}</h2>
                            <button className='redButton' onClick={() => toggleModal()}>X</button>
                        </div>
                        <div className='modalVideoContainer'>
                            <video poster={`${process.env.REACT_APP_SERVER_URL}/public/courses/thumbnails/${source[0]}`} src={`${process.env.REACT_APP_SERVER_URL}/public/courses/explanatoryVideos/${source[1]}`} />
                        </div>
                        <div className='modalDataGrid'>
                            <div>
                                <p>
                                    {description}
                                </p>
                            </div>
                            <div>
                                {userLoggedIn ?
                                    (accessTo.includes(_id) ?
                                        <Link to="/myaccount/courses"><button className='pinkButton' ><i class="bi bi-archive-fill"></i>VER MIS CURSOS</button></Link>
                                        :
                                        <button className={cart.includes(_id) ? "redButton" : 'greenButton'} onClick={cart.includes(_id) ? () => substractFromCart(_id) : () => addToCart(_id)}>{cart.includes(_id) ? <><i class="bi bi-cart-dash-fill"></i>ELIMINAR DEL CARRITO</> : <><i class="bi bi-cart-plus-fill"></i>AÑADIR AL CARRITO</>}</button>)
                                    : <button className='greenButton' onClick={() => Swal.fire("Debes iniciar sesión para añadir cursos al carrito")}><i class="bi bi-cart-plus-fill"></i>AÑADIR AL CARRITO</button>}
                                {offerPrice ? <p className='normalPrice'>${offerPrice}</p> : <p className='normalPrice'>${price}</p>}
                                {offerPrice ? <p className='normalPriceWithOffer'>${price}</p> : null}
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </>
    );
};

const CourseModal = ({ modal, toggleModal, course }) => {
    return (
        <>
            {modal ? <CourseModalDetail modal={modal} toggleModal={toggleModal} {...course} /> : null}
        </>
    );
};

export default CourseModal;