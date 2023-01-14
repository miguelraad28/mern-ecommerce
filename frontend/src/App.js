import Login from "./Login";
import Register from "./Register";
import { AuthContext } from "./context/auth/AuthProvider";
import React, { useContext } from "react";
function App() {
  const { userLoggedIn, setUserLoggedIn } = useContext(AuthContext);
  const logOut = () => {
    setUserLoggedIn(false)
  }
  return (
    <div className="App">
      {userLoggedIn ?
        <button onClick={logOut}>Log out, {userLoggedIn.name} {userLoggedIn.lastname} {userLoggedIn.dni}</button>
        :
        <>
          <Login />
          <Register />
        </>}
    </div>
  );
}

export default App;
