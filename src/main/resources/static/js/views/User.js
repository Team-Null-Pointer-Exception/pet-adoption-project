import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import CreateView from "../createView";


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
                        <div id="edit-profile-info">
                            <form class="row" id="edit-profile-form">
                                <div class="col-md-6 edit-profile-col" id="edit-profile-1">
                                    <div class="media">
                                        <label for="edit-firstName">First Name</label>
                                        <input id="edit-firstName" name="edit-firstName" type="text" value="${props.user.firstName}"/>
                                    </div>
                                    <div class="media">
                                        <label for="edit-username">Username</label>
                                        <input id="edit-username" name="edit-username" type="text" value="${props.user.username}"/>
                                    </div>
                                    <div class="media">
                                        <label for="edit-email">Email</label>
                                        <input id="edit-email" name="edit-email" type="text" value="${props.user.email}"/>
                                    </div>
                                    <div class="media">
                                        <label for="edit-phone">Phone Number</label>
                                        <input id="edit-phone" name="edit-phone" type="text" value="${props.user.phone}"/>
                                    </div>
                                    <div class="media">
                                        <label for="edit-organization">Organization</label>
                                        <input id="edit-organization" name="edit-organization" type="text" value="${props.user.organization}"/>
                                    </div>
                                </div>
                                <div class="col-md-6 edit-profile-col" id="edit-profile-2">
                                    <div class="media">
                                        <label for="edit-lastName">Last Name</label>
                                        <input id="edit-lastName" name="edit-lastName" type="text" value="${props.user.lastName}"/>
                                    </div>
                                    <div class="media">
                                        <label for="edit-street">Street Address</label>
                                        <input id="edit-street" name="edit-street" type="text" value="${props.user.street}"/>
                                    </div>
                                    <div class="media">
                                        <label for="edit-city">City</label>
                                        <input id="edit-city" name="edit-city" type="text" value="${props.user.city}"/>
                                    </div>
                                    <div class="media">
                                        <label for="edit-state">State</label>
                                        <select id="edit-state">
                                          <option>AL</option>
                                          <option>AS</option>
                                          <option>AR</option>
                                          <option>AZ</option>
                                          <option>CA</option>
                                          <option>CO</option>
                                          <option>DE</option>
                                          <option>DC</option>
                                          <option>FL</option>
                                          <option>GA</option>
                                          <option>GU</option>
                                          <option>HI</option>
                                          <option>IA</option>
                                          <option>ID</option>
                                          <option>IL</option>
                                          <option>IN</option>
                                          <option>KS</option>
                                          <option>KY</option>
                                          <option>LA</option>
                                          <option>MA</option>
                                          <option>MD</option>
                                          <option>ME</option>
                                          <option>MI</option>
                                          <option>MN</option>
                                          <option>MO</option>
                                          <option>MP</option>
                                          <option>MS</option>
                                          <option>MT</option>
                                          <option>NC</option>
                                          <option>ND</option>
                                          <option>NE</option>
                                          <option>NH</option>
                                          <option>NJ</option>
                                          <option>NM</option>
                                          <option>NV</option>
                                          <option>NY</option>
                                          <option>OH</option>
                                          <option>OK</option>
                                          <option>OR</option>
                                          <option>PA</option>
                                          <option>PR</option>
                                          <option>RI</option>
                                          <option>SC</option>
                                          <option>SD</option>
                                          <option>TN</option>
                                          <option>TX</option>
                                          <option>UT</option>
                                          <option>VA</option>
                                          <option>VI</option>
                                          <option>VT</option>
                                          <option>WA</option>
                                          <option>WI</option>
                                          <option>WV</option>
                                          <option>WY</option>
                                        </select>
                                    </div>
                                    <div class="media">
                                        <label for="edit-zip">Zip Code</label>
                                        <input id="edit-zip" name="edit-zip" type="text" value="${props.user.zip}"/>
                                    </div>
                                </div>
                            </form>
                            <button type="button" class="btn btn-primary btn-sm" id="edit-profile-cancel-btn">Cancel Changes</button>
                            <button type="button" class="btn btn-primary btn-sm" id="edit-profile-submit-btn">Submit Changes</button>
                        </div>
                        <div id="edit-password-info">
                            <div class="media">
                                <label for="edit-password">Password</label>
                                <input id="edit-password" name="edit-password" type="password"/>
                            </div>
                            <div class="media">
                                <label for="edit-confirmPassword">Confirm Password</label>
                                <input id="edit-confirmPassword" name="edit-confirmPassword" type="password"/>
                            </div>                        
                            <button type="button" class="btn btn-primary btn-sm" id="edit-password-cancel-btn">Cancel Changes</button>
                            <button type="button" class="btn btn-primary btn-sm" id="edit-password-submit-btn">Submit Changes</button>
                            <p id="register-response">Passwords do not match. Please try again.</p>  
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
                        </div>
                        <button type="button" class="btn btn-primary btn-sm" id="new-story-btn">Submit</button>                        
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

function showEditPassword(){
    $('#edit-password-btn').click(function(){
        $('#edit-password-info').css({display: "inline-block"});
    })
}

function hideEditPassword(){
    $('#edit-password-cancel-btn').click(function(){
        $('#edit-password-info').css({display: "none"});
        $("#register-response").css({display: "none"});
        $("#edit-password").val("");
        $("#edit-confirmPassword").val("");
    })
}

function editPassword(){
    $('#edit-password-submit-btn').click(function(){

        let password = $("#edit-password").val()
        let confirmPassword = $("#edit-confirmPassword").val()
        let newPassword = ""
        if(password === confirmPassword) {

            newPassword = $('#edit-password').val();

            let request = {
                method: "PUT",
                headers: getHeaders()
            }

            fetch(`http://localhost:8080/api/users/me/updatePassword?newPassword=${newPassword}`, request)
                .then(res => {
                    console.log(res.status);
                    // $('#edit-password-info').css({display: "none"});
                    createView("/users");
                }).catch(error => {
                    console.log(error);
                    // $('#edit-password-info').css({display: "none"});
                    createView("/users");
            });
        } else {
            $("#register-response").css({display: "block"});
        }
    })
}

function showEditUser(){
    $('#edit-profile-btn').click(function(){
        $('#edit-profile-info').css({display: "inline-block"});
    })
}

function hideEditUser(){
    $('#edit-profile-cancel-btn').click(function(){
        $('#edit-profile-info').css({display: "none"});
    })
}

function editUser(){
    $('#edit-profile-submit-btn').click(function(){
        // TODO: PUT request
        let editUser = {
            username: $("#edit-username").val(),
            email: $("#edit-email").val(),
            firstName: $("#edit-firstName").val(),
            lastName: $("#edit-lastName").val(),
            organization: $("#edit-organization").val(),
            street: $("#edit-street").val(),
            city: $("#edit-city").val(),
            state: $("#edit-state").val(),
            zip: $("#edit-zip").val(),
            phone: $("#edit-phone").val()
        }

        let request = {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(editUser)
        }

        fetch("http://localhost:8080/api/users/me/updateUser", request)
            .then(response => {
                console.log(response.status);
                CreateView("/");
            }).catch(error => {
                console.log(error);
                createView("/");
        });
    })
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
    showEditPassword();
    hideEditPassword();
    editPassword();
    showEditUser();
    hideEditUser();
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




