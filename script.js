/* ========================================
   AMIT KUSHWAHA — PORTFOLIO JS
   3D Mouse Tracking + Multi-Theme
   ======================================== */

// ===========================
// LOADER
// ===========================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loaderText');
    const messages = ['Loading Portfolio...', 'Building Pipelines...', 'Training Models...', 'Almost Ready...', 'Welcome ✨'];
    let i = 0;
    const msgInterval = setInterval(() => { i++; if (i < messages.length) loaderText.textContent = messages[i]; }, 350);
    setTimeout(() => {
        clearInterval(msgInterval);
        loader.classList.add('hidden');
        document.getElementById('nav').classList.add('visible');
        startHeroAnimations();
    }, 1800);
});

// ===========================
// CUSTOM CURSOR
// ===========================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = (mouseX - 4) + 'px';
    cursor.style.top = (mouseY - 4) + 'px';
});

(function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = (followerX - 20) + 'px';
    follower.style.top = (followerY - 20) + 'px';
    requestAnimationFrame(animateFollower);
})();

document.querySelectorAll('a, button, .project-card, .skill-card, .cert-card, .contact-link-card, .theme-toggle, .theme-option').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hovering'); follower.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hovering'); follower.classList.remove('hovering'); });
});

// ===========================
// NEURAL NETWORK CANVAS (Cyberpunk only)
// ===========================
const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        const dx = mouseX - this.x, dy = mouseY - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) { this.x -= dx * 0.008; this.y -= dy * 0.008; }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 58, 237, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 100);
    particles = Array.from({ length: count }, () => new Particle());
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) { p.update(); p.draw(); }
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 130) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(124, 58, 237, ${0.06 * (1 - dist / 130)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateCanvas);
}
initParticles();
animateCanvas();
window.addEventListener('resize', initParticles);

// ===========================
// THEME SWITCHER
// ===========================
const themeToggle = document.getElementById('themeToggle');
const themePanel = document.getElementById('themePanel');
const themeOptions = document.querySelectorAll('.theme-option');

themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    themePanel.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!themePanel.contains(e.target) && e.target !== themeToggle) {
        themePanel.classList.remove('open');
    }
});

themeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
        const theme = opt.dataset.theme;
        document.documentElement.setAttribute('data-theme', theme);
        themeOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        themePanel.classList.remove('open');
        localStorage.setItem('portfolio-theme', theme);
    });
});

// Load saved theme
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeOptions.forEach(o => {
        o.classList.toggle('active', o.dataset.theme === savedTheme);
    });
}

// ===========================
// TYPING EFFECT
// ===========================
const titles = ['Data Analyst', 'AI & ML Student', 'Python Developer', 'Power BI Creator', 'Problem Solver', 'Data Storyteller'];
let titleIndex = 0, charIndex = 0, isDeleting = false, typingDelay = 100;

function typeEffect() {
    const el = document.getElementById('typingText');
    if (!el) return;
    const current = titles[titleIndex];
    if (isDeleting) { el.textContent = current.substring(0, --charIndex); typingDelay = 40; }
    else { el.textContent = current.substring(0, ++charIndex); typingDelay = 90; }
    if (!isDeleting && charIndex === current.length) { typingDelay = 2200; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; titleIndex = (titleIndex + 1) % titles.length; typingDelay = 400; }
    setTimeout(typeEffect, typingDelay);
}

// ===========================
// HERO ANIMATIONS
// ===========================
function startHeroAnimations() {
    document.querySelectorAll('.reveal-word').forEach((w, i) => setTimeout(() => w.classList.add('revealed'), 200 + i * 200));
    setTimeout(typeEffect, 900);
    setTimeout(animateCounters, 1200);
}

// ===========================
// COUNTER ANIMATION
// ===========================
function animateCounters() {
    document.querySelectorAll('[data-target]').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const start = performance.now();
        (function update(now) {
            const progress = Math.min((now - start) / 2000, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
            else counter.textContent = target;
        })(start);
    });
}

// ===========================
// 3D MOUSE TRACKING — HERO PHOTO
// ===========================
const heroPhoto = document.getElementById('heroPhoto');
if (heroPhoto) {
    document.addEventListener('mousemove', (e) => {
        const rect = heroPhoto.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) / (window.innerWidth / 2);
        const y = (e.clientY - centerY) / (window.innerHeight / 2);
        heroPhoto.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
    });
}

// ===========================
// 3D TILT — CARDS
// ===========================
document.querySelectorAll('[data-tilt-card]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-4px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => card.style.transition = '', 500);
    });
});

// ===========================
// PROJECT CARD GLOW
// ===========================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    });
});

// ===========================
// SCROLL PROGRESS
// ===========================
window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('scrollProgress').style.width = pct + '%';
});

// ===========================
// NAV ACTIVE LINK
// ===========================
const navLinks = document.querySelectorAll('.nav-link');
const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.section').forEach(s => sectionObs.observe(s));

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); mobileMenu.classList.toggle('open'); });
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => { hamburger.classList.remove('active'); mobileMenu.classList.remove('open'); }));

// ===========================
// SCROLL REVEAL
// ===========================
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObs.unobserve(entry.target); }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal-up').forEach(el => revealObs.observe(el));

// ===========================
// TERMINAL ANIMATION
// ===========================
const terminalData = { name: "Amit Kushwaha", role: "Aspiring Data Analyst", education: "BCA (Hons) AI & ML", university: "Galgotias University", location: "Noida, UP", skills: ["SQL","Power BI","Python","ML","NLP"], interests: ["Data Analytics","AI","Photography"], status: "Seeking Internship 🚀" };

let terminalAnimated = false;
const terminalObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !terminalAnimated) {
            terminalAnimated = true;
            const body = document.getElementById('terminalBody');
            const lines = [
                '<span class="json-bracket">{</span>',
                '  <span class="json-key">"name"</span>: <span class="json-string">"Amit Kushwaha"</span>,',
                '  <span class="json-key">"role"</span>: <span class="json-string">"Aspiring Data Analyst"</span>,',
                '  <span class="json-key">"education"</span>: <span class="json-string">"BCA (Hons) AI & ML"</span>,',
                '  <span class="json-key">"university"</span>: <span class="json-string">"Galgotias University"</span>,',
                '  <span class="json-key">"location"</span>: <span class="json-string">"Noida, UP"</span>,',
                '  <span class="json-key">"skills"</span>: <span class="json-string">["SQL","Power BI","Python","ML","NLP"]</span>,',
                '  <span class="json-key">"interests"</span>: <span class="json-string">["Data Analytics","AI","Photography"]</span>,',
                '  <span class="json-key">"status"</span>: <span class="json-string">"Seeking Internship 🚀"</span>',
                '<span class="json-bracket">}</span>',
            ];
            lines.forEach((html, i) => {
                setTimeout(() => {
                    const div = document.createElement('div');
                    div.className = 'terminal-line';
                    div.innerHTML = html;
                    body.appendChild(div);
                    requestAnimationFrame(() => div.classList.add('visible'));
                }, i * 150);
            });
            terminalObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
terminalObs.observe(document.getElementById('about'));

// ===========================
// SKILLS FILTERING
// ===========================
const categoryBtns = document.querySelectorAll('.skill-category-btn');
const skillCards = document.querySelectorAll('.skill-card');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.category;
        skillCards.forEach((card, i) => {
            const show = cat === 'all' || card.dataset.category === cat;
            if (show) {
                card.classList.remove('hidden-card');
                card.style.opacity = '0'; card.style.transform = 'translateY(16px) scale(0.95)';
                setTimeout(() => {
                    card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                    card.style.opacity = '1'; card.style.transform = '';
                }, i * 40);
            } else {
                card.classList.add('hidden-card');
            }
        });
    });
});

// Skill bar animation
const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.4 });
skillCards.forEach(c => skillObs.observe(c));

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===========================
// PARALLAX
// ===========================
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const sy = window.scrollY;
            const hero = document.querySelector('.hero-content');
            if (hero && sy < window.innerHeight) {
                hero.style.transform = `translateY(${sy * 0.25}px)`;
                hero.style.opacity = 1 - (sy / window.innerHeight) * 0.7;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// ===========================
// CONTACT FORM
// ===========================
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const orig = btn.innerHTML;
    btn.innerHTML = '<span>Message Sent! ✨</span>';
    btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; e.target.reset(); }, 3000);
});

// ===========================
// KONAMI CODE
// ===========================
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let ki = 0;
document.addEventListener('keydown', e => {
    if (e.key === konami[ki]) { ki++; if (ki === konami.length) { document.body.style.filter = 'hue-rotate(180deg)'; setTimeout(() => document.body.style.filter = '', 3000); ki = 0; } }
    else ki = 0;
});

console.log('%c🚀 Amit Kushwaha Portfolio', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%c💡 Konami Code: ↑↑↓↓←→←→BA', 'font-size: 11px; color: #06b6d4;');
