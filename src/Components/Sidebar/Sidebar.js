import React from 'react';
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
// import HomeIcon from '@mui/icons-material/Home';
// import SummarizeIcon from '@mui/icons-material/Summarize';
// import UploadFileIcon from '@mui/icons-material/UploadFile';

function Sidebar() {
  return (

    <nav>
      <ul className='SidebarList'>
        <li><NavLink to="/main/home" className='link' activeClassName='active' id='title'> &nbsp;Home</NavLink></li>
        <li><NavLink to="/main/logs" className='link' activeClassName='active' id='title'>&nbsp;Logs</NavLink></li>
        <li><NavLink to="/main/fileupload" className='link' activeClassName='active' id='title'>&nbsp;FileUpload</NavLink></li>
      </ul>

    </nav>


  )
}
export default Sidebar;