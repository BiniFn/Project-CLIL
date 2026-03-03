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

    // 3. Easter Egg (Keyboard): Type "albin"
    const secretCode = ['a', 'l', 'b', 'i', 'n'];
    let inputSequence = [];

    document.addEventListener('keydown', (e) => {
        // Keep only the last N characters
        inputSequence.push(e.key.toLowerCase());
        if (inputSequence.length > secretCode.length) {
            inputSequence.shift();
        }

        // Check if the sequence matches
        if (inputSequence.join('') === secretCode.join('')) {
            document.getElementById('easter-egg').classList.add('active');
            inputSequence = []; // Reset
        }
    });

    // 4. Easter Egg (Mobile/Touch): Tap the "Projet CLIL" badge 5 times quickly
    const badge = document.querySelector('.badge');
    let tapCount = 0;
    let tapTimer;

    if (badge) {
        badge.addEventListener('click', () => {
            tapCount++;

            if (tapCount >= 5) {
                document.getElementById('easter-egg').classList.add('active');
                tapCount = 0; // Reset
            }

            // Reset tap count if they take too long between taps (1 second)
            clearTimeout(tapTimer);
            tapTimer = setTimeout(() => {
                tapCount = 0;
            }, 1000);
        });
    }

    // Close the easter egg modal
    document.getElementById('close-easter-egg').addEventListener('click', () => {
        document.getElementById('easter-egg').classList.remove('active');
    });
});
