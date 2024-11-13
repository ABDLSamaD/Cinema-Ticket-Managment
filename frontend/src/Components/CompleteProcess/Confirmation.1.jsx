import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import CinemaReceipt from "./CinemaReceipt";
import { useContext, useEffect, useState } from "react";
import CloseButton from "@mui/icons-material/Close";
import movieContext from "../../ContextFetch/movieContext";
import { useParams } from "react-router-dom";

export const Confirmation = () => {
  // [ local storage values get
  // user token to process the slip
  const auth = localStorage.getItem("userInfo");
  // localstorage value get of user has selected seat of array
  const userDetailsSeat = localStorage.getItem("selectedSeats");
  const randomNumberOfUser_Id = localStorage.getItem("randomnumberofseats");
  // ]
  // context api of movies data there movie slected id is = param id then in the slip moviename
  const context = useContext(movieContext);
  const { state, fetchmovie } = context;

  // seatselected data send to backend and all state for cinema seat
  // parameter from MeunAdd file of routing to this component
  const { movieId } = useParams();

  // [ There are all states that send data of movie slip to backend with api there user download the slip data send to backend
  const [seatsName, setSeatsName] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState(0);
  const [moviePirce, setMoviePirce] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState("");
  // ]
  useEffect(() => {
    fetchmovie();

    Array.from(state).map((movie) => {
      if (movie._id === movieId) {
        return setSelectedMovie(movie.movietitle);
      }
    });
    setTokenValue(JSON.parse(auth).authToken);
    document.querySelector(".close i").addEventListener("click", () => {
      document.querySelector(".sometimeshow-forotken").style.display = "none";
    });
    // Check if userDetailsSeat is not null before parsing
    if (userDetailsSeat) {
      const parsedSeats = JSON.parse(userDetailsSeat);
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
  // const [tokenvalue, setTokenValue] = useState("");

  // click on button then download the pdf of js
  const downloadPdf = () => {
    try {
      setLoader(true);

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
    } catch (error) {
      console.log(error.message);
    }
    // and last step to store slip in database ...
  };
  // const downloadPdf = () => {
  //   if (tokens !== tokenvalue) {
  //     alert("Authentication token was wrong, Please valid token or id");
  //   } else {
  //     try {
  //       setLoader(true);

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
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //   // and last step to store slip in database ...
  // };

  return auth ? (
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
            <CinemaReceipt />
          </div>
        </div>
        {/* end actual receipt */}
        <div className="slip-button">
          {/* <input
            type="text"
            placeholder="Enter your token"
            name="token"
            id="token"
            onChange={(e) => setTokens(e.target.value)}
            style={{
              maxWidth: "200px",
              padding: "10px 0",
              background: "transparent",
              borderBottom: "1px solid #ddf",
              color: "white",
            }}
          /> */}
          <button
            onClick={downloadPdf}
            disabled={!(loader === false)}
            style={{ marginTop: "2rem" }}
          >
            {loader ? <span>Downloading</span> : <span>Download</span>}
          </button>
        </div>
      </div>
    </>
  ) : (
    <h1>Signup please</h1>
  );
};
