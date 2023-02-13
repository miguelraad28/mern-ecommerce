import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import Swal from 'sweetalert2';
import "./Login&Register.scss";
const RecoverPassword = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState({
        email: ""
    });
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        setEmail({
            ...email,
            [e.target.name] : e.target.value
        })
    }

    const sendRecoveryPasswordToken = async (e, email) => {
        e.preventDefault()
        setLoading(true)
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/recoverPassword`, email)
        if(!res.data.pending){
            setLoading(false)
            navigate(res.data.navigate)
        }else{
            setLoading(false)
            Swal.fire(res.data.message)
        }
    }
    return (
        <div className='container'>
            {loading ? <div className='spinnerBackground'><Spinner/></div> : null}
            <div className='logInForm' >
                <h2>INICIAR SESIÓN</h2>
                <form onSubmit={(e) => sendRecoveryPasswordToken(e, email)}>
                    <label>Email</label>
                    <input
                        onChange={handleOnChange}
                        value={email.email}
                        name="email"
                        required
                        type="email" />
                    <button type='submit' className='skyblueButton'>ENVIAR CÓDIGO</button>
                </form>
            </div>
        </div>
    );
}

export default RecoverPassword;
