import { Link } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const AdminMain = () => {
  const auth = localStorage.getItem("adminInfo");
  return (
    <>
      {auth ? (
        <AdminDashboard />
      ) : (
        <div
          className="container"
          style={{
            display: "grid",
            placeItems: "center",
            position: "relative",
            top: "10em",
          }}
        >
          <h1
            style={{
              lineHeight: "5rem",
              fontSize: "4vw",
              letterSpacing: "2px",
              color: "transparent",
              fontWeight: "normal",
              background: "linear-gradient(30deg, #ddf, red)",
              backgroundClip: "text",
            }}
          >
            Login Please
          </h1>
          <Link to="/signin">
            <button style={{ color: "#ddf" }}>Login</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default AdminMain;
