import Movies from "./SliderImagesDetails";
import "./slider.css"; // Create this CSS file for styling
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Heading } from "../Menu/Home";

const ImageSliderLittle = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
  };

  // use context Data from another component
  const heading = useContext(Heading);

  return (
    <div className="little-image-slider">
      <h1> {heading} </h1>
      <Slider {...settings}>
        {Movies.map((movie, index) => {
          return (
            <Link to={`/movies/${movie.id}`} key={index}>
              <div className="slider-image" key={index}>
                <div className="image-slider">
                  <img src={movie.Image} alt={movie.MovieTitle} />
                </div>
                <div className="info-image">
                  <span className="movie-name"> {movie.MovieTitle} </span>
                  <i className="rating"> {movie.Rating} </i>
                </div>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
};

export default ImageSliderLittle;
