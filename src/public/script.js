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
    const messageDiv = document.getElementById('message');

    if (result.success) {
        messageDiv.style.color = 'green';
        messageDiv.textContent = 'Login successful!';
        // Optionally, redirect to another page or perform further actions
    } else {
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'Invalid username or password.';
    }
});
