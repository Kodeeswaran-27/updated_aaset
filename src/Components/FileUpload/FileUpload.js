import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { IoCloudUploadOutline, IoArrowBack } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import { FaTrash } from 'react-icons/fa';
import excel from '../../Assets/excel.png';
import './FileUpload.css';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../Footer/footer'

const FileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [assetRatio, setAssetRatio] = useState("60:40");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const handleDrop = (acceptedFiles) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        const response = await axios.post('http://localhost:5000/train', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        sessionStorage.setItem('responseData', JSON.stringify(response.data));
        console.log('Data uploaded successfully:', response.data);
        navigate('/main/predictedData');
      } catch (error) {
        console.error('Error uploading data:', error);
      }
    }, 5000);
  };

  const handleBrowse = (event) => {
    setLoading(true);
    setTimeout(() => {
      processFiles(event.target.files);
    }, 5000);
  };

  const processFiles = (files) => {
    files.forEach(async (file) => {
      if (
        file.type === 'application/vnd.ms-excel' ||
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'text/csv'
      ) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          console.log('File Data:', jsonData);
          setUploadedFiles(prevFiles => [...prevFiles, { name: file.name, data: jsonData, id: uuidv4() }]);
          setLoading(false);
          setIsDragging(false);
          // goBack(jsonData);
        };
        reader.readAsArrayBuffer(file);
      } else {
        alert('Invalid file type. Please upload a CSV or XLSX file.');
        setLoading(false);
      }
    });
  };

  const deleteFile = (id) => {
    setUploadedFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  // const goBack = async (jsonData) => {
  function predict() {
    console.log("Button clicked");
    navigate('/main/predictedData');
    //test api start
    // try{
    //   const response=await axios.get('https://66a1d926967c89168f1dc513.mockapi.io/todo')
    //   console.log("Datas",response.data);
    // }
    // catch(error){
    //   console.error(error);
    // }
    //test api ends
    // try {
    //   const response = await axios.post('http://localhost:5000/train', jsonData, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   console.log('Data uploaded successfully:', response.data);
    //   navigate('/main/predictedData');
    // } catch (error){
    //   console.error('Error uploading data:', error);
    // }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  useDropzone({ onDrop: handleBrowse, noClick: true, noKeyboard: true });

  return (
    <div>
      <div className='card123'>
        <div className='upload'>
          <div className={`div1 ${uploadedFiles.length > 0 ? 'small' : 'large'}`}>
            <div className='div2'>
              <center><p className='p1'>Please upload the file for analysis</p></center>
              <bold><label className='note'>Note:&nbsp;Kindly use the below Sample Excel format</label></bold>
            </div>
            <div className='drop'
              {...getRootProps()}
              style={{ borderColor: isDragging ? 'blue' : '#cccccc' }}
            >
              <IoCloudUploadOutline className='icon' color='blue' />
              <p><b>Drop file or &nbsp;
                <label className='browse' htmlFor="browseInput"><u>Browse</u></label>
                <input id="browseInput" type="file" {...getInputProps()} />
              </b></p>
              <span>Supported file formats: CSV, Excel</span>
            </div>
            {loading && (
              <div className="loading-indicator">Uploading and processing files...</div>
            )}
            {uploadedFiles.length > 0 && (
              <div className='uploaded'>
                <h3>Uploaded Files:</h3>
                <ul>
                  {uploadedFiles.map((file) => (
                    <li key={file.id}>
                      <span>{file.name}</span>
                      <FaTrash color='red' className='trash' onClick={(e) => { e.stopPropagation(); deleteFile(file.id); }} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <button className='downloadButton' onClick={predict}>Predict</button>
              <div className='tableExample drop'>
                <div className='example'>
                  <Container className='padall'>
                    <Row>
                      <Col xs="auto" className='tosiz'><img src={excel} alt="excel image" height="20" width="20" /></Col>
                      <Col className='tosiz flexible-item'>
                        <label>Table Example</label>
                      </Col>
                    </Row>
                    <Row className='topspace'>
                      <p className='topspace'>You can download the attached example and use them as a starting point for your own file.</p>
                    </Row>
                  </Container>
                </div>
                <br></br>
              </div>
              <div>
                <a className='remsty' href="/example.xlsx" download>
                  <button className='downloadButton  tocent '>Download</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div className="bottom-buttons">
        <Link to="/main/about" className="go-to-about-btn"> <IoArrowBack />Back</Link>  {/* Button to go to About Page */}
      </div>
    </div>
  );
};

export default FileUpload;