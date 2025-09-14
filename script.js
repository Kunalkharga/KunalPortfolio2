document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Header scroll effect
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Create particle effect
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 80;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size (small)
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Initial position
        resetParticle(particle);

        particlesContainer.appendChild(particle);

        // Animate
        animateParticle(particle);
    }

    function resetParticle(particle) {
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;

        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = '0';

        return {
            x: posX,
            y: posY
        };
    }

    function animateParticle(particle) {
        // Initial position
        const pos = resetParticle(particle);

        // Random animation properties
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        // Animate with GSAP-like timing
        setTimeout(() => {
            particle.style.transition = `all ${duration}s linear`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;

            // Move in a slight direction
            const moveX = pos.x + (Math.random() * 20 - 10);
            const moveY = pos.y - Math.random() * 30; // Move upwards

            particle.style.left = `${moveX}%`;
            particle.style.top = `${moveY}%`;

            // Reset after animation completes
            setTimeout(() => {
                animateParticle(particle);
            }, duration * 1000);
        }, delay * 1000);
    }

    // Mouse interaction
    document.addEventListener('mousemove', (e) => {
        // Create particles at mouse position
        const mouseX = (e.clientX / window.innerWidth) * 100;
        const mouseY = (e.clientY / window.innerHeight) * 100;

        // Create temporary particle
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Small size
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Position at mouse
        particle.style.left = `${mouseX}%`;
        particle.style.top = `${mouseY}%`;
        particle.style.opacity = '0.6';

        particlesContainer.appendChild(particle);

        // Animate outward
        setTimeout(() => {
            particle.style.transition = 'all 2s ease-out';
            particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
            particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
            particle.style.opacity = '0';

            // Remove after animation
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, 10);
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    function animateSkillBars() {
        skillBars.forEach(bar => {
            if (isElementInViewport(bar) && !bar.classList.contains('animated')) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                bar.classList.add('animated');
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Run animation on scroll
    window.addEventListener('scroll', animateSkillBars);

    // Run on page load in case section is already in view
    animateSkillBars();



    //Contact form
    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Please wait...";

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Form submitted successfully";
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
            })
            .then(function () {
                form.reset();
                setTimeout(() => {
                    result.style.display = "none";
                }, 3000);
            });
    });
});


// GSAP Animations
gsap.from("nav", { y: -100, opacity: 0, duration: 1, ease: "power2.out" });

gsap.from("#home h1", { opacity: 0, y: 50, duration: 1, delay: 0.5, ease: "power2.out" });
gsap.from("#home p", { opacity: 0, y: 50, duration: 1, delay: 0.7, ease: "power2.out" });
gsap.from(".get-in-touch", { opacity: 0, scale: 0.8, duration: 1, delay: 0.9, ease: "back.out(1.7)" });
gsap.from(".social a", { opacity: 0, y: 20, duration: 0.5, delay: 1.1, stagger: 0.2, ease: "power2.out" });

// About animations
gsap.from("#about h2", { opacity: 0, y: -50, duration: 1, scrollTrigger: "#about" });

// Skills animations
gsap.from(".skill", { opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.1, scrollTrigger: "#skills" });

// Education animations
gsap.from(".education-item", {
    opacity: 0,
    x: -50,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
        trigger: "#education",
        start: "top 80%",
    }
});
gsap.from(".education-item i", {
    opacity: 0,
    scale: 0.5,
    duration: 0.5,
    stagger: 0.3,
    scrollTrigger: {
        trigger: "#education",
        start: "top 80%",
    }
});