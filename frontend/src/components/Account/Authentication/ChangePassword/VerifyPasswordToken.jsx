import { React, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../../../../context/auth/AuthProvider';
const VerifyPasswordToken = ({ queryParams }) => {
    const {setUserLoggedIn} = useContext(AuthContext);
    const [confirmation, setConfirmation] = useState({
        code: "",
        validationToken: ""
    });
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        if (Number(e.target.value) <= 999999) {
            setConfirmation({
                ...confirmation,
                [e.target.name]: parseInt(e.target.value)
            })
        }
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        if (String(confirmation.code.length) < 6) return Swal.fire("Por favor ingrese el código completo")
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/recoverSession`, confirmation)
        if (!res.data.pending && res.data.user.account === "approved") {
            setUserLoggedIn({ ...res.data.user })
            localStorage.setItem("x-access-token", JSON.stringify(res.data.token))
            navigate(res.data.navigate)
        } else {
            Swal.fire(res.data.message)
        }
    }
    useEffect(() => {
        if (queryParams) {
            setConfirmation({
                ...confirmation,
                validationToken: queryParams.validationToken
            })
            console.log(queryParams)
        }
    }, [queryParams]);
    return (
        <div className='verifyEmailContainer'>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <input
                    onChange={(e) => handleOnChange(e)}
                    type="number"
                    name="code"
                    value={confirmation.code}
                />
                <button>VALIDAR CUENTA</button>
            </form>
        </div >
    );
}

export default VerifyPasswordToken;
