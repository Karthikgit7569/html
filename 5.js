<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script>
    // Main initialization function
    function initializeWebsite() {
        // Configuration
        const config = {
            navbarSelector: '.navbar',
            navLinkSelector: '.nav-link[href^="#"]',
            sectionSelector: 'section[id]',
            contactFormId: 'contactForm',
            successMessageId: 'formSuccess',
            scrollOffset: 70,
            scrollBehavior: 'smooth'
        };

        // DOM Elements
        const elements = {
            navbar: null,
            navLinks: [],
            sections: [],
            contactForm: null,
            successMessage: null
        };

        // Initialize all components
        function init() {
            loadElements();
            if (validateElements()) {
                setupEventListeners();
                handleInitialState();
                console.log('Website initialized successfully');
            }
        }

        // Load DOM elements
        function loadElements() {
            elements.navbar = document.querySelector(config.navbarSelector);
            elements.navLinks = Array.from(document.querySelectorAll(config.navLinkSelector));
            elements.sections = Array.from(document.querySelectorAll(config.sectionSelector));
            elements.contactForm = document.getElementById(config.contactFormId);
            elements.successMessage = document.getElementById(config.successMessageId);
        }

        // Validate essential elements
        function validateElements() {
            if (!elements.navbar) {
                console.warn('Navbar not found');
                return false;
            }
            if (elements.navLinks.length === 0) {
                console.warn('Navigation links not found');
                return false;
            }
            return true;
        }

        // Setup all event listeners
        function setupEventListeners() {
            // Navigation clicks
            elements.navLinks.forEach(link => {
                link.addEventListener('click', handleNavClick);
            });

            // Scroll events
            window.addEventListener('scroll', throttle(handleScroll, 100));
            
            // Form submission
            if (elements.contactForm) {
                elements.contactForm.addEventListener('submit', handleFormSubmit);
            }
        }

        // Handle navigation clicks
        function handleNavClick(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (!targetId || targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            scrollToElement(targetElement);
            updateUrl(targetId);
            closeMobileMenu();
        }

        // Smooth scroll to element
        function scrollToElement(element) {
            const navbarHeight = elements.navbar.offsetHeight;
            const targetPosition = element.getBoundingClientRect().top + 
                                 window.pageYOffset - 
                                 navbarHeight;
            
            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: config.scrollBehavior
            });
        }

        // Update URL without page reload
        function updateUrl(hash) {
            try {
                history.replaceState(null, null, hash);
            } catch (e) {
                window.location.hash = hash;
            }
        }

        // Close mobile menu
        function closeMobileMenu() {
            const openMenu = document.querySelector('.navbar-collapse.show');
            if (openMenu) {
                try {
                    const collapse = bootstrap.Collapse.getInstance(openMenu) || 
                                   new bootstrap.Collapse(openMenu);
                    collapse.hide();
                } catch (e) {
                    openMenu.classList.remove('show');
                }
            }
        }

        // Handle scroll events
        function handleScroll() {
            updateActiveSection();
            updateNavbarStyle();
        }

        // Update active section in navigation
        function updateActiveSection() {
            const scrollPosition = window.pageYOffset;
            const navbarHeight = elements.navbar.offsetHeight;
            
            let currentSection = null;
            
            elements.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollPosition >= (sectionTop - navbarHeight - 50)) {
                    currentSection = section.id;
                }
            });
            
            elements.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }

        // Update navbar style on scroll
        function updateNavbarStyle() {
            if (window.scrollY > 50) {
                elements.navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.9)';
                elements.navbar.style.padding = '10px 0';
            } else {
                elements.navbar.style.backgroundColor = 'var(--primary-color)';
                elements.navbar.style.padding = '15px 0';
            }
        }

        // Handle form submission
        function handleFormSubmit(e) {
            if (!elements.contactForm.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                e.preventDefault();
                if (elements.successMessage) {
                    elements.successMessage.classList.remove('d-none');
                    elements.successMessage.scrollIntoView({ behavior: 'smooth' });
                }
                elements.contactForm.reset();
                elements.contactForm.classList.remove('was-validated');
            }
            elements.contactForm.classList.add('was-validated');
        }

        // Handle initial page state
        function handleInitialState() {
            // Initial navbar style
            updateNavbarStyle();
            
            // Initial active section
            updateActiveSection();
            
            // Handle hash URL
            if (window.location.hash) {
                const target = document.querySelector(window.location.hash);
                if (target) {
                    setTimeout(() => scrollToElement(target), 100);
                }
            }
        }

        // Throttle function for scroll events
        function throttle(func, limit) {
            let lastFunc;
            let lastRan;
            return function() {
                const context = this;
                const args = arguments;
                if (!lastRan) {
                    func.apply(context, args);
                    lastRan = Date.now();
                } else {
                    clearTimeout(lastFunc);
                    lastFunc = setTimeout(function() {
                        if ((Date.now() - lastRan) >= limit) {
                            func.apply(context, args);
                            lastRan = Date.now();
                        }
                    }, limit - (Date.now() - lastRan));
                }
            };
        }

        // Start initialization when DOM is ready
        if (document.readyState !== 'loading') {
            init();
        } else {
            document.addEventListener('DOMContentLoaded', init);
        }
    }

    // Start the application
    initializeWebsite();
</script>
