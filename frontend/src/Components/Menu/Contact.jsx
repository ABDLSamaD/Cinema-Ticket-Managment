import "../Styles.css";
import LoadingBar from "react-top-loading-bar";
import Navbar from "../Header/Navbar";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({
    names: "",
    email: "",
    message: "",
  });
  const onChange = (e) => [
    setFeedback({ ...feedback, [e.target.name]: e.target.value }),
  ];
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { names, email, message } = feedback;
      const response = axios.post("http://localhost:4400/api/form/contact", {
        names,
        email,
        message,
      });
      if (response) {
        alert(response.data);
        navigate("/");
      } else {
        alert("form not submitted");
      }
    } catch (error) {
      console.log(error.messages);
    }
  };
  return (
    <>
      <Navbar />
      <div id="contact">
        <LoadingBar height={2} progress={100} color="#f11946" />
        <div className="container">
          <h1>Contact us</h1>
          <form className="forms_input" onSubmit={submitHandler}>
            <div className="input_box">
              <input
                type="text"
                id="name"
                name="names"
                autoComplete="off"
                onChange={onChange}
              />
              <label className="labels" htmlFor="name">
                Name
              </label>
            </div>
            <div className="input_box">
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                onChange={onChange}
              />
              <label className="labels" htmlFor="email">
                Email
              </label>
            </div>
            <div className="input_box">
              <textarea
                id="message"
                name="message"
                value={feedback.message}
                rows="4"
                required
                onChange={onChange}
              />
              <label htmlFor="message" className="labels">
                Message
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
