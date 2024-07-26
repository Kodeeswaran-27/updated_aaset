import React from 'react';
import Navbar from '../Navbar/Navbar';
import PrivateRoute from '../../Security/Privateroute'; // Ensure the correct path
import FileUpload from '../FileUpload/FileUpload';
import { Routes, Route, Navigate } from 'react-router-dom';
import LocationAssetDetails from '../LocationAssetDetails/LocationAssetDetails';
import Graph from '../Graph/Graph';
import './Main.css';
import AboutPage from '../About/AboutPage';

function App() {
    return (
        <div className='App'>
            <nav className='Mainpage'>
                <Navbar userName="Admin" userRole="Asset Predictor"/>
                <div className='Maindiv'>
                    {/* <div className="Sidebar">
                        <Sidebar />
                    </div> */}
                    <div className="Sidebar1">
                        <Routes>
                            <Route path="/" element={<Navigate to="/fileupload" />} />
                            <Route element={<PrivateRoute />}>
                                <Route path="fileupload" element={<FileUpload />} />
                                <Route path="predictedData" element={<LocationAssetDetails />} />
                                <Route path="about" element={<AboutPage />} />
                                <Route path="graph" element={<Graph />} />
                            </Route>
                            {/* Add any other public routes here if needed */}
                        </Routes>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default App;