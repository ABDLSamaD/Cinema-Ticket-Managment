const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const app = express();

// mongodb Connection
const mongodbConnection = require("./models/connection");
mongodbConnection();

// Add this section to handle 'clientError' event
// server.on("clientError", (err, socket) => {
//   socket.destroy(err);
// });

// env config
dotenv.config();

// use cors for client request to backend from the browser
app.use(cors());

// bodyparser data with body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes for authentication
app.use("/api/auth", require("./routes/auth"));
// routes for movies add data
app.use("/api/movies", require("./routes/movies"));
// routes for admin add movies
app.use("/api/adminamovie", require("./routes/adminadd"));
// routes for admin login
app.use("/api/adminauth", require("./routes/adminauthenticate"));
// routes for Seat map
app.use("/api/seat", require("./routes/Seatmap"));
// routes for Seat map data for slip
app.use("/api/cinema", require("./routes/Seatdata"));
// routes for contact feedback form
app.use("/api/form", require("./routes/contact"));

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}/`);
});
