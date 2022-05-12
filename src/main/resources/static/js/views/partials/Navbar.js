import {isLoggedIn} from "../../auth.js";
import {getUserRole} from "../User.js";


export default function Navbar(props) {
    const loggedIn = isLoggedIn();
    let html =  `
<div class="row py-3 px-lg-5 align-items-center">
            <div class="col-lg-4">
                <a href="" class="navbar-brand d-none d-lg-block">
                    <h1 class="m-0 display-5 text-black"><span class="text-primary">Pet</span>Adoptions</h1>
                </a>
            </div>
            <div class="col-lg-8 text-lg-right">
                <div class="d-inline-flex align-items-center text-primary">
                    <div class="d-inline-flex flex-column text-center px-3 border-right">
                        <i class="fab fa-facebook-f"></i>
                    </div>
                    <div class="d-inline-flex flex-column text-center px-3 border-right">
                        <i class="fab fa-twitter"></i>
                    </div>
                    <div class="d-inline-flex flex-column text-center px-3 border-right">
                        <i class="fab fa-linkedin-in"></i>
                    </div>
                    <div class="d-inline-flex flex-column text-center px-3 border-right">
                        <i class="fab fa-instagram"></i>
                    </div>
                    <div class="d-inline-flex flex-column text-center px-3">
                        <i class="fab fa-youtube"></i>
                    </div>
                </div>
            </div>
        </div>
    <div class="container-fluid p-0">
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-lg-0 px-lg-5">
            <a href="" class="navbar-brand d-block d-lg-none">
                <h1 class="m-0 display-5 text-capitalize text-white"><span class="text-primary">Pet</span>Adoptions</h1>
            </a>
            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <ul class="navbar-nav mr-auto py-0">
                <li class="nav-item active">
                    <a href="/" class="nav-link home" data-link>Home</a>
                    </li>
                    <li class="nav-item">
                    <a href="/about" class="nav-link" data-link>About</a>
                    </li>
                    <li class="nav-item">
                    <a href="/listings" class="nav-link" data-link>Listings</a>
                    </li>
                   
        `
    if(loggedIn && getUserRole() === "ADMIN") {
        html +=
            '<li class="nav-item"><a href="/admin" class="nav-link" data-link>Admin</a></li>'
    }


    if (loggedIn){
        html += `<li class="nav-item">
                <a href="/users" class="nav-link" data-link>User Profile</a>
                </li>
                <li class="nav-item">
                <a href="/messages" class="nav-link" data-link>Messages</a>
                </ul>
                <a href="/logout" class="btn btn-lg btn-primary px-3 d-none d-lg-block" onclick="window.localStorage.clear()" data-link>Logout</a>
                </div>
            </nav>
        </div>
    </div>
            `
    }

    if (!loggedIn){
        html += `
            <li class="nav-item"> 
              <a href="/register" class="nav-link" data-link>Register</a>
              </li>
              </ul> 
            <a href="/login" class="btn btn-lg btn-primary px-3 d-none d-lg-block" data-link>Login</a>                 
            </div>
        </nav>
    </div>
    </div>
            `
    }
    return html;
}



