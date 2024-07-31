import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import storyboard from '../../Assets/storyboard.png';
import AboutPageImage from '../../Assets/AboutPageImage.png';
import Footer from '../Footer/footer';
import './AboutPage.css';
import logo from '../../Assets/logo.png'

function AboutPage() {


  return (
    <div className="about-page">
      <div className="initial-view">
        <div className="header1">
          <h1 className="headhi">Innovating Enterprise Asset Management with AI</h1>
        </div>
      </div>
      <div className="content-container">
        <div className="content">
          <div className='section1'>
            <div className='division1'>
            <h2>Upload Your Data</h2>
            <p className="para">
              Start by uploadig your Excel sheet containing asset information. Our intuitive interface makes it easy to drag and drop your file or select it from your device. Ensure your data is accurate and up-to-date for the best predictions.
            </p>
            </div>
          </div>
          <div className='section2'>
            <div className='division2'>
            <h2>Predict Future Assets</h2>
            <p className="para">
              Once your data is uploaded, our advanced prediction model gets to work. Using state-of-the-art algorithms, we analyze your data to forecast future asset performance. Sit back and let our technology provide you with valuable insights.
            </p>
            </div>
            <div className='div-img'>
            <img className='about-images' src={logo} alt="Logo"/>
            </div>
          </div>
          <div className='section3'>
            <div className='division3'>
            <h2>Visualize Your Results</h2>
            <p className="para">
              After the prediction process is complete, view your results in a clear, graphical format. Our interactive graphs and charts allow you to easily interpret the predictions and make informed decisions about your assets.
            </p>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default AboutPage;