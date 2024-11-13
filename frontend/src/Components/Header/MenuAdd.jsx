import { Routes, Route } from "react-router-dom";
import Home from "../Menu/Home";
import Cinema from "../Menu/Cinema";
import Error from "../Menu/Error";
import Contact from "../Menu/Contact";
import Movies from "../Menu/Movies";
import ComingSoon from "../Menu/ComingSoon";
import Process from "../CompleteProcess/Process";
import Signin from "../Signup/Signin";
import Signup from "../Signup/Signup";
import EmailVerify from "../Signup/EmailVerify";
import DashMenu from "../Dashboard/DashMenu";
import DashHome from "../Dashboard/DashHome";
import DashMovies from "../Dashboard/DashMovies";
import DashFoodDrinks from "../Dashboard/DashFoodDrinks";
import UserDetails from "../CompleteProcess/UserDetails";
import Confirmation from "../CompleteProcess/Confirmation";
import Seating from "../CompleteProcess/Seating";
import AdminMain from "../Admin/AdminMain";
import AdminLogin from "../Signup/AdminLogin";
import MoviesFetch from "../../ContextFetch/MoviesFetch";
import Mail from "../CompleteProcess/Mail/Mail";
import DashSetting from "../Dashboard/DashSetting";
import PrivateRoute from "../PrivateComponent/PrivateRoute";

function NavbarAdd() {
  // auth value of localstorage of user is available that's show the link of user to logout
  const auth = localStorage.getItem("userInfo");
  return (
    <MoviesFetch>
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/cinema" element={<Cinema />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<Movies />} />
        <Route exact path="/commingsoon" element={<ComingSoon />} />
        {/* {auth && <Route path="/mail" element={<Mail />} />} */}
        <Route exact path="/process" element={<Process />} />
        <Route path="/process/:movieId" element={<Process />} />
        <Route exact path="/usermoviedetail" element={<UserDetails />} />
        <Route exact path="/seating" element={<Seating />} />
        <Route exact path="/confirmation" element={<Confirmation />} />
        <Route exact path="/adminlogin" element={<AdminLogin />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify-email" element={<EmailVerify />} />

        {/* dash routes */}
        {/* Use PrivateRoute for dashboard-related routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashMenu />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashHome"
          element={
            <PrivateRoute>
              <DashHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashMovie"
          element={
            <PrivateRoute>
              <DashMovies />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashfoodrinks"
          element={
            <PrivateRoute>
              <DashFoodDrinks />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashtickets/*"
          element={
            <PrivateRoute>
              <Movies />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashtickets/:id"
          element={
            <PrivateRoute>
              <Movies />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashsetting"
          element={
            <PrivateRoute>
              <DashSetting />
            </PrivateRoute>
          }
        />

        {/* admin dashboard */}
        <Route path="/admin" element={<AdminMain />} />

        <Route path="/*" element={<Error />} />
      </Routes>
    </MoviesFetch>
  );
}
export default NavbarAdd;
