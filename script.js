// -----------------------------
// Theme toggle + remember choice
// -----------------------------
const themeToggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme'); // 'light' or 'dark'
if (savedTheme === 'light') {
    document.body.classList.add('light');
    themeToggleBtn.textContent = '🌞';
} else {
    // default dark (black)
    document.body.classList.remove('light');
    themeToggleBtn.textContent = '🌙';
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    if (document.body.classList.contains('light')) {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌞';
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '🌙';
    }
});

// -----------------------------
// Scroll spy: highlight active nav link
// -----------------------------
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(navLinks).map(l => {
    const href = l.getAttribute('href');
    return document.querySelector(href);
});

function onScrollSpy() {
    const offset = window.innerHeight * 0.35; // when section enters 35% from top
    let current = sections.findIndex(sec => {
        if (!sec) return false;
        const rect = sec.getBoundingClientRect();
        return (rect.top <= offset && rect.bottom > offset);
    });
    // fallback - if none found, find nearest
    if (current === -1) {
        const bounding = sections.map(s => s ? Math.abs(s.getBoundingClientRect().top) : Infinity);
        current = bounding.indexOf(Math.min(...bounding));
    }

    navLinks.forEach((a, i) => {
        if (i === current) a.classList.add('active'); else a.classList.remove('active');
    });
}
window.addEventListener('scroll', onScrollSpy);
window.addEventListener('load', onScrollSpy);
window.addEventListener('resize', onScrollSpy);

// Smooth scrolling for nav links
document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// -----------------------------
// Animate skill bars when visible (IntersectionObserver)
// -----------------------------
const skillFills = document.querySelectorAll('.skill-fill');
const skillPercents = document.querySelectorAll('.skill-percent');

const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // animate fills inside this section
            skillFills.forEach(fill => {
                const val = fill.dataset.fill || 0;
                fill.style.width = val + '%';
            });
            skillPercents.forEach(p => {
                const value = +p.dataset.value || 0;
                let start = 0;
                const duration = 700;
                const step = 20;
                const increment = Math.ceil(value / (duration / step));
                const timer = setInterval(() => {
                    start = Math.min(start + increment, value);
                    p.textContent = start + '%';
                    if (start >= value) clearInterval(timer);
                }, step);
            });

            obs.disconnect();
        }
    });
}, { threshold: 0.25 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// -----------------------------
// Simple contact form (frontend only)
// -----------------------------
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('form-note');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Basic UI feedback (no backend here)
        formNote.textContent = 'Sending...';
        setTimeout(() => {
            formNote.textContent = 'Thanks! Your message was sent (demo). I will contact you soon.';
            contactForm.reset();
        }, 900);
    });
}
