import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './Components/SSO/authConfig';
// import AboutPage from './Components/Test/AboutPage';
const msalInstance = new PublicClientApplication(msalConfig);

const Main = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeMsal = async () => {
      await msalInstance.initialize();
      setIsInitialized(true);
    };

    initializeMsal();
  }, []);

  if (!isInitialized) {
    return <div>Loading...</div>; // Show a loading indicator while MSAL is initializing
  }

  return (
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
    {/* <AboutPage/> */}
  </React.StrictMode>
);

reportWebVitals();