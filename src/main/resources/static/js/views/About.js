export default function About(props) {
    $("#inbox-container").css({display: "none"})
    return `
<div class="container mt-5 pb-3">
        <div class="d-flex flex-column text-center mb-5">
            <h1 class="display-4 m-0 text-black about">About <span class="text-primary">Us</span></h1>
        </div>
        <div class="container-fluid bg-light aboutUs">
        <div class="container aboutText">
            <p>Team Null Pointer Exception comprises four student programmers learning full stack web development in the Elixir cohort of Codeup. This website is our capstone project, which includes integrating chat, file hosting, and map APIs, writing our backend in Java, implementing Springboot, Spring Security, constructing our database,  design, and Agile methodology. Contact us below for more information and employment opportunities. We look forward to being the solution to your development needs.</p>   
            </div>
        </div>
        <div class="d-flex flex-column text-center mb-5">
            <h1 class="display-4 m-0 text-black meetUs">Meet Our <span class="text-primary">Team Members</span></h1>
        </div>
        <div class="row">
            <div class="col-lg-3 col-md-6">
                <div class="team card position-relative overflow-hidden border-0 mb-4">
                    <img class="card-img-top" src="https://petadoptions-npe.s3.us-east-2.amazonaws.com/patrick.quilty.jpg" alt="">
                    <div class="card-body text-center p-0">
                        <div class="d-flex flex-column justify-content-center bg-light">
                            <h5 class="aboutName text-black">Patrick Quilty</h5>
                            <div class="d-flex align-items-center justify-content-center">
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="https://www.github.com/pquilty79?tab=repositories" target="_blank"><i class="fab fa-github"></i></a>
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="https://www.linkedin.com/in/patrick-quilty-b856a2178" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="mailto:patrick.quilty21@gmail.com" target="_blank"><i class="far fa-envelope"></i></a>
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="facetime-audio:19089066710" target="_blank"><i class="fas fa-phone"></i></a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="team card position-relative overflow-hidden border-0 mb-4">
                    <img class="card-img-top" src="https://petadoptions-npe.s3.us-east-2.amazonaws.com/Photo+on+6-7-22+at+9.00+AM.jpeg" alt="">
                    <div class="card-body text-center p-0">
                        <div class="d-flex flex-column justify-content-center bg-light">
                            <h5 class="aboutName text-black">Brice Ernst</h5>
                            <div class="d-flex align-items-center justify-content-center">
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="https://github.com/briceice" target="_blank"><i class="fab fa-github"></i></a>
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="https://www.linkedin.com/in/brice-ernst09/" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="mailto:brice.ernst1@gmail.com" target="_blank"><i class="far fa-envelope"></i></a>
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="facetime-audio:12107220367" target="_blank"><i class="fas fa-phone"></i></a>                            
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="team card position-relative overflow-hidden border-0 mb-4">
                    <img class="card-img-top" src="https://petadoptions-npe.s3.us-east-2.amazonaws.com/emilio-img.png" alt="">
                    <div class="card-body text-center p-0">
                        <div class="d-flex flex-column justify-content-center bg-light">
                            <h5 class="aboutName text-black">Emilio Benavides</h5>
                            <div class="d-flex align-items-center justify-content-center">
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="https://www.github.com/pquilty79?tab=repositories" target="_blank"><i class="fab fa-github"></i></a>
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="https://www.linkedin.com/in/patrick-quilty-b856a2178" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="mailto:patrick.quilty21@gmail.com" target="_blank"><i class="far fa-envelope"></i></a>
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="facetime-audio:19089066710" target="_blank"><i class="fas fa-phone"></i></a>                            
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="team card position-relative overflow-hidden border-0 mb-4">
                    <img class="card-img-top" src="https://petadoptions-npe.s3.us-east-2.amazonaws.com/justin-img.png" alt="">
                    <div class="card-body text-center p-0">
                        <div class="d-flex flex-column justify-content-center bg-light">
                            <h5 class="aboutName text-black">Justin Sixsmith</h5>
                            <div class="d-flex align-items-center justify-content-center">
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="https://github.com/JustinSixsmith" target="_blank"><i class="fab fa-github"></i></a>
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="https://www.linkedin.com/in/justin-sixsmith/" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="mailto:justinsixsmith@gmail.com" target="_blank"><i class="far fa-envelope"></i></a>
                            <a class="btn btn-outline-primary rounded-circle text-center mb-3 mr-2 px-0 allow" style="width: 36px; height: 36px;" href="facetime-audio:13602412953" target="_blank"><i class="fas fa-phone"></i></a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    `;
}