import createView from "../createView.js";
import {getHeaders} from "../auth.js";


export default function UserIndex(props) {

    return `
        <header>
            <h1>User Profile</h1>
        </header>
        <main>
            <div class="container-fluid">

                <button type="button" class="btn btn-primary btn-sm" id="new-listing-btn">Create A New Listing</button>
                <button type="button" class="btn btn-primary btn-sm" id="edit-listing-btn">Edit An Existing Listing</button>
            </div>
        </main>
    `;
}

function newListingBtn(){
    $('#new-listing-btn').click(function(){
        createView("/create")
    })
}

function editListingBtn(){
    $('#edit-listing-btn').click(function(){
        createView("/edit")
    })
}

function deleteListing() {
    $('.delete-post-btn').click(function () {

        let postId = this.getAttribute('data-id')

        let request = {
            method: "DELETE",
            headers: getHeaders()
        }

        fetch(`http://localhost:8080/api/posts/${postId}`, request)
            .then(res => {
                console.log(res.status);
                createView("/posts")
            }).catch(error => {
            console.log(error);
            createView("/posts");
        });

    })
}

function editPassword(){
    $('#edit-password-btn').click(function(){

        let id = this.getAttribute('data-id');
        let newPassword = $('#edit-user-password').val();

        let request = {
            method: "PUT",
            headers: getHeaders()
        }
        fetch(`http://localhost:8080/api/users/${id}/updatePassword?newPassword=${newPassword}`, request)
            .then(res => {
                console.log(res.status);
                createView("/users")
            }).catch(error => {
            console.log(error);
            createView("/users");
        });
    })
}

function editUser(){

}

export function UsersEvent(){
    newListingBtn();
    deleteListing();
    editPassword();
    editUser();
}

export function getUserRole() {
    const accessToken = localStorage.getItem("access_token");
    if(!accessToken) {
        return false;
    }
    const parts = accessToken.split('.');
    const payload = parts[1];
    const decodedPayload = atob(payload);
    const payloadObject = JSON.parse(decodedPayload);
    return payloadObject.authorities[0];
}

export function getUser() {
    const accessToken = localStorage.getItem("access_token");
    if(!accessToken) {
        return false;
    }
    const parts = accessToken.split('.');
    const payload = parts[1];
    const decodedPayload = atob(payload);
    const payloadObject = JSON.parse(decodedPayload);
    return payloadObject.user_name;
}




