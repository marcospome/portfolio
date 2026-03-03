// ── DATA ──────────────────────────────────────────────────────────────────────

const techTags = [
    '⚙️ Git', '🐳 APIs REST', '🔄 Automatización', '📦 Scrum / Agile',
    '🌐 HTML / CSS', '🧩 Angular 13', '🚀 FastAPI', '🦄 Django REST',
    '🗄️ SQL Server', '🔧 Node.js', '🐍 Python', '📊 ERP / WMS / TMS',
    '☁️ Redes', '🤖 Inteligencia Artificial',
];

const certifications = [
    { title: 'Inteligencia Artificial y Productividad', issuer: 'EducacionIT', year: '2025', icon: '🤖', img: 'certificados/inteligencia-artificial.jpeg' },
    { title: 'Toma de Decisiones', issuer: 'UADE Business School', year: '2025', icon: '🧠', img: null },
    { title: 'APIs con FastAPI en Python', issuer: 'Udemy', year: '2025', icon: '🚀', img: 'certificados/fastapi.png' },
    { title: 'Ultimate Python: de cero a experto', issuer: 'Udemy', year: '2025', icon: '🐍', img: 'certificados/python.png' },
    { title: 'NodeJS', issuer: 'UTN FRBA', year: '2025', icon: '🟢', img: 'certificados/node.png' },
    { title: 'Angular 13', issuer: 'EducacionIT', year: '2024', icon: '🅰️', img: 'certificados/angular.png' },
    { title: 'Scrum desde cero', issuer: 'Udemy', year: '2024', icon: '📋', img: 'certificados/scrum.png' },
    { title: 'Django y Django REST Framework', issuer: 'Udemy', year: '2024', icon: '🎸', img: 'certificados/django.png' },
];

// ── RENDER TECH TAGS ──────────────────────────────────────────────────────────

function renderTechTags() {
    const container = document.getElementById('tech-tags');
    if (!container) return;
    techTags.forEach((tag, i) => {
        const el = document.createElement('span');
        el.className = 'badge cursor-default select-none transition-all duration-300 hover:scale-105 hover:border-cyan-400/60';
        el.style.animationDelay = `${i * 60}ms`;
        el.textContent = tag;
        container.appendChild(el);
    });
}

// ── RENDER CERTIFICATIONS ─────────────────────────────────────────────────────

function renderCerts() {
    const grid = document.getElementById('certs-grid');
    if (!grid) return;
    certifications.forEach((cert, i) => {
        const card = document.createElement('div');
        // Add cursor-pointer to indicate it's clickable
        card.className = 'glass rounded-2xl p-6 card-hover flex flex-col gap-3 cursor-pointer group';
        card.style.animationDelay = `${i * 80}ms`;
        card.innerHTML = `
      <div class="flex justify-between items-start">
        <div class="text-3xl">${cert.icon}</div>
        <div class="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
        </div>
      </div>
      <h3 class="text-slate-200 font-semibold text-sm leading-snug">${cert.title}</h3>
      <div class="mt-auto flex items-center justify-between">
        <span class="text-slate-500 text-xs">${cert.issuer}</span>
        <span class="badge">${cert.year}</span>
      </div>
    `;

        // Modal popup logic
        card.addEventListener('click', () => {
            const modal = document.getElementById('cert-modal');
            const modalImg = document.getElementById('modal-img');

            if (cert.img) {
                // If the cert object has an image mapped in its object, display it
                modalImg.src = cert.img;
            } else {
                // Placeholder fallback para los que no tengan
                modalImg.src = `https://placehold.co/800x600/1e293b/22d3ee.png?text=Certificado+%0A${encodeURIComponent(cert.title)}`;
            }
            modalImg.alt = cert.title;

            modal.classList.remove('hidden');
            // Timeout to allow display block to apply before animating opacity
            setTimeout(() => {
                modal.classList.remove('opacity-0');
            }, 10);
        });

        grid.appendChild(card);
    });
}

// ── INIT MODAL EVENTS ─────────────────────────────────────────────────────────

function initModalEvents() {
    const modal = document.getElementById('cert-modal');
    const closeBtn = document.getElementById('close-modal');

    if (!modal || !closeBtn) return;

    function closeModal() {
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300); // Wait for transition to finish
    }

    closeBtn.addEventListener('click', closeModal);

    const modalContent = modal.querySelector('.pointer-events-auto');

    // Cierra al hacer click afuera de la imagen
    modal.addEventListener('click', (e) => {
        // Fix: Since modal has children handling layout, we check if click was directly on the background
        if (e.target === modal || !modalContent.contains(e.target)) {
            closeModal();
        }
    });

    // Cierra con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// ── NAVBAR SCROLL EFFECT ──────────────────────────────────────────────────────

function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('glass', 'shadow-lg');
        } else {
            navbar.classList.remove('glass', 'shadow-lg');
        }
    }, { passive: true });
}

// ── MOBILE MENU ───────────────────────────────────────────────────────────────

function initMobileMenu() {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    const open = document.getElementById('icon-open');
    const close = document.getElementById('icon-close');

    btn.addEventListener('click', () => {
        const isOpen = menu.classList.contains('open');
        menu.classList.toggle('open', !isOpen);
        menu.classList.toggle('closed', isOpen);
        open.classList.toggle('hidden', !isOpen);
        close.classList.toggle('hidden', isOpen);
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.replace('open', 'closed');
            open.classList.remove('hidden');
            close.classList.add('hidden');
        });
    });
}

// ── SCROLL REVEAL ─────────────────────────────────────────────────────────────

function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach(el => observer.observe(el));
}

// ── SKILL BAR ANIMATION ───────────────────────────────────────────────────────

function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pct = entry.target.getAttribute('data-pct');
                // Give a tiny delay so the section reveal plays first
                setTimeout(() => { entry.target.style.width = pct + '%'; }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    bars.forEach(bar => observer.observe(bar));
}

// ── ACTIVE NAV LINK ───────────────────────────────────────────────────────────

function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id} `);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(section => observer.observe(section));
}

// ── TYPED EFFECT (hero subtitle) ──────────────────────────────────────────────

function initTyped() {
    const words = ['Automatización', 'APIs REST', 'Logística', 'SQL Server', 'Python', '.NET'];
    let wordIdx = 0, charIdx = 0, deleting = false;

    // Create the element
    const hero = document.querySelector('#hero p.text-slate-400');
    if (!hero) return;

    const span = document.createElement('span');
    span.className = 'gradient-text font-semibold';
    span.textContent = '';
    hero.insertAdjacentHTML('beforeend', ' · ');
    hero.appendChild(span);

    function tick() {
        const word = words[wordIdx];
        if (!deleting) {
            span.textContent = word.slice(0, charIdx + 1);
            charIdx++;
            if (charIdx === word.length) {
                deleting = true;
                setTimeout(tick, 1800);
                return;
            }
        } else {
            span.textContent = word.slice(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                wordIdx = (wordIdx + 1) % words.length;
            }
        }
        setTimeout(tick, deleting ? 60 : 100);
    }
    setTimeout(tick, 1200);
}

// ── CAROUSELS ─────────────────────────────────────────────────────────────────

function initCarousels() {
    const carousels = document.querySelectorAll('.group');

    carousels.forEach(group => {
        const container = group.querySelector('.overflow-x-auto');
        const dots = group.querySelectorAll('.absolute.bottom-3 div');
        if (!container || dots.length === 0) return;

        let currentIndex = 0;
        const totalItems = dots.length;
        let interval;
        let isPaused = false;

        function startAutoScroll() {
            if (interval) clearInterval(interval);
            interval = setInterval(scrollNext, 3000);
        }

        function scrollNext() {
            if (isPaused) return;
            currentIndex = (currentIndex + 1) % totalItems;
            const itemWidth = container.clientWidth;
            container.scrollTo({
                left: currentIndex * itemWidth,
                behavior: 'smooth'
            });
            // dots will be updated by the scroll event listener
        }

        function updateDots() {
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.replace('bg-white/40', 'bg-white/80');
                } else {
                    dot.classList.replace('bg-white/80', 'bg-white/40');
                }
            });
        }

        // Pause on hover or touch
        group.addEventListener('mouseenter', () => isPaused = true);
        group.addEventListener('mouseleave', () => isPaused = false);
        group.addEventListener('touchstart', () => isPaused = true, { passive: true });
        group.addEventListener('touchend', () => isPaused = false, { passive: true });

        // Update dots on scroll
        container.addEventListener('scroll', () => {
            const itemWidth = container.clientWidth;
            const scrollLeft = container.scrollLeft;
            const newIndex = Math.round(scrollLeft / itemWidth);
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalItems) {
                currentIndex = newIndex;
                updateDots();
            }
        }, { passive: true });

        startAutoScroll();
    });
}

// ── INIT ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    renderTechTags();
    renderCerts();
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initSkillBars();
    initActiveNav();
    initTyped();
    initCarousels();
    initModalEvents();
});
