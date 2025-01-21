const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors());

// Initialize Resend with API key from .env
const resend = new Resend(process.env.REACT_APP_API_RESEND_KEY);

// Multer setup for handling file uploads
const upload = multer({ dest: 'uploads/' });

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
        // Process all files into Base64 format
        const attachments = await Promise.all(
            files.map(async (file, index) => {
                const fileBuffer = await fs.readFile(file.path);
                const base64Content = fileBuffer.toString('base64');

                // Cleanup file immediately after reading it
                await fs.unlink(file.path);

                return {
                    content: base64Content,
                    filename: filenames ? filenames[index] : file.originalname,
                };
            })
        );

        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: process.env.REACT_APP_TARGET_EMAIL, // Target emails
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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
