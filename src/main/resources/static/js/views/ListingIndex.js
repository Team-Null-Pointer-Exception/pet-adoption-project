import createView from "../createView.js";
import {getHeaders, getUserRole} from "../auth.js";


let allListings, activeListings, listingStatus, animalType, gender, distance;
let googleAPIKey='AIzaSyCQekvuf0nOxzwr7LBbS-voOZmKtHp7jMU'

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
            <!--            <h1 id="listings-heading" class="mb-3 h2 jumbotron">Available Adoptions</h1>-->
            <h1 class="display-4 m-0 text-black jumbotron">Available <span class="text-primary">Adoptions</span></h1>
            <h2 class="jumbo-message">
                Find your new best friend today
            </h2>

            <div class="py-5">
                ${adminMenu()}
                <div class="btn-group m-3">
                    <select id="animal-type" class="form-select-lg btn-primary" aria-label="Animal type">
                        <option selected>All</option>
                        <option>Dogs</option>
                        <option>Cats</option>
                        <option>Other</option>
                    </select>
                </div>

                <div class="btn-group m-3">
                    <select id="gender" class="form-select-lg btn-primary" aria-label="Gender">
                        <option selected>Male or Female</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>

                <div class="btn-group m-3">
                    <select id="distance" class="form-select-lg btn-primary" aria-label="Distance">
                        <option selected>Within 15 Miles</option>
                        <option>Within 50 Miles</option>
                        <option>Any Distance</option>
                    </select>
                </div>
            </div>
        </div>

        <main>
            <div class="container-fluid listing-container">
                <section class="py-5">
                    <div class="container px-4 px-lg-5 mt-5">
                        <div id="listing-cards"
                             class="row gx-4 gx-lg-5 row-cols-1 row-cols-lg-2" justify-content-center
                        ">
                        ${populateCards(activeListings)}
                    </div>
            </div>
            </section>
            </div>
        </main>
    `;
}

function adminMenu() {
    if (!getUserRole()) {
        return "";
    } else {
        //language=HTML
        return `
            <div class="btn-group m-3">
                <select id="listing-status" class="form-select-lg btn-primary" aria-label="Listing status">
                    <option>Status (All)</option>
                    <option selected>Active</option>
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
    animalType = $("#animal-type").val().toLowerCase().trim();
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

        if (getUserRole()) {
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
        } else {
            filteredListings = activeListings;
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
                        <!-- New badge-->
                        ${addBadge(listing)}
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
                                <div class="text-center"><a class="btn btn-primary mt-auto details-btn" href="#" data-id="${listing.id}">View Details</a></div>
                            </div>
                        </div>
                        <div id="overlay-${listing.id}" class="overlay">
                        <a class="btn rounded-circle text-center close-btn px-0" data-id="${listing.id}" style="width: 36px; height: 36px;" href="#">X</a>
    <div class="container overlay-container">
    <div class="sharethis-sticky-share-buttons"></div>
    <div class="row row-cols-1 row-cols-md-2">
        <div class="col-6">
             <h3 class="overlay-text text-center">Pet name: ${listing.name}</h3>
             <img class="listing-image-large" src=${listing.images[0]} alt="pet"/>
             </div>
                   <div class="col-6">
                        <h3 class="overlay-text text-center">${listing.animal}</h3>
                        <div class="row">
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
            <div class="row cols-2"> 
            <div class="col" id="map">
            <img class="location-map" src="https://maps.googleapis.com/maps/api/staticmap?center=${listing.user.zip}&zoom=11&size=550x550&key=${googleAPIKey}" alt="map"/>
            </div> 

            <div class="col listing-contact-details text-center">
            <img class="storyImg mx-auto" src="${listing.user.profileImg}">
                        <ul>
                            <li>${listing.user.firstName} ${listing.user.lastName}</li>
                            <li>${listing.user.city}, ${listing.user.state}, ${listing.user.zip}</li>
                            <li>Contact Options: </li>
                        </ul>
                        <div class="d-flex align-items-center justify-content-center user-contact-details">
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 ml-2 px-0 allow" style="width: 36px; height: 36px;" href="iMessage://${listing.user.phone}" target="_blank"><i class="fas fa-sms"></i></a>
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="mailto:${listing.user.email}" target="_blank"><i class="far fa-envelope"></i></a>
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="facetime-audio:${listing.user.phone}" target="_blank"><i class="fas fa-phone"></i></a>
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 px-0 allow" style="width: 36px; height: 36px;" href="facetime:${listing.user.phone}" target="_blank"><i class="fas fa-video"></i></a>
                        </div>
                </div>          
            </div>               
    </div>

</div>
                    </div>
`).join('')}`
}


export function addBadge(listing) {
    let now = new Date();
    let date = listing.createdAt;
    console.log(date);

    const oneDay = 60 * 60 * 24;
    console.log(oneDay);

    let compareDatesBoolean = (now - date) > oneDay;
    //language=HTML
    if (compareDatesBoolean) {
        return '';
    } else {
        return `
            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">New</div>`;
    }
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




