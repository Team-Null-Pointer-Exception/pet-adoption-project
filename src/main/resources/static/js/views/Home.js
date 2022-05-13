import {isLoggedIn} from "../auth.js";
import {populateCards} from "./ListingIndex.js";

export default function Home(props) {
    let activeListings = props.listings.filter(listing => listing.status === "ACTIVE");
    let recentListings = activeListings.reverse();
    let mostRecentListings = [recentListings[0],recentListings[1], recentListings[2], recentListings[3]]
    let activeStories = props.stories.filter(story => story.status === "ACTIVE");
    let recentStories = activeStories.reverse();
    let mostRecentStories = [recentStories[0],recentStories[1], recentStories[2], recentStories[3]]
    console.log(mostRecentStories)
    return `
<div class="container-fluid p-0">
    <img class="d-block w-100 hero" src="images/IMG_0339.jpeg" alt="girl with horse">
    <h1 class="hero-text text-white">Find your new best friend today</h1>  
</div>    
<div class="row">

<div class="col-6">
         <a href="/listings" class="btn btn-lg btn-primary browse-btn" data-link>Browse Pets</a>
</div>
<div class="col-6">
         <a ${changeHref()} id="new-listing-home" class="btn btn-lg btn-primary new-btn" data-link>New Listing</a>
</div>
<div>
                        <h1 class="display-5 text-primary newestpets"><span class="text-black">Newest</span>Pets</h1>
                        <div class="container px-4 px-lg-5 mt-5">
                        <div id="recent-listing-cards"
                             class="row gx-4 gx-md-5 row-cols-xs-1 row-cols-s-2 row-cols-lg-3 row-cols-xl-4 justify-content-center">
                            ${populateCards(mostRecentListings)}
                        </div>
                    </div>
</div>
<section class="story-section gray-bg">
<div class="container px-4 px-lg-5 mt-5">
                        <h1 class="display-5 text-primary storiesHeader"><span class="text-black">Testim</span>onials</h1>
                        <div id="stories" class="row gx-4 gx-md-5 row-cols-xs-1 row-cols-lg-2 justify-content-center">
                        ${populateStoryCards(mostRecentStories)}
                        </div>
                        
</div>
</section>
    `;
}

function changeHref(){
    const loggedIn = isLoggedIn();
    if(loggedIn) {
        return `href='/create'`;
    } else {
        return `href='/login'`;
    }
}


function populateStoryCards(stories){
    console.log(stories)
    return `
        ${stories.map(story =>
        `<div class="col mb-5">
                        <div class="card storyCard">
                            <img class="card-img-left" src="" alt="user image" />
                            <div class="card-body p-4 bg-white">
                                <div class="text-center">
                                    <h5 class="fw-bolder"></h5>
                                   <p></p>
                                </div>
                            </div>
                        </div>
                    </div>`).join('')}`
}


