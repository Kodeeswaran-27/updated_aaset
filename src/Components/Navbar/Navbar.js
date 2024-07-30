// import React, { useState } from 'react';
// import '../../App.css';
// import live_workspace from '../../Assets/live_workspace.png'
// import logout from '../../Assets/logout.png'
// import '../Navbar/Navbar.css';
// import { useMsal } from "@azure/msal-react";
// // import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// function Navbar({ userName, userRole }) {
//   const { instance } = useMsal();

//   const handleLogout = () => {
//     instance.logoutRedirect({
//       postLogoutRedirectUri: "/",
//     }).catch(e => {
//       console.error(e);
//     });
//   }
//   return (
//     <div className="Navbar">
//       <div className='logo'>
//         <img src={live_workspace} alt="Live workspace" />
//       </div>
//       <div className='logout'>
//         <p>Hi,  Adarsh</p>
//         <img className='logout_image' src={logout} alt="Logout" onClick={handleLogout} style={{ cursor: 'pointer' }} />
//       </div>
//     </div>
//   )
// }
// export default Navbar;

import React, { useState, useEffect } from 'react';
import '../../App.css';
import live_workspace from '../../Assets/live_workspace.png';
import logout from '../../Assets/logout.png';
import '../Navbar/Navbar.css';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from '../SSO/authConfig';
import { callMsGraph } from '../SSO/graph'; // Import your MS Graph call function

function Navbar() {
  const { instance, accounts } = useMsal();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState(''); // Assuming userRole is fetched too

  // Function to acquire token and fetch user data
  function RequestProfileData() {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((data) => {
          setUserName(data.displayName || 'User'); // Assume displayName is the correct field
          setUserRole(data.jobTitle || 'Unknown Role'); // Assume jobTitle is the role field
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
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    }).catch(e => {
      console.error(e);
    });
  }

  return (
    <div className="Navbar">
      <div className='logo'>
        <img src={live_workspace} alt="Live workspace" />
      </div>
      <div className='assetTitle'>
        <h1>asset prediction</h1>
      </div>
      <div className='logout'>
        <p>{userName}</p> {/* Use state variable for dynamic display */}
        <img className='logout_image' src={logout} alt="Logout" onClick={handleLogout} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
}

export default Navbar;