import {getHeaders} from "../auth.js";
import createView from "../createView.js";



export default function ResetPassword(props) {

        return`      
        <div class="row reset-row">
           <div class="card reset-card"> 
               <form id="reset-form">
                    <h2 class="text-white">Reset Password</h2>
                        <label for="new-password">Enter new password</label>
                        <br>
                        <input id="new-password" name="new-password" type="password"/>
                        <br>
                        <label for="confirm-new-password">Enter new password</label>
                        <br>
                        <input id="confirm-new-password" name="confirm-new-password" type="password"/>
                        <br>
                        <input id="reset-btn" class="allow" type="button" value="Save"/>
                        <p id="password-response">Passwords do not match</p>  
               </form>
           </div>
        </div>`;
}


export function ResetEvent() {
    console.log("reset event called")
    let token = sessionStorage.getItem('token')
    $('#reset-btn').click(function () {
        let password = $("#new-password").val()
        let confirmPassword = $("#confirm-new-password").val()
        let newPassword = ""
        if(password === confirmPassword) {
            newPassword = $('#new-password').val();
            let request = {
                method: "PUT",
                headers: getHeaders()
            }
            fetch(`http://3.138.142.117:8080/api/users/reset?password=${newPassword}&token=${token}`, request)
                .then(res => {
                    console.log(res.status);
                    sessionStorage.clear();
                    createView("/home");
                }).catch(error => {
                console.log(error);
            });
        } else {
            $("#password-response").css({display: "block"});
        }
    })
}
