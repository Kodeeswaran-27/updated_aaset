import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import storyboard from '../../Assets/storyboard.png';
import AboutPageImage from '../../Assets/AboutPageImage.png';
import Footer from '../Footer/footer';
import './AboutPage.css';

function AboutPage() {


  return (
    <div className="about-page">
      <div className="initial-view">
        <div className="header1">
          <h1 className="headhi">Innovating Enterprise Asset Management with AI</h1>
        </div>
      </div>
      <div className="content-container">
        <div className="imgss">
          <img src={storyboard} alt="Predictive Analytics" className="sb-image" />
        </div>
        <div className="content">
          <section>
            <h2>Our Mission & Solution</h2>
            <p className="para">
              We empower enterprises with AI-driven tools that transform complex data into strategic decisions, ensuring clients stay ahead. Our platform offers predictive analytics and precise recommendations, enabling optimal asset management and cost reduction.
            </p>
          </section>
          <section>
            <h2>Key Features & Benefits</h2>
            <div className="features-benefits">
              <ul>
                <li><strong>AI-Powered Insights:</strong> </li>
                <li>Utilize machine learning to accurately predict asset needs and optimize management.</li>
                <li><strong>Customizable Dashboards:</strong> </li>
                <li>Access real-time analytics and tailor views to essential metrics for efficient decision-making.</li>
                <li><strong>Seamless Integration & Cost Efficiency:</strong> </li>
                <li>Integrate smoothly with existing systems, minimize excess inventory, and reduce expenses for long-term growth.</li>
              </ul>
            </div>
          </section>


        </div>
        <Link to="/main/fileupload" className="goto-dashboard-btn">
          Predict Assets
        </Link>

      </div>
      <section>
        <h2 className='h2team'> Meet Our Team</h2>
        <p className="para">
          Our team consists of industry experts, data scientists, and technology enthusiasts dedicated to delivering the best asset management solutions.
          We believe in fostering a culture of innovation and excellence to drive results for our clients.
        </p>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default AboutPage;