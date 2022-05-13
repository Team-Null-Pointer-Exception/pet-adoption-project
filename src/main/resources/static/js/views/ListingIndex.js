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

        <main>
            <div class="container-fluid">
                <section class="py-0">
                    <div class="container px-4 px-lg-5 mt-5">
                        <div id="listing-cards"
                             class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                            ${populateCards(activeListings)}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    `;
}

function adminMenu() {
    if (getUserRole()) {
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
}

function grabSelections() {
    listingStatus = $("#listing-status").val().toLowerCase();
    animalType = $("#animal-type").val().toLowerCase();
    gender = $("#gender").val().toLowerCase();
    distance = $("#distance").val().toLowerCase();
}

function filterSelections() {

    $("#listing-status, #animal-type, #gender, #distance").change(function () {
        grabSelections();
        console.log(listingStatus);
        console.log(animalType);
        console.log(gender);
        console.log(distance);

        let filteredListings;
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
            filteredListings = filteredListings.filter(listing => listing.sex === "MALE");
        } else if (gender === "female") {
            filteredListings = filteredListings.filter(listing => listing.sex === "FEMALE");
        }

        console.log(filteredListings)

        return $("#listing-cards").html(populateCards(filteredListings));
    })
}


export function populateCards(filteredListings) {
    //language=HTML
    return `
        ${filteredListings.map(listing =>
        `<div class="col mb-5">
                        <div class="card previewCard h-100">
                            <!-- Pet image-->
                            <img class="card-img-top" src=${listing.images[0]} alt="..." />
                            <!-- Pet details-->
                            <div class="card-body p-4 bg-light">
                                <div class="text-center">
                                    <!-- Pet name-->
                                    <h5 class="fw-bolder">${listing.name}</h5>
                                    <!-- Breed-->
                                    ${listing.breed}
                                </div>
                            </div>
                            <!-- View details-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-light">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                            </div>
                        </div>
                    </div>`).join('')}`
}


