import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { AuthContext } from "./context/auth/AuthProvider";
import "./scss/styles.scss";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Account/Authentication/Login";
import Register from "./components/Account/Authentication/Register";
import MyAccount from "./pages/Account/MyAccount";
import MyPurchasesListContainer from "./pages/Account/MyPurchases/MyPurchasesListContainer";
import MyCoursesListContainer from "./pages/Account/MyCourses/MyCoursesListContainer";
import PrivateRoutes from "./routes/PrivateRoutes";
import Home from "./pages/Home/Home";
import PageNotFound from "./PageNotFound";
import PublicRoutes from "./routes/PublicRoutes";
import CoursesListContainer from "./pages/Products&Courses/Courses/CoursesListContainer";
import CourseDetail from "./pages/Products&Courses/Courses/CoursesDetail/CourseDetail";
import CartListContainer from "./components/Cart/CartListContainer";
import PurchaseWithQueryParams from "./components/Cart/Purchase/PurchaseWithQueryParams";
import WatchCourse from "./pages/Account/MyCourses/WatchCourse";
import VerifyEmailWithQueryParams from "./components/Account/VerifyEmail/VerifyEmailWithQueryParams";
import RecoverPassword from "./components/Account/Authentication/RecoverPassword";
import VerifyPasswordTokenWithQueryParams from "./components/Account/Authentication/ChangePassword/VerifyPasswordTokenWithQueryParams";
import ChangePassword from "./components/Account/Authentication/ChangePassword/ChangePassword";
function App() {
  const [loadingSession, setLoadingSession] = useState(true);
  const { userLoggedIn, autoLogIn } = useContext(AuthContext);

  useEffect(() => {
    autoLogIn().then(() => setLoadingSession(false))
  }, []);
  const history = createBrowserHistory();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/courses" element={<CoursesListContainer />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route element={<PublicRoutes isAllowed={!!userLoggedIn} loadingSession={loadingSession} />}>
          {/* Rutas públicas pero el usuario NO debe estar iniciado */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recoverPassword" element={<RecoverPassword />} />
          <Route path="/verifyEmail" element={<VerifyEmailWithQueryParams history={history} />} />
          <Route path="/recoverPasswordToken" element={<VerifyPasswordTokenWithQueryParams history={history} />} />
        </Route>
        <Route element={<PrivateRoutes isAllowed={!!userLoggedIn} loadingSession={loadingSession} />}>
          {/* Rutas privadas, el usuario DEBE estar iniciado */}
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/myaccount/purchases" element={<MyPurchasesListContainer />} />
          <Route path="/myaccount/courses" element={<MyCoursesListContainer />} />
          <Route path="/myaccount/courses/:courseId" element={<WatchCourse />} />
          <Route path="/purchaseFinished" element={<PurchaseWithQueryParams history={history} />} />
          <Route path="/changePassword" element={<ChangePassword/>}/>
        </Route>
        <Route path="/cart" element={<CartListContainer />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
