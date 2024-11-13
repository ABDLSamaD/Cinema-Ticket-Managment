import { Link } from "react-router-dom";
import ComingSoon from "../MoviesList/CommingSoon";
import "./slider.css"; // Create this CSS file for styling
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CommingSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };
  return (
    <div className="advanced-cinema-slider">
      <Slider {...settings}>
        {ComingSoon.map((movie, index) => {
          return (
            <div className="box" key={index}>
              <div className="image">
                <img src={movie.Image} alt={movie.MovieTitle} />
              </div>
              <div className="info">
                <p>
                  Movie: <span> {movie.MovieTitle} </span>
                </p>
                <p>
                  Duration: <span> {movie.Duration} </span>
                </p>
                <p className="rating">Rating: {movie.Rating} </p>
                {/* <Link to={`/movies/${movie.id}`}> */}
                <Link>
                  <button type="button" className="btn movie-btn">
                    Ticket & Info
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </Slider>
      ;{/* {state && (<p>Clicked Item: {state} </p>)} */}
    </div>
  );
};

export default CommingSlider;
