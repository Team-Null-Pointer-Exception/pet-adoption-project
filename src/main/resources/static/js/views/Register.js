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
                    <h1 class="text-white">Register</h1>
                    <label for="username">Username</label>
                    <input id="username" name="username" type="text"/>
                    <br>
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email">
                    <br>
                    <label for="initialPassword">Password</label>
                    <input id="initialPassword" name="password" type="password"/>
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
                    <select id="state">
                      <option>AL</option>
                      <option>AS</option>
                      <option>AR</option>
                      <option>AZ</option>
                      <option>CA</option>
                      <option>CO</option>
                      <option>DE</option>
                      <option>DC</option>
                      <option>FL</option>
                      <option>GA</option>
                      <option>GU</option>
                      <option>HI</option>
                      <option>IA</option>
                      <option>ID</option>
                      <option>IL</option>
                      <option>IN</option>
                      <option>KS</option>
                      <option>KY</option>
                      <option>LA</option>
                      <option>MA</option>
                      <option>MD</option>
                      <option>ME</option>
                      <option>MI</option>
                      <option>MN</option>
                      <option>MO</option>
                      <option>MP</option>
                      <option>MS</option>
                      <option>MT</option>
                      <option>NC</option>
                      <option>ND</option>
                      <option>NE</option>
                      <option>NH</option>
                      <option>NJ</option>
                      <option>NM</option>
                      <option>NV</option>
                      <option>NY</option>
                      <option>OH</option>
                      <option>OK</option>
                      <option>OR</option>
                      <option>PA</option>
                      <option>PR</option>
                      <option>RI</option>
                      <option>SC</option>
                      <option>SD</option>
                      <option>TN</option>
                      <option>TX</option>
                      <option>UT</option>
                      <option>VA</option>
                      <option>VI</option>
                      <option>VT</option>
                      <option>WA</option>
                      <option>WI</option>
                      <option>WV</option>
                      <option>WY</option>
                    </select>
                    <br>                      
                    <label for="zip">Zip Code</label>
                    <input id="zip" name="zip" type="text"/> 
                    <br> 
                    <label for="phone">Phone Number</label>
                    <input id="phone" name="phone" type="text"/>
                    <br>   
                    <button id="profile_upload"  type="button" class="text-white imageUploadToggle">Set Picture</button>                                                                        
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
    UploadEvent()
    RegisterEventListener()
}

let apiKey = 'Ai0nLPbgkSYqoCCgE4Sn0z';
let imgURL = ""
function UploadEvent() {
    $('#profile_upload').click(function () {
        const client = filestack.init(apiKey);
        const options = {
            onFileUploadFinished: callback => {
                imgURL = callback.url
            }
        }
        client.picker(options).open();
    })
}


function RegisterEventListener(){
    $("#register-btn").click(function(){ // event listener
        let password = $("#initialPassword").val()
        let confirmPassword = $("#confirmPassword").val()
        if(password === confirmPassword) {
            console.log("confirmed")
            let newUser = {
                username: $("#username").val(),
                email: $("#email").val(),
                password: password,
                firstName: $("#firstName").val(),
                lastName: $("#lastName").val(),
                organization: $("#organization").val(),
                street: $("#street").val(),
                city: $("#city").val(),
                state: $("#state").val(),
                zip: $("#zip").val(),
                phone: $("#phone").val(),
                profileImg: imgURL,
                stories: []
            }

        let request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(newUser)
        }
            console.log(request)
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