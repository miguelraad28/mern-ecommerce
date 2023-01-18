import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/auth/AuthProvider";
import Navbar from "./components/Navbar/Navbar";
import Login from "./Login";
import Register from "./Register";
import MyAccount from "./pages/Account/MyAccount";
import MyPurchases from "./pages/Account/MyPurchases/MyPurchases";
import MyCourses from "./pages/Account/MyCourses/MyCourses";
import MyCourse from "./pages/Account/MyCourses/MyCourse";
import PrivateRoutes from "./routes/PrivateRoutes";
import Home from "./pages/Home/Home";
import PageNotFound from "./PageNotFound";
import PublicRoutes from "./routes/PublicRoutes";
function App() {
  const { userLoggedIn } = useContext(AuthContext);
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route element={<PublicRoutes isAllowed={!!userLoggedIn} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoutes isAllowed={!!userLoggedIn} />}>
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/myaccount/purchases" element={<MyPurchases />} />
          <Route path="/myaccount/courses" element={<MyCourses />} />
          <Route path="/myaccount/courses/:courseId" element={<MyCourse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
