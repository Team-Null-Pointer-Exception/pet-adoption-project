import createView from "../createView.js";
import {getHeaders} from "../auth.js";

export default function UserIndex(props) {
    console.log("The frontend did it. HER FAULT");

    return `
        <header>
            <h1>User Profile</h1>
        </header>
        <main>
            <div class="container-fluid">
                <div id="user-data-container">
                    <p class="username" data-id="${props.user.id}">Username: ${props.user.username}</p>
                    <p class="email" data-id="${props.user.id}">Email: ${props.user.email}</p>
                    <p class="posts" data-id="${props.user.id}">Posts: ${props.user.posts.map(post => `<span>${post.title}</span>
                        `).join(', ')}</p>
                </div>
                <div id="edit-user-container">
                    <form>
                        <div class="form-group">
                            <label for="edit-user-password">Change Password</label>
                            <input type="password" class="form-control" id="edit-user-password" placeholder="Enter New Password">
                        </div>
                        <button type="submit" class="btn btn-primary" id="edit-password-btn" data-id="${props.user.id}">Submit</button>
                    </form>
                </div>
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

