
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Page refresh hone se rokna

    // Form se values nikalna
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        // Backend API ko data bhejna
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Thank you! Aapka message mujhe mil gaya.");
            contactForm.reset(); // Form khali karna
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        alert("Backend server se connect nahi ho pa raha hai.");
    }
});
