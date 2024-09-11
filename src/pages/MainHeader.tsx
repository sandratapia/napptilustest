import { Link } from "react-router-dom";
import oompaLoompaLogo from "../assets/images/logo-umpa-loompa.png";
import "../styles/MainHeader.css";

const MainHeader = () => {
  return (
    <Link to={"/"}>
      <div className="title">
        <img src={oompaLoompaLogo} className="title__logo" alt="logo" />
        <h1>Oompa Loompa's Crew</h1>
      </div>
    </Link>
  );
};

export default MainHeader;
