import CreateView from "../createView.js"
import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import {baseUri} from "../fetchData.js";

export default function Register(props) {
    $("#inbox-container").css({display: "none"})
    return `
    <div class="container-fluid">
        <div class="row set-up-row">
            <div class="card set-up-card"> 
                <form id="register-form">
                    <h1 class="text-white">Register</h1>
                    <label for="username">Username</label>
                    <input id="username" name="username" type="text" required/>
                    <br>
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email" required>
                    <br>
                    <label for="initialPassword">Password</label>
                    <input id="initialPassword" name="password" type="password" pattern=“(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}” title=“Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters” required/>
                    <br>
                    <label for="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" required/>
                    <br>
                    <label for="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" required/>
                    <br>
                    <label for="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" required/>
                    <br>                      
                    <label for="zip">Zip Code</label>
                    <input id="zip" name="zip" type="text" required/> 
                    <br> 
                    <p>Upload a profile picture:</p>          
                    <input type="file" id="profile_upload" name="file" />                                                                      
                    <button id="register-btn" type="button">Register</button>       
                    <br>
                    <a href="/login" id="login-link" data-link>Already have an account? Sign in</a>   
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
                if (filename === "") {
                    imgURL = 'https://petadoptions-npe.s3.us-east-2.amazonaws.com/default-profle-pic.png';
                } else {
                    imgURL = `https://petadoptions-npe.s3.us-east-2.amazonaws.com/${filename}`
                }
                return imgURL
            }).catch(error => {
            console.log(error);
        });
    })
}



function RegisterEventListener(){
    $("#register-btn").click(function(){ // event listener
        let password = $("#initialPassword").val().trim()
        let confirmPassword = $("#confirmPassword").val().trim()
        console.log(imgURL)
        if(CheckPassword(password)) {
            if (password === confirmPassword && CheckPassword(password)) {
                console.log("confirmed")
                let newUser = {
                    username: $("#username").val().trim(),
                    email: $("#email").val().trim(),
                    password: password,
                    firstName: $("#firstName").val().trim(),
                    lastName: $("#lastName").val().trim(),
                    zip: $("#zip").val().trim(),
                    profileImg: imgURL
                }
                if(validateUser(newUser)) {
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
                        CreateView("/");
                    });
                }
            }
        } else {
            alert('Password does not match')
        }
    })
}

export function CheckPassword(inputtxt) {
    let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
    if(inputtxt.match(passw))
    {
        return true;
    } else {
        alert('Password must be 6 to 15 characters and contain at least one numeric digit, one uppercase and one lowercase letter')
        return false;
    }
}

function validateUser(user) {
    if(user.username !== "" || user.email !== "" || user.firstName !== "" || user.zip !== "") {
        return true;
    } else {
        alert('Registration failed. Please try again.')
        CreateView("/register");
        return false;
    }
}