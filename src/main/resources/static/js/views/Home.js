import {isLoggedIn} from "../auth.js";
import {populateCards} from "./ListingIndex.js";
import {chatListener} from "./ListingIndex.js";
import token from "../keys.js";

let user, popup;
let chatKey = token().talkJSKey;

export default function Home(props) {
    $("#inbox-container").css({display: "none"})
    let loggedIn = isLoggedIn()
    if (loggedIn) {
        user = props.user
    }
    let activeListings = props.listings.filter(listing => listing.status === "ACTIVE");
    let recentListings = activeListings.reverse();
    if (recentListings.length >= 4) {
        recentListings = [recentListings[0], recentListings[1], recentListings[2], recentListings[3],]
    }
    let activeStories = props.stories.filter(story => story.status === "ACTIVE");
    let recentStories = activeStories.reverse();
    if (recentStories.length >= 3) {
        recentStories = [recentStories[0], recentStories[1], recentStories[2]]
    }
    return `
<div class="container-fluid p-0">
    <img class="d-block w-100 hero" src="https://petadoptions-npe.s3.us-east-2.amazonaws.com/IMG_0339.jpeg" alt="girl with horse">
    <h1 class="hero-text text-white">Find your new best friend today</h1>
    <div class="buttonRow"> 
         <a href="/listings" class="btn btn-lg btn-primary browse-btn" data-link>Browse Pets</a>
         <a ${changeHref()} id="new-listing-home" class="btn btn-lg btn-primary new-btn" data-link>New Listing</a>
    </div>
</div>
<div id="newPetDiv">
                        <h1 class="display-5 text-primary newestpets"><span class="text-black">Newest</span> Pets</h1>
                        <div class="container px-1 mt-5">
                        <div id="recent-listing-cards"
                             class="row">
                            ${populateCards(recentListings)}
                        </div>
                    </div>
</div>
<section class="story-section gray-bg">
<div class="container story-container px-2 mt-5">
                        <h1 class="display-5 text-primary stories-header"><span class="text-black">Testim</span>onials</h1>
                        <div id="stories" class="row">
                        ${populateStoryCards(recentStories)}
                        </div>                      
</div>
</section>
    `;
}

function changeHref() {
    const loggedIn = isLoggedIn();
    if (loggedIn) {
        return `href='/create'`;
    } else {
        return `href='/login'`;
    }
}

function populateStoryCards(stories) {
    return `
        ${stories.map(story =>
        `<div class="col col-xs-12 col-md-6 col-xl-3 mb-5 mx-auto">
                        <div class="card story-card">
                            <img class="card-img story-img mx-auto" src=${story.user.profileImg} alt="user image" />
                            <div class="card-body p-4 bg-white">
                                    <p class="story-name">${story.user.firstName} wrote:</p>
                                   <p class="story-content">${story.content}</p>
                            </div>
                        </div>
                    </div>`).join('')}`
}

function detailsListener() {
    $(".details-btn").click(function (e) {
        let id = e.target.getAttribute("data-id")
        $("#overlay-" + id).css({display: "block"})
        chatListener(user);
    })
}


function closeOverlay() {
    $(".close-btn").click(function (e) {
        let id = e.target.getAttribute("data-id")
        $("#overlay-" + id).css({display: "none"})
    })
}

export function HomeEvents() {
    detailsListener()
    closeOverlay()
}


