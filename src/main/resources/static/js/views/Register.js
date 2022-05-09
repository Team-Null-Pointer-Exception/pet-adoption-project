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
                <h1>Register</h1>
        
                <form id="register-form">
                    <label for="username">Username</label>
                    <input id="username" name="username" type="text"/>
                    <br>
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email">
                    <br>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password"/>
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
                </form>
            </body>
        </html>
`;
}

export function RegisterEvent(){
    $("#register-btn").click(function(){ // event listener

        // create a new User object from the values of the input fields
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

        // logs the newly created user to verify
        console.log(newUser);

        // setup request
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
    })
}