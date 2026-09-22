require("dotenv").config();

const express = require("express");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 3000;

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname));

app.post("/send-message", async (req, res) => {
    console.log("FORM RECEIVED:", req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("Please fill in all fields.");
    }

    try {
        const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "d29492731@gmail.com",
            subject: `New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        });

        if (error) {
            console.error("RESEND ERROR:", error);
            return res.status(500).send("Message could not be sent.");
        }

        console.log("EMAIL SENT:", data);
        res.send("Message sent successfully!");

    } catch (error) {
        console.error("EMAIL ERROR:", error);
        res.status(500).send("Message could not be sent.");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});