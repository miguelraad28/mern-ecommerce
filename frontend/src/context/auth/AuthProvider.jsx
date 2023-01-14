import { React, createContext, useState } from 'react';
const AuthContext = createContext()
const AuthProvider = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const logOut = async () => {
    }

    return (
        <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
