import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import token from "../keys.js";
import {baseUri} from "../fetchData.js";


export default function EditListing(props) {
    return `
       <div id="overlay-${listing.id}" class="overlay">
            <a class="btn rounded-circle text-center edit-close-button px-0" data-id="${listing.id}" style="width: 36px; height: 36px;" href="#">X</a>
            <div class="container overlay-container">        
                <div class="row edit-listing-row">
                    <div class="card edit-listing-card"> 
                        <form id="edit-listing-form" name="edit-listing-form">
                            <h1 class="text-white">Edit Listing</h1>
                            <label for="name">Name</label>
                            <input id="name" name="name" type="text" maxlength="20"/>
                            <br>
                            <label for="animal">Animal Type</label>
                            <input id="animal" name="animal" type="text" maxlength="20"/>
                            <br>
                            <label for="breed">Breed</label>
                            <input id="breed" name="breed" type="text" maxlength="20"/>
                            <br>
                            <label for="color">Color</label>
                            <input id="color" name="color" type="text" maxlength="20"/>
                            <br>
                            <label for="age">Age</label>
                            <input id="age" name="age" type="text" maxlength="20"/>
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
                            <textarea id="description" name="description" rows="4" maxlength="255" placeholder="(max 255 chars"></textarea>
                            <br>
                            <label for="summary">Summary</label>
                            <textarea id="summary" class="align-top mt-0" name="summary" rows="3" maxlength="100" placeholder="(max 100 chars)"></textarea>
                            <br>              
                            <button id="image_upload" type="button" class="text-white imageUploadToggle">Uploads</button>                                                                      
                            <button id="edit-listing-btn" type="button">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
       </div>

    `;
}

export function EditEvents() {
    EditListing();
    fileStackSetUp()
    AddFileEvent();
    EditListingsEvent()
}

let apiKey = token().fileKey
let imageArray = []
let fileStackClient = null

function fileStackSetUp() {
    fileStackClient = filestack.init(apiKey);
}


function AddFileEvent(){
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


export function EditListingsEvent(){
    $('#edit-listing-btn').click(function () {
        let editListing = {
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
        console.log(editListing)
        let request = {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(editListing)
        }

        fetch(`${baseUri}/api/listings/edit/${id}`, request)
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
