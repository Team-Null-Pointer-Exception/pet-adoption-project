import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import EditListing from "./EditListing.js";
import CreateView from "../createView.js";

export default function AdminIndex(props){
    //language=HTML
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
                            <p class="col-3 col-md-2">ID: ${user.id}</p>
                            <div class="col-12 col-md-3">
                                <label for="admin-update-role-${user.id}">Role: </label>
                                <select id="admin-update-role-${user.id}" class="admin-user-role" data-id="${user.id}">
                                    <option selected hidden>${user.role}</option>
                                    <option>USER</option>
                                    <option>ADMIN</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-3">
                                <label for="admin-update-status-${user.id}">Status: </label>
                                <select id="admin-update-status-${user.id}" class="admin-user-status" data-id="${user.id}">
                                    <option selected hidden>${user.status}</option>
                                    <option>ACTIVE</option>
                                    <option>SUSPENDED</option>
                                </select>
                            </div>
                        </div>
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
                        <div>
                            <p class="admin-user-listings-show" id="admin-user-listings-show-${user.id}" data-id="${user.id}">Show Listings:</p>
                            <p class="admin-user-listings-hide" id="admin-user-listings-hide-${user.id}" data-id="${user.id}">Hide Listings:</p>
                            <div class="admin-user-listings admin-user-listings-${user.id}">
                            ${user.listings.map(listing => `
                                <div class="user-listings row gray-bg" id="admin-user-listings-${user.id}">
                                    <div class="listing-name col-6 col-md-4" data-id="${listing.id}">Pet: ${listing.name}</div>
                                    <div class="listing-id col-2" data-id="${listing.id}">ID: ${listing.id}</div>
                                    <div class="listing-status col-3" data-id="${listing.id}">Status: ${listing.status}</div>
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

        fetch(`http://localhost:8080/api/users/${id}/updateRole?newRole=${newRole}`, request)
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

        fetch(`http://localhost:8080/api/users/${id}/updateStatus?newStatus=${newStatus}`, request)
            .then(res => {
                console.log(res.status);
                createView("/admin");
            }).catch(error => {
                console.log(error);
                createView("/admin");
        });

    })
}