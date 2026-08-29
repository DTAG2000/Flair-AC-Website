document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');

    if (toggle && links) {
        toggle.addEventListener('click', function () {
            links.classList.toggle('active');
            toggle.classList.toggle('open');
        });

        links.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                links.classList.remove('active');
                toggle.classList.remove('open');
            });
        });
    }
});

// CONTACT FORM - sends submissions via Formspree (https://formspree.io)
// Replace the placeholder form "action" URL in contact.html with your real
// Formspree endpoint once you've created a free account (see setup guide).
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    var status = document.getElementById('formStatus');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (form.action.indexOf('REPLACE_WITH_YOUR_FORM_ID') !== -1) {
            status.textContent = 'This form is not connected yet. See CONTACT_FORM_SETUP.txt for setup steps.';
            status.className = 'form-status error';
            return;
        }

        var submitBtn = form.querySelector('.submit-button');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        status.textContent = '';
        status.className = 'form-status';

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        })
            .then(function (response) {
                if (response.ok) {
                    form.reset();
                    status.textContent = "Thanks — your message has been sent. We'll get back to you within 24 hours.";
                    status.className = 'form-status success';
                } else {
                    return response.json().then(function (data) {
                        var message = (data && data.errors)
                            ? data.errors.map(function (err) { return err.message; }).join(', ')
                            : 'Submission failed.';
                        throw new Error(message);
                    });
                }
            })
            .catch(function () {
                status.textContent = 'Sorry, something went wrong sending your message. Please call or email us directly.';
                status.className = 'form-status error';
            })
            .finally(function () {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
    });
});
