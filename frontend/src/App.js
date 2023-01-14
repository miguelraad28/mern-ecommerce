import Login from "./Login";
import Register from "./Register";
import { AuthContext } from "./context/auth/AuthProvider";
import React, {useContext} from "react";
function App() {
  const {user, logOut} = useContext(AuthContext);
  return (
    <div className="App">
      {user ?
        <button onClick={() => logOut}>Log out</button>
        :
        <>
          <Login />
          <Register />
        </>}
    </div>
  );
}

export default App;
