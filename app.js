// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Smooth scroll for navigation links (including footer links)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        if (targetId) {
            scrollToSection(targetId);
        }
    });
});

// Scroll Animation Implementation (AOS-like)
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.windowHeight = window.innerHeight;
        this.init();
    }

    init() {
        this.setupObserver();
        this.checkElementsOnLoad();
    }

    setupObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateElement(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            this.elements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for older browsers
            window.addEventListener('scroll', () => this.checkElements());
            this.checkElements();
        }
    }

    checkElementsOnLoad() {
        this.elements.forEach(element => {
            if (this.isElementInViewport(element)) {
                this.animateElement(element);
            }
        });
    }

    checkElements() {
        this.elements.forEach(element => {
            if (this.isElementInViewport(element) && !element.classList.contains('aos-animate')) {
                this.animateElement(element);
            }
        });
    }

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        ) || (rect.top < window.innerHeight && rect.bottom > 0);
    }

    animateElement(element) {
        const delay = element.getAttribute('data-delay') || 0;
        setTimeout(() => {
            element.classList.add('aos-animate');
        }, delay);
    }
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(254, 254, 254, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(254, 254, 254, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const phone = formData.get('phone').trim();
        const service = formData.get('service');
        const message = formData.get('message').trim();
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        if (message.length < 10) {
            showNotification('Please provide a more detailed message (at least 10 characters).', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Thank you for your message! Dr. Shruti will get back to you within 24 hours.', 'success');
            
            // In a real application, you would send the data to your server here
            console.log('Form submission data:', {
                name,
                email,
                phone,
                service,
                message,
                timestamp: new Date().toISOString()
            });
            
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Newsletter subscription
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Please enter your email address.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    // Simulate subscription (replace with actual implementation)
    setTimeout(() => {
        emailInput.value = '';
        button.textContent = originalText;
        button.disabled = false;
        showNotification('Thank you for subscribing! You\'ll receive healing tips and updates from Dr. Shruti.', 'success');
        
        console.log('Newsletter subscription:', {
            email,
            timestamp: new Date().toISOString()
        });
    }, 1500);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const notificationStyles = `
            .notification {
                position: fixed;
                top: 90px;
                right: 20px;
                z-index: 9999;
                max-width: 400px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                animation: slideInRight 0.4s ease-out;
                font-family: 'Poppins', sans-serif;
            }
            
            .notification--success {
                border-left: 4px solid #98E4D6;
            }
            
            .notification--error {
                border-left: 4px solid #FF6B9D;
            }
            
            .notification--info {
                border-left: 4px solid #A8E6CF;
            }
            
            .notification-content {
                padding: 16px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
            }
            
            .notification-message {
                color: #2C3E50;
                font-weight: 500;
                line-height: 1.4;
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #999;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
                flex-shrink: 0;
            }
            
            .notification-close:hover {
                color: #666;
                background: #f0f0f0;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @media (max-width: 480px) {
                .notification {
                    left: 10px;
                    right: 10px;
                    max-width: none;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add notification to body
    document.body.appendChild(notification);
    
    // Auto-remove after 6 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.4s ease-out';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 400);
        }
    }, 6000);
}

// Video placeholder click handlers
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.video-placeholder').forEach(video => {
        video.addEventListener('click', function() {
            const title = this.querySelector('.video-title').textContent;
            showNotification(`Video "${title}" would play here. This is a demo placeholder for the actual video testimonials.`, 'info');
            
            // Add a visual effect to show interaction
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Service card enhanced hover effects
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroHeight = hero.offsetHeight;
        
        if (scrolled <= heroHeight) {
            const rate = scrolled * -0.3;
            const heroBackground = hero.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        }
    }
});

// Enhanced loading animations for page load
window.addEventListener('load', () => {
    // Add fade-in effect to main content
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Animate key elements on load
    const elementsToAnimate = [
        '.nav-container',
        '.hero-content'
    ];
    
    elementsToAnimate.forEach((selector, index) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 200));
        });
    });
});

// Form field enhancements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
        // Add floating label effect
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (field.value) {
            field.parentElement.classList.add('focused');
        }
    });
});

// Smooth reveal animations for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            section.classList.add('fade-in');
        }
    });
};

window.addEventListener('scroll', revealSections);
document.addEventListener('DOMContentLoaded', revealSections);

// Interactive testimonial cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
});

// CTA button enhanced animations
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cta-button, .service-btn, .submit-btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            }
        });
    });
});

// Social media click tracking
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.social-icon, .footer-social a').forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.href.includes('instagram') ? 'Instagram' : 
                            this.href.includes('youtube') ? 'YouTube' : 
                            this.href.includes('facebook') ? 'Facebook' : 'Social';
            
            console.log(`Social media click: ${platform}`);
            
            // Add visual feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Handle Escape key to close mobile menu
    if (e.key === 'Escape') {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Close notification if open
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
const debouncedScroll = debounce(() => {
    // Any performance-intensive scroll operations can go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScroll);

// Initialize page with smooth transitions
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth page load transition
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Log successful initialization
    console.log('Dr. Shruti\'s healing website initialized successfully! 🌟');
    
    // Welcome message for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setTimeout(() => {
            console.log('Welcome to Dr. Shruti\'s healing service website. All features are loaded and ready!');
        }, 1000);
    }
});

// Error handling for images
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            this.style.opacity = '0.5';
            // Optionally add a placeholder background
            this.style.background = 'linear-gradient(135deg, #98E4D6, #C8A8E9)';
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Resize handler for responsive adjustments
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Recalculate any position-dependent elements
    const notification = document.querySelector('.notification');
    if (notification && window.innerWidth <= 480) {
        notification.style.left = '10px';
        notification.style.right = '10px';
        notification.style.maxWidth = 'none';
    }
}, 250));

// Fix for smooth scrolling to home section
document.addEventListener('DOMContentLoaded', () => {
    // Ensure home link scrolls to top
    const homeLinks = document.querySelectorAll('a[href="#home"]');
    homeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});
