import { React, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/auth/AuthProvider';
import { CartContext } from '../../../context/cart/CartProvider';
import Swal from 'sweetalert2';
import CourseModal from '../../../components/Modal/CourseModal';
const CourseCard = ({course }) => {
    const { userLoggedIn } = useContext(AuthContext);
    const { addToCart, substractFromCart, cart } = useContext(CartContext);
    const { accessTo } = userLoggedIn
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        let auxModal = !modal
        setModal(!modal);
        if (auxModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };
    const  {_id, name, description, price, offerPrice, source} = course
    return (
        <div className='courseCard'>
            {modal ? <CourseModal modal={modal} toggleModal={toggleModal} course={course}/> : null}
            <img onClick={toggleModal} src={`${process.env.REACT_APP_SERVER_URL}/public/courses/thumbnails/${source[0]}`} />
            <Link to={`/courses/${_id}`}><p className='courseName'>{name}</p></Link>
            <p className='courseDescription'>{description}</p>
            <div className="courseCardBottomPart">
                <span>INICIAL</span>
                {userLoggedIn ? (accessTo.includes(_id) ? <p className='youAllreadyHaveAccessText'>Ya tienes acceso a este curso</p> : (offerPrice ? <div className='offerPriceContainer'><p>${price}</p>-<p>${offerPrice}</p></div> : <div className='priceContainer'><p>${price}</p></div>)) : (offerPrice ? <div className='offerPriceContainer'><p>${price}</p>-<p>${offerPrice}</p></div> : <div className='priceContainer'><p>${price}</p></div>)}
                <div className='courseButtons'>
                    {userLoggedIn ?
                        (accessTo.includes(_id) ?
                            <Link to="/myaccount/courses"><button className='salmonButton' ><i class="bi bi-archive-fill"></i>VER MIS CURSOS</button></Link>
                            :
                            <button className={cart.includes(_id) ? "redButton" : 'greenButton'} onClick={cart.includes(_id) ? () => substractFromCart(_id) : () => addToCart(_id)}>{cart.includes(_id) ? <><i class="bi bi-cart-dash-fill"></i>ELIMINAR DEL CARRITO</> : <><i class="bi bi-cart-plus-fill"></i>A??ADIR AL CARRITO</>}</button>)
                        : <button className='greenButton' onClick={() => Swal.fire("Debes iniciar sesi??n para a??adir cursos al carrito")}><i class="bi bi-cart-plus-fill"></i>A??ADIR AL CARRITO</button>}
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
