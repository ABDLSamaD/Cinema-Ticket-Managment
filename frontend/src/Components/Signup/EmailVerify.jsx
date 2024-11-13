import { Link, useNavigate, useParams } from "react-router-dom";
import SignupNavbar from "./SignupNavbar";
import { useEffect } from "react";
import axios from "axios";

const EmailVerify = () => {
  const auth = localStorage.getItem("userInfo");
  const navigate = useNavigate();

  const { token } = useParams();
  useEffect(() => {
    if (auth) {
      const verifyEmail = async () => {
        try {
          const response = await axios.put(`/api/auth/verify-email/${token}`);
          const datas = await response.data;
          console.log(datas);
          // Handle success (e.g., show a success message)
          if (response.status === 200) {
            completeverify.style.display = "flex";
            completeverify.firstChild.innerText = `${response.data.message} please wait ...`;
            setTimeout(() => {
              navigate("/signin");
            }, 3000);
          } else {
            alert("Email verify first");
          }
        } catch (error) {
          // Handle error (e.g., show an error message)
          console.log(error.message);
        }
      };
      verifyEmail();
    }
  }, [token]);

  return (
    <>
      <SignupNavbar />
      <div className="email-verify">
        <h1>Email Verify First</h1>
        <p>Go To Login Page</p>
        <button type="button">
          <Link to="/signin">Login</Link>
        </button>
      </div>
      <div id="completeverify">
        <p></p>
        <span></span>
      </div>
    </>
  );
};

export default EmailVerify;
