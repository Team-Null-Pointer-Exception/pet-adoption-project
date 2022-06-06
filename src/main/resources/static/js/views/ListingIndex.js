import createView from "../createView.js";
import {getHeaders, getUserRole} from "../auth.js";
import token from "../keys.js";
import {baseUri} from "../fetchData.js";
import {isLoggedIn} from "../auth.js";

let apiKey = token().googleKey
let chatKey = token().talkJSKey

let allListings, activeListings, listingStatus, animalType, gender, distance, filteredListings, user;


export default function ListingIndex(props) {
    $("#inbox-container").css({display: "none"})
    let loggedIn = isLoggedIn()
    if(loggedIn) {
        user = props.user
    }
    let lat = sessionStorage.getItem('lat')
    let lng = sessionStorage.getItem('lng')
    let origin = [lat, lng]

    allListings = props.listings;
    activeListings = allListings.filter(listing => listing.status === "ACTIVE");
    autoExpire();
    activeListings.sort();

    let destinations = ''

    activeListings.forEach(listing => {
        destinations = destinations + `${listing.user.zip}%7c`
    })
    destinations = destinations.slice(0, -3)
    fetch(`/gogglemap/maps/api/distancematrix/json?origins=${origin}&destinations=${destinations}&units=imperial`)
        .then(res => {
            let promise = Promise.resolve(res.json());
            promise.then(function (val) {
                getListingDistances(val)
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
                style="background-image: url('https://petadoptions-npe.s3.us-east-2.amazonaws.com/pexels-cottonbro-6864010.jpg');">
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
                ${userMenu()}
            </div>
        </div>
        <main>
            <div class="container-fluid listing-container">
                <section class="py-4">
                    <div class="container px-2 mt-5">
                        <div id="listing-cards"
                             class="row">
                            ${populateCards(activeListings)}
                        </div>
                    </div>
                </section>
            </div>
        </main>
        <div id="talkjs-container"></div>
    `;
}

let distances = []

function getListingDistances(val) {
    distances = []
    let destinations = val.rows[0].elements
    destinations.forEach(destination => {
        distances.push(parseFloat(destination.distance.text.slice(0, -3)))
    })
    return distances
}

function adminMenu() {
    if (getUserRole() !== "ADMIN") {
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

function userMenu() {
    if (getUserRole() === "ADMIN") {
        return "";
    } else {
        //language=HTML
        return `
            <div class="btn-group m-3">
                <select id="distance" class="form-select-lg btn-primary" aria-label="Distance">
                    <option selected>Any Distance</option>
                    <option>Within 50 Miles</option>
                    <option>Within 15 Miles</option>
                </select>
            </div>
        `;
    }
}

export function ListingsEvent() {
    grabSelections();
    detailsListener();
    closeOverlay();
    newSelections();
    changeStatus();
}

function grabSelections() {
    if (getUserRole() === "ADMIN") {
        listingStatus = $("#listing-status").val();
    }
    animalType = $("#animal-type").val();
    gender = $("#gender").val();
    if (getUserRole() !== "ADMIN") {
        distance = $("#distance").val();
    }
}


function newSelections() {
    $("#listing-status, #animal-type, #gender, #distance").change(function () {
        filterSelections();
    })
}


function filterSelections() {
    grabSelections();

    if (getUserRole() === "ADMIN") {
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

    if (distance === "Any Distance") {
        console.log("all distances")
    } else if (distance === "Within 50 Miles") {
        console.log("within 50 miles")
        sortDistance(50, filteredListings)
    } else if (distance === "Within 15 Miles") {
        console.log("within 15 miles")
        sortDistance(15, filteredListings)
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


    filteredListings.sort();
    $("#listing-cards").html(populateCards(filteredListings));
    grayImages();
    detailsListener();
    closeOverlay();
    changeStatus();
}

function sortDistance(selectedDistance, listings) {
    filteredListings = []
    for (let i = 0; i < distances.length; i++) {
        if (distances[i] <= selectedDistance) {
            filteredListings.push(listings[i]);
        }
    }
    console.log(filteredListings)
}


export function populateCards(filteredListings) {
    return `
        ${filteredListings.map(listing =>
                `
        <div class="col-xl-3 col-lg-4 col-md-6 mb-5">
            <div id="previewCard-${listing.id}" class="card previewCard">
                <!-- New badge-->
                ${addNewBadge(listing)}
                ${addPendingStatus(listing)}
                <!-- Pet image-->
                <img id="image-${listing.id}" class="card-img-top" src=${listing.images} alt="..."/>
                <!-- Pet details-->
                <div class="card-body p-4 bg-light">
                    <div class="text-center">
                        <!-- Pet name-->
                        <h5 class="fw-bolder">${listing.name}</h5>
                        <!-- Days Remaining -->
                        ${daysLeftWarning(listing)}
                        <!-- Breed-->
                        ${listing.breed}<br>
                        ${listing.age} / ${listing.sex.toLowerCase()} 
                    </div>
                    <div class="text-center mt-3">
                        <a class="btn btn-primary mt-auto details-btn" href="#" data-id="${listing.id}">View Details</a>
                    </div>
                </div>
            </div>
            ${populateOverlay(listing)}

        </div>
    `
        ).join('')
        }
    `
}

function autoExpire() {
    activeListings.forEach(listing => {
        let listingDate = listing.createdAt;
        let today = new Date();
        let dateToBeChanged = new Date();

        dateToBeChanged.setDate(today.getDate() - 30);
        let thirtyDaysAgo = dateToBeChanged.toISOString().slice(0, 10);

        let listingDateArray = listingDate.split("-");
        listingDate = listingDateArray.join("");
        let thirtyDaysAgoArray = thirtyDaysAgo.split("-");
        thirtyDaysAgo = thirtyDaysAgoArray.join("");

        if (listingDate < thirtyDaysAgo) {
            let listingId = listing.id;
            console.log(listingId);
            let newStatus = "EXPIRED";
            let request = {
                method: "PUT",
                headers: getHeaders()
            }

            fetch(`${baseUri}/api/listings/${listingId}/updateStatus?newStatus=${newStatus}`, request)
                .then(res => {
                    console.log(res.status);
                    createView("/listings");
                }).catch(error => {
                console.log(error);
                createView("/listings");
            });
        }
    });
}


function addNewBadge(listing) {
    let listingDate = listing.createdAt;
    let today = new Date();
    let dateToBeChanged = new Date();

    dateToBeChanged.setDate(today.getDate() - 3);
    let threeDaysAgo = dateToBeChanged.toISOString().slice(0, 10);

    let listingDateArray = listingDate.split("-");
    listingDate = listingDateArray.join("");
    let threeDaysAgoArray = threeDaysAgo.split("-");
    threeDaysAgo = threeDaysAgoArray.join("");


    if (listingDate < threeDaysAgo) {
        return '';
    } else {
        return `
            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem"> New</div>`;
    }
}

function grayImages() {
    let listingToGray = allListings.filter(listing => listing.status !== "ACTIVE");
    console.log(listingToGray);
    listingToGray.forEach(listing => {
        let imageId = "#image-" + listing.id;
        $(imageId).css({filter: "grayscale(100%)"});
    });
}

function daysLeftWarning(listing) {
    let listingDate = new Date(listing.createdAt);
    let oneDay = 1000 * 60 * 60 * 24;
    let thirtyDays = oneDay * 30;
    let expirationDate = new Date(listingDate);
    expirationDate.setDate(expirationDate.getDate() + 30);
    let today = new Date();
    let daysRemaining = expirationDate - today;
    daysRemaining /= oneDay;

    console.log(listingDate);
    console.log(expirationDate);
    console.log(today);
    console.log(Math.floor(daysRemaining));

    if (Math.floor(daysRemaining) <= 7 && Math.floor(daysRemaining) > 0) {
        console.log("This post is about to expire!");
        //language=HTML
        return `
            <div class="d-flex justify-content-center small text-danger mb-2" style="z-index: 2;">
                <strong>Only ${Math.floor(daysRemaining)} day(s) left!</strong>
            </div>
        `;
    } else if (Math.floor(daysRemaining) > 7){
        //language=HTML
        return `
            <div class="d-flex justify-content-center small mb-2" style="z-index: 2;">
                <em>${Math.floor(daysRemaining)} days remaining</em>
            </div>
        `;
    } else {
        return `
        <div class="text-danger">This listing has expired</div>
        `;
    }
}

function addPendingStatus(listing) {
    if (listing.status !== "PENDING") {
        return '';
    } else {
        console.log("Adding pending status banner");
        //language=HTML
        return `
            <p class="mb-0 bg-light text-center fw-bold position-absolute" style='font-size:22px; z-index: 2; width:100%; opacity: 0.7; color:#ED6436'>
                <i class="fas fa-exclamation-triangle"></i>
                Pending approval
                <i class="fas fa-exclamation-triangle"></i>
            </p>
        `;
    }
}

export function populateOverlay(listing) {
    let cityHTML = ""
    if (listing.user.city !== "") {
        cityHTML = `${listing.user.city},`
    }
    let stateHTML = listing.user.state;
    if (stateHTML === "NA") {
        stateHTML = "N/A";
    }
    return `
    <!-- Overlay -->
            <div id="overlay-${listing.id}" class="overlay">
                <div class="container overlay-container">

                    <div class="row">
                    
                    <!-- left side column -->
                        <div class="col-xs-12 col-lg-6 listing-main">
                            <h3 class="overlay-text text-center">${listing.name}</h3>
                            <a class="btn rounded-circle text-center close-btn px-0" data-id="${listing.id}" style="width: 36px; height: 36px;" href="#">X</a>
                            <img class="listing-image-large" src=${listing.images} alt="pet"/>

                            <!-- Contact info and map -->
                            <div id="under-pic" class="row mt-5">
                                <div class="col-xs-12 col-lg-5 listing-contact-details text-center mt-0">
                                    <h3 class="overlay-text text-center my-2">Guardian info:</h3>
                                    <img class="story-img mx-auto mt-0 mb-2" src="${listing.user.profileImg}">
                                    <ul>
                                        <li>${listing.user.firstName} ${listing.user.lastName}</li>
                                        <li>${cityHTML} ${stateHTML}, ${listing.user.zip}</li>
                                    </ul>
                                    <div class="d-flex align-items-center justify-content-center user-contact-details ms-0">
                                        <button class="btn-getInTouch" data-id="${listing.user.id}" data-name="${listing.user.firstName}" data-email="${listing.user.email}" data-pic="${listing.user.profileImg}">Contact</button>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-lg-7" id="map">
                                    <img class="location-map"
                                         src="https://maps.googleapis.com/maps/api/staticmap?center=${listing.user.zip}&zoom=11&size=550x450&markers=color:blue%7C${listing.user.zip}&key=${apiKey}"
                                         alt="map"/>
                                    <p class="text-center">(Approx. location. Contact lister for details.)</p>
                                </div>
                            </div>
                        </div>

                        <!-- Right Side Details Column -->
                        <div class="col-xs-12 col-lg-6 container container-overlay-details">
                            <h3 class="overlay-text text-center">${listing.animal}</h3>
                            <button class="report-btn btn btn-outline-primary rounded-circle text-center mb-3 ml-2 px-0 allow"
                                       data-toggle="tooltip" data-placement="bottom" title="Report this listing"
                                       style="width: 36px; height: 36px;"
                                       data-id="${listing.user.id}" data-name="${listing.user.firstName}" data-email="${listing.user.email}">
                                       <i class="fas fa-flag"></i></button>        
                            <div class="row listing-details">
                                <div class="col-6">
                                    <ul>
                                        <li><strong>Breed</strong>: ${listing.breed}</li>
                                        <li><strong>Sex</strong>: ${listing.sex}</li>
                                        ${changeStatusMenu(listing)}
                                    </ul>
                                </div>
                                <div class="col-6">
                                    <ul>
                                        <li><strong>Age</strong>: ${listing.age}</li>
                                        <li><strong>Color</strong>: ${listing.color}</li>
                                        <li><strong>Fixed</strong>: ${listing.fixed}</li>
                                    </ul>
                                </div>
                               
                                <div class="col-12 listing-details">
                                    <p><strong>Summary</strong>: ${listing.summary}</p>
                                    <p><strong>About</strong>: ${listing.description}</p>
                                    <p><strong>Health Issues</strong>: ${listing.health}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    `
}


function changeStatusMenu(listing) {

    if (getUserRole() === "ADMIN") {
        //language=HTML
        return `
            <li class="mt-1">
                <select id="change-listing-status-${listing.id}" class="status-dropdown form-select btn-primary btn-sm"
                        data-id="${listing.id}" aria-label="Update listing status">
                    ${selectedOption(listing)}
                </select>
            </li>`
    } else {
        return '';
    }
}

function selectedOption(listing) {
    if (listing.status === "ACTIVE") {
        return `
        <option selected>Active</option>
        <option>Pending</option>
        <option>Expired</option>
        <option>Closed</option>
        <option>Rejected</option>`
    } else if (listing.status === "PENDING") {
        return `
        <option>Active</option>
        <option selected>Pending</option>
        <option>Expired</option>
        <option>Closed</option>
        <option>Rejected</option>`
    } else if (listing.status === "EXPIRED") {
        return `
        <option>Active</option>
        <option>Pending</option>
        <option selected>Expired</option>
        <option>Closed</option>
        <option>Rejected</option>`
    } else if (listing.status === "CLOSED") {
        return `
        <option>Active</option>
        <option>Pending</option>
        <option>Expired</option>
        <option selected>Closed</option>
        <option>Rejected</option>`
    } else if (listing.status === "REJECTED") {
        return `
        <option>Active</option>
        <option>Pending</option>
        <option>Expired</option>
        <option>Closed</option>
        <option selected>Rejected</option>`
    }
    changeStatus();
}

function changeStatus() {
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
                createView("/listings");
            }).catch(error => {
            console.log(error);
            createView("/listings");
        });
    });
}

function detailsListener() {
    $(".details-btn").click(function () {
        let id = $(this).data("id");
        $("#overlay-" + id).css({display: "block"})
        chatListener(user);
        reportListener(user)
    })
}


function closeOverlay() {
    $(".close-btn").click(function (e) {
        let id = $(this).data("id");
        $("#overlay-" + id).css({display: "none"})
    })
}

let popup;
export function chatListener(user) {
    $('.btn-getInTouch').click(async function (e) {
        let loggedIn = isLoggedIn();
        let listerID = $(this).data("id");
        let listerName = $(this).data("name")
        let listerEmail = $(this).data("email")
        let listerPic = $(this).data("pic")
        if (loggedIn) {
        await Talk.ready;
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
            const other = new Talk.User({
                id: listerID,
                name: listerName,
                email: listerEmail,
                photoUrl: listerPic,
                role: "user"
            });
            const conversation = session.getOrCreateConversation(
                Talk.oneOnOneId(me, other)
            );
            conversation.setParticipant(me);
            conversation.setParticipant(other);
            if (popup) {
                 popup.show(); //in case popup is hidden
                 popup.select(conversation);
                    //select the conversation clicked on
                } else {
                    //if there is no existing popup, create one
                    popup = session.createPopup();
                    popup.select(conversation);
                    popup.mount({show: true});
                }
        } else {
            createView("/login")
        }
    })
}

export function reportListener(user) {
    $('.report-btn').click(async function (e) {
        let reportedListingID = $(this).data("id");
        let reportedListingName = $(this).data("name");
        let loggedIn = isLoggedIn();
        if (loggedIn) {
            await Talk.ready;
            const me = new Talk.User({
                id: user.id,
                name: user.firstName,
                email: user.email,
                photoUrl: user.profileImg,
                role: "user",
                welcomeMessage: `I would like to report a concern about listing ${reportedListingID} from ${reportedListingName}`
            });
            const session = new Talk.Session({
                appId: chatKey,
                me: me,
            });
            const other = new Talk.User({
                id: 1,
                name: "Admin-Patrick",
                email: "patrick.quilty21@gmail.com",
                photoUrl: "https://petadoptions-npe.s3.us-east-2.amazonaws.com/patrick.quilty.jpg",
                role: "user",
                welcomeMessage: "Thank-you for reaching out. Please describe your concerns so I can look into it."
            });
            const other1 = new Talk.User({
                id: 3,
                name: "Admin-Brice",
                email: "brice.ernst1@gmail.com",
                photoUrl: "https://petadoptions-npe.s3.us-east-2.amazonaws.com/brice-img.png",
                role: "user"
            });

            const other2 = new Talk.User({
                id: 8,
                name: "Admin-Justin",
                email: "justinsixsmith@gmail.com",
                photoUrl: "https://petadoptions-npe.s3.us-east-2.amazonaws.com/justin-img.png",
                role: "user"
            });
            const conversation = session.getOrCreateConversation(
                Talk.oneOnOneId(me, other, other1, other2)
            );
            conversation.setParticipant(me);
            conversation.setParticipant(other);
            conversation.setParticipant(other1);
            conversation.setParticipant(other2);
            if (popup) {
                popup.show(); //in case popup is hidden
                popup.select(conversation);
                //select the conversation clicked on
            } else {
                //if there is no existing popup, create one
                popup = session.createPopup();
                popup.select(conversation);
                popup.mount({show: true});
            }
        } else {
            createView("/login")
        }
    })
}



