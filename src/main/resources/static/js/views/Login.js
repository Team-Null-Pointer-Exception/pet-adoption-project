export default function Login(props) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>Log In</title>
</head>
<body>

<div class="row log-in-row">
<div class="card log-in-card"> 
<form id="login-form">
<h1>Log In</h1>
    <label for="username">Email</label>
    <input id="username" name="username" type="text"/>
    <br>
    <label for="password">Password</label>
    <input id="password" name="password" type="password"/>
    <br>
    <input id="login-btn" type="submit" value="Log In"/>
    <p id="login-response">Login failed. Please try again.</p>  
</form>
</div>
<div>
</body>
</html>`;

}


