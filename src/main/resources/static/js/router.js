import Home from "./views/Home.js";
import About from "./views/About.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import Login from "./views/Login.js";
import LoginEvent from "./auth.js";
import Register, {RegisterEvent} from "./views/Register.js";
import ListingIndex, {ListingsEvent} from "./views/ListingIndex.js";
import UserIndex, {UsersEvent} from "./views/User.js";
import Logout, {LogoutEvents} from "./views/Logout.js";

/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
    const routes = {
        '/': {
            returnView: Home,
            state: {},
            uri: '/',
            title: 'Home',
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
            viewEvent: RegisterEvent // User Register callback
        },
        '/users': {
            returnView: UserIndex,
            state: {
                user: '/api/users/me'
            },
            uri: '/users',
            title: 'Users',
            viewEvent: UsersEvent
        },
        '/listings': {
            returnView: ListingIndex,
            state: {
                listings: '/api/listings'
            },
            uri: '/listings',
            title: 'All Listings',
            viewEvent: ListingsEvent //<-- Use PostsEvent as a callback here!
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
        }
    };

    return routes[URI];
}

// TODO: ADMIN & MESSAGING views