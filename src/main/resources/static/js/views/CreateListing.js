import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import token from "../keys.js"


export default function CreateListing(props) {
    return `
            <div class="container-fluid">
                 <div class="row create-listing-row">
                      <div class="card create-listing-card"> 
                           <form id="create-listing-form" name="create-listing-form">
                                <h1 class="text-white">Create A Listing</h1>
                                <label for="name">Name</label>
                                <input id="name" name="name" type="text"/>
                                <br>
                                <label for="animal">Animal</label>
                                <input id="animal" name="animal" type="text"/>
                                <br>
                                <label for="breed">Breed</label>
                                <input id="breed" name="breed" type="text"/>
                                <br>
                                <label for="color">Color</label>
                                <input id="color" name="color" type="text"/>
                                <br>
                                <label for="age">Age</label>
                                <input id="age" name="age" type="text"/>
                                <br>
                                <label for="sex">Sex</label>
                                <select id="sex">
                                  <option>Male</option>
                                  <option>Female</option>
                                </select>
                                <br>
                                <label for="health">Health Issues</label>
                                <input id="health" name="health" type="text"/>
                                <br>
                                <label for="fixed">Fixed</label>
                                <select id="fixed">
                                  <option>True</option>
                                  <option>False</option>
                                </select>
                                <br>
                                <label for="description">Description</label>
                                <textarea id="description" class="align-top" name="description" rows="2" placeholder="Pet description"></textarea>
                                <br>
                                <label for="summary" id="create-summary-label">Summary</label>
                                <textarea id="summary" class="align-top" name="summary" rows="3" placeholder="Listing information"></textarea>
                                <br>              
                                <button id="image_upload" type="button class="text-white imageUploadToggle">Uploads</button>                                                                      
                                <button id="create-listing-btn" type="button">Submit</button>
                            </form>
                      </div>
                 </div>
            </div>
    `;
}

export function CreateEvents() {
    CreateListing();
    fileStackSetUp()
    AddFileEvent();
    CreateListingsEvent()
}

let apiKey = token().fileKey
let imageArray = []
let fileStackClient = null

function fileStackSetUp() {
    fileStackClient = filestack.init(apiKey);
}


function AddFileEvent() {
    $('#image_upload').click(function (event) {
        event.preventDefault()
        const options = {
            onFileUploadFinished: callback => {
                const imgURL = callback.url
                imageArray.push(imgURL)
                console.log(imageArray)
            }
        }
        fileStackClient.picker(options).open();
    })
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
            images: imageArray
        }
        console.log(newListing)
        let request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(newListing)
        }

        fetch("http://localhost:8080/api/listings", request)
            .then(res => {
                console.log(res.status);
                imageArray = []
                createView("/users")
            }).catch(error => {
            console.log(error);
            imageArray = []
            createView("/users");
        });
    })
}