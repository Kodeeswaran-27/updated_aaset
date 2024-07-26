import React from 'react';
// import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import './AboutPage.css';
import { Link } from 'react-router-dom'; 
import AboutPageImage from '../../Assets/AboutPageImage.png';
import Footer from '../Footer/footer'

function AboutPage() {
  return (
    <div className="about-page">
      <div className="header">
        <h1>Innovating Enterprise Asset Management with AI</h1>
      </div>
      <div className= "AnalyticsImage">
      <img src={AboutPageImage} alt="Predictive Analytics" className="header-image" />
      </div>
      <div className="content">
        <section>
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower enterprises with intelligent tools that provide actionable insights into asset management.
            We strive to transform complex data into strategic decisions, ensuring our clients are always a step ahead in their operations.
            Managing assets effectively is a critical challenge for enterprises worldwide.
            Traditional methods often fall short in providing the agility and foresight needed to adapt to changing business environments.
          </p>
        </section>

        <section>
          <h2>Our Solution</h2>
          <p>
            Our AI-driven platform bridges this gap by offering predictive analytics that forecast future asset needs.
            By utilizing machine learning models, we deliver precise recommendations, enabling companies to maintain optimal asset levels and reduce costs.
          </p>
        </section>

        <section>
          <h2>Key Features & Benefits</h2>
          <div className="features-benefits">
            <div>
              <ul>
                <li><strong>AI-Powered Predictive Analytics:</strong> Harness the power of machine learning to anticipate asset requirements accurately.</li>
                <li><strong>Real-Time Data Insights:</strong> Access up-to-date analytics to make informed decisions swiftly.</li>
                <li><strong>Customizable Dashboards:</strong> Tailor your view to focus on the metrics that matter most to your business.</li>
                <li><strong>Seamless Integration:</strong> Easily integrate with existing enterprise systems for a smooth transition.</li>
              </ul>
            </div>
            <div>
              <ul>
                <li><strong>Enhanced Efficiency:</strong> Optimize asset management processes to save time and resources.</li>
                <li><strong>Cost Reduction:</strong> Minimize excess inventory and reduce unnecessary expenditures.</li>
                <li><strong>Increased Agility:</strong> Adapt quickly to market changes with actionable insights.</li>
                <li><strong>Strategic Planning:</strong> Leverage data-driven strategies for long-term growth and sustainability.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2>Meet Our Team</h2>
          <p>
            Our team consists of industry experts, data scientists, and technology enthusiasts dedicated to delivering the best asset management solutions.
            We believe in fostering a culture of innovation and excellence to drive results for our clients.
          </p>
        </section>
      </div>
      <Link to="/main/fileupload" className="goto-dashboard-btn">
        Predict Assets
      </Link>
      <Footer/>
    </div>
  );
}

export default AboutPage;
