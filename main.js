// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navBar = document.querySelector('.nav-bar');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Add shadow to navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
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

    // Observe all major sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add active state to nav links based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Add hover effect to cards
    const cards = document.querySelectorAll('.project-card, .skill-category, .education-card, .experience-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });

    // Lazy loading for images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Print-friendly functionality
    window.addEventListener('beforeprint', function() {
        // Expand all sections for printing
        const collapsibles = document.querySelectorAll('.collapsible');
        collapsibles.forEach(item => {
            item.classList.add('active');
        });
    });

    // Swimming Map functionality
    const mapElement = document.getElementById('swimming-map');
    if (mapElement && typeof L !== 'undefined') {
        // Initialize Leaflet map
        const map = L.map('swimming-map').setView([48, 5], 4);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        // Define training locations
        const locations = [
            // USA
            {
                name: 'Lutheran University, Thousand Oaks, USA',
                coord: [34.226274, -118.877171],
                details: '60 W Olsen Rd, Thousand Oaks, CA 91360, États-Unis',
                color: '#3182ce'
            },
            // UK - 4 locations
            {
                name: 'Guildford Spectrum Leisure Complex, UK',
                coord: [51.243806, -0.563711],
                details: 'Guildford, Royaume-Uni',
                color: '#3182ce'
            },
            {
                name: 'Epsom College Sports Centre, UK',
                coord: [51.324367, -0.247968],
                details: 'Longdown Ln S, Epsom KT17 4JQ, Royaume-Uni',
                color: '#3182ce'
            },
            {
                name: 'Whitgift, Croydon, UK',
                coord: [51.359264, -0.101562],
                details: 'Haling Park Rd, South Croydon CR2 6YT, Royaume-Uni',
                color: '#3182ce'
            },
            {
                name: 'Millfield, UK',
                coord: [51.120155, -2.725526],
                details: 'Street, Royaume-Uni',
                color: '#3182ce'
            },
            // Spain
            {
                name: 'Colònia de Sant Jordi, Spain',
                coord: [39.321565, 2.992387],
                details: '07638, Baléares, Espagne',
                color: '#3182ce'
            },
            // France - 6 locations
            {
                name: 'Versailles, France',
                coord: [48.802971, 2.139972],
                details: 'Swimming Training',
                color: '#3182ce'
            },
            {
                name: 'Vittel, France',
                coord: [48.192948, 5.937927],
                details: 'Swimming Training',
                color: '#3182ce'
            },
            {
                name: 'France Training Center 3',
                coord: [43.607009, 1.454416],
                details: 'Swimming Training',
                color: '#3182ce'
            },
            {
                name: 'France Training Center 4',
                coord: [47.383384, 0.694722],
                details: 'Swimming Training',
                color: '#3182ce'
            },
            {
                name: 'France Training Center 5',
                coord: [43.429557, 6.801626],
                details: 'Swimming Training',
                color: '#3182ce'
            },
            {
                name: 'France Training Center 6',
                coord: [46.379826, 2.583692],
                details: 'Swimming Training',
                color: '#3182ce'
            }
        ];

        // Create feature group to hold all markers
        const markerGroup = L.featureGroup();

        // Add markers for each location
        locations.forEach(location => {
            const marker = L.marker(location.coord, {
                title: location.name
            }).bindPopup(`<strong>${location.name}</strong><br>${location.details}`);
            
            markerGroup.addLayer(marker);
        });

        // Add marker group to map
        markerGroup.addTo(map);

        // Fit map bounds to show all markers
        if (markerGroup.getLayers().length > 0) {
            map.fitBounds(markerGroup.getBounds().pad(0.1));
        }
    }

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const track = document.querySelector('.carousel-track');
        const slides = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        const indicators = document.querySelectorAll('.indicator');
        
        // Check if this is a gallery (buttons are hidden)
        const isGallery = prevBtn && getComputedStyle(prevBtn).display === 'none';
        
        if (!isGallery) {
            let currentSlide = 0;
            const slideCount = slides.length;
            let autoPlayInterval;

            const updateCarousel = () => {
                const offset = -currentSlide * 100;
                track.style.transform = `translateX(${offset}%)`;
                
                // Update indicators
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentSlide);
                });
            };

            const nextSlide = () => {
                currentSlide = (currentSlide + 1) % slideCount;
                updateCarousel();
                resetAutoPlay();
            };

            const prevSlide = () => {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                updateCarousel();
                resetAutoPlay();
            };

            const goToSlide = (slideIndex) => {
                currentSlide = slideIndex;
                updateCarousel();
                resetAutoPlay();
            };

            const startAutoPlay = () => {
                autoPlayInterval = setInterval(nextSlide, 5000); // Auto-scroll every 5 seconds
            };

            const resetAutoPlay = () => {
                clearInterval(autoPlayInterval);
                startAutoPlay();
            };

            // Event listeners
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);

            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => goToSlide(index));
            });

            // Start auto-play on load
            startAutoPlay();

            // Pause auto-play on hover
            carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
            carousel.addEventListener('mouseleave', startAutoPlay);

            // Initialize carousel
            updateCarousel();
        }
    }

    // Add year to footer dynamically
    const footer = document.querySelector('.footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = `&copy; ${currentYear} Guillaume Gohard. All rights reserved.`;
    }

    // Performance optimization: Debounce scroll events
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Apply debounce to scroll handler
    const debouncedScroll = debounce(function() {
        // Scroll-based animations can go here
    });

    window.addEventListener('scroll', debouncedScroll);

    console.log('Portfolio loaded successfully!');
});