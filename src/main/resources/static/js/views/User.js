import createView from "../createView.js";
import {getHeaders} from "../auth.js";


export default function UserIndex(props) {

    // TODO: implement stories
    // ${props.user.stories.map(story => `
    //     <div class="user-stories row">
    //         <div class="story-content col-8" data-id="${story.id}">Pet: ${story.content}</div>
    // </div>
    //     `).join('')}

    return `
    <!DOCTYPE html>
        <main>
            <div class="container-fluid">
                <section class="section about-section gray-bg" id="about">
                    <div class="container">
                        <div class="row align-items-center flex-row-reverse">
                            <div class="col-lg-6">
                                <div class="about-avatar">
                                    <img id="profile_img" src="${props.user.profileImg}" title="profile" alt="profile">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="about-text go-to">
                                    <h3 class="dark-color">User Profile</h3>
                                    <div class="row about-list">
                                        <div class="col-md-6">
                                            <div class="media">
                                                <label>Name</label>
                                                <p>${props.user.firstName} ${props.user.lastName}</p>
                                            </div>
                                            <div class="media">
                                                <label>Email</label>
                                                <p>${props.user.email}</p>
                                            </div>
                                            <div class="media">
                                                <label>Address</label>
                                                <p>${props.user.street}, ${props.user.city}, ${props.user.state} ${props.user.zip}</p>
                                            </div>
                                            <div class="media">
                                                <label>Organization</label>
                                                <p>${props.user.organization}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="media">
                                                <label>Username</label>
                                                <p>${props.user.username}</p>
                                            </div>
                                            <div class="media">
                                                <label>Phone</label>
                                                <p>${props.user.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="button" class="btn btn-primary btn-sm" id="edit-profile-btn">Edit Profile Information</button>
                            <button type="button" class="btn btn-primary btn-sm" id="edit-password-btn">Edit Password</button>
                        </div>
                    </div>
                </section>
                <section class="section listing-section" id="user-listing">
                    <div class="container">
                        <div>
                            <h3 class="dark-color">Your Listings: </h3>
                            ${props.user.listings.map(listing => `
                                <div class="user-listings row gray-bg">
                                    <div class="listing-name col-8" data-id="${listing.id}">Pet: ${listing.name}</div>
                                    <div class="listing-view col-1" data-id="${listing.id}">View</div>
                                    <div class="listing-edit col-1" data-id="${listing.id}">Edit</div>
                                    <div class="listing-delete col-2" data-id="${listing.id}">Delete</div>
                                </div>
                            `).join('')}
                        </div>
                        <div>
                            <button type="button" class="btn btn-primary btn-sm" id="new-listing-btn">Create A New Listing</button>
                        </div>
                    </div>
                </section>
                <section class="section story-section gray-bg" id="user-story">
                    <div class="container">
                        <div>
                            <h3 class="dark-color">Your Stories: </h3>
                        </div>
                        <div>
                            <textarea id="new-story" name="new-story" rows="4" placeholder="Tell your story"></textarea>
                            <button type="button" class="btn btn-primary btn-sm" id="new-story-btn">Submit</button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    `;
}

function newListingBtn(){
    $('#new-listing-btn').click(function(){
        createView("/create")
    })
}

function viewListing(){
    $('.listing-view').click(function(){
        let id = this.getAttribute('data-id');
        createView("/listings/{id}");
    })
}

function editListing(){
    $('.listing-edit').click(function(){
        let id = this.getAttribute('data-id');
        createView("/edit/{id}") // set up id dynamically, data-id???
    })
}

function deleteListing() {
    $('.listing-delete').click(function () {

        let id = this.getAttribute('data-id')

        let request = {
            method: "DELETE",
            headers: getHeaders()
        }

        fetch(`http://localhost:8080/api/listings/${id}`, request)
            .then(res => {
                console.log(res.status);
                createView("/users")
            }).catch(error => {
                console.log(error);
                createView("/users");
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

function createStory() {
    $('#new-story-btn').click(function () {

        let newStory = $('#new-story').val();

        let request = {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(newStory)
        }

        fetch(`http://localhost:8080/api/stories`, request)
            .then(res => {
                console.log(res.status);
                createView("/users")
            }).catch(error => {
                console.log(error);
                createView("/users");
        });

    })
}

export function UsersEvent(){
    newListingBtn();
    viewListing();
    editListing();
    deleteListing();
    editPassword();
    editUser();
    createStory();
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




