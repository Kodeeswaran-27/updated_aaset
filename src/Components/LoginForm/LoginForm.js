import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../Assets/Frame.png';
import icon from '../../Assets/icon.png';
import Footer from '../Footer/footer';
import './LoginForm.css';
import Fileupload from '../FileUpload/FileUpload';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../SSO/authConfig';
import { callMsGraph } from '../SSO/graph';
import { SignInButton } from "../SSO/SignInButton";

function LoginForm() {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (accounts.length > 0) {
            instance.acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
                .then((response) => {
                    callMsGraph(response.accessToken).then((response) => setGraphData(response));
                    navigate("/main/about"); // Redirect to the desired route after authentication
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [accounts, instance, navigate]);

    return (
        <div className="main">
            <div className="sub">
                <div className="header">
                    <img src={logo} alt="Wipro Technologies Ltd" />
                </div>
                <div className="login">
                    <div className="card">
                        <AuthenticatedTemplate>
                            <Fileupload />
                        </AuthenticatedTemplate>
                        <UnauthenticatedTemplate>
                        <h3 className="labels">Asset Management</h3>
                        <h4 className="labels">Login to unclock insights into AI Asset requirement forcastig</h4>
                        <img src={icon} alt="Asset Management icon" />
                        <SignInButton />
                        </UnauthenticatedTemplate>
                    </div>
                </div>
                {/* <div className='footer'>
                    <p>©2024 - Wipro | Privacy Policy</p>
                </div> */}
                <div className="bv2"><Footer></Footer></div>
            </div>
        </div>
    );
}

export default LoginForm;