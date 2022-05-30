import CreateView from "../createView.js"
import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import {baseUri} from "../fetchData.js";

export default function Register(props) {
    return `
    <div class="container-fluid">
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
                    <input id="initialPassword" name="password" type="password" pattern=“(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}” title=“Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters” required/>
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
                    <input type="file" id="profile_upload" name="file" />                                                                      
                    <button id="register-btn" type="button">Register</button>          
                </form>
            </div>
        </div>
    </div>            
`;
}


export function RegisterEvent() {
    UploadEvent()
    RegisterEventListener()
}



let filename = ""
let imgURL = ""
function UploadEvent() {
    $('#profile_upload').change(function () {
        let file = $("#profile_upload").prop('files')[0]
        filename = file.name
        let formData = new FormData();
        formData.append('file', file)
        const request = {
            method: 'POST',
            body: formData
        }
        fetch(`${baseUri}/api/users/upload`, request)
            .then(response => {
                console.log(response.status);
                filename = file.name
                imgURL = `https://petadoptions-npe.s3.us-east-2.amazonaws.com/${filename}`
                return imgURL
            }).catch(error => {
            console.log(error);
        });
    })
}



function RegisterEventListener(){
    $("#register-btn").click(function(){ // event listener
        let password = $("#initialPassword").val()
        let confirmPassword = $("#confirmPassword").val()
        console.log(imgURL)
        if(CheckPassword(password)) {
            if (password === confirmPassword && CheckPassword(password)) {
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
                fetch(`${baseUri}/api/users/create`, request)
                    .then(response => {
                        console.log(response.status);
                        CreateView("/");
                    }).catch(error => {
                    console.log(error);
                    createView("/");
                });
            }
        } else {
            alert('Password does not match')
        }
    })
}

function CheckPassword(inputtxt) {
    let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
    if(inputtxt.match(passw))
    {
        return true;
    } else {
        alert('Password must be 6 to 15 characters and contain at least one numeric digit, one uppercase and one lowercase letter')
        return false;
    }
}