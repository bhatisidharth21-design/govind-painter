const express = require("express");
const path = require("path");
require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const app = express();
// const PORT = 3000;

const PORT = process.env.PORT || 3000;

// const websitePath = path.join(__dirname, ".." "Govind");
const websitePath = path.join(__dirname, "..", "Govind painter");
app.use(express.urlencoded({
    exte : true
}));

// const websitePath ="C:\\User\\ACZ\\Desktop\\Govind painter";

app.use(express.json());


app.use(express.static(websitePath));

app.get("/",(req, res) => {
    res.sendFile(path.join(websitePath, "index.html"));
});


app.post("/submit", async (req, res) => {
    const { name, email, service, message } = req.body;

    console.log("New Client:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Service:", service);
    console.log("Message:", message);

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "New Client Requirement - Govind Painter",
            text: `
            replyTo: email,
New Client Requirement

Name: ${name}
Email: ${email}
Service: ${service}

Message:
${message}
            `
        });


        res.send("Your requirement has been submitted successfully!");
    } catch (error) {
    console.error("Email Error:", error);
    res.status(500).send("Email Error: " + error.message);
}
});

app.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`);
});