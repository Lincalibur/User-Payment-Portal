document.getElementById('paymentForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const amount = document.getElementById('amount').value;

    try {
        const response = await fetch('/api/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount })
        });

        const result = await response.json();
        document.getElementById('response').innerText = `Response: ${JSON.stringify(result)}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'An error occurred. Please try again.';
    }
});
