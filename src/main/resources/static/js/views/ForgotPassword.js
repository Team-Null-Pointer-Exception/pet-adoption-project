import {getHeaders} from "../auth.js";
import {baseUri} from "../fetchData.js";


export default function ForgotPassword() {
    $("#inbox-container").css({display: "none"})
     return`      
         <div class="row forgot-row">
             <div class="card forgot-card"> 
                <form id="forgot-form">
                    <h2 class="text-white">Forgot Password?</h2>
                    <label for="email"id="forgot-email-label">Enter your email</label>
                    <br>
                    <input id="forgot-email" name="email" type="text"/>
                    <br>
                    <input id="forgot-btn" class="allow mt-2" type="button" value="Send Reset"/>
                    <p id="forgot-password-response">Please check your email for reset link.</p>  
                    <p id="error-response">Error. No account found.</p>  
                </form>
             </div>
         </div>`;
    }

export function ForgotEvent(){
    console.log("forgot event called")
    $("#forgot-btn").click(function () {
        let email = $("#email").val()
        console.log(email)
        let request = {
            method: "PUT",
            headers: getHeaders(),
        }
        console.log(request)
        // send request
        fetch(`${baseUri}/api/users/send?email=${email}`, request)
            .then(response => {
                console.log(response.status);
                $("#forgot-password-response").css({display: "block"})
                // createView("/")
            }).catch(error => {
            console.log(error);
            $("#error-response").css({display: "block"})
        });
    })
}