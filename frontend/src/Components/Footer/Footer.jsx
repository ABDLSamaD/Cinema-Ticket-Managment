import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/twitter";
import Github from "@mui/icons-material/GitHub";
import Linkedin from "@mui/icons-material/linkedin";
import { Link } from "react-router-dom";
import "./Footer.css"


const Footer = ()=>{
    return(
        <section className="footer">
      <div className="footer-row">
        <div className="footer-col">
          <h4>Info</h4>
          <ul className="links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Cinemas</Link></li>
            <li><Link to="/">Contact</Link></li>
            <li><Link to="/">Movies</Link></li>
            <li><Link to="/">Tickets</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="links">
            <li><Link to="/">Free Designs</Link></li>
            <li><Link to="/">LLinktest Designs</Link></li>
            <li><Link to="/">Themes</Link></li>
            <li><Link to="/">PopulLinkr Designs</Link></li>
            <li><Link to="/">Linkrt Skills</Link></li>
            <li><Link to="/">New UploLinkds</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul className="links">
            <li><Link to="/">Customer Linkgreement</Link></li>
            <li><Link to="/">PrivLinkcy Policy</Link></li>
            <li><Link to="/">GDPR</Link></li>
            <li><Link to="/">Security</Link></li>
            <li><Link to="/">TestimoniLinkls</Link></li>
            <li><Link to="/">MediLink Kit</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>
            Subscribe to our newsletter for Link weekly dose
            of news, updLinktes, helpful tips, Linknd
            exclusive offers.
          </p>
          <form action="/#">
            <input type="text" placeholder="Your email" required />
            <button type="submit">SUBSCRIBE</button>
          </form>
          <div className="icons">
            <i> <Facebook /> </i>
            <i> <Twitter /> </i>
            <i> <Github /> </i>
            <i> <Linkedin /> </i>
          </div>
        </div>
      </div>
    </section>
    )
}
export default Footer;