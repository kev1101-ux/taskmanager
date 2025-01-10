document.getElementById('signup-btn').addEventListener('click', function () {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password === confirmPassword && email && password) {
        const newUser = { email, password };

        // Store the new user in localStorage
        localStorage.setItem('user', JSON.stringify(newUser));
        alert('Sign up successful!');
        
        // Redirect to login page after successful signup
        window.location.href = 'index.html';
    } else {
        alert('Passwords do not match or fields are empty.');
    }
});
