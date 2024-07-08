const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai'); // Assuming you have npm install openai

const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-api-key");
    next();
});

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to process text based on selected API
app.post('/process', async (req, res) => {
    const { text } = req.body;
    const { api } = req.query;
    const apiKey = req.headers['x-api-key']; // Get API key from request header

    try {
        let output = '';

        if (!apiKey) {
            throw new Error('API key is missing');
        }

        if (api === 'gpt') {
            const openai = new OpenAI({ apiKey });
            const response = await openai.completions.create({
                model: 'text-davinci-002', // Adjust model based on your OpenAI API usage
                prompt: text,
                max_tokens: 150
            });
            output = response.data.choices[0].text.trim();
        } else if (api === 'gemini') {
            // Implement GEMINI API integration
            // Replace with your GEMINI API integration logic
            output = 'GEMINI API integration placeholder';
        } else {
            throw new Error('Invalid API selected');
        }

        res.json({ output });
    } catch (error) {
        console.error('Error processing text:', error);
        res.status(500).json({ error: 'Error processing text' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
