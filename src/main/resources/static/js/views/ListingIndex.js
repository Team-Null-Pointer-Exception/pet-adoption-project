import createView from "../createView.js";
import {getHeaders} from "../auth.js";



export default function ListingIndex(props) {
    console.log(props);

    //language=HTML
    return `
        <header class="bg-dark py-5">
            <div class="container px-4 px-lg-5 my-5">
                <div class="text-center text-white">
                    <h1 class="display-4 fw-bolder">Pet Listings</h1>
                    <p class="lead fw-normal text-white-50 mb-0">Adopt a pet today!</p>
                </div>
            </div>
        </header>
        <main>
            <div class="container-fluid">
                <section class="py-5">
                    <div class="container px-4 px-lg-5 mt-5">
                        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

                            ${props.listings.map(listing =>
                            `<div class="col mb-5">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4 bg-light">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${listing.name}</h5>
                                    <!-- Product price-->
                                    ${listing.breed}
                                </div>
                            </div>
                            <!-- Product actions-->
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

}

