fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
    });

document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("qi8dOEmyveloFpXvl"); // Initialize EmailJS with your user ID

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = formData.get('email');
        if (!emailPattern.test(email)) {
            alert('من فضلك ادخل بريد الكتروني صحيح.');
            return;
        }

        // Validate phone number
        const phonePattern = /^[0-9]{11}$/;
        const phone = formData.get('phone');
        if (!phonePattern.test(phone)) {
            alert('من فضلك ادخل رقم هاتف صحيح');
            return;
        }

        // Check for required fields
        const name = formData.get('name');
        const message = formData.get('msg');
        const service = formData.get('service');
        if (!name || !email || !phone || !message || !service) {
            alert('من فضلك املي كامل الحقول.');
            return;
        }

        // Send email using EmailJS
        emailjs.sendForm('service_l7wsl81', 'template_jqc9gsf', form)
            .then(response => {
                alert('تم الارسال بنجاح سيتم التواصل معكم في اقرب وقت ممكن');
                form.reset(); // Optionally reset the form
            })
            .catch(error => {
                console.error('EmailJS Error:', error); // Log error details for debugging
                alert('فشل الارسال من فضلك عاود الارسال مره اخري.');
            });
    });
});