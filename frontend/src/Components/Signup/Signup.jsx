import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// password component of material
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";

import LoadingBar from "react-top-loading-bar";
import ErrorMessage from "./ErrorMessage";
import LoadingScreen from "./LoadingScreen";
import SignupNavbar from "./SignupNavbar";

const Signup = () => {
  const auth = localStorage.getItem("userInfo");
  // state for password show or hide
  const [showPassword, setShowPassword] = React.useState(false);

  // naviagtion hook
  const navigate = useNavigate();

  // signup state start
  const [value, setValue] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [picture, setPicture] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
  );
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // signup state end

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // signup validation
  const signupHandler = async (e) => {
    e.preventDefault();
    if (value.password !== value.confirmPassword) {
      setMessage("Password do not match!");
    } else {
      setMessage("");
      try {
        setLoading(true);

        const { name, username, email, password } = value;
        const response = await fetch(
          "http://localhost:4400/api/auth/createuser",
          {
            method: "POST",
            body: JSON.stringify({ name, username, email, password, picture }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setLoading(false);
        if (response.status === 200) {
          localStorage.setItem("userInfo", data.authToken);
          signupcomplete.style.display = "flex";
          signuptext.innerText = ` ${data.message} please wait ...`;
          content.innerText = "Loading";
          signuppage.style.zIndex = "0";
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        } else {
          setError(data.error);
        }
        setTimeout(() => {
          setError("");
        }, 2000);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  };
  // onchange handler for all input
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // for image selection to insert image
  const postDetails = (picture) => {
    if (
      picture ===
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);

    if (picture.type === "image/jpeg" || picture.type === "image/png") {
      const data = new FormData();
      data.append("file", picture);
      data.append("upload_preset", "cine-tprofile");
      data.append("cloud_name", "dq76oaoqh");
      fetch("https://api.cloudinary.com/v1_1/dq76oaoqh/image/upload", {
        // mode: "no-cors",
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPicture(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
      // https://api.cloudinary.com/v1_1/dq76oaoqh
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  // if user logged in

  return (
    <>
      <SignupNavbar />
      <LoadingBar height={2} progress={100} color="#f11946" />
      {message && <ErrorMessage varient="outlined">{message}</ErrorMessage>}
      {loading && <LoadingScreen>{error}</LoadingScreen>}
      {error && <ErrorMessage varient="outlined">{error}</ErrorMessage>}
      <div className="signup-page" id="signuppage">
        <div className="gloweffected"></div>
        <div className="container">
          <h1>Sign up</h1>
          <div className="row">
            <form className="forms_inputs" onSubmit={signupHandler}>
              <div className="input_box">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input type="text" id="name" name="name" onChange={onChange} />
              </div>
              <div className="input_box">
                <label className="label" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="input_box">
                <label className="label" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={onChange}
                  required
                />
              </div>
              <FormControl
                style={{ marginBottom: "15px" }}
                sx={{
                  m: 0,
                  borderRadius: "3px",
                  maxWidth: "300px",
                  minWidth: "400px",
                }}
              >
                <InputLabel
                  style={{
                    color: "#2196F3",
                    width: "380px",
                  }}
                  htmlFor="outlined-adornment-password"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  style={{ color: "var(--color-white)" }}
                  name="password"
                  onChange={onChange}
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
              <FormControl
                style={{ marginBottom: "15px" }}
                sx={{
                  m: 0,
                  minWidth: "400px",
                  borderRadius: "5px",
                  maxWidth: "300px",
                }}
              >
                <InputLabel
                  style={{
                    color: "#2196F3",
                    width: "380px",
                  }}
                  htmlFor="outlined-adornment-password"
                >
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  style={{ color: "var(--color-white)" }}
                  name="confirmPassword"
                  onChange={onChange}
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
              {picMessage && (
                <ErrorMessage variant="outlined">{picMessage}</ErrorMessage>
              )}
              <div className="image-select">
                <img src={picture} className="pic" alt="D" />

                <input
                  className="image-input"
                  type="file"
                  name="picture"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </div>
              <button type="submit">Signup</button>
            </form>
          </div>
        </div>
      </div>
      <div id="signupcomplete">
        <p id="signuptext"></p>
        <div className="content" id="content"></div>
      </div>
    </>
  );
};

export default Signup;
