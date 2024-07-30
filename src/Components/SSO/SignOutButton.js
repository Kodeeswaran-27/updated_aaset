import React from "react";
import { useMsal } from "@azure/msal-react";
/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
        sessionStorage.removeItem('responseData');
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",

        }).catch(e=>{
            console.error(e);
        });
    }
    return (
        <button type="button" className="button" onClick={handleLogout}>Logout</button>
    )
}