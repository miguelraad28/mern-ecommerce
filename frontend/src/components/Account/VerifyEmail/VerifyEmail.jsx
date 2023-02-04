import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const VerifyEmail = ({ queryParams }) => {
    const { setUserLoggedIn } = useContext(AuthContext)
    const [emailValidated, setEmailValidated] = useState(false);
    const [confirmation, setConfirmation] = useState({
        code: "",
        email: ""
    });

    const handleOnChange = (e) => {
        console.log()
        if (Number(e.target.value) <= 999999) {
            setConfirmation({
                ...confirmation,
                [e.target.name]: parseInt(e.target.value)
            })
        }
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/verifyEmail`, confirmation)
        if (!res.data.pending && res.data.user.account === "approved") {

            setUserLoggedIn({ ...res.data.user })
            localStorage.setItem("x-access-token", JSON.stringify(res.data.token))
            setEmailValidated(true)
            Swal.fire("Felicidades por tu nueva cuenta en INFUSA CURSOS")
        } else {
            Swal.fire(res.data.message)
        }
    }
    useEffect(() => {
        if (queryParams) {
            console.log(queryParams)
            setConfirmation({
                ...confirmation,
                email: queryParams.email
            })
        }
    }, [queryParams]);
    return (
        <div>
            <h1>VerifyEmail</h1>
            <form onSubmit={(e) => handleOnSubmit(e)}>

                <input
                    onChange={(e) => handleOnChange(e)}
                    type="number"
                    name="code"
                    value={confirmation.code}
                />
                <button>VERIFY EMAIL</button>
            </form>
            {emailValidated ? <Navigate to="/myaccount" /> : null}
        </div>
    );
}

export default VerifyEmail;
