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
import AdminIndex, {AdminEvent} from "./views/Admin.js";
import ResetPassword, {ResetEvent} from "./views/ResetPassword.js"
import ForgotPassword, {ForgotEvent} from "./views/ForgotPassword.js";

/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */



export default function router(URI) {
    if(URI.includes('/reset')){
        let href = location.href
        href = href.split("?")
        let splitOne = href[1]
        let splitTwo = splitOne.split("=")
        let token = splitTwo[1]
        sessionStorage.setItem('token', token)
    }


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
        '/admin': {
            returnView: AdminIndex,
            state: {
                user: '/api/users/'
            },
            uri: '/admin',
            title: 'User Profile',
            viewEvent: AdminEvent
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
        '/forgot': {
            returnView: ForgotPassword,
            state: {},
            uri: '/forgot',
            title: 'Forgot Password',
            viewEvent: ForgotEvent
        },
        '/reset': {
            returnView: ResetPassword,
            state: {
            },
            uri: '/reset',
            title: 'Reset Password',
            viewEvent: ResetEvent
        }
    };

    return routes[URI]
}
