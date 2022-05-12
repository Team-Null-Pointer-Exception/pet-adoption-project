import createView from "../createView.js";

export default function Logout(props) {
    console.log("Logging out")
    return ``;
}

export function LogoutEvents(){
    console.log("Calling LogoutEvent");
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("refresh_token");
    createView("/home");
}