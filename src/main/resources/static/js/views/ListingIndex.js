
import  {getUserRole} from "../auth.js";
import token from "../keys.js"

let apiKey = token().googleKey

let allListings, activeListings, listingStatus, animalType, gender, distance, filteredListings;


export default function ListingIndex(props) {
    let lat = sessionStorage.getItem('lat')
    let lng = sessionStorage.getItem('lng')
    let  origin = [lat, lng]

    allListings = props.listings;
    allListings.forEach(listing => {
        if (listing.breed === "") {
            listing.breed = listing.animal;
        }
    })
    activeListings = allListings.filter(listing => listing.status === "ACTIVE");

    fetch(`/gogglemap/maps/api/distancematrix/json?origins=${origin}&destinations=78833`)
        .then(function (response) {
            response.json().then(function (res){
                console.log(res);
            })
        })
        .catch(function (error) {
            console.log(error);
        });

    //language=HTML
    return `
        <!-- Jumbotron -->
        <div
                class="bg-image p-5 text-center shadow-1-strong rounded mb-5 text-white"
                style="background-image: url('../../images/pexels-cottonbro-6864010.jpg');"
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
                             class="row gx-4 gx-lg-5 row-cols-1 row-cols-lg-2 justify-content-center">
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
                    <option>Rejected</option>
                </select>
            </div>
        `;
    }
}

export function ListingsEvent() {
    grabSelections();
    detailsListener();
    closeOverlay();
    newSelections()
}

function grabSelections() {
    if (getUserRole()) {
        listingStatus = $("#listing-status").val();
    }
    animalType = $("#animal-type").val();
    gender = $("#gender").val();
    distance = $("#distance").val();
}


function newSelections() {
    $("#listing-status, #animal-type, #gender, #distance").change(function () {
        filterSelections();
    })
}


function filterSelections() {
    grabSelections();

    if (getUserRole()) {
        if (listingStatus === "Active") {
            filteredListings = allListings.filter(listing => listing.status === "ACTIVE");
        } else if (listingStatus === "Pending") {
            filteredListings = allListings.filter(listing => listing.status === "PENDING");
        } else if (listingStatus === "Expired") {
            filteredListings = allListings.filter(listing => listing.status === "EXPIRED");
        } else if (listingStatus === "Closed") {
            filteredListings = allListings.filter(listing => listing.status === "CLOSED");
        } else if (listingStatus === "Rejected") {
            filteredListings = allListings.filter(listing => listing.status === "REJECTED");
        } else {
            filteredListings = allListings;
        }
    } else {
        filteredListings = activeListings;
    }

    if (animalType === "Dogs") {
        filteredListings = filteredListings.filter(listing => listing.animal.toLowerCase() === "dog");
    } else if (animalType === "Cats") {
        filteredListings = filteredListings.filter(listing => listing.animal.toLowerCase() === "cat");
    } else if (animalType === "Other") {
        filteredListings = filteredListings.filter(listing => listing.animal.toLowerCase() !== "dog" && listing.animal.toLowerCase() !== "cat");
    }


    if (gender === "Male") {
        filteredListings = filteredListings.filter(listing => listing.sex.toLowerCase() === "male");
    } else if (gender === "Female") {
        filteredListings = filteredListings.filter(listing => listing.sex.toLowerCase() === "female");
    }

    console.log(filteredListings);
    $("#listing-cards").html(populateCards(filteredListings));
    detailsListener();
    closeOverlay();
}


export function populateCards(filteredListings) {
    //language=HTML
    return `
        ${filteredListings.map(listing =>
                `
        <div class="col mb-5">
            <div id="previewCard-${listing.id}" class="card previewCard">
                <!-- New badge-->
                ${addNewBadge(listing)}
                ${addPendingStatus(listing)}
                <!-- Pet image-->
                <img class="card-img-top" src=${listing.images[0]} alt="..."/>
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
                    <div class="text-center"><a class="btn btn-primary mt-auto details-btn" href="#"
                                                data-id="${listing.id}">View
                        Details</a>
                    </div>
                </div>
            </div>


            <!-- Overlay -->
            <div id="overlay-${listing.id}" class="overlay">
                <div class="container overlay-container">
                    <a class="btn rounded-circle text-center close-btn px-0" data-id="${listing.id}"
                       style="width: 36px; height: 36px;" href="#">X</a>
                    <div class="sharethis-sticky-share-buttons"></div>
                    <div class="row">
                    
                    <!-- left side column -->
                        <div class="col-xs-12 col-lg-6 listing-main">
                            <h3 class="overlay-text text-center">${listing.name}</h3>
                            <img class="listing-image-large" src=${listing.images[0]} alt="pet"/>

                            <!-- Contact info and map -->
                            <div id="under-pic" class="row">
                                <div class="col-xs-12 col-lg-6 listing-contact-details text-center">
                                    <h3 class="overlay-text text-center my-3">Guardian info:</h3>
                                    <img class="storyImg mx-auto mt-0 mb-2" src="${listing.user.profileImg}">
                                    <ul>
                                        <li>${listing.user.firstName} ${listing.user.lastName}</li>
                                        <li>${listing.user.city}, ${listing.user.state}, ${listing.user.zip}</li>
                                        <li>Contact Options:</li>
                                    </ul>
                                    <div class="d-flex align-items-center justify-content-evenly user-contact-details ms-0">
                                        <a class="btn btn-outline-primary rounded-circle text-center mt-0 mb-3 ml-2 px-0 allow"
                                           style="width: 36px; height: 36px;" href="imessage://${listing.user.phone}"
                                           target="_blank"><i class="fas fa-sms"></i></a>
                                        <a class="btn btn-outline-primary rounded-circle text-center mt-0 mb-3 mr-2 px-0 allow"
                                           style="width: 36px; height: 36px;" href="mailto:${listing.user.email}"
                                           target="_blank"><i class="far fa-envelope"></i></a>
                                        <a class="btn btn-outline-primary rounded-circle text-center mt-0 mb-3 mr-2 px-0 allow"
                                           style="width: 36px; height: 36px;"
                                           href="facetime-audio:${listing.user.phone}"
                                           target="_blank"><i class="fas fa-phone"></i></a>
                                        <a class="btn btn-outline-primary rounded-circle text-center mt-0 mb-3 px-0 allow"
                                           style="width: 36px; height: 36px;" href="facetime:${listing.user.phone}"
                                           target="_blank"><i class="fas fa-video"></i></a>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-lg-6" id="map">
                                    <img class="location-map"
                                         src="https://maps.googleapis.com/maps/api/staticmap?center=${listing.user.zip}&zoom=11&size=550x450&markers=color:blue%7C${listing.user.zip}&key=${apiKey}"
                                         alt="map"/>
                                </div>
                            </div>
                        </div>


                        <!-- Right Side Details Column -->
                        <div class="col-xs-12 col-lg-6 container container-overlay-details">
                            <h3 class="overlay-text text-center">${listing.animal}</h3>
                            <div class="row listing-details">
                                <div class="col-6">
                                    <ul>
                                        <li><strong>Breed</strong>: ${listing.breed}</li>
                                        <li><strong>Sex</strong>: ${listing.sex}</li>
                                        <li><strong>Age</strong>: ${listing.age}</li>
                                    </ul>
                                </div>
                                <div class="col-5">
                                    <ul>
                                        <li><strong>Color</strong>: ${listing.color}</li>
                                        <li><strong>Health Issues</strong>: ${listing.health}</li>
                                        <li><strong>Fixed</strong>: ${listing.fixed}</li>
                                    </ul>
                                </div>
                                <div class="col-1 side-btn">
                                    <a id="report-btn"
                                       class="btn btn-outline-primary rounded-circle text-center mb-3 ml-2 px-0 allow"
                                       style="width: 36px; height: 36px;"
                                       href="mailto:admin@yoursite.com?subject=Suspiscious Listing: ${listing.id}&body=Please detail your concerns about a listing"
                                       target="_blank"><i class="fas fa-flag"></i></a>
                                </div>
                                <div class="col-12 listing-details">
                                    <p><strong>Summary</strong>: ${listing.summary}</p>
                                    <p><strong>About</strong>: ${listing.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `
        ).join('')
        }

    `
}


function addNewBadge(listing) {
    let listingDate = listing.createdAt;
    let today = new Date();
    let dateToBeChanged = new Date();

    dateToBeChanged.setDate(today.getDate() - 3);
    let threeDaysAgo = dateToBeChanged.toISOString().slice(0, 10);

    let listingDateArray = listingDate.split("-");
    listingDate = listingDateArray.join("");
    let yesterdayDateArray = threeDaysAgo.split("-");
    threeDaysAgo = yesterdayDateArray.join("");


    if (listingDate < threeDaysAgo) {
        return '';
    } else {
        //language=HTML
        return `
            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem"> New</div>`;
    }
}

function addPendingStatus(listing) {
    if (listing.status !== "PENDING") {
        return '';
    } else {
        //language=HTML
        return `
            <p class="mb-0 bg-light text-center fw-bold" style='font-size:27px;color:firebrick'>
                <i class="fas fa-exclamation-triangle"></i>
                Pending approval
                <i class="fas fa-exclamation-triangle"></i>
            </p>
        `
    }
}

function addRejectedStamp(listing) {
    if (listing.status === "REJECTED") {
        return '';
    } else {
        console.log("adding rejected stamp");
        //language=HTML
        return `
            <img class="card-img-overlay cover" src="../../images/rejected.jpeg" alt="rejected stamp">`
    }
}

function adminButtons(listing) {

    if (getUserRole()) {
        //language=HTML
        return `
            <div class="text-center">
                <div class="btn-group m-3">
                    <select id="change-listing-status" class="form-select btn-primary "
                            aria-label="Update listing status">
                        <option>Change status</option>
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Expired</option>
                        <option>Closed</option>
                        <option>Rejected</option>
                    </select>
                </div>
                <button class="btn-group="
            </div>`
    } else {
        return '';
    }
}

function detailsListener() {
    $(".details-btn").click(function (e) {
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




