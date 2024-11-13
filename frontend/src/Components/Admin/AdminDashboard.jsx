import CineT from "../../assets/cine-t.png";
import LogoutIcon from "@mui/icons-material/Logout";
import "./admin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const auth = localStorage.getItem("adminInfo");
  const { dataadmin } = JSON.parse(auth);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("adminInfo");
    navigate("/");
  };
  const [admin, setAdmin] = useState("");

  // useEffect to fetch admin details
  useEffect(() => {
    fetchAdmin();
  }, []);

  // fetch admin data for frontend
  const fetchAdmin = async () => {
    const myHeader = new Headers();
    myHeader.append("AuthToken", `${dataadmin.authToken}`);
    try {
      const responses = await fetch(
        "http://localhost:4400/api/adminauth/getadmin",
        {
          method: "POST",
          headers: myHeader,
        }
      );
      const data = await responses.json();
      setAdmin(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //   state or context
  const [movieCredentials, setMovieCredentials] = useState({
    movietitle: "",
    ratings: "",
    releasedate: "",
    image: "",
    director: "",
    moviedescription: "",
    duration: "",
    rated: "",
    movietrailer: "",
    price: "",
    occupied: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        movietitle,
        ratings,
        releasedate,
        image,
        director,
        moviedescription,
        duration,
        rated,
        movietrailer,
        price,
        occupied,
      } = movieCredentials;

      const response = await fetch(
        "http://localhost:4400/api/adminamovie/addmovie",
        {
          method: "POST",
          body: JSON.stringify({
            movietitle,
            ratings,
            releasedate,
            image,
            director,
            moviedescription,
            duration,
            rated,
            movietrailer,
            price,
            occupied,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        alert(data.message);
        navigate("/");
      } else {
        alert("data not submitted");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onChange = (e) => {
    setMovieCredentials({
      ...movieCredentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="main-admin">
      <div className="admin-nav">
        <div className="logo">
          <img src={CineT} alt="Does'nt" id="adminaside" />
          <h1>Cinema-t</h1>
        </div>
        <div className="logout">
          <i onClick={handleLogout}>
            <LogoutIcon />
          </i>
        </div>
      </div>
      <div id="admin-dash">
        <div className="admin-info">
          <h1>Welcome {admin.name} </h1>
          <div className="container">
            <div className="gloweffect"></div>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <label htmlFor="mtitle">Title</label>
                <input
                  type="text"
                  id="mtitle"
                  name="movietitle"
                  onChange={onChange}
                  // onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="mrating">Rating</label>
                <input
                  type="text"
                  name="ratings"
                  id="mrating"
                  onChange={onChange}
                  // onChange={(e) => setMrating(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label htmlFor="mrelease">Movie Release</label>
                <input
                  type="text"
                  name="releasedate"
                  id="mrelease"
                  onChange={onChange}
                />
              </div>
              <div className="input-box">
                <label htmlFor="mimagelink">Image Link</label>
                <input
                  type="text"
                  name="image"
                  id="mimagelink"
                  onChange={onChange}
                />
              </div>
              <div className="input-box">
                <label htmlFor="mname">Director</label>
                <input
                  type="text"
                  name="director"
                  id="mdirector"
                  onChange={onChange}
                />
              </div>
              <div className="input-box">
                <label htmlFor="mdesc">Description</label>
                <input
                  type="text"
                  name="moviedescription"
                  id="mdesc"
                  onChange={onChange}
                />
              </div>
              <div className="input-box">
                <label htmlFor="mduration">Duration</label>
                <input
                  type="text"
                  name="duration"
                  id="mduration"
                  onChange={onChange}
                />
              </div>
              <div className="input-box">
                <label htmlFor="mrated">Rated</label>
                <input
                  type="text"
                  name="rated"
                  id="mrated"
                  onChange={onChange}
                />
              </div>
              <div className="input-box">
                <label htmlFor="mtrailer">Trailer Link</label>
                <input
                  type="text"
                  name="movietrailer"
                  id="mtrailer"
                  onChange={onChange}
                />
              </div>
              <div className="input-box">
                <label htmlFor="mprice">Movie price</label>
                <input
                  type="text"
                  name="price"
                  id="mprice"
                  onChange={onChange}
                />
              </div>
              <div className="input-box">
                <label htmlFor="moccupied">Ocuupied Seat</label>
                <input
                  type="text"
                  name="occupied"
                  id="moccupied"
                  onChange={onChange}
                />
              </div>
              <button type="submit">Submit Form</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
