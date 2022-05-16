import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import EditListing from "./EditListing.js";
import CreateView from "../createView.js";


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
                                                        <div id="overlay-${listing.id}" class="overlay">
                        <a class="btn rounded-circle text-center view-close-btn px-0" data-id="${listing.id}" style="width: 36px; height: 36px;" href="#">X</a>
    <div class="container view-overlay-container">
    <div class="sharethis-sticky-share-buttons"></div>
    <div class="row">
        <div class="col-xs-12 col-lg-6 listing-main">
             <h3 class="overlay-text text-center">Pet name: ${listing.name}</h3>
             <img class="listing-image-large" src=${listing.images[0]} alt="pet"/>
             </div>
                   <div class="col-xs-12 col-lg-6 container container-overlay-details">
                        <h3 class="overlay-text text-center">${listing.animal}</h3>
                        <div class="row listing-details">
                        <div class="col-6">
                        <ul>
                            <li>Breed: ${listing.breed}</li>
                            <li>Sex: ${listing.sex}</li>
                            <li>Age: ${listing.age}</li>
                        </ul>
                        </div>
                        <div class="col-6">
                        <ul>
                            <li>Color: ${listing.color}</li>
                            <li>Health Issues: ${listing.health}</li>
                            <li>Fixed: ${listing.fixed}</li>
                        </ul>
                        </div>
                        <div class="col-12 listing-details">
                        <p>Summary: ${listing.summary}</p>
                        <p>About: ${listing.description}</p>
                        </div>
                        </div>                                                  
                  </div>

            </div>              
    </div>

</div>
                             
                                       <div id="edit-overlay-${listing.id}" class="overlay">
             <a class="btn rounded-circle text-center close-btn px-0" data-id="${listing.id}" style="width: 36px; height: 36px;" href="#">X</a>
    <div class="container overlay-container">        
            <div class="row edit-listing-row">
            <div class="card edit-listing-card"> 
                <form id="edit-listing-form" name="edit-listing-form">
                    <h1 class="text-white">Edit Listing</h1>
                    <label for="name">Name</label>
                    <input id="name" name="name" type="text" value=${listing.name} />
                    <br>
                    <label for="animal">Animal</label>
                    <input id="animal" name="animal" type="text" value=${listing.animal} />
                    <br>
                    <label for="breed">Breed</label>
                    <input id="breed" name="breed" type="text" value=${listing.breed} />
                    <br>
                    <label for="color">Color</label>
                    <input id="color" name="color" type="text" value=${listing.color} />
                    <br>
                    <label for="age">Age</label>
                    <input id="age" name="age" type="text" value=${listing.age} />
                    <br>
                    <label for="sex">Sex</label>
                    <select id="sex">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    <br>
                    <label for="health">Health</label>
                    <input id="health" name="health" type="text" value=${listing.health} />
                    <br>
                    <label for="fixed">Fixed</label>
                    <select id="fixed">
                      <option>True</option>
                      <option>False</option>
                    </select>
                    <br>
                    <label for="description">Description</label>
                    <textarea id="description" name="description" rows="2" placeholder="Pet description">${listing.description}</textarea>
                    <br>
                    <label for="summary">Summary</label>
                    <textarea id="summary" name="summary" rows="3" placeholder="Listing information">${listing.summary}</textarea>
                    <br>              
                    <button id="image_upload" type="button" class="text-white imageUploadToggle">Uploads</button>                                                                      
                    <button id="edit-listing-btn" data-id="${listing.id}" type="button">Submit</button>
                </form>
            </div>
            </div>
            </div>
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
        $("#overlay-" + id).css({display: "block"})
    })
}
function closeViewOverlay() {
    $(".view-close-btn").click(function (e) {
        let id = e.target.getAttribute("data-id")
        $("#overlay-" + id).css({display: "none"})
    })
}


function editListing(){
    $('.listing-edit').click(function(){
        let id = this.getAttribute('data-id');
        $("#edit-overlay-" + id).css({display: "block"})
    })
}
function closeEditOverlay() {
    $(".close-btn").click(function (e) {
        let id = e.target.getAttribute("data-id")
        $("#edit-overlay-" + id).css({display: "none"})
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
        // TODO: input verification
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
                CreateView("/users");
            }).catch(error => {
                console.log(error);
                createView("/users");
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
    closeEditOverlay();
    EditListingsEvent();
    AddFileEvent();
    fileStackSetUp();
    getUserRole();
    getUser();
    closeViewOverlay()
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


export function EditListingsEvent(){
    $('#edit-listing-btn').click(function (e) {
        let id = e.target.getAttribute("data-id");
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
        console.log(id);
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




