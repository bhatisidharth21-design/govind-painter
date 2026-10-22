// const express = require('express'); // Express ko import karna zaroori hai
// const cors = require('cors');

// const app = express();
// const PORT = 5000;

// // Middleware setup
// app.use(cors());
// app.use(express.json());

// // Ek basic test route takia pata chal sake server chalu hai
// app.get('/', (req, res) => {
//     res.send("Backend server successfully chal raha hai!");
// });

// // Server ko start karna
// app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // .env file se details read karne ke liye

const app = express();
// const PORT = 5000;
const PORT = process.env.PORT || 5000; // Yeh live server ke liye zaroori hai

// Middleware setup
app.use(cors());
app.use(express.json());

// 1. Ek basic test route (Checking purpose)
app.get('/', (req, res) => {
    res.send("Backend server successfully chal raha hai!");
});

// 2. Asli Form Functionality (POST Route) - Yeh hona zaroori tha!
app.post('/api/contact', async (req, res) => {
    // Frontend se saari fields receive karna
    const { name, email, message, address, phone } = req.body;

    // Basic check: Agar main cheezein khali hain toh error return karo
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, Email aur Message bharna zaroori hai!" });
    }

    try {
        // Nodemailer Config (Gmail setup)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MY_EMAIL,       // Aapka Gmail account (.env file se)
                pass: process.env.MY_PASSWORD     // 16-digit ka Google App Password
            }
        });

        // Email ka Formatting Design
        const mailOptions = {
            from: email,
            to: process.env.MY_EMAIL, 
            subject: `New Portfolio Message from ${name}`,
            text: `Naya Requirement Aaya Hai:\n\n` +
                  `• Name: ${name}\n` +
                  `• Email: ${email}\n` +
                  `• Phone: ${phone || 'N/A'}\n` +
                  `• Address: ${address || 'N/A'}\n` +
                  `• Message: ${message}`
        };

        // Mail send karna
        await transporter.sendMail(mailOptions);
        
        // Frontend ko success message bhejna
        res.status(200).json({ success: "Thank you! Aapka message mujhe mil gaya." });

    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ error: "Server par koi dikkat hai, mail nahi ja paya." });
    }
});

// Server start karna
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
