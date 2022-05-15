import {isLoggedIn} from "../auth.js";
import {populateCards} from "./ListingIndex.js";

export default function Home(props) {
    let activeListings = props.listings.filter(listing => listing.status === "ACTIVE");
    let recentListings = activeListings.reverse();
    if (recentListings.length >= 2) {
        recentListings = [recentListings[0], recentListings[1]]
    }
    let activeStories = props.stories.filter(story => story.status === "ACTIVE");
    let recentStories = activeStories.reverse();
    if (recentStories.length >= 3) {
        recentStories = [recentStories[0], recentStories[1], recentStories[2]]
    }
    return `
<div class="container-fluid p-0">
    <img class="d-block w-100 hero" src="images/IMG_0339.jpeg" alt="girl with horse">
    <h1 class="hero-text text-white">Find your new best friend today</h1>
    <div class="buttonRow"> 
         <a href="/listings" class="btn btn-lg btn-primary browse-btn" data-link>Browse Pets</a>
         <a ${changeHref()} id="new-listing-home" class="btn btn-lg btn-primary new-btn" data-link>New Listing</a>
    </div>
</div>
<div id="newPetDiv">
                        <h1 class="display-5 text-primary newestpets"><span class="text-black">Newest</span> Pets</h1>
                        <div class="container px-4 px-lg-5 mt-5">
                        <div id="recent-listing-cards"
                             class="row gx-5 row-cols-xs-1  row-cols-lg-2justify-content-center">
                            ${populateCards(recentListings)}
                        </div>
                    </div>
</div>
<section class="story-section gray-bg">
<div class="container storyContainer px-4 px-lg-5 mt-5">
                        <h1 class="display-5 text-primary storiesHeader"><span class="text-black">Testim</span>onials</h1>
                        <div id="stories" class="row gx-4 gx-md-5 row-cols-1 row-cols-md-2 row-cols-lg-3">
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
    console.log(stories)
    return `
        ${stories.map(story =>
        `<div class="col mb-5">
                        <div class="card storyCard">
                            <img class="card-img storyImg" src=${story.user.profileImg} alt="user image" />
                            <div class="card-body p-4 bg-white">
                                    <p class="storyName">${story.user.firstName} wrote:</p>
                                   <p class="storyContent">${story.content}</p>
                            </div>
                        </div>
                    </div>`).join('')}`
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

export function HomeEvents() {
    detailsListener()
    closeOverlay()
}


