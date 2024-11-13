import { Link } from "react-router-dom";
import CinetLogo from "../../assets/cine-t.png";

const SignupNavbar = () => {
  return (
    <div className="signup-navbar">
      {/* Logo to home */}
      <div className="logo">
        <img className="logo-img" src={CinetLogo} alt="Does'nt Show" />
        <Link to="/">
          <h1>Cine-t</h1>
        </Link>
      </div>
      <div className="pages">
        <Link to="/signup">
          <button>Signup</button>
        </Link>
        <Link to="/adminlogin">
          <button>Admin</button>
        </Link>
        <Link to="/signin">
          <button>Signin</button>
        </Link>
      </div>
    </div>
  );
};

export default SignupNavbar;
