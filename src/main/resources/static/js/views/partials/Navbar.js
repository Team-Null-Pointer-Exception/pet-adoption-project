import {isLoggedIn} from "../../auth.js";

export default function Navbar(props) {
    const loggedIn = isLoggedIn();
    let html =  `
<div class="row py-3 px-lg-5 align-items-center">
            <div class="col-lg-4">
                <a href="" class="navbar-brand d-none d-lg-block">
                    <h1 class="m-0 display-5 text-black"><span class="text-primary">Pet</span>Adoptions</h1>
                </a>
            </div>
            <div class="col-lg-8 text-center text-lg-right align-items-center">
                <div class="d-inline-flex align-items-center text-grey">
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
                <div class="navbar-nav mr-auto py-0">
                    <a href="/index" class="nav-item nav-link active" data-link>Home</a>
                    <a href="/about" class="nav-item nav-link" data-link>About</a>
                    <a href="/listings" class="nav-item nav-link" data-link>Listings</a>
                   
        `


    if (loggedIn){
        html += `
                <a href="/users" class="nav-item nav-link" data-link>User Profile</a>
                            </div>
                <a href="/logout" class="btn btn-lg btn-primary px-3 d-none d-lg-block" onclick="window.localStorage.clear()" data-link>Logout</a>
            </div>
        </nav>
    </div>
            `
    }

    if (!loggedIn){
        html += `
              <a href="/register" class="nav-item nav-link" data-link>Register</a>
                            </div>
                    <a href="/login" class="btn btn-lg btn-primary px-3 d-none d-lg-block" data-link>Login</a>
            </div>
        </nav>
    </div>
            `
    }
    return html;
}

