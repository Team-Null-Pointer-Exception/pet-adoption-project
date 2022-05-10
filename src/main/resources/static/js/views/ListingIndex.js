import createView from "../createView.js";
import {getHeaders} from "../auth.js";

let listings;

export default function ListingIndex(props) {
    console.log(props);
    listings = props.listings;
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


            <div class="btn-group">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">Animal Type
                </button>
                <div class="dropdown-menu">
                    <a id="all-animals" class="dropdown-item" href="#">All</a>
                    <a id="dogs" class="dropdown-item" href="#">Dog</a>
                    <a id="cats" class="dropdown-item" href="#">Cat</a>
                    <a id="livestock" class="dropdown-item" href="#">Livestock</a>
                    <a id="other" class="dropdown-item" href="#">Other</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Separated link</a>
                </div>
            </div><!-- /btn-group -->
            <div class="btn-group">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">Male / Female
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">All</a>
                    <a class="dropdown-item" href="#">Male</a>
                    <a class="dropdown-item" href="#">Female</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Separated link</a>
                </div>
            </div><!-- /btn-group -->
            <div class="btn-group">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
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

        <main>
            <div class="container-fluid">
                <section class="py-5">
                    <div class="container px-4 px-lg-5 mt-5">
                        <div id="listing-cards"
                             class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        ${populateCards(listings)}
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
}

function selectAllAnimals() {
    $("#all-animals").click(function () {
        return $("#listing-cards").html(populateCards(listings));
    });
}

function selectDogs() {
    const dogs = listings.filter(listing => listing.animal === "dog");
    $("#dogs").click(function () {
        return $("#listing-cards").html(populateCards(dogs));
    })
}

function selectCats() {
    const cats = listings.filter(listing => listing.animal === "cat");
    $("#cats").click(function () {
        return $("#listing-cards").html(populateCards(cats));
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