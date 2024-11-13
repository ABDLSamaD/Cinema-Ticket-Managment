import DashNav from "./DashNav";
import "./DashAll.css";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const DashHome = () => {
  return (
    <>
      <DashNav />
      <div id="dashHome" className="absolute_allDash">
        <div className="container">
          <div className="row">
            <h1>
              Welcome to <br /> <span> Cinema Ticket Managment</span>
            </h1>
            <h2>Searching for online ticket booking</h2>
            <h2>There is now available only on Cine-t</h2>
            <p>
              A movie can be shown in more than one theater at a time.A movie
              goer can login into the Cinema Ticket Reservation System, search
              for movies and cinemas, view movie details, purchase/cancel
              tickets or rate different movies.
            </p>
          </div>
          <div className="row-movie">
            <div className="movie-details">
              <div className="movie-img">
                <img
                  src="https://m.media-amazon.com/images/M/MV5BNzJlM2NmZTItOGQyYS00MmE2LTkwZGUtNDFkNmJmZjRjZjcxXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_FMjpg_UX1000_.jpg"
                  alt="Does'nt"
                />
              </div>
              <div className="movie-info">
                <h2>Shazam! Fury of Gods</h2>
                <p>Action/Adventure</p>
                <div className="movie-rating">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              </div>
            </div>
            <div className="movie-details">
              <div className="movie-img">
                <img
                  src="https://images.moviesanywhere.com/7d3c609cfe515e6d4a3da8d7460f4873/0949aae1-52c5-487e-9ae5-37d034a1cc8d.jpg"
                  alt="Does'nt"
                />
              </div>
              <div className="movie-info">
                <h2>Meg2 - The Trecnh</h2>
                <p>Action/Sci-fi</p>
                <div className="movie-rating">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarBorderIcon />
                </div>
              </div>
            </div>
            <div className="movie-details">
              <div className="movie-img">
                <img
                  src="https://m.media-amazon.com/images/M/MV5BZWNhOWY4OTUtNDIwZC00ZTMzLTgzNDgtZGU5OWM0ODcwYmVlXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg"
                  alt="Does'nt"
                />
              </div>
              <div className="movie-info">
                <h2>Kraven the Hunter</h2>
                <p>Action/Adventure</p>
                <div className="movie-rating">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              </div>
            </div>
            <div className="movie-details">
              <div className="movie-img">
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg"
                  alt="Does'nt"
                />
              </div>
              <div className="movie-info">
                <h2>Openhiemer</h2>
                <p>Action/Adventure</p>
                <div className="movie-rating">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarBorderIcon />
                  <StarBorderIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashHome;
