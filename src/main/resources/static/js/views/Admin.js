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
                            <p class="col-4">Name: ${user.firstName} ${user.lastName}</p>
                            <p class="col-2">ID: ${user.id}</p>
                            <p class="col-3">Role: ${user.role}</p>
                            <p class="col-3">Status: ${user.status}</p>
                        </div>
                        <p class="admin-user-info-show" id="admin-user-info-show-${user.id}" data-id="${user.id}">Show more info:</p>
                        <p class="admin-user-info-hide" id="admin-user-info-hide-${user.id}" data-id="${user.id}">Show less info:</p>
                        <div class="admin-user-more-info" id="admin-user-more-info-${user.id}">
                            <p>Username: ${user.username}</p>
                            <p>Address: ${user.street}, ${user.city}, ${user.state} ${user.zip}</p>
                            <p>Phone: ${user.phone}</p>
                            <p>Email: ${user.email}</p>
                            <p>Created: ${user.createdAt}</p>
                            <p>Organization: ${user.organization}</p>
                        </div>
                        <div>
                            <p class="admin-user-listings-show" id="admin-user-listings-show-${user.id}" data-id="${user.id}">Show Listings:</p>
                            <p class="admin-user-listings-hide" id="admin-user-listings-hide-${user.id}" data-id="${user.id}">Hide Listings:</p>
                            <div class="admin-user-listings admin-user-listings-${user.id}">
                            ${user.listings.map(listing => `
                                <div class="user-listings row gray-bg" id="admin-user-listings-${user.id}">
                                    <div class="listing-name col-4" data-id="${listing.id}">Pet: ${listing.name}</div>
                                    <div class="listing-id col-2" data-id="${listing.id}">ID: ${listing.id}</div>
                                    <div class="listing-status col-4" data-id="${listing.id}">Status: ${listing.status}</div>
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