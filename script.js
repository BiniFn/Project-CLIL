document.addEventListener("DOMContentLoaded", () => {
    // 1. Loading Screen functionality
    const loader = document.getElementById('loader');

    // Simulate initial loading time for visual impact (or wait for assets)
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove from DOM entirely after fade out
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }, 1800); // 1.8 seconds loading screen
    });

    // Fallback if window.load fires too quickly or fails
    setTimeout(() => {
        if (!loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
        }
    }, 4000); // Maximum 4 seconds delay

    // 2. Scroll Reveal Animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS animation
                entry.target.classList.add('show-animate');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Get all hidden sections
    const hiddenElements = document.querySelectorAll('.hidden-animate');
    hiddenElements.forEach((el) => {
        scrollObserver.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


});
