import {useState} from 'react';

const UsePassword = () => {
    const [inputType, setInputType] = useState("password");
    const [iconClassName, setIconClassName] = useState("bi bi-eye");
    const togglePassword = (e) => {
        iconClassName === "bi bi-eye" ? setIconClassName("bi bi-eye-slash") : setIconClassName("bi bi-eye")
        inputType === "password" ? setInputType("text") : setInputType("password")
    }
    return {togglePassword, inputType, iconClassName};
}

export default UsePassword;
