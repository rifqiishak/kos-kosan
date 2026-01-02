// ==========================================================================
// GRIYA ADAM - FINAL SCRIPT
// ==========================================================================

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
    easing: 'ease-out-cubic',
    disable: window.innerWidth < 768 ? true : false
});

// ===== NAVBAR & SCROLL EFFECTS =====
const nav = document.getElementById('navbar');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const scrollTopBtn = document.querySelector('.scroll-top');

// Scroll event for navbar and scroll-to-top button
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // Navbar background on scroll
    if (scrollPosition > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    if (scrollPosition > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.transform = 'translateY(20px)';
    }

    // Update active nav link
    updateActiveNavLink();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href') !== '#') {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        });
    }
});

// ===== MOBILE MENU =====
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== SCROLL INDICATOR =====
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        const navHeight = nav.offsetHeight;
        const aboutPosition = aboutSection.offsetTop - navHeight;

        window.scrollTo({
            top: aboutPosition,
            behavior: 'smooth'
        });
    });
}

// ===== SCROLL TO TOP =====
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollTopBtn.addEventListener('mouseenter', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
            scrollTopBtn.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.4)';
        }
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.transform = 'translateY(0) scale(1)';
            scrollTopBtn.style.boxShadow = '0 5px 20px rgba(212, 175, 55, 0.3)';
        }
    });
}

// ===== ACTIVE NAV LINK =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollPosition = window.scrollY + 100;

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').replace('#', '');

        if (href === currentSection || (href === '' && currentSection === '')) {
            link.classList.add('active');
        }
    });
}

// ===== LIGHTBOX =====
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.lightbox-close');
const prevBtn = lightbox.querySelector('.lightbox-prev');
const nextBtn = lightbox.querySelector('.lightbox-next');

let currentImageIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryImages = Array.from(galleryItems).map(item =>
    item.querySelector('img').getAttribute('src')
);

// Open Lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(currentImageIndex);
    });
});

function openLightbox(index) {
    lightboxImg.src = galleryImages[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateLightboxButtons();
}

// Close Lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.style.opacity = '1';
}

closeBtn.addEventListener('click', closeLightbox);

// Lightbox Background Click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    }
});

// Lightbox Navigation
prevBtn.addEventListener('click', () => navigateLightbox(-1));
nextBtn.addEventListener('click', () => navigateLightbox(1));

function navigateLightbox(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }

    // Fade effect
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = galleryImages[currentImageIndex];
        lightboxImg.style.opacity = '1';
    }, 200);

    updateLightboxButtons();
}

function updateLightboxButtons() {
    // Update button states if needed
}

// ===== WHATSAPP BUTTON EFFECT =====
const whatsappBtn = document.querySelector('.float-wa');
if (whatsappBtn) {
    whatsappBtn.addEventListener('mouseenter', () => {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
        `;

        const size = Math.max(whatsappBtn.offsetWidth, whatsappBtn.offsetHeight);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '0';
        ripple.style.top = '0';

        whatsappBtn.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== HOVER EFFECTS =====
// Testimonial Cards
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        if (window.innerWidth > 768) {
            this.style.transform = 'translateY(-10px)';
        }
    });

    card.addEventListener('mouseleave', function () {
        if (window.innerWidth > 768) {
            this.style.transform = 'translateY(0)';
        }
    });
});

// Feature Items
document.querySelectorAll('.feature-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        if (window.innerWidth > 768) {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        }
    });

    item.addEventListener('mouseleave', function () {
        if (window.innerWidth > 768) {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Price Card
const priceCard = document.querySelector('.price-card');
if (priceCard) {
    priceCard.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            priceCard.style.transform = 'scale(1.02)';
        }
    });

    priceCard.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            priceCard.style.transform = 'scale(1)';
        }
    });
}

// Social Icons
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) rotate(10deg)';
    });

    icon.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) rotate(0)';
    });
});

// ===== INITIALIZE ON LOAD =====
window.addEventListener('load', () => {
    // Refresh AOS
    AOS.refresh();

    // Initialize active nav link
    updateActiveNavLink();

    // Add scroll event for active nav link
    window.addEventListener('scroll', updateActiveNavLink);

    // Log successful load
    console.log('✅ Griya Adam website loaded successfully');
});

// ===== HANDLE BROWSER RESIZE =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        AOS.refresh();

        // Close mobile menu on desktop
        if (window.innerWidth > 767 && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 250);
});

// ===== MOBILE DETECTION =====
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Performance optimization for mobile
if (isMobile) {
    document.documentElement.style.setProperty('--scroll-behavior', 'auto');
    document.body.classList.add('touch-device');
}

// ===== IMAGE LAZY LOADING =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add CSS for loaded images
const imageStyle = document.createElement('style');
imageStyle.textContent = `
    img[data-src] {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
    
    .touch-device .feature-item:hover,
    .touch-device .testimonial-card:hover,
    .touch-device .price-card:hover {
        transform: none !important;
    }
`;
document.head.appendChild(imageStyle);

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" aria-label="Close notification">&times;</button>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// Add notification styles
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--secondary);
        border-left: 4px solid var(--accent);
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 12px;
        transform: translateX(400px);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 10000;
        max-width: 300px;
        backdrop-filter: blur(10px);
        border: 1px solid var(--border);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-left-color: #4CAF50;
    }
    
    .notification i {
        font-size: 1.2rem;
        color: var(--accent);
    }
    
    .notification.success i {
        color: #4CAF50;
    }
    
    .notification span {
        color: var(--text-light);
        font-size: 0.9rem;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-muted);
        font-size: 1.3rem;
        cursor: pointer;
        padding: 0;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .notification-close:hover {
        color: var(--accent);
        background: rgba(255, 255, 255, 0.1);
    }
    
    @media (max-width: 480px) {
        .notification {
            top: 80px;
            right: 10px;
            left: 10px;
            max-width: none;
            transform: translateY(-100px);
        }
        
        .notification.show {
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(notificationStyle);

// ===== FORM HANDLING =====
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Send data to server (implement this)
        console.log('Form submitted:', data);

        // Show success message
        showNotification('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.', 'success');

        // Reset form
        this.reset();
    });
});

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Griya Adam website ready!');
    console.log('📱 Mobile optimized: ' + isMobile);
    console.log('🎨 AOS animations initialized');
    console.log('🔗 All functionality ready');
});

// ===== PERFORMANCE OPTIMIZATION =====
// Request Animation Frame for smooth animations
function animate(time) {
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// Cleanup function for memory management
window.addEventListener('beforeunload', () => {
    // Clean up any resources if needed
});