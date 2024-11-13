import Slider from "./../Slider/Slider";
import DashNav from "./DashNav";

const DashMovies = () => {
  return (
    <>
      <DashNav />
      <div id="dashMovie" className="absolute_allDash">
        <Slider />
      </div>
    </>
  );
};

export default DashMovies;
