import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import monthlyData from './out.json';
import './LocationAssetDetails.css';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { BsFileBarGraph } from "react-icons/bs";
import Footer from '../Footer/footer'

function LocationAssetDetails() {
  // const [countryName, setCountryName] = useState({ value: 'India', label: 'India' });
  const [year, setYear] = useState({ value: '2024', label: '2024' });
  const [currentPage, setCurrentPage] = useState(0);
  const monthsPerPage = 3;

  const filteredData = monthlyData.filter(data => data.Year === Number(year.value));
  const months = Array.from(new Set(filteredData.map(data => data.Month_Num)));
  const numPages = Math.ceil(months.length / monthsPerPage);
  const currentMonths = months.slice(currentPage * monthsPerPage, (currentPage + 1) * monthsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % numPages);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + numPages) % numPages);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [year]);

  const yearOptions = [
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' }
  ];

  // Array of month names
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <div>
      <div className='primaryDashboard'>
        <div className="countryDetails">
          <span className='PredictedData'>Predicted Data</span>
        </div>
        <div className='maindiv'>
          <div className="back-button">
            <Link to="/main/fileupload" className="goto-back-btn"><IoArrowBack />
              Back
            </Link>
          </div>
          <div className="filter-container">
            <Select
              name="year"
              options={yearOptions}
              className="basic-single-select"
              classNamePrefix="select"
              value={year}
              onChange={(selectedOption) => setYear(selectedOption)}
              placeholder="Select year"
            />
          </div>
          <div className="graph-button">
            <Link to="/main/graph" className="goto-graphs-btn"><BsFileBarGraph />
              Graph View
            </Link>
          </div>
        </div>
        <div className="dashboard">
          {currentMonths.map((month, index) => (
            <div className="month-box" key={index}>
              <h2>{monthNames[month - 1]}</h2>
              <div className="data-table">
                <div className="table-header">
                  <span className='asset-row' style={{ marginRight: "50%" }}>Item</span>
                  <span className='asset-count'>Count</span>
                </div>
                <div className="table-body">
                  {filteredData.filter(data => data.Month_Num === month).map((item, idx) => (
                    <div className="table-row" key={idx}>
                      <span>{item.Item}</span>
                      <span>{item.result_rand}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="pagination">
            <button onClick={goToPrevPage} disabled={currentPage === 0}><IoArrowBack />Previous</button>
            <button onClick={goToNextPage} disabled={currentPage === numPages - 1}>Next<IoArrowForward/></button>
          </div>
          {/* <div className='footer'>
        <p>©2024 - Wipro | Privacy Policy</p>
      </div> */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default LocationAssetDetails;