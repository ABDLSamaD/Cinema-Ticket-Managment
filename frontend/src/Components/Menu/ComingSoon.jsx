// import React from 'react'
import "../Styles.css";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
// import ImageSliderLittle from "../Slider/ImageSliderLittle";
import LoadingBar from "react-top-loading-bar";
import CommingSlider from "../Slider/CommingSlider";

const ComingSoon = () => {
  return (
    <>
      <Navbar />
      <LoadingBar height={2} progress={100} color="#f11946" />
      <div id="commingsoon">
        <div className="container">
          <CommingSlider />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ComingSoon;
