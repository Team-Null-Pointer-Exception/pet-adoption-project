import {getHeaders} from "../auth.js";
import createView from "../createView.js";
import {token} from "../router.js";


export default function ResetPassword() {
    return `
<div class="row reset-row">
<div class="card reset-card"> 

<form id="reset-form">
<h1 class="text-white">Forgot Your Password?</h1>
            <p>
                <input type="password" name="password" id="new-password" class="form-control"
                       placeholder="Enter your new password" required autofocus />
            </p>
            <p>
                <input type="password" class="form-control" id="confirm-new-password" placeholder="Confirm your new password"/>
            </p>
            <p class="text-center">
                <input id="reset-btn" class="allow" type="button" value="Reset Password"/>
            </p>
            <p id="password-response"></p>
</form>
</div>
</div>
    `
}


export function ResetEvent() {
    console.log("forgot event called")
    $("#reset-btn").click(function() {
        console.log("button has been pressed")
        console.log(token)
        let password = $("#new-password").val()
        let confirmPassword = $("#confirm-new-password").val()
        let newPassword = ""
        if(password === confirmPassword) {
            newPassword = $('#new-password').val();
            let request = {
                method: "PUT",
                headers: getHeaders()
            }
            fetch(`http://localhost:8080/reset?password=${newPassword}&token=${token}`, request)
                .then(res => {
                    console.log(res.status);
                    createView("/home");
                }).catch(error => {
                console.log(error);
            });
        } else {
            $("#password-response").css({display: "block"});
        }
    })

}
