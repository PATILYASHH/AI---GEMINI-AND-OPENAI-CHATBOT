async function processText() {
    const text = document.getElementById('textInput').value;
    const selectedAPI = document.getElementById('apiSelector').value;
    const apiKey = document.getElementById('apiKey').value; // Get API key from input field

    console.log('API Key:', apiKey); // Check if API key is correctly retrieved

    try {
        const response = await fetch(`http://localhost:3000/process?api=${selectedAPI}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey // Pass API key in request header
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Output:', data.output); // Check if output is received correctly
        displayOutput(data.output);
    } catch (error) {
        console.error('Error:', error);
        displayOutput('Error processing text. Please try again.');
    }
}

function displayOutput(output) {
    const outputContainer = document.getElementById('output');
    outputContainer.innerHTML = `<p><strong>Output:</strong></p><p>${output}</p>`;
}
