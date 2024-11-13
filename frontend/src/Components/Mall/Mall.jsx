// import React from "react";
import MallImages from "./MallImage"; // mallimages component call
import CallIcon from "@mui/icons-material/Call" //icons material call the component in which you want
import './Mall.css'

const Mall = () =>{


    return(
        // main class
        <div className="main mall-details">
            <div className="container wrap">
                <div className="details center">
                    <h1>Cine-T <span>BOULEVARD</span> MALL</h1>
                    <MallImages />
                </div>
                <div className="map-container">
                    <h3>Description</h3>
                    <div className="map-details">
                        {/* add map */}
                        <map>
                            <div className="mapouter">
                                <div className="gmap_canvas">
                                <iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=Hyderabad pakistan Boulevard mall&t=&z=18&ie=UTF8&iwloc=&output=embed" title="does'nt show" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
                                </iframe>
                                    <a href="https://2yu.co">2yu</a><br />
                                    <a href="https://embedgooglemap.2yu.co/">html embed google map</a>
                                </div>
                            </div>
                        </map>
                        {/* add map info */}
                        <div className="map-info">
                            <p>BOULEVARD MALL</p>
                            <p>AUTOBHAN ROAD</p>
                            <p>HYDERABAD</p>
                            <div className="call around">
                                <i> <CallIcon />  </i>
                                <span>Phone: 0223413030</span>
                            </div>
                            <p className="l-h">Parkings</p>
                            <p className="l-h">Public Transport</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Mall;
