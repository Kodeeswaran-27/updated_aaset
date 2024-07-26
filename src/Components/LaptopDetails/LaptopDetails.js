import React, { useState } from 'react';
import './LaptopDetails.css';

function LaptopDetails() {
  const laptopData = [
    { name: 'Mac Book', versions: 'Versions', models: 'Make over Models', laptops: 46, year: 2024 },
    { name: 'Lenovo', versions: 'Versions', models: 'Make over Models', laptops: 13, year: 2024 },
    { name: 'HP', versions: 'Versions', models: 'Make over Models', laptops: 18, year: 2024 },
    { name: 'Dell', versions: 'Versions', models: 'Make over Models', laptops: 34, year: 2023 },
    { name: 'Asus', versions: 'Versions', models: 'Make over Models', laptops: 64, year: 2024 },
    { name: 'Acer', versions: 'Versions', models: 'Make over Models', laptops: 78, year: 2023 },
    { name: 'Samsung', versions: 'Versions', models: 'Make over Models', laptops: 30, year: 2024 },
    { name: 'LG', versions: 'Versions', models: 'Make over Models', laptops: 32, year: 2024 }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(laptopData);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePreviousClick = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => Math.min(Math.floor(filteredData.length / itemsPerPage), prev + 1));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterApply = () => {
    const filtered = laptopData.filter(laptop => 
      laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.versions.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.models.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.laptops.toString().includes(searchTerm) ||
      laptop.year.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
    setCurrentPage(0);  
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <div className="table-header">
          <input
            type="text"
            placeholder="Search"
            className="search-box"
            onChange={handleSearchChange}
            value={searchTerm}
          />
          
          <button onClick={handleFilterApply} className="filter-button">Filters</button>
     
        </div>
        <table>
          <thead>
            <tr>
              <th>Laptop Name</th>
              <th>Versions</th>
              <th>Make over Models</th>
              <th>No. of Laptops</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((laptop, index) => (
              <tr key={index}>
                <td>{laptop.name}</td>
                <td>{laptop.versions}</td>
                <td>{laptop.models}</td>
                <td>{laptop.laptops}</td>
                <td>{laptop.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>{startIndex + 1} - {Math.min(endIndex, filteredData.length)} of {filteredData.length} items</span>
          <div className="pagination-buttons">
            <button onClick={handlePreviousClick} className="previous" disabled={currentPage === 0}>Previous</button>
            <button onClick={handleNextClick} className="next" disabled={endIndex >= filteredData.length}>Next</button>
          </div>
        </div>
      </div>
      <div className='footer'>
                © 2024 Wipro
                </div>
    </div>
  );
}

export default LaptopDetails;
