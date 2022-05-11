import {isLoggedIn} from "../auth.js";

export default function Home(props) {
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
</div>
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
