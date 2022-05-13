import createView from "../createView.js";
import {getHeaders} from "../auth.js";


export default function EditListing(props) {
    return `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title>Edit Listing</title>
            </head>
            <body>
            <div class="row edit-listing-row">
            <div class="card edit-listing-card"> 
                <form id="edit-listing-form" name="edit-listing-form">
                    <h1>Edit Listing</h1>
                   
                    <label for="name">Name</label>
                    <input id="name" name="name" type="text"/>
                    <br>
                    <label for="animal">Animal</label>
                    <input id="animal" name="animal"  type="text"/>
                    <br>
                    <label for="breed">Breed</label>
                    <input id="breed" name="breed" type="text"/>
                    <br>
                    <label for="color">Color</label>
                    <input id="color" name="color"  type="text"/>
                    <br>
                    <label for="age">Age</label>
                    <input id="age" name="age" type="text"/>
                    <br>
                    <label for="sex">Sex</label>
                    <select id="sex">
                      <option>MALE</option>
                      <option>FEMALE</option>
                    </select>
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
                    <button id="image_upload" type="button class="text-white imageUploadToggle">Uploads</button>                                                                      
                    <button id="edit-listing-btn" type="button">Submit</button>
                </form>
            </div>
            </div>
            </body>
        </html>
    `;
    // <input type="text" id="listing-id" value=${props.listing.id}/>
    //         value=${props.listing.name}
    //         value=${props.listing.animal}
    //         value=${props.listing.breed}
    //             value=${props.listing.color}
    //                 value=${props.listing.age}
    //                     value=${props.listing.health}
    //                         value=${props.listing.summary}
}

export function EditEvents() {
    EditListing();
    fileStackSetUp()
    AddFileEvent();
    EditListingsEvent()
}

let apiKey = 'Ai0nLPbgkSYqoCCgE4Sn0z';
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

//     console.log("The frontend did it. HER FAULT");
//     return `
//         <header>
//             <h1>Edit Listing</h1>
//         </header>
//         <main>
//             <form>
//                 <div class="form-group">
//                     <label for="formGroupExampleInput">Example label</label>
//                     <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder">
//                 </div>
//                 <div class="form-group">
//                     <label for="formGroupExampleInput2">Another label</label>
//                     <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
//                 </div>
//                 <input id="edit-listing-btn" type="submit" value="Submit"/>
//             </form>
//         </main>
//     `;
// }

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
        let id = 13;

        fetch(`http://localhost:8080/api/listings/edit/${id}`, request)
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
        // let title = $('#add-post-title').val();
        // let content = $('#add-post-content').val();
        // let post = {
        //     title,
        //     content
        // }
        //
        // let postId = this.getAttribute('data-id')
        //
        // let request = {
        //     method: "PUT",
        //     headers: getHeaders(),
        //     body: JSON.stringify(post)
        // }
        //
        // fetch(`http://localhost:8080/api/listings/edit/${postId}`, request)
        //     .then(res => {
        //         console.log(res.status);
        //         createView("/users")
        //     }).catch(error => {
        //     console.log(error);
        //     createView("/users");
        // });
    // })
// }