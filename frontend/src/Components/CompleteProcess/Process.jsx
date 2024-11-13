import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import Stepper from "react-stepper-horizontal";
import UserDetails from "./UserDetails";
import Seating from "./Seating";
import Confirmation from "./Confirmation";
import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";

const Process = () => {
  const auth = localStorage.getItem("userInfo");
  useEffect(() => {
    if (activeStep === 2 && !auth) {
      alert("signup required");
      process.appendChild(signupPage);
    } else if (activeStep === 0 && activeStep === 1) {
      signupPage.className = "hide";
      alert("hello page 1 and 2");
    } else {
      null;
    }
  });

  // signup required
  let signupPage = document.createElement("div");
  signupPage.className = "required-signup";
  signupPage.innerHTML = `<h1>Signup</h1> <a href="/signup"><button>Go to Signup page</button></a> `;
  let process = document.getElementById("process");

  // state
  const steps = [
    { title: "User Details" },
    { title: "Seat Map" },
    { title: "Confirmation" },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  //   get completion method function
  function handleReset() {
    setActiveStep((prevStep) => prevStep - 2);
  }

  return (
    <>
      <Navbar />
      <LoadingBar height={2} progress={100} color="#f11946" />
      <div id="process" className="process">
        <div className="container">
          <div className="step-ticket">
            <Stepper steps={steps} activeStep={activeStep} color="#ddf" />
            {/* Content for each step */}
            <div className="details-ticket-comp">
              {activeStep === 0 && <UserDetails hello />}
              {activeStep === 1 && <Seating />}
              {activeStep === 2 && <Confirmation hello />}
            </div>
            <div className="buttons-next-back">
              {/* Buttons for navigation */}
              <button onClick={handleBack} disabled={activeStep === 0}>
                Back
              </button>
              {activeStep === 2 ? null : (
                <button
                  onClick={handleNext}
                  disabled={activeStep === steps.length - 1}
                >
                  Next
                </button>
              )}
              {/* <button
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
              >
                Next
              </button> */}
              <button
                onClick={handleReset}
                disabled={activeStep === steps.length - 2}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Process;
