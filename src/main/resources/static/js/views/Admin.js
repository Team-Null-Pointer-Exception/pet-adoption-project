import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import {populateOverlay} from "./ListingIndex.js";
import {baseUri} from "../fetchData.js";

export default function AdminIndex(props){
    $("#inbox-container").css({display: "none"})
    return `
<main>
    <div class="container-fluid">
        <section class="section admin-users-section">
            <div class="container">
                <h3 class="dark-color">Users: </h3>
                ${props.user.map(user => `
                    <div class="admin-user-info gray-bg">
                        <div class="admin-user-info-name row">
                            <p class="col-9 col-md-4">Name: ${user.firstName} ${user.lastName}</p>
                            <p class="col-3 col-md-1 col-lg-2">ID: ${user.id}</p>
                            <div class="col-12 col-md-3">
                                <label for="admin-update-role-${user.id}">Role: </label>
                                <select id="admin-update-role-${user.id}" class="admin-user-role" data-id="${user.id}">
                                    <option selected hidden>${user.role}</option>
                                    <option>USER</option>
                                    <option>ADMIN</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-4 col-lg-3">
                                <label for="admin-update-status-${user.id}">Status: </label>
                                <select id="admin-update-status-${user.id}" class="admin-user-status" data-id="${user.id}">
                                    <option selected hidden>${user.status}</option>
                                    <option>ACTIVE</option>
                                    <option>SUSPENDED</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <p class="admin-user-info-show" id="admin-user-info-show-${user.id}" data-id="${user.id}">Show More Info:</p>
                            <p class="admin-user-info-hide" id="admin-user-info-hide-${user.id}" data-id="${user.id}">Show Less Info:</p>
                            <div class="admin-user-more-info" id="admin-user-more-info-${user.id}">
                                <p><span>Username:</span> ${user.username}</p>
                                <p><span>Address:</span> ${user.street}, ${user.city}, ${user.state} ${user.zip}</p>
                                <p><span>Phone:</span> ${user.phone}</p>
                                <p><span>Email:</span> ${user.email}</p>
                                <p><span>Created:</span> ${user.createdAt}</p>
                                <p><span>Organization:</span> ${user.organization}</p>
                            </div>
                        </div>
                        <div>
                            <p class="admin-user-listings-show" id="admin-user-listings-show-${user.id}" data-id="${user.id}">Show Listings:</p>
                            <p class="admin-user-listings-hide" id="admin-user-listings-hide-${user.id}" data-id="${user.id}">Hide Listings:</p>
                            <div class="admin-user-listings admin-user-listings-${user.id}">
                            ${user.listings.map(listing => `
                                ${populateOverlay(listing)}
                                <div class="user-listings row gray-bg" id="admin-user-listings-${user.id}">
                                    <div class="admin-listing-name col-12 col-md-4" data-id="${listing.id}">Pet: ${listing.name} <i class="fas fa-eye"></i></div>
                                    <div class="admin-listing-id col-3 offset-1 col-md-2 offset-md-0" data-id="${listing.id}">ID: ${listing.id}</div>
                                    <div class="admin-listing-status col-5" data-id="${listing.id}">Status: ${listing.status}</div>
                                </div>
                            `).join('')}
                            </div>
                        </div>
                        <div>
                            <p class="admin-user-stories-show" id="admin-user-stories-show-${user.id}" data-id="${user.id}">Show Stories:</p>
                            <p class="admin-user-stories-hide" id="admin-user-stories-hide-${user.id}" data-id="${user.id}">Hide Stories:</p>
                            <div class="admin-user-stories admin-user-stories-${user.id}">
                            ${user.stories.map(story => `
                                <div class="user-stories row gray-bg" id="admin-user-stories-${user.id}">
                                    <div class="admin-story-id col-12 col-md-6" data-id="${story.id}">Date: ${story.createdAt} <i class="fas fa-eye"></i></div>
                                    <div class="col-9 offset-1 col-md-6 offset-md-0">
                                        <label for="admin-update-story-status-${story.id}">Status: </label>
                                        <select id="admin-update-story-status-${story.id}" class="admin-story-status" data-id="${story.id}">
                                            <option selected hidden>${story.status}</option>
                                            <option>ACTIVE</option>
                                            <option>PENDING</option>
                                            <option>REJECTED</option>                                            
                                        </select>
                                    </div>
                                </div>
                                
                                <div id="admin-story-overlay-${story.id}" class="overlay">
                                    <div class="container admin-story-overlay-container">       
                                        <div class="row admin-story-row">
                                            <div class="card admin-story-card">
                                                <div class="d-flex justify-content-center align-items-center admin-story-content row">
                                                    <p class="text-white col-12">${story.content}</p>
                                                    <div class="col-12">
                                                        <button type="button" class="btn btn-primary btn-sm admin-story-cancel-btn" data-id="${story.id}">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    </div>        
</main>
`
}

export function AdminEvent() {
    showMoreInfo();
    hideMoreInfo();
    showUserListings();
    hideUserListings();
    updateUserRole();
    updateUserStatus();
    populateListener();
    closeOverlay();
    showUserStories();
    hideUserStories();
    updateStoryStatus();
    showStory();
    closeStoryOverlay();
    changeListingStatus();
}

function showMoreInfo(){
    $('.admin-user-info-show').click(function(){
        let id = this.getAttribute('data-id');
        $("#admin-user-more-info-" + id).css({display: "block"})
        $("#admin-user-info-hide-" + id).css({display: "block"})
        $("#admin-user-info-show-" + id).css({display: "none"})
    })
}

function hideMoreInfo(){
    $('.admin-user-info-hide').click(function(){
        let id = this.getAttribute('data-id');
        $("#admin-user-more-info-" + id).css({display: "none"})
        $("#admin-user-info-hide-" + id).css({display: "none"})
        $("#admin-user-info-show-" + id).css({display: "block"})
    })
}

function showUserListings(){
    $('.admin-user-listings-show').click(function(){
        let id = this.getAttribute('data-id');
        $(".admin-user-listings-" + id).css({display: "block"})
        $("#admin-user-listings-hide-" + id).css({display: "block"})
        $("#admin-user-listings-show-" + id).css({display: "none"})
    })
}

function hideUserListings(){
    $('.admin-user-listings-hide').click(function(){
        let id = this.getAttribute('data-id');
        $(".admin-user-listings-" + id).css({display: "none"})
        $("#admin-user-listings-hide-" + id).css({display: "none"})
        $("#admin-user-listings-show-" + id).css({display: "block"})
    })
}

function updateUserRole(){
    $('.admin-user-role').change(function(){

        let id = this.getAttribute("data-id");
        let newRole = $('#admin-update-role-' + id).val();
        let request = {
            method: "PUT",
            headers: getHeaders()
        }
        fetch(`${baseUri}/api/users/${id}/updateRole?newRole=${newRole}`, request)
            .then(res => {
                console.log(res.status);
                createView("/admin");
            }).catch(error => {
                console.log(error);
                createView("/admin");
        });
    })
}

function updateUserStatus(){
    $('.admin-user-status').change(function(){

        let id = this.getAttribute("data-id");
        let newStatus = $('#admin-update-status-' + id).val();
        let request = {
            method: "PUT",
            headers: getHeaders()
        }
        fetch(`${baseUri}/api/users/${id}/updateStatus?newStatus=${newStatus}`, request)
            .then(res => {
                console.log(res.status);
                createView("/admin");
            }).catch(error => {
                console.log(error);
                createView("/admin");
        });
    })
}

function populateListener(){
    $('.admin-listing-name').click(function(){
        console.log('pop listener')
        let id = $(this).data("id");
        $("#overlay-" + id).css({display: "block"})
    })
}

function closeOverlay() {
    $(".close-btn").click(function (e) {
        let id = $(this).data("id");
        $("#overlay-" + id).css({display: "none"})
    })
}

function showUserStories(){
    $('.admin-user-stories-show').click(function(){
        let id = this.getAttribute('data-id');
        $(".admin-user-stories-" + id).css({display: "block"})
        $("#admin-user-stories-hide-" + id).css({display: "block"})
        $("#admin-user-stories-show-" + id).css({display: "none"})
    })
}

function hideUserStories(){
    $('.admin-user-stories-hide').click(function(){
        let id = this.getAttribute('data-id');
        $(".admin-user-stories-" + id).css({display: "none"})
        $("#admin-user-stories-hide-" + id).css({display: "none"})
        $("#admin-user-stories-show-" + id).css({display: "block"})
    })
}

function updateStoryStatus(){
    $('.admin-story-status').change(function(){

        let id = this.getAttribute("data-id");
        let newStatus = $('#admin-update-story-status-' + id).val();
        let request = {
            method: "PUT",
            headers: getHeaders()
        }
        fetch(`${baseUri}/api/stories/${id}/updateStatus?newStatus=${newStatus}`, request)
            .then(res => {
                console.log(res.status);
                createView("/admin");
            }).catch(error => {
                console.log(error);
                createView("/admin");
        });
    })
}

function showStory(){
    $('.admin-story-id').click(function(){
        let id = this.getAttribute('data-id');
        $("#admin-story-overlay-" + id).css({display: "block"})
    })
}

function closeStoryOverlay() {
    $(".admin-story-cancel-btn").click(function (e) {
        let id = e.target.getAttribute("data-id")
        $("#admin-story-overlay-" + id).css({display: "none"})
    })
}

function changeListingStatus() {
    $(".status-dropdown").change(function () {
        let listingId = $(this).data("id");
        let newStatus = $(this).val().toUpperCase();
        console.log(newStatus);
        let request = {
            method: "PUT",
            headers: getHeaders()
        }
        fetch(`${baseUri}/api/listings/${listingId}/updateStatus?newStatus=${newStatus}`, request)
            .then(res => {
                console.log(res.status);
                createView("/admin");
            }).catch(error => {
            console.log(error);
            createView("/admin");
        });
    });
}