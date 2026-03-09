// Parallax scrolling effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    let scrollY = window.scrollY;

    parallaxElements.forEach(el => {
        let speed = el.getAttribute('data-speed');
        el.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// Intersection Observer for scroll reveal animations
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Slight delay for hero animation to ensure smooth load
    setTimeout(() => {
        const hero = document.querySelector('.hero.slide-in');
        if(hero) hero.classList.add('visible');
    }, 100);
});

// 3D Tilt effect on interactive cards
const cards = document.querySelectorAll('.interactive-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5; // max 5deg rotation
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale3d(1, 1, 1)`;
        // Restore hover transition
        card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });
    
    card.addEventListener('mouseenter', () => {
        // Remove transition to make tilt feel responsive immediately
        card.style.transition = 'none';
    });
});
