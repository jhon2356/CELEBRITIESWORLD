document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Testimonial Slider
    const track = document.getElementById('testimonial-track');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    const totalSlides = dots.length;

    function goToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        currentIndex = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Auto slide
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }, 5000); // 5 seconds per slide

    // 5. WhatsApp Enrollment Form Logic
    const form = document.getElementById('enrollmentForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const name = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phoneNumber').value.trim();
        const danceStyle = document.getElementById('danceStyle').value;
        const timing = document.getElementById('prefTiming').value;
        const message = document.getElementById('message').value.trim();

        // Target Phone Number
        const targetPhone = "918374133119";

        // Format message
        let waMessage = `*New Enrollment Request*%0A`;
        waMessage += `*Name:* ${name}%0A`;
        waMessage += `*Phone:* ${phone}%0A`;
        waMessage += `*Dance Style:* ${danceStyle}%0A`;
        waMessage += `*Preferred Timing:* ${timing}%0A`;
        
        if (message) {
            waMessage += `*Message:* ${message}%0A`;
        }

        // Open WhatsApp
        const waUrl = `https://wa.me/${targetPhone}?text=${waMessage}`;
        window.open(waUrl, '_blank');
        
        // Reset form
        form.reset();
    });
});
