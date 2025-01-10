document.getElementById('login-btn').addEventListener('click', function () {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert('Login Successful');
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'task-manager.html';  
    } else {
        alert('Invalid email or password');
    }
});
