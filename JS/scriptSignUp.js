// Add event listeners when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Signup form handling
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', signupUser);
    }

    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }
});

// Update signup function
function signupUser(event) {
    event.preventDefault();
    const form = event.target;
    const name = document.getElementById('signup-name').value;
    const number = document.getElementById('signup-number').value;
    const password = document.getElementById('signup-password').value;

    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, number, password })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err; });
        }
        return response.json();
    })
    .then(data => {
        alert('Signup successful!');
        window.location.href = 'login.html'; // Redirect to login page
    })
    .catch(error => {
        alert('Error: ' + (error.message || 'Signup failed'));
    });
}

// Update login function
function loginUser(event) {
    event.preventDefault();
    const number = document.getElementById('number').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number, password })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err; });
        }
        return response.json();
    })
    .then(data => {
        alert('Login successful!');
        window.location.href = 'tryOurServices.html'; // Redirect to dashboard
    })
    .catch(error => {
        alert('Error: ' + (error.message || 'Login failed'));
    });
}