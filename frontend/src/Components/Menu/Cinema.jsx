import LoadingBar from "react-top-loading-bar";
import Mall from "../Mall/Mall";
import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";
// import Javacript from "./Javacript";
// import './Slider.js'

const Cinema = () => {
  return (
    <>
      <Navbar />
      <div id="cinema" className="cinema">
        <LoadingBar height={2} progress={100} color="#f11946" />
        <div className="container">
          <Mall />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Cinema;
