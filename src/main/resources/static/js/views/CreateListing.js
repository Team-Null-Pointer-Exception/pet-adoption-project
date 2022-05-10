import createView from "../createView.js";
import {getHeaders} from "../auth.js";

export default function CreateListing(props) {
    console.log("The frontend did it. HER FAULT");
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
                <input id="create-listing-btn" type="submit" value="Submit"/>
            </form>
        </main>
    `;
}

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