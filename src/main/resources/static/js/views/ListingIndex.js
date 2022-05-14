import createView from "../createView.js";
import {getHeaders, getUserRole} from "../auth.js";

let allListings, activeListings, listingStatus, animalType, gender, distance;

export default function ListingIndex(props) {
    console.log(getUserRole());
    allListings = props.listings;
    allListings.forEach(listing => {
        if (listing.breed === "") {
            listing.breed = listing.animal;
        }
    })
    activeListings = allListings.filter(listing => listing.status === "ACTIVE");

    //language=HTML
    return `
        <!-- Jumbotron -->
        <div id="allListings">
            <div
                    class="bg-image p-5 text-center shadow-1-strong rounded mb-5 text-white"
                    style="background-image: url('../../images/pexels-munkhbayar-dambajav-11195868.jpg');"
            >
                <h1 id="listings-heading" class="mb-3 h2 jumbotron">Available Adoptions</h1>

                <p class="jumbo-message">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus praesentium
                    labore accusamus sequi, voluptate debitis tenetur in deleniti possimus modi voluptatum
                    neque maiores dolorem unde? Aut dolorum quod excepturi fugit.
                </p>

                <div class="py-5">
                    ${adminMenu()}
                    <div class="btn-group m-2">
                        <select id="animal-type" class="form-select btn-secondary" aria-label="Animal type">
                            <option class="default">All</option>
                            <option>Dogs</option>
                            <option>Cats</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div class="btn-group m-2">
                        <select id="gender" class="form-select btn-secondary" aria-label="Gender">
                            <option class="default">Male or Female</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>

                    <div class="btn-group m-2">
                        <select id="distance" class="form-select btn-secondary" aria-label="Distance">
                            <option class="default">Within 15 Miles</option>
                            <option>Within 50 Miles</option>
                            <option>Any Distance</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="container listing-container">
                <section class="py-0">
                    <div id="listing-cards"
                         class="row gx-md-3 gx-lg-4 gx-xl-5 row-cols-1 row-cols-lg-2">
                        ${populateCards(activeListings)}
                    </div>

                </section>
            </div>
        </div>

    `;
}

function adminMenu() {
    if (!getUserRole()) {
        return "";
    } else {
        //language=HTML
        return `
            <div class="btn-group m-2">
                <select id="listing-status" class="form-select btn-secondary" aria-label="Listing status">
                    <option class="default">Status (All)</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Expired</option>
                    <option>Closed</option>
                </select>
            </div>
        `;
    }
}

export function ListingsEvent() {
    grabSelections();
    filterSelections();
    detailsListener();
    closeOverlay();
}

function grabSelections() {
    if (getUserRole()) {
        listingStatus = $("#listing-status").val().toLowerCase();
    }
    animalType = $("#animal-type").val().toLowerCase();
    gender = $("#gender").val().toLowerCase();
    distance = $("#distance").val().toLowerCase();
}

function filterSelections() {
    let filteredListings;

    $("#listing-status, #animal-type, #gender, #distance").change(function () {
        grabSelections();
        console.log(listingStatus);
        console.log(animalType);
        console.log(gender);
        console.log(distance);

        if (listingStatus === "active") {
            filteredListings = activeListings;
        } else if (listingStatus === "pending") {
            filteredListings = allListings.filter(listing => listing.status === "PENDING");
        } else if (listingStatus === "expired") {
            filteredListings = allListings.filter(listing => listing.status === "EXPIRED");
        } else if (listingStatus === "closed") {
            filteredListings = allListings.filter(listing => listing.status === "CLOSED");
        } else {
            filteredListings = allListings;
        }

        console.log(filteredListings);

        if (animalType === "dogs") {
            filteredListings = filteredListings.filter(listing => listing.animal === "dog");
        } else if (animalType === "cats") {
            filteredListings = filteredListings.filter(listing => listing.animal === "cat");
        } else if (animalType === "other") {
            filteredListings = filteredListings.filter(listing => listing.animal !== "dog" && listing.animal !== "cat");
        }

        console.log(filteredListings)

        if (gender === "male") {
            filteredListings = filteredListings.filter(listing => listing.sex === "Male");
        } else if (gender === "female") {
            filteredListings = filteredListings.filter(listing => listing.sex === "Female");
        }

        console.log(filteredListings)

        return $("#listing-cards").html(populateCards(filteredListings));
    })
}


export function populateCards(filteredListings) {
    //language=HTML
    return `
        ${filteredListings.map(listing =>
                ` 
        <div class="col mb-5">
                        <div id="previewCard-${listing.id}" class="card previewCard">
                            <!-- Pet image-->
                            <img class="card-img-top" src=${listing.images[0]} alt="..." />
                            <!-- Pet details-->
                            <div class="card-body p-4 bg-light">
                                <div class="text-center">
                                    <!-- Pet name-->
                                    <h5 class="fw-bolder">${listing.name}</h5>
                                    <!-- Breed-->
                                    ${listing.breed}<br>
                                    ${listing.age} / ${listing.sex.toLowerCase()}
                                </div>
                            </div>
                            <!-- View details-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-light">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto details-btn" href="#" data-id="${listing.id}">View Details</a></div>
                            </div>
                        </div>
                        <div id="overlay-${listing.id}" class="overlay">
                        <a class="btn rounded-circle text-center close-btn px-0" data-id="${listing.id}" style="width: 36px; height: 36px;" href="#">X</a>
                        <div class="container overlay-contianer">
                        <div class="row row-cols-1 row-cols-md-2">
                        <div class="col-6">
                        <h3 class="overlay-text text-center">Name: ${listing.name}</h3>
                        <img class="listing-image-large" src=${listing.images[0]} alt="pet"/>
                                                    </div>
                                                    <div class="col-6">
                        <h3 class="overlay-text text-center">${listing.animal}</h3>
                        <div class="row">
                        <div class="col-6">
                        <ul>
                            <li class="overlay-text">Breed: ${listing.breed}</li>
                            <li class="overlay-text">Sex: ${listing.sex}</li>
                            <li class="overlay-text">Age: ${listing.age}</li>
                        </ul>
                        </div>
                        <div class="col-6">
                        <ul>
                            <li class="overlay-text">Color: ${listing.color}</li>
                            <li class="overlay-text">Health: ${listing.health}</li>
                            <li class="overlay-text">Fixed: ${listing.fixed}</li>
                        </ul>
                        </div>
                        <div class="col-12">
                        <p class="overlay-text more-info">Summary: ${listing.summary}</p>
                        <p class="overlay-text more-info">About: ${listing.description}</p>
                        </div>
                        </div>
                                                    
                                                    </div>   
                                                    </div>                 
</div>
</div>
                    </div>
`).join('')}`
}


function detailsListener() {
    $(".details-btn").click(function (e) {
        let id = e.target.getAttribute("data-id")
        $("#overlay-" + id).css({display: "block"})
    })
}


function closeOverlay() {
    $(".close-btn").click(function (e) {
        let id = e.target.getAttribute("data-id")
        $("#overlay-" + id).css({display: "none"})
    })
}


