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
                    <input id="sex" name="sex" type="text"/>
                    <br>
                    <label for="health">Health</label>
                    <input id="health" name="health" type="text"/>
                    <br>
                    <label for="fixed">Fixed</label>
                    <select id="fixed">
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
                    <a href="" id="image_upload" data-link>Upload files</a>                                                                         
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
            }
        }
        client.picker(options).open();
    })
}

let testimage = "https://cdn.filestackcontent.com/GTR9A03TAu35zRjVYbgL"

function CreateListingsEvent(){
    $('#create-listing-btn').click(function () {

        let newListing = {
            summary: $("#summary").val(),
            age: $("#age").val(),
            animal: $("#animal").val(),
            breed: $("#breed").val(),
            color: $("#color").val(),
            description: $("#description").val(),
            fixed: $("#fixed").val(),
            health: $("#health").val(),
            name: $("#name").val(),
            sex: $("#sex").val(),
            images: imageArray
        }

        let request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(newListing)
        }

        fetch("http://localhost:8080/api/listings/create", request)
            .then(res => {
                console.log(res.status);
                createView("/users")
            }).catch(error => {
            console.log(error);
            createView("/users");
        });
    })
}