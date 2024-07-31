import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import './LocationAssetDetails.css';
import out from './out.json'

function LocationAssetDetails() {
  // const navigate = useNavigate();
  // const responseData = JSON.parse(sessionStorage.getItem('responseData')) || [];
  // if (!responseData.length) {
  //   alert('No data found');
  //   navigate('/main/fileupload');
  // }
  const [year, setYear] = useState({ value: '2024', label: '2024' });
  const filteredData = out.filter(data => data.Year === Number(year.value));
  const monthData = new Array(12).fill(null).map((_, idx) => {
    return filteredData.filter(data => data.Month_Num === idx + 1);
  });

  // Generate a unique list of all items across all months
  const allItems = [...new Set(filteredData.map(data => data.Item))];

  // Ensure all months include all items, even if count is zero
  const completeMonthData = monthData.map(month => {
    const monthItems = new Map(month.map(item => [item.Item, item.result_rand]));
    return allItems.map(item => ({
      Item: item,
      result_rand: monthItems.has(item) ? monthItems.get(item) : 0
    }));
  });

  const yearOptions = [
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' }
  ];

  // Array of month names
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <div className='primaryDashboard'>
      <div className='maindiv'>
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
      </div>
      <div className="dashboard">
        {new Array(4).fill(null).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {completeMonthData.slice(rowIndex * 3, (rowIndex + 1) * 3).map((month, monthIndex) => (
              <div className="month-box" key={monthIndex}>
                <h2>{monthNames[rowIndex * 3 + monthIndex]}</h2>
                <div className="data-table">
                  <div className="table-header">
                    <span className='asset-row' style={{ marginRight: "50%" }}>Item</span>
                    <span className='asset-count'>Count</span>
                  </div>
                  <div className="table-body">
                    {month.map((item, idx) => (
                      <div className="table-row" key={idx}>
                        <span>{item.Item}</span>
                        <span>{item.result_rand}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationAssetDetails;