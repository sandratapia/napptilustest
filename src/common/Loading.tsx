import "../styles/Loading.css";
import oompaLoompaLogo from "../assets/images/logo-umpa-loompa.png";

export const Loading = () => {
  return (
    <div className="loaderContainer">
      <img src={oompaLoompaLogo} alt="Logo" />
    </div>
  );
};
