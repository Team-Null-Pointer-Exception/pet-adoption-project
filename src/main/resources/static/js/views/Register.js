import CreateView from "../createView.js"
import createView from "../createView.js";
import {getHeaders} from "../auth.js";

export default function Register(props) {
    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Register</title>
            </head>
            <body>
            <div class="row set-up-row">
            <div class="card set-up-card"> 
                <form id="register-form">
                    <h1>Register</h1>
                    <label for="username">Username</label>
                    <input id="username" name="username" type="text"/>
                    <br>
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email">
                    <br>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password"/>
                    <br>
                    <label for="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" name="confirmPassword" type="password"/>
                    <br>
                    <label for="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text"/>
                    <br>
                    <label for="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text"/>
                    <br>
                    <label for="organization">Organization</label>
                    <input id="organization" name="organization" type="text"/>
                    <br>
                    <label for="street">Street Address</label>
                    <input id="street" name="street" type="text"/>
                    <br>
                    <label for="city">City</label>
                    <input id="city" name="city" type="text"/>
                    <br>
                    <label for="state">State</label>
                    <input id="state" name="state" type="text"/>
                    <br>                      
                    <label for="zip">Zip Code</label>
                    <input id="zip" name="zip" type="text"/> 
                    <br> 
                    <label for="phone">Phone Number</label>
                    <input id="phone" name="phone" type="text"/>
                    <br>                                                                                
                    <button id="register-btn" type="button">Register</button>
                    <p id="register-response">Passwords do not match. Please try again.</p>  

                </form>
                </div>
                </div>
            </body>
        </html>
`;
}

export function RegisterEvent() {
    $("#register-btn").click(function () { // event listener
        let password = $("#password").val()
        let confirmPassword = $("#confirmPassword").val()
        if (password === confirmPassword) {
            let newUser = {
                username: $("#username").val(),
                email: $("#email").val(),
                password: $("#password").val(),
                firstName: $("#firstName").val(),
                lastName: $("#lastName").val(),
                organization: $("#organization").val(),
                street: $("#street").val(),
                city: $("#city").val(),
                state: $("#state").val(),
                zip: $("#zip").val(),
                phone: $("#phone").val()
            }

            let request = {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(newUser)
            }

            // send request
            fetch("http://localhost:8080/api/users/create", request)
                .then(response => {
                    console.log(response.status);
                    CreateView("/");
                }).catch(error => {
                console.log(error);
                createView("/");
            });
        } else {
            $("#register-response").css({display: "block"});
        }
    })
}
    // export function AboutEvent() {
    //     const pubnub = new PubNub({
    //         publishKey: 'pub-c-bb9af08e-b237-4be3-9034-01b26d08c08a',
    //         subscribeKey: 'sub-c-f4ccb286-cd53-11ec-8bef-6e591379c0d0'
    //     });
    //
    //     function $(id) {
    //         return document.getElementById(id);
    //     }
    //
    //     const box = $('box'),
    //         input = $('input'),
    //         channel = '10chat-demo';
    //     pubnub.addListener({
    //         message: function (obj) {
    //             box.innerHTML = ('' + obj.message).replace(/[<>]/g, '') + '<br>' + box.innerHTML
    //         }
    //     });
    //     pubnub.subscribe({
    //         channels: [channel]
    //     });
    //     input.addEventListener('keyup', function (e) {
    //         if ((e.keyCode || e.charCode) === 13) {
    //             pubnub.publish({
    //                 channel: channel,
    //                 message: input.value,
    //                 x: (input.value = '')
    //             });
    //         }
    //
    //         fetch("http://localhost:8080/about", request)
    //             .then(response => {
    //                 console.log(response.status);
    //                 CreateView("/");
    //             }).catch(error => {
    //             console.log(error);
    //             createView("/");
    //         });
    //     });
    //}
