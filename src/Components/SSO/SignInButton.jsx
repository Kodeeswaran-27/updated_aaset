import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    console.log("Login button clicked")
    instance.loginRedirect(loginRequest)
      .then(response => {
        instance.setActiveAccount(response.account); // Set active account
        console.log(response);
        console.log("check ra");
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <button type="button" className="button" onClick={handleLogin}>Sign in with your Organization SSO</button>
  )
}