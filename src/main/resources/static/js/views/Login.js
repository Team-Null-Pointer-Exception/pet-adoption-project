export default function Login(props) {
    return `
<div class="container-fluid">
<div class="row log-in-row">
    <div class="card log-in-card"> 
        <form id="login-form">
            <h1 class="text-white">Log In</h1>
            <label for="username">Email</label>
            <br>
            <input id="username" name="username" type="text"/>
            <br>
            <label for="password">Password</label>
            <br>
            <input id="password" name="password" type="password"/>
            <br>
            <input id="login-btn" type="submit" class="mt-2" value="Log In"/>
            <p id="login-response">Login failed. Please try again.</p>  
            <a href="/forgot" data-link>Forgot your password?</a>
        </form>
    </div>
</div>
</div>
`;

}


