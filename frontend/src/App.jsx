import { BrowserRouter as Router } from "react-router-dom";
// import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import ComponentMain from "./Components/ComponentMain";
import "./App.css";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const name = "ax801ad";
    localStorage.setItem("startingapp", name);
  });
  return (
    <Router>
      <ComponentMain />
    </Router>
  );
};

export default App;
