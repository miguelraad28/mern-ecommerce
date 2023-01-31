import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { AuthContext } from "./context/auth/AuthProvider";
import "./scss/styles.scss";
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
import CoursesListContainer from "./pages/Products&Courses/Courses/CoursesListContainer";
import CourseDetail from "./pages/Products&Courses/Courses/CoursesDetail/CourseDetail";
import CartListContainer from "./pages/Cart/CartListContainer";
import PurchaseWithQueryParams from "./pages/Cart/Purchase/PurchaseWithQueryParams";
function App() {
  const { userLoggedIn } = useContext(AuthContext);

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
        <Route path="/purchaseFinished" element={<PurchaseWithQueryParams history={history} />} />
        <Route path="/cart" element={<CartListContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
