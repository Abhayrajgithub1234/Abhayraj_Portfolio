// DOM elements
const body = document.body;
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.section-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const themeToggle = document.getElementById('theme-toggle');

// Theme toggle
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Custom cursor
document.addEventListener('mousemove', function(e) {
    if (cursor && cursorFollower) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 80);
    }
});

// Add hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .social-icon');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (cursor && cursorFollower) {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-hover');
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
        }
    });
    
    element.addEventListener('mouseleave', () => {
        if (cursor && cursorFollower) {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-hover');
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
        }
    });
});

// Scroll event for header
window.addEventListener('scroll', () => {
    // Header styling on scroll
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Reveal sections on scroll
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 150) {
            section.classList.add('active');
        }
    });
});

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Project filtering
if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Contact form handler
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        let isValid = true;
        
        if (nameInput.value.trim() === '') {
            isValid = false;
        }
        
        if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
            isValid = false;
        }
        
        if (messageInput.value.trim() === '') {
            isValid = false;
        }
        
        if (isValid) {
            formMessage.textContent = 'Thank you for reaching out! I will get back to you soon.';
            formMessage.style.color = 'var(--success-color)';
            form.reset();
        } else {
            formMessage.textContent = 'Please fill out all fields correctly.';
            formMessage.style.color = 'var(--error-color)';
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Trigger reveal animations on page load
window.addEventListener('load', () => {
    // Add active class to first section on load
    if (sections[0]) {
        sections[0].classList.add('active');
    }
    
    // Fix for the background-clip vendor prefix
    const textElements = document.querySelectorAll('.glitch-text, .logo, .image-placeholder, .hero-content h1');
    textElements.forEach(element => {
        if (element) {
            element.style.backgroundClip = 'text';
        }
    });
});
