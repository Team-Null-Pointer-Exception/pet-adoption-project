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
                    <label for="email">Email <span class="input-required">*</span></label>
                    <br>
                    <input id="email" name="email" type="email" required>
                    <br>
                    <label for="initialPassword">Password <span class="input-required">*</span></label>
                    <br>
                    <input id="initialPassword" name="password" type="password" pattern=“(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}” title=“Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters” required/>
                    <br>
                    <label for="confirmPassword">Confirm Password <span class="input-required">*</span></label>
                    <br>
                    <input id="confirmPassword" name="confirmPassword" type="password" required/>
                    <br>
                    <label for="firstName">First Name <span class="input-required">*</span></label>
                    <br>
                    <input id="firstName" name="firstName" type="text" required/>
                    <br>
                    <label for="lastName">Last Name</label>
                    <br>
                    <input id="lastName" name="lastName" type="text" required/>
                    <br>                      
                    <label for="zip">Zip Code <span class="input-required">*</span></label>
                    <br>
                    <input id="zip" name="zip" type="text" required/> 
                    <br>
                    <p><span class="input-required">*</span> required field</p>
                    <p>Upload a profile picture:</p>          
                    <input type="file" id="profile_upload" name="file" /> 
                    <br>                                                                     
                    <button id="register-btn" type="button">Register</button>
                    <p class="text-white">Already have an account?</p>
                    <a href="/login" id="login-link" data-link>Sign in</a>
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
let imgURL = 'https://petadoptions-npe.s3.us-east-2.amazonaws.com/default-profle-pic.png'
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
                if (filename === "" || filename == null) {
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
            if (password === confirmPassword) {
                console.log("confirmed")
                let newUser = {
                    username: "N/A",
                    email: $("#email").val().trim(),
                    password: password,
                    firstName: $("#firstName").val().trim(),
                    lastName: $("#lastName").val().trim(),
                    zip: $("#zip").val().trim(),
                    profileImg: imgURL,
                    organization: "N/A",
                    street: "N/A",
                    city: "N/A",
                    state: "NA",
                    phone: "N/A",
                    stories:[],
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
    if(user.email !== "" || user.firstName !== "" || user.zip !== "") {
        return true;
    } else {
        alert('Registration failed. Please try again.')
        CreateView("/register");
        return false;
    }
}