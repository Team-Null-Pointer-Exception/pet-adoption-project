import Home, {HomeEvents} from "./views/Home.js";
import About from "./views/About.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import Login from "./views/Login.js";
import LoginEvent from "./auth.js";
import Register, {RegisterEvent} from "./views/Register.js";
import ListingIndex, {ListingsEvent} from "./views/ListingIndex.js";
import UserIndex, {UsersEvent} from "./views/User.js";
import Logout, {LogoutEvents} from "./views/Logout.js";
import CreateListing, {CreateEvents} from "./views/CreateListing.js";
import EditListing, {EditEvents} from "./views/EditListing.js";


/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
    const routes = {
        '/': {
            returnView: Home,
            state: {
                listings: '/api/listings',
                stories: '/api/stories'
            },
            uri: '/',
            title: 'Home',
            viewEvent: HomeEvents
        },
        '/logout': {
            returnView: Logout,
            state: {},
            uri: '/',
            title: 'Logout',
            viewEvent: LogoutEvents
        },
        '/login': {
            returnView: Login,
            state: {},
            uri: '/login',
            title: "Login",
            viewEvent: LoginEvent
        },
        '/register': {
            returnView: Register,
            state: {},
            uri: '/register',
            title: 'Register',
            viewEvent: RegisterEvent
        },
        '/users': {
            returnView: UserIndex,
            state: {
                user: '/api/users/me'
            },
            uri: '/users',
            title: 'User Profile',
            viewEvent: UsersEvent
        },
        '/listings': {
            returnView: ListingIndex,
            state: {
                listings: '/api/listings'
            },
            uri: '/listings',
            title: 'All Listings',
            viewEvent: ListingsEvent
        },
        '/create': {
            returnView: CreateListing,
            state: {},
            uri: '/create',
            title: 'Create New Listing',
            viewEvent: CreateEvents
        },
        '/edit': {
            returnView: EditListing,
            state: {}, // this needs to be reconfigured raymond's example will go to the bottom of the router
            uri: '/edit',
            title: 'Edit Listing',
            viewEvent: EditEvents
        },
        '/about': {
            returnView: About,
            state: {},
            uri: '/about',
            title: 'About',
        },
        '/error': {
            returnView: Error404,
            state: {},
            uri: location.pathname,
            title: ' ERROR',
        },
        '/loading': {
            returnView: Loading,
            state: {},
            uri: location.pathname,
            title: 'Loading...',
        },
    };

    // let split = URI.split("/")
    // console.log(split)
    // for (const key in routes) {
    //     if (key.includes(URI)){
    //         return routes[URI]
    //     } else if(key.includes(`/${split[1]}`)) {
    //         let stateBase = split[1]
    //         console.log(stateBase)
    //         routes[`/${split[1]}`].state[stateBase] = `${routes[`/${split[1]}`].state[stateBase]}/${split[2]}`
    //         return routes[`/${split[1]}`]
    //     }
    // }

    return routes[URI];
}

