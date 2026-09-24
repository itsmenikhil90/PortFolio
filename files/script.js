/* ===========================
   LOADER - DISABLED
   =========================== */

const loader = document.getElementById('loader');

if (loader) {
    loader.classList.add('hidden');
}

animateHero();



/* ===========================
   PARTICLES BACKGROUND
   =========================== */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.strokeStyle = `rgba(108, 99, 255, ${0.08 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

/* ===========================
   NAVBAR
   =========================== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNav();
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

/* ===========================
   THEME TOGGLE
   =========================== */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-mode')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
});

/* ===========================
   TYPEWRITER EFFECT
   =========================== */
const typewriterEl = document.getElementById('typewriter');
const phrases = [
    'Full Stack Developer',
    'UI/UX Designer',
    'React Specialist',
    'Creative Problem Solver',
    'Open Source Contributor'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
    }

    setTimeout(typeWriter, speed);
}

/* ===========================
   HERO ANIMATION
   =========================== */
function animateHero() {
    const reveals = document.querySelectorAll('.hero .reveal-text');
    reveals.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('revealed');
        }, i * 200);
    });
    setTimeout(typeWriter, 1000);
    animateCounters();
}

/* ===========================
   COUNTER ANIMATION
   =========================== */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 30);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                return;
            }
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        };
        updateCounter();
    });
}

/* ===========================
   SCROLL REVEAL ANIMATIONS
   =========================== */
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight - 100) {
            el.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* ===========================
   SKILLS DATA & TABS
   =========================== */
const skillsData = {
    frontend: [
        { name: 'HTML5', icon: 'fab fa-html5', color: '#e34c26', level: 95 },
        { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#264de4', level: 92 },
        { name: 'JavaScript', icon: 'fab fa-js-square', color: '#f0db4f', level: 90 },
        { name: 'React', icon: 'fab fa-react', color: '#61dafb', level: 92 },
        { name: 'TypeScript', icon: 'fas fa-code', color: '#3178c6', level: 85 },
        { name: 'Tailwind', icon: 'fas fa-wind', color: '#38bdf8', level: 88 },
        { name: 'Next.js', icon: 'fas fa-n', color: '#ffffff', level: 85 },
    ],
    backend: [
        { name: 'Node.js', icon: 'fab fa-node-js', color: '#68a063', level: 88 },
        { name: 'Python', icon: 'fab fa-python', color: '#3776ab', level: 85 },
        { name: 'Express', icon: 'fas fa-server', color: '#ffffff', level: 87 },
        { name: 'MongoDB', icon: 'fas fa-database', color: '#4db33d', level: 83 },
        { name: 'PostgreSQL', icon: 'fas fa-database', color: '#336791', level: 80 },
        { name: 'GraphQL', icon: 'fas fa-project-diagram', color: '#e535ab', level: 78 },
        { name: 'Docker', icon: 'fab fa-docker', color: '#2496ed', level: 75 },
        { name: 'Kubernetes', icon: 'fas fa-dharmachakra', color: '#326ce5', level: 70 },
        { name: 'AWS', icon: 'fab fa-aws', color: '#ff9900', level: 77 },
    ],
    tools: [
        { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032', level: 92 },
        { name: 'GitHub', icon: 'fab fa-github', color: '#ffffff', level: 90 },
        { name: 'VS Code', icon: 'fas fa-code', color: '#007acc', level: 95 },
        { name: 'ChatGPT', icon: 'fas fa-robot', color: '#10a37f', level: 90 },
        { name: 'Claude', icon: 'fas fa-robot', color: '#d97757', level: 85 },
        { name: 'Gemini', icon: 'fas fa-star', color: '#4285f4', level: 85 },
        { name: 'macOS', icon: 'fab fa-apple', color: '#ffffff', level: 80 },
    ],

    ai: [
    { name: 'LLMs', icon: 'fas fa-brain', color: '#8b5cf6', level: 75 },
    { name: 'RAG', icon: 'fas fa-database', color: '#06b6d4', level: 70 },
    { name: 'Prompt Engineering', icon: 'fas fa-terminal', color: '#10a37f', level: 80 },
    { name: 'AI/ML Fundamentals', icon: 'fas fa-robot', color: '#6366f1', level: 65 },
    { name: 'Model Training', icon: 'fas fa-microchip', color: '#f59e0b', level: 55 }
]

 
    
};

const skillsGrid = document.getElementById('skills-grid');
const tabBtns = document.querySelectorAll('.tab-btn');

function renderSkills(category) {
    const skills = skillsData[category];
    skillsGrid.innerHTML = '';
    skills.forEach((skill, i) => {
        const card = document.createElement('div');
        card.className = 'skill-card reveal-up';
        card.style.transitionDelay = `${i * 0.05}s`;
        card.innerHTML = `
            <div class="skill-icon" style="color: ${skill.color}">
                <i class="${skill.icon}"></i>
            </div>
            <h4>${skill.name}</h4>
            <div class="skill-level">
                <div class="skill-level-fill" data-level="${skill.level}"></div>
            </div>
        `;
        skillsGrid.appendChild(card);
    });
    // Trigger animations
    setTimeout(() => {
        document.querySelectorAll('.skill-card').forEach(c => c.classList.add('revealed'));
        document.querySelectorAll('.skill-level-fill').forEach(bar => {
            bar.style.width = bar.getAttribute('data-level') + '%';
        });
    }, 100);
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSkills(btn.getAttribute('data-tab'));
    });
});

renderSkills('frontend');

/* ===========================
   PROJECTS DATA & FILTER
   =========================== */
const projectsData = [
    {
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        category: 'web',
        gradient: 'linear-gradient(135deg, #6c63ff, #00d4aa)',
        icon: 'fas fa-shopping-cart'
    },
    {
        title: 'Social Media Dashboard',
        description: 'Analytics dashboard with real-time data visualization, user insights, and automated reporting features.',
        tags: ['Vue.js', 'D3.js', 'Firebase'],
        category: 'web',
        gradient: 'linear-gradient(135deg, #ff6b6b, #ffd93d)',
        icon: 'fas fa-chart-line'
    },
    
    {
        title: 'Task Management App',
        description: 'Collaborative project management tool with real-time updates, Kanban boards, and team chat.',
        tags: ['Next.js', 'Socket.io', 'PostgreSQL'],
        category: 'web',
        gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
        icon: 'fas fa-tasks'
    },
   
];

const projectsGrid = document.getElementById('projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderProjects(filter = 'all') {
    projectsGrid.innerHTML = '';
    const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);

    filtered.forEach((project, i) => {
        const card = document.createElement('div');
        card.className = 'project-card reveal-up';
        card.style.transitionDelay = `${i * 0.1}s`;
        card.innerHTML = `
            <div class="project-thumbnail" style="background: ${project.gradient}">
                <i class="${project.icon}"></i>
                <div class="project-overlay">
                    <a href="#"><i class="fas fa-external-link-alt"></i></a>
                    <a href="#"><i class="fab fa-github"></i></a>
                </div>
            </div>
            <div class="project-info">
                <div class="project-tags">
                    ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
                </div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        projectsGrid.appendChild(card);
    });

    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(c => c.classList.add('revealed'));
    }, 100);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.getAttribute('data-filter'));
    });
});

renderProjects();

/* ===========================
   LIVE LEETCODE PROFILE
   =========================== */
const leetcodeUsername = 'Nikhil7635';
const leetcodeEndpoint = '/.netlify/functions/leetcode';
const leetcodeRefreshInterval = 60 * 1000;
let leetcodeRequestInFlight = false;
const leetcodeQuery = `
    query LiveProfile($username: String!, $year: Int) {
        matchedUser(username: $username) {
            username
            submitStats { acSubmissionNum { difficulty count submissions } }
            profile { ranking userAvatar }
            userCalendar(year: $year) { totalActiveDays streak submissionCalendar }
        }
        userContestRanking(username: $username) { rating globalRanking topPercentage }
    }
`;

function setLeetCodeText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function updateLeetCodeAvatar(url) {
    const avatar = document.getElementById('leetcode-avatar-image');
    if (!avatar || !url) return;
    avatar.classList.remove('is-unavailable');
    avatar.src = url;
    avatar.onerror = () => avatar.classList.add('is-unavailable');
}

function updateLeetCodeSyncStatus(message) {
    setLeetCodeText('leetcode-sync-status', message);
}

function updateLeetCodeActivity(calendar) {
    const chart = document.getElementById('leetcode-activity-chart');
    if (!chart || !calendar) return;

    let activity = {};
    try {
        activity = JSON.parse(calendar);
    } catch (error) {
        console.error('Unable to read LeetCode activity calendar.', error);
        return;
    }

    const now = new Date();
    const monthlyTotals = Array.from({ length: 12 }, (_, index) => {
        const month = new Date(now.getFullYear(), now.getMonth() - 11 + index, 1);
        const year = month.getFullYear();
        const monthIndex = month.getMonth();
        return Object.entries(activity).reduce((total, [timestamp, count]) => {
            const date = new Date(Number(timestamp) * 1000);
            return total + (date.getFullYear() === year && date.getMonth() === monthIndex ? Number(count) : 0);
        }, 0);
    });
    const max = Math.max(...monthlyTotals, 1);
    chart.innerHTML = monthlyTotals.map(total => `<span title="${total} submissions" style="height: ${Math.max(8, (total / max) * 100)}%"></span>`).join('');
}

async function loadLiveLeetCodeProfile() {
    if (leetcodeRequestInFlight) return;
    leetcodeRequestInFlight = true;
    try {
        const response = await fetch(`${leetcodeEndpoint}?username=${encodeURIComponent(leetcodeUsername)}&year=${new Date().getFullYear()}&refresh=${Date.now()}`, {
            method: 'GET',
            cache: 'no-store',
            headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' }
        });
        if (!response.ok) throw new Error(`LeetCode returned HTTP ${response.status}.`);

        const payload = await response.json();
        if (payload.errors || !payload.data?.matchedUser) {
            throw new Error(payload.errors?.[0]?.message || 'Profile data was not returned.');
        }

        const profile = payload.data.matchedUser;
        const submissions = profile.submitStats.acSubmissionNum;
        const findDifficulty = difficulty => submissions.find(item => item.difficulty === difficulty) || { count: 0, submissions: 0 };
        const all = findDifficulty('All');
        const easy = findDifficulty('Easy');
        const medium = findDifficulty('Medium');
        const hard = findDifficulty('Hard');

        setLeetCodeText('leetcode-username', profile.username);
        updateLeetCodeAvatar(profile.profile.userAvatar);
        setLeetCodeText('leetcode-solved', all.count);
        setLeetCodeText('leetcode-solved-total', all.count);
        setLeetCodeText('leetcode-easy', easy.count);
        setLeetCodeText('leetcode-medium', medium.count);
        setLeetCodeText('leetcode-hard', hard.count);
        setLeetCodeText('leetcode-acceptance', `${all.submissions ? ((all.count / all.submissions) * 100).toFixed(1) : 0}%`);
        setLeetCodeText('leetcode-streak', `${profile.userCalendar.streak || 0} days`);
        setLeetCodeText('leetcode-ranking', profile.profile.ranking ? `#${profile.profile.ranking.toLocaleString()}` : '—');
        setLeetCodeText('leetcode-rating', payload.data.userContestRanking?.rating ? Math.round(payload.data.userContestRanking.rating) : '—');

        [['easy', easy.count], ['medium', medium.count], ['hard', hard.count]].forEach(([difficulty, count]) => {
            const bar = document.getElementById(`leetcode-${difficulty}-bar`);
            if (bar) bar.style.width = `${all.count ? (count / all.count) * 100 : 0}%`;
        });
        updateLeetCodeActivity(profile.userCalendar.submissionCalendar);
        updateLeetCodeSyncStatus(`Live · updated ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    } catch (error) {
        console.error('Live LeetCode profile update failed.', error);
        updateLeetCodeSyncStatus('Live sync unavailable · retrying soon');
    } finally {
        leetcodeRequestInFlight = false;
    }
}

loadLiveLeetCodeProfile();
setInterval(loadLiveLeetCodeProfile, leetcodeRefreshInterval);
window.addEventListener('focus', loadLiveLeetCodeProfile);
window.addEventListener('pageshow', loadLiveLeetCodeProfile);
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') loadLiveLeetCodeProfile();
});

/* ===========================
   TESTIMONIALS SLIDER
   =========================== */
const track = document.getElementById('testimonial-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('slider-dots');
const cards = document.querySelectorAll('.testimonial-card');

let currentSlide = 0;
let slidesPerView = window.innerWidth >= 768 ? 2 : 1;
const totalSlides = cards.length;

// Create dots
function createDots() {
    if (!dotsContainer || !track || totalSlides === 0) return;
    dotsContainer.innerHTML = '';
    const dotCount = totalSlides - slidesPerView + 1;
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function goToSlide(index) {
    if (!track || totalSlides === 0) return;
    const maxSlide = totalSlides - slidesPerView;
    currentSlide = Math.max(0, Math.min(index, maxSlide));
    const offset = currentSlide * (100 / slidesPerView);
    track.style.transform = `translateX(-${offset}%)`;

    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
}

window.addEventListener('resize', () => {
    slidesPerView = window.innerWidth >= 768 ? 2 : 1;
    createDots();
    goToSlide(0);
});

createDots();

// Auto slide
setInterval(() => {
    if (!track || totalSlides === 0) return;
    const maxSlide = totalSlides - slidesPerView;
    goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
}, 5000);

/* ===========================
   CONTACT FORM
   =========================== */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    const honeypot = contactForm.querySelector('[name="_honey"]');

    if (honeypot.value) return;

    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { Accept: 'application/json' },
            redirect: 'follow'
        });

        let result;
        try {
            result = await response.json();
        } catch (error) {
            throw new Error(`Contact service returned an invalid response (HTTP ${response.status}).`);
        }

        const serviceAccepted = result.success === 'true' || result.success === true;
        if (!response.ok || !serviceAccepted) {
            throw new Error(result.message || `Contact service returned HTTP ${response.status}.`);
        }

        formStatus.textContent = 'Message sent successfully. I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        contactForm.reset();
    } catch (error) {
        console.error('Contact form submission failed.', error);
        formStatus.textContent = 'I couldn\'t send your message right now. Please email me directly at itsmenikhil90@gmail.com.';
        formStatus.className = 'form-status error';
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

/* ===========================
   BACK TO TOP
   =========================== */
const backToTop = document.getElementById('back-to-top');
if (backToTop) backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===========================
   SKILL LEVEL ANIMATION ON SCROLL
   =========================== */
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

window.addEventListener('scroll', () => {
    if (!skillsAnimated) {
        if (!skillsSection) return;
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 200) {
            document.querySelectorAll('.skill-level-fill').forEach(bar => {
                bar.style.width = bar.getAttribute('data-level') + '%';
            });
            skillsAnimated = true;
        }
    }
});