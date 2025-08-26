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








