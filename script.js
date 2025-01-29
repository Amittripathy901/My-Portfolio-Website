// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        if (scrollPosition >= section.offsetTop - 100) {
            const id = section.getAttribute('id');
            document.querySelector(`a[href="#${id}"]`).classList.add('active');
        } else {
            document.querySelector(`a[href="#${id}"]`).classList.remove('active');
        }
    });
});
