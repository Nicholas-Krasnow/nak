// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Publications filtering functionality
    const yearFilter = document.getElementById('year-filter');
    const typeFilter = document.getElementById('type-filter');
    const searchInput = document.getElementById('search-input');

    if (yearFilter && typeFilter && searchInput) {
        // Filter publications based on selected criteria
        function filterPublications() {
            const selectedYear = yearFilter.value;
            const selectedType = typeFilter.value;
            const searchTerm = searchInput.value.toLowerCase();

            const yearSections = document.querySelectorAll('.year-section');
            const publicationItems = document.querySelectorAll('.publication-item');

            yearSections.forEach(section => {
                const year = section.getAttribute('data-year');
                let sectionVisible = false;

                // Check if year matches filter
                if (selectedYear === 'all' || selectedYear === year) {
                    const items = section.querySelectorAll('.publication-item');
                    items.forEach(item => {
                        const type = item.getAttribute('data-type');
                        const title = item.querySelector('h3').textContent.toLowerCase();
                        const authors = item.querySelector('.pub-authors').textContent.toLowerCase();
                        const journal = item.querySelector('.pub-journal').textContent.toLowerCase();
                        const abstract = item.querySelector('.pub-abstract p').textContent.toLowerCase();

                        const matchesType = selectedType === 'all' || selectedType === type;
                        const matchesSearch = searchTerm === '' || 
                            title.includes(searchTerm) || 
                            authors.includes(searchTerm) || 
                            journal.includes(searchTerm) || 
                            abstract.includes(searchTerm);

                        if (matchesType && matchesSearch) {
                            item.style.display = 'block';
                            sectionVisible = true;
                        } else {
                            item.style.display = 'none';
                        }
                    });
                } else {
                    section.style.display = 'none';
                }

                // Show/hide year section based on visibility
                section.style.display = sectionVisible ? 'block' : 'none';
            });
        }

        // Add event listeners
        yearFilter.addEventListener('change', filterPublications);
        typeFilter.addEventListener('change', filterPublications);
        searchInput.addEventListener('input', filterPublications);

        // Initialize filter
        filterPublications();
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = '#fff';
                navbar.style.backdropFilter = 'none';
            }
        }
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.highlight-card, .research-card, .publication-item, .project-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effect to cards
    const cards = document.querySelectorAll('.highlight-card, .research-card, .publication-item, .project-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #3498db';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Add print styles
    window.addEventListener('beforeprint', function() {
        // Hide navigation and other non-essential elements when printing
        const navbar = document.querySelector('.navbar');
        const footer = document.querySelector('.footer');
        const cta = document.querySelector('.cta');
        
        if (navbar) navbar.style.display = 'none';
        if (footer) footer.style.display = 'none';
        if (cta) cta.style.display = 'none';
    });

    window.addEventListener('afterprint', function() {
        // Restore elements after printing
        const navbar = document.querySelector('.navbar');
        const footer = document.querySelector('.footer');
        const cta = document.querySelector('.cta');
        
        if (navbar) navbar.style.display = 'block';
        if (footer) footer.style.display = 'block';
        if (cta) cta.style.display = 'block';
    });

    // Add error handling for external resources
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.style.display = 'none';
            console.warn('Image failed to load:', e.target.src);
        }
    });

    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        });
    }
});
