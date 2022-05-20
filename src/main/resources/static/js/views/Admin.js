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
                    <div class="admin-user-info">
                        <p class="admin-user-info-name">Name: ${user.firstName} ${user.lastName} ID: ${user.id} Role: ${user.role} Status: ${user.status}</p>
                        <p class="admin-user-info-show" data-id="${user.id}">Show more info</p>
                        <div class="row admin-user-more-info" id="admin-user-more-info-${user.id}">
                            <p>Username: ${user.username}</p>
                            <p>Address: ${user.street}, ${user.city}, ${user.state} ${user.zip}</p>
                            <p>Phone: ${user.phone}</p>
                            <p>Email: ${user.email}</p>
                            <p>Created: ${user.createdAt}</p>
                            <p>Organization: ${user.organization}</p>
                        </div>
                        <div>
                            <p class="dark-color">Listings: </p>
                            ${user.listings.map(listing => `
                                <div class="user-listings row gray-bg">
                                    <div class="listing-name col-8" data-id="${listing.id}">Pet: ${listing.name} ID: ${listing.id}</div>
                                    <div class="listing-view col-1" data-id="${listing.id}"><i class="fas fa-eye"> View</i></div>
                                    <div class="listing-edit col-1" data-id="${listing.id}"><i class="fas fa-edit"> Edit</i></div>
                                    <div class="listing-delete col-2" data-id="${listing.id}"><i class="fas fa-trash-alt"> Delete</i></div>
                                </div>
                            `).join('')}
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
}

function showMoreInfo(){
    $('.admin-user-info-show').click(function(){
        let id = this.getAttribute('data-id');
        $("#admin-user-more-info-" + id).css({display: "block"})
    })
}