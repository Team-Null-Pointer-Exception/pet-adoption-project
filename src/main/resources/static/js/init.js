import createView from './createView.js';
import token from './keys.js';


// Get's geolation of website user for the filter by distance functionality
function getLocation(){
    let googleAPIKey = token().googleKey
    let request = {
        method: "POST",
    }
    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleAPIKey}`, request)
        .then(res => {
            let promise = Promise.resolve(res.json());
            promise.then(function(val){
                let location = val.location
                let lat = location.lat
                let lgn = location.lng
                sessionStorage.setItem('lat', lat)
                sessionStorage.setItem('lng', lgn)
            })
        }).catch(error => {
        console.log(error);
    });
}



export default function init() {
    loadViewOnPageRequest();
    addListenerToNavLinks();
    getLocation()
}
/**
 * When the DOM loads, build the view given the current endpoint.
 */
function loadViewOnPageRequest() {
    window.addEventListener('DOMContentLoaded', function() {
        createView(location.pathname);
    });
}

/**
 * Add a listener that will change the view if a nav link is clicked.
 */
function addListenerToNavLinks() {
    document.addEventListener('click', e => {
        if (e.target.classList.contains('allow')) {
            return
        }
        if(e.target.matches('label')) {
            return;
        }
        if(e.target.id === 'profile_upload') {
            return
        }
        if(e.target.type === 'file') {
            return
        }
        e.preventDefault();
        if (e.target.dataset['link'] !== undefined) {
            const URI = e.target.href.substring(location.origin.length);
            createView(URI);
        }
    });
}