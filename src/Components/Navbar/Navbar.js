import React, { useState, useEffect } from "react";
import { Tooltip } from 'react-tooltip';
import "../../App.css";
import live_workspace from "../../Assets/live_workspace.png";
import logout from "../../Assets/logout.png";
import "../Navbar/Navbar.css";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../SSO/authConfig";
import { callMsGraph } from "../SSO/graph"; // Import your MS Graph call function
import { useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { GoUpload } from "react-icons/go";
import { TbChartInfographic } from "react-icons/tb";
import { FaChartPie } from "react-icons/fa";

function Navbar() {
  const { instance, accounts } = useMsal();
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState(""); // Assuming userRole is fetched too

  // Function to acquire token and fetch user data
  function RequestProfileData() {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((data) => {
          setUserName(data.displayName || "User"); // Assume displayName is the correct field
          setUserRole(data.jobTitle || "Unknown Role"); // Assume jobTitle is the role field
        });
      })
      .catch((error) => {
        console.error("Error acquiring token silently: ", error);
      });
  }

  // useEffect to call RequestProfileData when component mounts
  useEffect(() => {
    RequestProfileData();
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle logout
  const handleLogout = () => {
    instance
      .logoutRedirect({
        postLogoutRedirectUri: "/",
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const navigate = useNavigate();
  const responseData = JSON.parse(sessionStorage.getItem('responseData')) || [];
  //handle home
  return (
    <div className="Navbar">
      <div className="logo">
        <img src={live_workspace} alt="Live workspace" />
      </div>
      <div className="assetTitle">
        <h1>asset prediction</h1>
      </div>
      <div className="logout">
        <div className="tooltip">
          <button className="icons-btn" onClick={() => {
            navigate("/main/about")
          }}>
            <IoHomeOutline className="nav-icons" />
          </button>
          <Tooltip id="home-tooltip" place="bottom"content="Home" />
        </div>

        <div className="tooltip">
          <button className="icons-btn" onClick={()=>navigate("/main/fileupload")}>
          <GoUpload className="nav-icons"/>
          </button>
          <Tooltip id="file-tooltip" content="File uploader" />
        </div>

        <div className="tooltip">
          <button className="icons-btn1" onClick={() => {
            (!responseData.length || responseData.length > 0) ?
              navigate("/main/predictedData") : alert("no data found")
          }}
          disabled={responseData.length === 0}
          >
            <TbChartInfographic className="nav-icons" style={{width:"26px"}} />
          </button>
          <Tooltip id="predict-tooltip" content="Predict" />
        </div>

        <div className="tooltip">
          <button className="icons-btn1" onClick={() => {
            console.log("In navbar",responseData.length)
            navigate("/main/Graph")
          }}
          disabled={!responseData.length === 0}
          >
            <FaChartPie className="nav-icons"/>
          </button>
          <Tooltip id="chart-tooltip" content="Chart view" />
        </div>

        {/* Use state variable for dynamic display */}
        {/* <p>{userName}</p> */}
        <div className="tooltip mar-left">
          <img
            className="logout_image"
            src={logout}
            alt="Logout"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
            data-tooltip-id="logout-tooltip"
          />
          <Tooltip id="logout-tooltip" content="Logout" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
