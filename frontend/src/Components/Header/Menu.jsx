import DropDown from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <ul className="menu">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/cinema">Cinemas</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/movies">Movies</Link>
      </li>
      <li>
        <Link to="#/">Tickets</Link>
      </li>
      <li>
        <Link to="#/">More Info</Link>
        <ul className="drop">
          <li>
            <Link to="/commingsoon">Coming Soon</Link>
          </li>
          <li>
            <Link to="#/">Latest Movies</Link>
          </li>
        </ul>
      </li>
      <i className="drop-menu">
        <DropDown />
      </i>
    </ul>
  );
};

export default Menu;
