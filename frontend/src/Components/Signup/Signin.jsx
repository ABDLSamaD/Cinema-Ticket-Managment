import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import ErrorMessage from "./ErrorMessage";
import cors from "cors";
import SignupNavbar from "./SignupNavbar";
import "./Signin.css";

cors();
const Signin = () => {
  const auth = localStorage.getItem("userInfo");

  const navigate = useNavigate();
  useEffect(() => {
    setState(false);
  }, []);

  // if the user is still in localstorage the button of signup is show b/c i created this signup button state
  // and otherwise i go to signup page i created an other link to go signup page and some functions
  const [state, setState] = React.useState(true);

  // state form for login start
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // state form for login end

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { email, password } = credentials;
      // hardcore login of user
      const response = await fetch("http://localhost:4400/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLoading(false);
      if (response.status === 200) {
        setLoading(true);
        // alert(data.message);
        localStorage.setItem("userInfo", JSON.stringify(data));
        loadersignin.style.display = "flex";
        document.getElementById("signin").style.zIndex = "0";
        signuptext.innerText = ` please wait...`;
        setTimeout(() => {
          navigate("/dashHome");
        }, 4000);
      } else {
        setError(data.error);
        setLoading(false);
      }
      setTimeout(() => {
        setError("");
      }, 3000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <SignupNavbar />
      <LoadingBar height={2} progress={100} color="#f11946" />
      {loading && <LoadingScreen />}
      {error && <ErrorMessage varient="outlined">{error}</ErrorMessage>}
      <div className="signin">
        <div className="container" id="signin">
          {/* <!-- for login --> */}
          <div className="row">
            <div className="login">
              <h2 className="heading">Login</h2>
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
                <div className="input_box">
                  <input
                    type="password"
                    id="password"
                    autoComplete="off"
                    required
                    value={credentials.password}
                    name="password"
                    onChange={onChange}
                  />
                  <label className="labels" htmlFor="email">
                    Password
                  </label>
                </div>
                {/* <FormControl
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
                </FormControl> */}

                <div className="buttons">
                  {/* <!-- sign in button --> */}
                  <button type="submit" className="btns btns-primary">
                    Sign in
                  </button>
                  <span className="or">Or</span>
                  <button type="button" className="btns">
                    <i className="uil uil-google"></i>
                    Sign in with Google
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="right_border"></div>

          {/* <!-- for Signup --> */}
          <div className="row">
            {/* <!-- for login --> */}
            <div className="signup">
              <h2 className="heading">Signup</h2>
              <div className="signup_details forms_input">
                <div className="image">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtDJQOym9ZowQ-P_EoEHhMBgddXrQP4jMObGdVTK0Hluw7wUnnil7XZL1j0J7KMpvi6lw&usqp=CAU"
                    alt="Does'nt show"
                  />
                  {/* <img src="../../assets/cine-t.png" alt="Does'nt show" /> */}
                </div>
                <div className="para_icons">
                  <p>
                    <i className="uil uil-check"></i> View your job matches and
                    saved jobs on any device
                  </p>
                  <p>
                    <i className="uil uil-check"></i> Apply for jobs with one
                    click
                  </p>
                  <p>
                    <i className="uil uil-check"></i> Manage your job alerts
                  </p>
                </div>
                {state || (
                  <button
                    type="button"
                    className="btns"
                    id="create_page"
                    onClick={() => navigate("/signup")}
                  >
                    Create an account
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="loadersignin">
        <div className="content" id="content">
          Loading
        </div>
        <p id="signuptext"></p>
      </div>
    </>
  );
};

export default Signin;
