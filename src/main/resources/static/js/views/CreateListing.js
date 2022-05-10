import createView from "../createView.js";
import {getHeaders} from "../auth.js";


export default function CreateListing(props) {
    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Create A Listing</title>
            </head>
            <body>
            <div class="row create-listing-row">
            <div class="card create-listing-card"> 
                <form id="create-listing-form">
                    <h1>Create A Listing</h1>
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
                    <select class="form-control" id="sex">
                      <option>MALE</option>
                      <option>FEMALE</option>
                    </select>
                    <br>
                    <label for="health">Health</label>
                    <input id="health" name="health" type="text"/>
                    <br>
                    <label for="fixed">Fixed</label>
                    <select class="form-control" id="fixed">
                      <option>True</option>
                      <option>False</option>
                    </select>
                    <br>
                    <label for="description">Description</label>
                    <textarea id="description" name="description" rows="2" placeholder="Pet description"></textarea>
                    <br>
                    <label for="summary">Summary</label>
                    <textarea id="summary" name="summary" rows="3" placeholder="Listing information"></textarea>
                    <br>              
                    <a href="" id="image_upload" class="text-white" data-link>Upload Image</a>                                                                         
                    <button id="create-listing-btn" type="button">Submit</button>
                </form>
            </div>
            </div>
            </body>
        </html>
    `;
}

export function CreateEvents(){
    CreateListing();
    AddFileEvent();
    CreateListingsEvent()
}

let apiKey = 'Ai0nLPbgkSYqoCCgE4Sn0z';
let imageArray = []

function AddFileEvent(){
    $('#image_upload').click(function () {
        const client = filestack.init(apiKey);
        const options = {
            onFileUploadFinished: callback => {
                const imgURL = callback.url
                imageArray.push(imgURL)
                console.log(imageArray)
            }
        }
        client.picker(options).open();
    })
}


function CreateListingsEvent(){
    $('#create-listing-btn').click(function () {
        let images = []
        for (let image of imageArray) {
            image = {"images": image}
            images.push(image)
        }
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
            images: images
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