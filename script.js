// Add this at the beginning of your script.js file
particlesJS('particles-js',
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#007bff"
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.5,
        "random": false
      },
      "size": {
        "value": 3,
        "random": true
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#007bff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      }
    },
    "retina_detect": true
  }
);

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData);
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formObject);
    
    // Clear form
    this.reset();
    alert('Thank you for your message! I will get back to you soon.');
});

// Add scroll reveal animation (optional)
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.project-card, .about-content');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Scorpion cursor effect
document.addEventListener('DOMContentLoaded', () => {
    const scorpion = document.getElementById('scorpion-cursor');
    let mouseX = 0;
    let mouseY = 0;
    let scorpionX = 0;
    let scorpionY = 0;
    let speed = 0.1; // Adjust for faster/slower movement

    // Show scorpion on first mouse movement
    document.addEventListener('mousemove', () => {
        scorpion.style.display = 'block';
    }, { once: true });

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Calculate angle for rotation
        const dx = mouseX - (scorpionX + 16); // 16 is half the scorpion width
        const dy = mouseY - (scorpionY + 16);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        // Apply rotation
        scorpion.style.transform = `rotate(${angle}deg)`;
    });

    // Smooth scorpion movement animation
    function animateScorpion() {
        // Calculate new position
        const dx = mouseX - scorpionX;
        const dy = mouseY - scorpionY;
        
        scorpionX += dx * speed;
        scorpionY += dy * speed;
        
        // Apply new position
        scorpion.style.left = `${scorpionX}px`;
        scorpion.style.top = `${scorpionY}px`;
        
        requestAnimationFrame(animateScorpion);
    }

    // Start animation
    animateScorpion();

    // Add trail effect (optional)
    let trail = [];
    const trailLength = 5; // Number of trail elements

    for(let i = 0; i < trailLength; i++) {
        const trailDot = document.createElement('div');
        trailDot.className = 'trail-dot';
        trailDot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(0, 123, 255, ${1 - i/trailLength});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(trailDot);
        trail.push(trailDot);
    }

    // Update trail positions
    function updateTrail() {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = `${scorpionX + 16}px`;
                dot.style.top = `${scorpionY + 16}px`;
            }, index * 50);
        });
        requestAnimationFrame(updateTrail);
    }

    updateTrail();
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    const nameContainer = document.querySelector('.name-particles');
    
    function createParticle() {
        const particle = document.createElement('span');
        particle.className = 'particle';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat 1s ease-in-out forwards;
        `;
        
        nameContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 100);
});

// Add this CSS for the particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-20px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Ripple Effect
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.cyber-button, .project-card, .tech-item');
    
    elements.forEach(element => {
        element.addEventListener('click', createRipple);
        element.addEventListener('touchstart', createRipple);
    });
    
    function createRipple(event) {
        const element = event.currentTarget;
        
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;
        
        const rect = element.getBoundingClientRect();
        
        // Handle both touch and click events
        const x = (event.type === 'touchstart' ? 
            event.touches[0].clientX - rect.left : 
            event.clientX - rect.left) - radius;
        const y = (event.type === 'touchstart' ? 
            event.touches[0].clientY - rect.top : 
            event.clientY - rect.top) - radius;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        circle.classList.add('ripple');
        
        const ripple = element.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        element.appendChild(circle);
    }
});

// 3D Tilt Effect for Cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${angleX}deg)
            rotateY(${angleY}deg)
            translateZ(10px)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Add premium particles effect
function createPremiumParticle() {
    const particles = document.querySelector('.premium-particles');
    const particle = document.createElement('div');
    
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, #FFD700, transparent);
        border-radius: 50%;
        pointer-events: none;
        animation: particleFloat 1.5s ease-out forwards;
    `;
    
    // Random position around the profile
    const angle = Math.random() * Math.PI * 2;
    const radius = 100 + Math.random() * 20;
    particle.style.left = `${50 + Math.cos(angle) * radius}%`;
    particle.style.top = `${50 + Math.sin(angle) * radius}%`;
    
    particles.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => particle.remove(), 1500);
}

// Create particles periodically
setInterval(createPremiumParticle, 100);

// Add this CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0) translate(20px, -20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Toggle menu
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Handle navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active class from all items
            navItems.forEach(link => link.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll with offset for fixed header
    document.querySelectorAll('.nav-button').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navHeight = document.querySelector('.sci-fi-nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                document.querySelector('.nav-links').classList.remove('active');
                document.querySelector('.hamburger').classList.remove('active');
            }
        });
    });

    // Active section highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navButtons = document.querySelectorAll('.nav-button');
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                navButtons.forEach(btn => btn.classList.remove('active'));
                navButtons[index].classList.add('active');
            }
        });
    });
}); 
