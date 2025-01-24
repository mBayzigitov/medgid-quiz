const express = require('express');
const multer = require('multer');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

// Initialize Resend with API key from .env
const resend = new Resend(process.env.RESEND_API_KEY);

// Multer setup to store files in memory (no filesystem usage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.send("Server is running");
});

// Endpoint to send emails
app.post('/send-email', upload.array('attachments'), async (req, res) => {
    const date = new Date().toLocaleString();
    console.log(`New request at `, date);

    const files = req.files; // Array of uploaded files
    let filenames = [];
    if (req.body.filenames) {
        try {
            filenames = JSON.parse(req.body.filenames);
        } catch (err) {
            console.error('Failed to parse filenames:', err);
            return res.status(400).json({ error: 'Invalid filenames format' });
        }
    }

    if (!files || files.length === 0) {
        return res.status(400).send({ error: 'No files uploaded' });
    }

    try {
        // Process all files into Base64 format directly from memory
        const attachments = files.map((file, index) => {
            const base64Content = file.buffer.toString('base64'); // Directly using the buffer from memory

            return {
                content: base64Content,
                filename: filenames.length > 0 ? filenames[index] : file.originalname,
            };
        });

        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: process.env.TARGET_EMAIL, // Target emails
            subject: 'Новые данные тестирования',
            html: '<p>Данные тестирования пользователя</p>',
            attachments,
        });
        console.log('Response:', response, '\n');

        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ error: 'Failed to send email' });
    }
});

app.post('/log-json', express.json(), async (req, res) => {
    const date = new Date().toLocaleString();
    const logData = {
        date,
        body: req.body,
    };

    const logEntry = `${date}\n${JSON.stringify(req.body, null, 2)}\n\n`; // Formatting JSON for readability

    console.log(logEntry);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
