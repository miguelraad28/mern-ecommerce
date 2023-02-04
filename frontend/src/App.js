import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { AuthContext } from "./context/auth/AuthProvider";
import "./scss/styles.scss";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Account/Authentication/Login";
import Register from "./components/Account/Authentication/Register";
import MyAccount from "./pages/Account/MyAccount";
import MyPurchases from "./pages/Account/MyPurchases/MyPurchases";
import MyCourses from "./pages/Account/MyCourses/MyCourses";
import PrivateRoutes from "./routes/PrivateRoutes";
import Home from "./pages/Home/Home";
import PageNotFound from "./PageNotFound";
import PublicRoutes from "./routes/PublicRoutes";
import CoursesListContainer from "./pages/Products&Courses/Courses/CoursesListContainer";
import CourseDetail from "./pages/Products&Courses/Courses/CoursesDetail/CourseDetail";
import CartListContainer from "./pages/Cart/CartListContainer";
import PurchaseWithQueryParams from "./pages/Cart/Purchase/PurchaseWithQueryParams";
import WatchCourse from "./pages/Account/MyCourses/WatchCourse";
import VerifyEmailWithQueryParams from "./components/Account/VerifyEmail/VerifyEmailWithQueryParams";
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoutes isAllowed={!!userLoggedIn} loadingSession={loadingSession} />}>
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/myaccount/purchases" element={<MyPurchases />} />
          <Route path="/myaccount/courses" element={<MyCourses />} />
          <Route path="/myaccount/courses/:courseId" element={<WatchCourse />} />
        </Route>
        <Route path="/purchaseFinished" element={<PurchaseWithQueryParams history={history} />} />
        <Route path="/cart" element={<CartListContainer />} />
        <Route path="/verifyEmail" element={<VerifyEmailWithQueryParams history={history} userLoggedIn={userLoggedIn}/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
