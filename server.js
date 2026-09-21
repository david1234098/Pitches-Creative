require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Allow the server to read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve your website files
app.use(express.static(__dirname));

// Contact form endpoint
app.post("/send-message", async (req, res) => {
    console.log("FORM RECEIVED:", req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("Please fill in all fields.");
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New message from ${name}`,
            text: `Email: ${email}\n\nMessage:\n${message}`
        });

        res.send("Message sent successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Message could not be sent.");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});