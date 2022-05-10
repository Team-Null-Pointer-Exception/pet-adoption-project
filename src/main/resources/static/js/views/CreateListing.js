import createView from "../createView.js";
import {getHeaders} from "../auth.js";


export default function CreateListing(props) {
    return `
        <header>
            <h1>Create Listing</h1>
        </header>
        <main>
            <form>
                <div class="form-group">
                    <label for="formGroupExampleInput">Example label</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Another label</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
                </div>
                <a href="" id="image_upload" data-link>Upload files</a>
                
                <input id="create-listing-btn" type="submit" value="Submit"/>
            </form>
        </main>
    `;
}

export function CreateEvents(){
    CreateListing()
    AddFileEvent()
    CreateListingsEvent()
}

let apiKey = 'Ai0nLPbgkSYqoCCgE4Sn0z';

export function AddFileEvent(){
    $('#image_upload').click(function () {
        const client = filestack.init(apiKey);
        const options = {
            onFileUploadFinished: callback => {
                const imgURL = callback.url
                console.log(imgURL)
            }
        }
        client.picker(options).open();
    })
}

let testimage = "https://cdn.filestackcontent.com/GTR9A03TAu35zRjVYbgL"

export function CreateListingsEvent(){
    $('#create-listing-btn').click(function () {

        let title = $('#add-post-title').val();
        let content = $('#add-post-content').val();
        let post = {
            title,
            content
        }

        let request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(post)
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