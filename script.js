// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        mobileMenu.classList.add('hidden');
    }
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

// Initialize skill bars
function initSkillBars() {
    document.querySelectorAll('.skill-bar').forEach(bar => {
        const percent = bar.dataset.percent;
        const progress = bar.querySelector('.progress');
        progress.style.width = `${percent}%`;
    });
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add your form submission logic here
        // For example, sending data to a server or email service
        
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Animate elements on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Add parallax effect to hero section
    const hero = document.querySelector('#home');
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSkillBars();
});

// Check for saved theme preference, otherwise use system preference
function getThemePreference() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
        return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Function to set theme
function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
}

// Initialize theme
setTheme(getThemePreference());

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
    });
});

class ProjectCarousel {
    constructor() {
        this.projects = [
            {
                title: "Indian Decars",
                image: "https://via.placeholder.com/400x300",
                description: "An e-commerce platform for car accessories with secure payment integration.",
                tech: ["React", "Node.js", "MongoDB"],
                link: "https://indiandecarsgb.com/"
            },
            {
                title: "Expense Tracker",
                image: "https://via.placeholder.com/400x300",
                description: "A web application to track daily expenses with visualization and budget management features.",
                tech: ["React", "Chart.js", "Firebase"],
                link: "#"
            },
            {
                title: "Weather App",
                image: "https://via.placeholder.com/400x300",
                description: "Real-time weather application with location-based forecasts and interactive maps.",
                tech: ["JavaScript", "Weather API", "Leaflet.js"],
                link: "#"
            },
            {
                title: "Task Management System",
                image: "https://via.placeholder.com/400x300",
                description: "A collaborative task management platform with real-time updates and team features.",
                tech: ["React", "Node.js", "Socket.io"],
                link: "#"
            },
            {
                title: "Portfolio Website",
                image: "https://via.placeholder.com/400x300",
                description: "A responsive personal portfolio website with dark mode and smooth animations.",
                tech: ["HTML5", "Tailwind CSS", "JavaScript"],
                link: "#"
            }
        ];

        this.currentIndex = 0;
        this.projectSlide = document.querySelector('.project-slide');
        this.leftArrow = document.querySelector('.left-arrow');
        this.rightArrow = document.querySelector('.right-arrow');
        this.init();
    }

    init() {
        this.renderProjects();
        this.setupNavigation();
        this.setupKeyboardNavigation();
        this.updateArrowVisibility();
    }

    renderProjects() {
        this.projectSlide.innerHTML = '';
        this.projects.forEach((project, index) => {
            const card = this.createProjectCard(project);
            this.updateCardPosition(card, index);
            this.projectSlide.appendChild(card);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover rounded-t-lg">
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                <p class="text-gray-600 mb-4">${project.description}</p>
                <div class="flex flex-wrap space-x-2 mb-4">
                    ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
                <a href="${project.link}" target="_blank" class="btn-primary">View Project</a>
            </div>
        `;
        return card;
    }

    updateCardPosition(card, index) {
        card.className = 'project-card';
        if (index === this.currentIndex) {
            card.classList.add('active');
        } else if (index === this.currentIndex - 1) {
            card.classList.add('prev');
        } else if (index === this.currentIndex + 1) {
            card.classList.add('next');
        }
    }

    updateArrowVisibility() {
        // Hide left arrow at first project
        if (this.currentIndex === 0) {
            this.leftArrow.style.display = 'none';
        } else {
            this.leftArrow.style.display = 'flex';
        }

        // Hide right arrow at last project
        if (this.currentIndex === this.projects.length - 1) {
            this.rightArrow.style.display = 'none';
        } else {
            this.rightArrow.style.display = 'flex';
        }
    }

    navigate(direction) {
        if (direction === 'next' && this.currentIndex < this.projects.length - 1) {
            this.currentIndex++;
        } else if (direction === 'prev' && this.currentIndex > 0) {
            this.currentIndex--;
        }

        const cards = this.projectSlide.children;
        Array.from(cards).forEach((card, index) => {
            this.updateCardPosition(card, index);
        });

        this.updateArrowVisibility();
    }

    setupNavigation() {
        this.leftArrow.addEventListener('click', () => this.navigate('prev'));
        this.rightArrow.addEventListener('click', () => this.navigate('next'));
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && this.currentIndex > 0) {
                this.navigate('prev');
            }
            if (e.key === 'ArrowRight' && this.currentIndex < this.projects.length - 1) {
                this.navigate('next');
            }
        });
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectCarousel();
});
