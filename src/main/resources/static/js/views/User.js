import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import CreateView from "../createView.js";
import {baseUri} from "../fetchData.js";
import {CheckPassword} from "./Register.js";
import token from "../keys.js";

let chatKey = token().talkJSKey

export default function UserIndex(props) {
    $("#inbox-container").css({display: "block"})
    let usernameHTML = "";
    let orgHTML = "";
    let phoneHTML = "";
    let addressHTML = "";
    let stateHTML = props.user.state;
    if (stateHTML === "NA") {
        stateHTML = "N/A";
    }
    let user = props.user;
    Talk.ready;
    const me = new Talk.User({
        id: user.id,
        name: user.firstName,
        email: user.email,
        photoUrl: user.profileImg,
        role: "user",
    });
    const session = new Talk.Session({
        appId: chatKey,
        me: me,
    });
    const inbox = session.createInbox();
    inbox.mount($('#inbox-container'));

    if (props.user.username !== "") {
        usernameHTML = `
            <div class="media">
            <label>Username</label>
            <p>${props.user.username}</p>
            </div>
            `
    }
    if (props.user.organization !== "") {
        orgHTML = `
            <div class="media">
            <label>Organization</label>
            <p>${props.user.organization}</p>
            </div>
            `
    }
    if (props.user.phone !== "") {
        phoneHTML = `
            <div class="media">
            <label>Phone</label>
            <p>${props.user.phone}</p>
            </div>
            `
    }
    if (props.user.street !== "" && props.user.city !== "") {
        addressHTML = `${props.user.street}, ${props.user.city},`
    } else if (props.user.street !== "") {
        addressHTML = `${props.user.street},`
    } else if (props.user.city !== "") {
        addressHTML = `${props.user.city},`
    }
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
                                    <h3 class="dark-color">My Profile</h3>
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
                                                <p>${addressHTML} ${stateHTML} ${props.user.zip}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            ${usernameHTML}
                                            ${orgHTML}                                            
                                            ${phoneHTML}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="edit-profile-info">
                            <form class="row" id="edit-profile-form">
                                <div class="col-md-6 edit-profile-col" id="edit-profile-1">
                                    <div class="media">
                                        <label for="edit-firstName">First Name <span class="input-required">*</span></label>
                                        <input id="edit-firstName" name="edit-firstName" type="text" value="${props.user.firstName}"/>
                                    </div>
                                    <div class="media">
                                        <label for="edit-lastName">Last Name</label>
                                        <input id="edit-lastName" name="edit-lastName" type="text" value="${props.user.lastName}"/>
                                    </div>
                                    <div class="media">
                                        <label for="edit-email">Email <span class="input-required">*</span></label>
                                        <input id="edit-email" name="edit-email" type="text" value="${props.user.email}"/>
                                    </div>
                                    <div class="media">
                                        <label for="edit-phone">Phone Number</label>
                                        <input id="edit-phone" name="edit-phone" type="text" value="${props.user.phone}"/>
                                    </div>
                                    <div class="media">
                                        <label for="edit-zip">Zip Code <span class="input-required">*</span></label>
                                        <input id="edit-zip" name="edit-zip" type="text" value="${props.user.zip}"/>
                                    </div>                                    
                                </div>
                                <div class="col-md-6 edit-profile-col" id="edit-profile-2">
                                    <div class="media">
                                        <label for="edit-username">Username</label>
                                        <input id="edit-username" name="edit-username" type="text" value="${props.user.username}"/>
                                    </div>
                                    <div class="media">
                                        <label for="edit-organization">Organization</label>
                                        <input id="edit-organization" name="edit-organization" type="text" value="${props.user.organization}"/>
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
                                          <option selected hidden>${props.user.state}</option>
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
                                </div>
                                <div>
                                <hr>
                                    <p>Update profile image:</p>
                                </div>
                                <div class="media">
                                    <input type="file" id="edit_profile_upload" name="file" /> 
                                </div>
                            </form>
                            <hr>
                            <button type="button" class="btn btn-primary btn-sm" id="edit-profile-cancel-btn">Cancel Changes</button>
                            <button type="button" class="btn btn-primary btn-sm" id="edit-profile-submit-btn">Save Changes</button>
                            <p id="edit-user-response">Form incomplete. Please try again.</p>  
                        </div>
                        <div id="edit-password-info">
                            <div class="media">
                                <label for="edit-password">New Password <span class="input-required">*</span></label>
                                <input id="edit-password" name="edit-password" type="password"/>
                            </div>
                            <div class="media">
                                <label for="edit-confirmPassword">Confirm Password <span class="input-required">*</span></label>
                                <input id="edit-confirmPassword" name="edit-confirmPassword" type="password"/>
                            </div>                        
                            <button type="button" class="btn btn-primary btn-sm" id="edit-password-cancel-btn">Cancel Changes</button>
                            <button type="button" class="btn btn-primary btn-sm" id="edit-password-submit-btn">Submit Changes</button>
                            <p id="register-response">Passwords do not match. Please try again.</p>  
                        </div>
                        <div id="edit-profile-btns">
                            <button type="button" class="btn btn-primary btn-sm" id="edit-profile-btn">Edit Profile</button>
                            <button type="button" class="btn btn-primary btn-sm" id="edit-password-btn">Edit Password</button>
                        </div>
                    </div>
                </section>
                <section class="section listing-section" id="user-listing">
                    <div class="container">
                        <div>
                            <h3 class="dark-color">My Listings: </h3>
                            ${props.user.listings.map(listing => `
                                <div class="user-listings row gray-bg">
                                    <div class="listing-name col-3" data-id="${listing.id}">${listing.name}</div>
                                    <div class="listing-status col-5" data-id="${listing.id}">STATUS: ${listing.status}</div>
                                    <div class="listing-view col-1 offset-1" data-id="${listing.id}">
                                        <i class="fas fa-eye"></i>
                                        <span class="tooltip">View Listing</span>
                                    </div>
                                    <div class="listing-edit col-1" data-id="${listing.id}">
                                        <i class="fas fa-edit"></i>
                                        <span class="tooltip">Edit Listing</span>
                                    </div>
                                    <div class="listing-delete col-1" data-id="${listing.id}">
                                        <i class="fas fa-trash-alt"></i>
                                        <span class="tooltip">Delete Listing</span>
                                    </div>
                                </div>
     <div id="overlay-${listing.id}" class="overlay">
    <div class="container view-overlay-container">
    <a class="btn rounded-circle text-center view-close-btn px-0" data-id="${listing.id}" style="width: 36px; height: 36px;" href="#">X</a>
    <div class="row">
        <div class="col-xs-12 col-lg-6 listing-main">
             <h3 class="overlay-text text-center">Name: ${listing.name}</h3>
             <img class="listing-image-large" src=${listing.images} alt="pet"/>
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
    <div class="container edit-overlay-container">       
            <div class="row edit-listing-row">
            <div class="card edit-listing-card">
            <a class="btn rounded-circle mt-2 ml-1 edit-close-button px-0" data-id="${listing.id}" style="width: 36px; height: 36px;" href="#">X</a>  
            <div class="d-flex justify-content-center align-items-center">
                <form class="edit-listing-form" name="edit-listing-form">
                    <h1 class="text-white">Edit Listing</h1>
                    <label for="name-${listing.id}">Name</label>
                    <input id="name-${listing.id}" name="name-${listing.id}" type="text" maxlength="50" value="${listing.name}">
                    <br>
                    <label for="animal-${listing.id}">Animal</label>
                    <input id="animal-${listing.id}" name="animal-${listing.id}" type="text" maxlength="50" value="${listing.animal}">
                    <br>
                    <label for="breed-${listing.id}">Breed</label>
                    <input id="breed-${listing.id}" name="breed-${listing.id}" type="text" maxlength="50" value="${listing.breed}">
                    <br>
                    <label for="color-${listing.id}">Color</label>
                    <input id="color-${listing.id}" name="color-${listing.id}" type="text" maxlength="50" value="${listing.color}">
                    <br>
                    <label for="age-${listing.id}">Age</label>
                    <input id="age-${listing.id}" name="age-${listing.id}" type="text" maxlength="50" value="${listing.age}">
                    <br>
                    <label for="sex-${listing.id}">Sex</label>
                    <select id="sex-${listing.id}">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Unknown</option>
                    </select>
                    <br>
                    <label for="health-${listing.id}" class="align-top">Health Issues</label>
                    <textarea id="health-${listing.id}" name="health-${listing.id}" type="text" maxlength="100">${listing.health}</textarea>
                    <br>
                    <label for="fixed-${listing.id}">Fixed</label>
                    <select id="fixed-${listing.id}">
                      <option>True</option>
                      <option>False</option>
                    </select>
                    <br>
                    <label class="align-top" id="descrip-label-${listing.id}" for="description-${listing.id}">Description</label>
                    <textarea id="description-${listing.id}" name="description-${listing.id}" rows="2" maxlength="255" placeholder="Pet description">${listing.description}</textarea>
                    <br>
                    <label class="align-top" for="summary-${listing.id}">Summary</label>
                    <textarea id="summary-${listing.id}" name="summary-${listing.id}" rows="2" maxlength="100" placeholder="Listing information">${listing.summary}</textarea>
                    <br>     
                    <input type="file" class="image_upload" name="file" />
                    <button class="edit-listing-btn btn-primary" data-id="${listing.id}" type="button">Submit</button>
                </form>
                </div>
            </div>
            </div>
            </div>
            </div>
            
            <div id="delete-overlay-${listing.id}" class="overlay">
                <div class="container delete-overlay-container">       
                    <div class="row delete-listing-row">
                        <div class="card delete-listing-card">
                            <div class="d-flex justify-content-center align-items-center delete-listing-content row">
                                <p class="text-white col-12">Are you sure you want to delete this listing?</p>
                                <div class="col-12">
                                    <button type="button" class="btn btn-primary btn-sm delete-listing-cancel-btn" data-id="${listing.id}">Cancel</button>
                                    <button type="button" class="btn btn-primary btn-sm delete-listing-submit-btn" data-id="${listing.id}">Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                            `).join('')}
                        </div>
                        <div>
                            <button type="button" class="btn btn-primary btn-sm" id="new-listing-btn">Create Listing</button>
                        </div>
                    </div>
                </section>
                <section class="section story-section gray-bg" id="user-story">
                    <div class="container">
                        <div>
                            <h3 class="dark-color">Your Stories: </h3>
                        </div>
                        <div>
                            <textarea id="new-story" name="new-story" rows="4" placeholder="Love PetAdoptions? Share your story."></textarea>
                        </div>
                        <button type="button" class="btn btn-primary btn-sm" id="new-story-btn">Submit</button>                        
                    </div>
                </section>
            </div>
        </main>
    `;
}

function newListingBtn() {
    $('#new-listing-btn').click(function () {
        createView("/create")
    })
}


function viewListing() {
    $('.listing-view').click(function () {
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


function editListing() {
    $('.listing-edit').click(function () {
        let id = this.getAttribute('data-id');
        $("#edit-overlay-" + id).css({display: "block"})
    })
}

function closeEditOverlay() {
    $(".edit-close-button").click(function (e) {
        let id = e.target.getAttribute("data-id")
        $("#edit-overlay-" + id).css({display: "none"})
    })
}

function showDeleteListing() {
    $('.listing-delete').click(function () {
        let id = this.getAttribute('data-id');
        $("#delete-overlay-" + id).css({display: "block"})
    })
}

function closeDeleteOverlay() {
    $(".delete-listing-cancel-btn").click(function (e) {
        let id = e.target.getAttribute("data-id")
        $("#delete-overlay-" + id).css({display: "none"})
    })
}

function deleteListing() {
    $('.delete-listing-submit-btn').click(function () {
        let id = this.getAttribute('data-id')
        let request = {
            method: "DELETE",
            headers: getHeaders()
        }
        fetch(`${baseUri}/api/listings/${id}`, request)
            .then(res => {
                console.log(res.status);
                createView("/users")
            }).catch(error => {
            console.log(error);
            createView("/users");
        });
    })
}

function showEditPassword() {
    $('#edit-password-btn').click(function () {
        $('#edit-password-info').css({display: "inline-block"});
    })
}

function hideEditPassword() {
    $('#edit-password-cancel-btn').click(function () {
        $('#edit-password-info').css({display: "none"});
        $("#register-response").css({display: "none"});
        $("#edit-password").val("");
        $("#edit-confirmPassword").val("");
    })
}

function editPassword() {
    $('#edit-password-submit-btn').click(function () {
        let password = $("#edit-password").val()
        let confirmPassword = $("#edit-confirmPassword").val()
        let newPassword = ""
        if (CheckPassword(password)) {
            if (password === confirmPassword) {
                newPassword = $('#edit-password').val();
                let request = {
                    method: "PUT",
                    headers: getHeaders()
                }
                fetch(`${baseUri}/api/users/me/updatePassword?newPassword=${newPassword}`, request)
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
        }
    })
}

function showEditUser() {
    $('#edit-profile-btn').click(function () {
        $('#edit-profile-info').css({display: "inline-block"});
        $('#edit_profile_upload').css({display: "inline-block"});
    })
}

function hideEditUser() {
    $('#edit-profile-cancel-btn').click(function () {
        $('#edit-profile-info').css({display: "none"});
        $('#edit_profile_upload').css({display: "none"});
    })
}

let filename = ""
let imgURL = ""

function uploadEvent() {
    $('#edit_profile_upload').change(function (e) {
        let file = $(this).prop('files')[0]
        console.log(file)
        filename = file.name;
        console.log(filename)
        let formData = new FormData();
        formData.append('file', file)
        const request = {
            method: 'POST',
            body: formData
        }
        fetch(`${baseUri}/api/users/upload`, request)
            .then(response => {
                console.log(response.status);
                filename = file.name
                imgURL = `https://petadoptions-npe.s3.us-east-2.amazonaws.com/${filename}`
                return imgURL
            }).catch(error => {
            console.log(error);
        });
    })
}

function editUser() {
    $('#edit-profile-submit-btn').click(function () {
        console.log(imgURL)
        let username = $("#edit-username").val().trim();
        let email = $("#edit-email").val().trim();
        let firstName = $("#edit-firstName").val().trim();
        let lastName = $("#edit-lastName").val().trim();
        let organization = $("#edit-organization").val().trim();
        let street = $("#edit-street").val().trim();
        let city = $("#edit-city").val().trim();
        let state = $("#edit-state").val();
        let zip = $("#edit-zip").val().trim();
        let phone = $("#edit-phone").val().trim();
        let profileImg
        if (imgURL === "") {
            profileImg = $("#profile_img").attr("src");
        } else {
            profileImg = imgURL;
        }
        console.log(profileImg)
        // if (username !== "" && email !== "" && firstName !== "" && street !== "" &&
            // city !== "" && state !== "" && zip !== "" && phone !== "") {
        if (email !== "" && firstName !== "" && zip !== "") {

            let editUser = {
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                organization: organization,
                street: street,
                city: city,
                state: state,
                zip: zip,
                phone: phone,
                profileImg: profileImg
            }

            let request = {
                method: "PUT",
                headers: getHeaders(),
                body: JSON.stringify(editUser)
            }
            console.log(request)
            fetch(`${baseUri}/api/users/me/updateUser`, request)
                .then(response => {
                    console.log(response.status);
                    CreateView("/users");
                }).catch(error => {
                console.log(error);
                createView("/users");
            });
        } else {
            $("#edit-user-response").css({display: "block"});
        }
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

        fetch(`${baseUri}/api/stories`, request)
            .then(res => {
                console.log(res.status);
                createView("/users")
            }).catch(error => {
            console.log(error);
            createView("/users");
        });

    })
}

export function UsersEvent() {
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
    closeEditOverlay()
    closeViewOverlay()
    EditListingsEvent()
    AddFileEvent()
    getUserRole()
    getUser()
    uploadEvent();
    showDeleteListing();
    closeDeleteOverlay();
}

let editImg = ""
let editImgURL = ""

function AddFileEvent() {
    $('.image_upload').change(function (e) {
        let file = $(this).prop('files')[0]
        editImg = file.name
        let formData = new FormData();
        formData.append('file', file)
        const request = {
            method: 'POST',
            body: formData
        }
        fetch(`${baseUri}/api/users/upload`, request)
            .then(response => {
                console.log(response.status);
                editImg = file.name
                editImgURL = `https://petadoptions-npe.s3.us-east-2.amazonaws.com/${editImg}`
                return editImgURL
            }).catch(error => {
            console.log(error);
        });
    })
}


export function EditListingsEvent() {
    $('.edit-listing-btn').click(function (e) {
        let id = e.target.getAttribute("data-id");
        let editListing = {}
        if (editImgURL === "") {
            editListing = {
                summary: $("#summary-" + id).val(),
                name: $("#name-" + id).val(),
                animal: $("#animal-" + id).val(),
                breed: $("#breed-" + id).val(),
                sex: $("#sex-" + id).val(),
                age: $("#age-" + id).val(),
                color: $("#color-" + id).val(),
                description: $("#description-" + id).val(),
                fixed: $("#fixed-" + id).val(),
                health: $("#health-" + id).val(),
            }
        } else {
            editListing = {
                summary: $("#summary-" + id).val(),
                name: $("#name-" + id).val(),
                animal: $("#animal-" + id).val(),
                breed: $("#breed-" + id).val(),
                sex: $("#sex-" + id).val(),
                age: $("#age-" + id).val(),
                color: $("#color-" + id).val(),
                description: $("#description-" + id).val(),
                fixed: $("#fixed-" + id).val(),
                health: $("#health-" + id).val(),
                images: editImgURL
            }
        }
        console.log(editListing)
        let request = {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(editListing)
        }
        console.log(id);
        fetch(`${baseUri}/api/listings/edit/${id}`, request)
            .then(res => {
                console.log(res.status);
                createView("/users")
            }).catch(error => {
            console.log(error);
            createView("/users");
        });
    })
}


export function getUserRole() {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
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
    if (!accessToken) {
        return false;
    }
    const parts = accessToken.split('.');
    const payload = parts[1];
    const decodedPayload = atob(payload);
    const payloadObject = JSON.parse(decodedPayload);
    return payloadObject.user_name;
}


