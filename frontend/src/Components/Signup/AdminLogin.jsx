import React, { useState } from "react";
import SignupNavbar from "./SignupNavbar";
import LoadingBar from "react-top-loading-bar";
import LoadingScreen from "./LoadingScreen";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  // state form for login start
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // state form for login end

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { email, password } = credentials;
      // hardcore  login of admin
      const responseadmin = await fetch(
        "http://localhost:4400/api/adminauth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const dataadmin = await responseadmin.json();
      if (dataadmin.success) {
        alert(dataadmin.message);
        localStorage.setItem("adminInfo", JSON.stringify({ dataadmin }));
        navigate("/admin");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <>
        <SignupNavbar />
        <LoadingBar height={2} progress={100} color="#f11946" />
        {loading && <LoadingScreen />}
        {error && <ErrorMessage varient="outlined">{error}</ErrorMessage>}
        <div className="signin">
          <div className="container">
            {/* <!-- for login --> */}
            <div className="row">
              <div className="login">
                <h2
                  className="heading"
                  style={{
                    letterSpacing: "1px",
                    fontSize: "3vw",
                    color: "transparent",
                    fontWeight: "normal",
                    background: "linear-gradient(80deg, #ddf, #fff)",
                    backgroundClip: "text",
                  }}
                >
                  Admin Login
                </h2>
                <form className="forms_input" onSubmit={submitHandler}>
                  <div className="input_box">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="off"
                      required
                      value={credentials.email}
                      onChange={onChange}
                    />
                    <label className="labels" htmlFor="email">
                      Email address
                    </label>
                  </div>
                  <FormControl
                    style={{ marginBottom: "15px" }}
                    sx={{ m: 1, width: "35ch" }}
                  >
                    <InputLabel
                      style={{ color: "#ddf" }}
                      htmlFor="outlined-adornment-password"
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      value={credentials.password}
                      name="password"
                      style={{ color: "#ddf" }}
                      onChange={onChange}
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            color="primary"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>

                  <div className="buttons">
                    {/* <!-- sign in button --> */}
                    <button type="submit" className="btns btns-primary">
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default AdminLogin;
