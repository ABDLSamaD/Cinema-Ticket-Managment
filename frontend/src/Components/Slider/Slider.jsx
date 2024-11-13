// import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Movies from "./SliderImagesDetails";
import movieContext from "../../ContextFetch/movieContext";
// import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  FreeMode,
  Scrollbar,
  Autoplay,
} from "swiper/modules";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "./slider.css"; // Create this CSS file for styling
import "swiper/css";
import "swiper/css/navigation";
// swiper / css / effect - coverflow;
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/zoom";
import { useContext, useEffect } from "react";

const SliderFlow = () => {
  const context = useContext(movieContext);
  const { state, fetchMovies } = context;

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div className="advanced-cinema-slider">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        modules={[
          EffectCoverflow,
          Navigation,
          Pagination,
          FreeMode,
          Scrollbar,
          Autoplay,
          // Zoom,
        ]}
        autoplay={true}
        scrollbar={true}
        // zoom={true}
        pagination={{ el: "", clickable: true }}
        slidesPerView={3}
        speed={800}
        loop={true}
        centeredSlides={true}
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        className="max-w-lg max-w-sm"
      >
        {Array.from(state).map((movie, index) => {
          return (
            <SwiperSlide key={movie._id}>
              <div className="box">
                <div className="image">
                  <img src={movie.image} alt={movie.movietitle} />
                </div>
                <div className="info">
                  <p style={{ textAlign: "center" }}>
                    Movie: <span> {movie.movietitle} </span>
                  </p>
                  <p>
                    Duration: <span> {movie.duration} </span>
                  </p>
                  <p className="rating">Rating: {movie.ratings} </p>
                  <Link to={`/movies/${movie._id}`}>
                    <button
                      type="button"
                      // onClick={() => clickBtn(movie)}
                      className="btn movie-btn"
                    >
                      Ticket & Info
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* {state && (<p>Clicked Item: {state} </p>)} */}
    </div>
  );
};

export default SliderFlow;
