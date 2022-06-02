import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import token from "../keys.js";
import {baseUri} from "../fetchData.js";
import CreateView from "../createView.js";


export default function CreateListing(props) {
    $("#inbox-container").css({display: "none"})
    return `
            <div class="container-fluid">
                 <div class="row create-listing-row">
                      <div class="card create-listing-card">
                           <form id="create-listing-form" name="create-listing-form">
                                <h1 class="text-white">Create A Listing</h1>
                                <label for="name">Name</label>
                                <input id="name" name="name" type="text" maxlength="30"/>
                                <br>
                                <label for="animal">Animal Type</label>
                                <input id="animal" name="animal" type="text" maxlength="30"/>
                                <br>
                                <label for="breed">Breed</label>
                                <input id="breed" name="breed" type="text" maxlength="30"/>
                                <br>
                                <label for="color">Color</label>
                                <input id="color" name="color" type="text" maxlength="30"/>
                                <br>
                                <label for="age">Age</label>
                                <input id="age" name="age" type="text" maxlength="30"/>
                                <br>
                                <label for="sex">Sex</label>
                                <select id="sex">
                                  <option>Male</option>
                                  <option>Female</option>
                                  <option>Unknown</option>
                                </select>
                                <br>
                                <label for="health">Any health issues?</label>
                                <textarea id="health" class="align-top" name="health" type="text" rows="3" maxlength="100" placeholder="(max 100 chars)"></textarea>
                                <br>
                                <label for="fixed">Fixed</label>
                                <select id="fixed">
                                  <option>True</option>
                                  <option>False</option>
                                </select>
                                <br>
                                <label for="description">Description</label>
                                <textarea id="description" class="align-top" name="description" rows="4" maxlength="255" placeholder="(max 255 chars)"></textarea>
                                <br>
                                <label for="summary" id="create-summary-label">Summary</label>
                                <textarea id="summary" class="align-top mt-0" name="summary" rows="3" maxlength="100" placeholder="(max 100 chars)"></textarea>
                                <br>              
                                <input type="file" id="image_upload" name="file"/>                                                                         
                                <button id="create-listing-btn" type="button">Submit</button>
                                <br>
                                <a href="/" id="cancel-link" data-link>Not ready to list? Cancel here</a>   
                            </form>
                      </div>
                 </div>
            </div>
    `;
}

export function CreateEvents() {
    CreateListing();
    AddFileEvent();
    CreateListingsEvent()
}



let filename = ""
let imgURL = ""

function AddFileEvent() {
    $('#image_upload').change(function () {
        let file = $("#image_upload").prop('files')[0]
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

function validateListing(listing) {
    if(listing.name !== "" || listing.animal !== "") {
        return true;
    } else {
        alert('Create listing failed. Please try again, including name and type of animal.')
        CreateView("/create");
        return false;
    }
}


function CreateListingsEvent() {
    $('#create-listing-btn').click(function () {
        let newListing = {
            summary: $("#summary").val(),
            name: $("#name").val(),
            animal: $("#animal").val(),
            breed: $("#breed").val(),
            sex: $("#sex").val(),
            age: $("#age").val(),
            color: $("#color").val(),
            description: $("#description").val(),
            fixed: $("#fixed").val(),
            health: $("#health").val(),
            images: imgURL
        }
        if (validateListing(newListing)) {
        let request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(newListing)
        }
        fetch(`${baseUri}/api/listings`, request)
            .then(res => {
                console.log(res.status);
                alert('Your listing is under review. Once approved, it will be posted shortly')
                createView("/users")
            }).catch(error => {
            console.log(error);
            createView("/users");
            });
       }
    })
}