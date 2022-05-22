import {getHeaders} from "../auth.js";
import createView from "../createView.js";


export default function ForgotPassword() {
     return`      
         <div class="row forgot-row">
             <div class="card forgot-card"> 
                <form id="forgot-form">
                    <h2 class="text-white">Forgot Your Password?</h2>
                    <label for="email">Enter your email:</label>
                    <br>
                    <input id="email" name="email" type="text"/>
                    <br>
                    <input id="forgot-btn" class="allow mt-2" type="button" value="Send Reset"/>
                    <p id="forgot-password-response">Please check your email for a password reset link.</p>  
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
        fetch(`http://localhost:8080/api/users/send?email=${email}`, request)
            .then(response => {
                console.log(response.status);
                $("#forgot-password-response").css({display: "block"})
                createView("/")
            }).catch(error => {
            console.log(error);
            $("#error-response").css({display: "block"})
        });
    })
}