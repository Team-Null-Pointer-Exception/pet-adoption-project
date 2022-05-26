import fetchData from "./fetchData.js";
import createView from "./createView.js";

/**
 * Adds a login event to allow the user to initially obtain a new OAuth2.0 token
 * On a successful response, sets the tokens into storage and redirects to the root
 */
export default function addLoginEvent() {
    console.log("entered addLoginEvent")
    document.querySelector("#login-btn").addEventListener("click", function () {
        let obj = {
            username: document.querySelector("#username").value,
            password: document.querySelector("#password").value,
            grant_type: 'password'
        }
        console.log("got to login event")

        let request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa('pet-adoption-project-client:secret')
            },
            body: `grant_type=${obj.grant_type}&username=${obj.username}&password=${obj.password}&client_id=pet-adoption-project-client`
        };

        fetchData(
            {
                route: `/oauth/token`
            },
            request).then((data) => {
            setTokens(data);
        });
    });
}

/**
 * Gets the Authorization header needed for making requests to protected endpoints
 * This function should be used only after the user is logged in
 * @returns {{Authorization: string, "Content-Type": string}|{"Content-Type": string}}
 */
export function getHeaders() {
    const token = localStorage.getItem("access_token");
    return token
        ? {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${token}`}
        : {'Content-Type': 'application/json'};
}


/**
 * Attempts to set the access and refresh tokens needs to authenticate and authorize the client and user
 * @param responseData
 */
function setTokens(responseData) {
    if (responseData.route['access_token']) {
        localStorage.setItem("access_token", responseData.route['access_token']);
        console.log("Access token set");
        if (responseData.route['refresh_token']) {
            localStorage.setItem("refresh_token", responseData.route['refresh_token']);
            console.log("Refresh token set")
            createView("/");
        }
    } else {
        $("#login-response").css({display: "block"});
    }
}

export function isLoggedIn(){
    if (localStorage.getItem('access_token')){
        return true;
    }
    else {
        return false;
    }
}

export function getUserRole() {
    const accessToken = localStorage.getItem("access_token");
    if(!accessToken) {
        return false;
    }
    const parts = accessToken.split('.');
    const payload = parts[1];
    const decodedPayload = atob(payload);
    const payloadObject = JSON.parse(decodedPayload);
    return payloadObject.authorities[0];
}

export async function removeStaleTokens() {
    const request = {
        method: "GET",
        headers: getHeaders()
    }
    await fetch('api/users/me', request)
        .then((response) => {
            if (response.status === 401) {
                window.localStorage.clear();
            }
        }).catch(error => {
            console.log("FETCH ERROR: " + error);
        })
}