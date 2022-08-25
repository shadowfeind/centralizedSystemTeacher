import React from "react";
import { Link } from "react-router-dom";
import CustomContainer from "../../components/CustomContainer";
import "./PageNotFound.css";
const PageNotFound = () => {
  return (
    <CustomContainer>
      <div className="notFound">
        <img
          src="https://i.postimg.cc/gk0HsRPM/astr.png"
          width="250"
          height="300"
        />
        <div>
          <h1>404</h1>
          <h2>UH OH! You're lost.</h2>
          <p>
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            Dashboard.
          </p>
          <Link className="btn green" to={"/"}>
            Go Back To Dashboard
          </Link>
        </div>
      </div>
    </CustomContainer>
  );
};

export default PageNotFound;
