import createView from "../createView.js";
import {getHeaders} from "../auth.js";

let allListings;

export default function ListingIndex(props) {
    allListings = props.listings;
    allListings.forEach(listing => {
        if (listing.breed === "") {
            listing.breed = listing.animal;
        }
    })
    let activeListings = allListings.filter(listing => listing.status === "ACTIVE");

    //language=HTML
    return `
        <!-- Jumbotron -->
        <div
                class="bg-image p-5 text-center shadow-1-strong rounded mb-5 text-white"
                style="background-image: url('../../images/pexels-munkhbayar-dambajav-11195868.jpg');"
        >
            <h1 class="mb-3 h2 jumbotron">Available Adoptions</h1>

            <p class="jumbo-message">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus praesentium
                labore accusamus sequi, voluptate debitis tenetur in deleniti possimus modi voluptatum
                neque maiores dolorem unde? Aut dolorum quod excepturi fugit.
            </p>

            <div class="py-5">
                <div class="btn-group">
                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">Animal Type
                    </button>
                    <div class="dropdown-menu">
                        <a id="all-animals" class="dropdown-item">All</a>
                        <div class="dropdown-divider"></div>
                        <a id="dogs" class="dropdown-item">Dogs</a>
                        <a id="cats" class="dropdown-item">Cats</a>
                        <a id="other" class="dropdown-item">Other</a>
                    </div>
                </div><!-- /btn-group -->
                <div class="btn-group">
                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">Male / Female
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">All</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Male</a>
                        <a class="dropdown-item" href="#">Female</a>
                    </div>
                </div><!-- /btn-group -->
                <div class="btn-group">
                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">Distance from Me
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Within 10 Miles</a>
                        <a class="dropdown-item" href="#">Within 50 Miles</a>
                        <a class="dropdown-item" href="#">Over 50 Miles</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Separated link</a>
                    </div>
                </div><!-- /btn-group -->
            </div>
        </div>

        <main>
            <div class="container-fluid">
                <section class="py-0">
                    <div class="container px-4 px-lg-5 mt-5">
                        <div id="listing-cards"
                             class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                            ${activeListings.map(listing =>
                                    `<div class="col mb-5">
                                <div class="card h-100">
                                    <!-- Pet image-->
                                    <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
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
                            </div>`).join('')}
                        </div>
                    </div>
                </section>
            </div>
        </main>
        <!-- Footer-->
        <footer class="py-5 bg-dark">
            <div class="container"><p class="m-0 text-center text-white">Copyright &copy; TakeMyPig.com 2022</p></div>
    `;

}

export function ListingsEvent() {
    selectAllAnimals();
    selectDogs();
    selectCats();
    selectOther();
}

function selectAllAnimals() {
    $("#all-animals").click(function () {
        const activeListings = allListings.filter(listing => listing.status === "ACTIVE");
        return $("#listing-cards").html(populateCards(activeListings));
    });
}

function selectDogs() {
    const dogs = allListings.filter(listing => listing.animal.toLowerCase() === "dog" && listing.status === "ACTIVE");
    $("#dogs").click(function () {
        return $("#listing-cards").html(populateCards(dogs));
    })
}

function selectCats() {
    const cats = allListings.filter(listing => listing.animal.toLowerCase() === "cat" && listing.status === "ACTIVE");
    $("#cats").click(function () {
        return $("#listing-cards").html(populateCards(cats));
    })
}

function selectOther() {
    const other = allListings.filter(listing => (listing.animal.toLowerCase() !== "dog" && listing.animal.toLowerCase() !== "cat") && (listing.status === "ACTIVE"));
    $("#other").click(function () {
        return $("#listing-cards").html(populateCards(other));
    })
}


function populateCards(animalListings) {
    console.log(animalListings);
    //language=HTML
    return `
        ${animalListings.map(listing =>
                `<div class="col mb-5">
                        <div class="card h-100">
                            <!-- Pet image-->
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
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