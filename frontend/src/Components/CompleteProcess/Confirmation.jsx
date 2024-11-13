import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import CinemaReceipt from "./CinemaReceipt";
import { useContext, useEffect, useState } from "react";
import CloseButton from "@mui/icons-material/Close";
import movieContext from "../../ContextFetch/movieContext";
import { useNavigate, useParams } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();
  // [ local storage values get
  const startingapp = localStorage.getItem("startingapp");
  const auth = localStorage.getItem("userInfo");
  // localstorage value get of user has selected seat of array
  const userDetailsSeat = localStorage.getItem("selectedSeats");
  const randomNumberOfUser_Id = localStorage.getItem("randomnumberofseats");
  // ]

  // context api of movies data there movie slected id is = param id then in the slip moviename
  const context = useContext(movieContext);
  const { state, fetchMovies } = context;

  const [equaled, setEqualed] = useState(0);

  // parameter from MeunAdd file of routing to this component
  const { movieId } = useParams();

  // seatselected data send to backend and all state for cinema seat
  // start
  // [ There are all states that send data of movie slip to backend with api there user download the slip data send to backend
  const [seatsName, setSeatsName] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState(0);
  const [moviePirce, setMoviePirce] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [randomId, setRandomId] = useState("");
  // ] end

  useEffect(() => {
    fetchMovies();

    setRandomId(randomNumberOfUser_Id);

    Array.from(state).map((movie) => {
      if (movie._id === movieId) {
        return setSelectedMovie(movie.movietitle);
      }
    });
    if (auth) {
      setTokenValue(JSON.parse(auth).authToken);
      document.querySelector(".close i").addEventListener("click", () => {
        document.querySelector(".sometimeshow-forotken").style.display = "none";
      });
    }
    // Check if userDetailsSeat is not null before parsing
    if (userDetailsSeat) {
      const parsedSeats = JSON.parse(userDetailsSeat);
      const equals = parsedSeats.reduce((total, seat) => total + seat.price, 0);
      setEqualed(equals);
      const itemseat = parsedSeats.map((r) => {
        return r.seatName;
      });

      // all states of slip data send to the backend
      const price = parsedSeats.reduce((total, seat) => total + seat.price, 0);
      setMoviePirce(price);
      setSeatsName(itemseat);
      setSelectedSeats(parsedSeats.length);
    }
  }, [auth]);

  const [loader, setLoader] = useState(false);
  // const [tokens, setTokens] = useState({
  //   token: "",
  // });
  const [tokenvalue, setTokenValue] = useState("");

  // click on button then download the pdf of js
  const downloadPdf = async () => {
    try {
      setLoader(true);
      // data sending of slip send to the backend
      // [
      // Header token
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `${JSON.parse(auth).authToken}`);
      myHeaders.append("Content-Type", "application/json");

      // sending data to backend with the help of api and second step to store slip in database ...
      const response = await fetch(
        "http://localhost:4400/api/cinema/cinema-data",
        {
          method: "POST",
          body: JSON.stringify({
            seatsName,
            selectedMovie,
            selectedSeats,
            moviePirce,
            randomId,
          }),
          headers: myHeaders,
        }
      );
      const data = await response.json();
      // ]
      const capture = document.querySelector(".actual-receipt");
      html2canvas(capture, { useCORS: true })
        .then((canvas) => {
          const imgData = canvas.toDataURL("img/png");
          const doc = new jsPDF("p", "mm", "a4");
          const componentWidth = doc.internal.pageSize.getWidth();
          const componentHeight = doc.internal.pageSize.getHeight();
          doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
          doc.save("receipt.pdf");
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
      download.disabled = true;
      alertSlip.style.display = "flex";

      setTimeout(() => {
        navigate("/");
        // remove seats from localstorage the seat is store on database
        localStorage.removeItem("selectedSeats");
        localStorage.removeItem("randomnumberofseats");
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };
  // const downloadPdf = async () => {
  //   if (tokens !== tokenvalue) {
  //     alert("Authentication token was wrong, Please valid token or id");
  //   } else {
  //     try {
  //       setLoader(true);
  //       // data sending of slip send to the backend
  //       // [
  //       // Header token
  //       const myHeaders = new Headers();
  //       myHeaders.append("Authorization", `${JSON.parse(auth).authToken}`);
  //       myHeaders.append("Content-Type", "application/json");

  //       // sending data to backend with the help of api and second step to store slip in database ...
  //       const response = await fetch(
  //         "http://localhost:4400/api/cinema/cinema-data",
  //         {
  //           method: "POST",
  //           body: JSON.stringify({
  //             seatsName,
  //             selectedMovie,
  //             selectedSeats,
  //             moviePirce,
  //             randomId,
  //           }),
  //           headers: myHeaders,
  //         }
  //       );
  //       const data = await response.json();
  //       // ]
  //       const capture = document.querySelector(".actual-receipt");
  //       html2canvas(capture, { useCORS: true })
  //         .then((canvas) => {
  //           const imgData = canvas.toDataURL("img/png");
  //           const doc = new jsPDF("p", "mm", "a4");
  //           const componentWidth = doc.internal.pageSize.getWidth();
  //           const componentHeight = doc.internal.pageSize.getHeight();
  //           doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
  //           doc.save("receipt.pdf");
  //           setLoader(false);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //       download.disabled = true;
  //       alertSlip.style.display = "flex";

  //       setTimeout(() => {
  //         navigate("/");
  //         // remove seats from localstorage the seat is store on database
  //         // localStorage.removeItem("selectedSeats");
  //         // localStorage.removeItem("randomnumberofseats");
  //       }, 3000);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  // };

  // const onChange = (e) => {
  //   setTokens(e.target.value);
  //   if (e.target.value !== tokenvalue) {
  //     invalid.style.display = "block";
  //     correct.style.display = "none";
  //   } else {
  //     correct.style.display = "block";
  //     invalid.style.display = "none";
  //   }
  // };

  return auth || startingapp ? (
    <>
      <div className="confirm">
        <h1
          style={{
            marginBottom: "1em",
            color: "#ddf",
            fontWeight: "normal",
            letterSpacing: "1px",
          }}
        >
          Slip
        </h1>
        <div className="sometimeshow-forotken">
          <div className="close">
            <i>
              <CloseButton />
            </i>
          </div>
          <p>
            There is an input filed of user token. the user paste the valid
            token then the slip will be download. otherwise slip was not
            download. The token was sended on your gmail check & copy
          </p>
        </div>
        {/* actual receipt */}
        <div className="actual-receipt">
          <div className="pdf-view">
            <CinemaReceipt equalPrice={equaled} />
          </div>
        </div>
        {/* end actual receipt */}
        <div className="slip-button">
          {/* <input
            type="text"
            placeholder="Enter your token"
            name="token"
            id="token"
            value={tokens.token}
            onChange={onChange}
            style={{
              width: "400px",
              padding: "10px 0",
              background: "transparent",
              borderBottom: "1px solid #ddf",
              color: "white",
            }}
          />
          <p id="correct" className="tokenClass">
            Correct Token
          </p>
          <p id="invalid" className="tokenClass">
            Invalid Token
          </p> */}
          <button
            onClick={downloadPdf}
            disabled={!(loader === false)}
            style={{ marginTop: "2rem" }}
          >
            {loader ? (
              <span id="download">Downloading</span>
            ) : (
              <span>Download</span>
            )}
          </button>
        </div>
      </div>
      <div id="alertSlip">
        <div className="alrt"></div>
        <div className="alrt"></div>
        <div className="alrt"></div>
        <div className="alrt"></div>
      </div>
    </>
  ) : (
    <h1>Signup please</h1>
  );
};

export default Confirmation;

/*
sdfd
sdfsf

 */
