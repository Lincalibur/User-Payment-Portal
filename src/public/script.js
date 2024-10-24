document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    const messageDiv = document.getElementById('login-message');

    if (result.success) {
        messageDiv.style.color = 'green';
        messageDiv.textContent = 'Login successful!';
        // Optionally, redirect to another page or perform further actions
    } else {
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'Invalid username or password.';
    }
});

document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, email, username, password }),
    });

    const result = await response.json();
    const messageDiv = document.getElementById('register-message');

    if (result.success) {
        messageDiv.style.color = 'green';
        messageDiv.textContent = 'Registration successful! You can log in now.';
        // Optionally, reset the form or redirect
    } else {
        messageDiv.style.color = 'red';
        messageDiv.textContent = result.message || 'Registration failed.';
    }
});

// Switch to register view
document.getElementById('switch-to-register').addEventListener('click', function() {
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.register-container').style.display = 'block';
});

// Switch to login view
document.getElementById('switch-to-login').addEventListener('click', function() {
    document.querySelector('.register-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'block';
});
