// ===== Language Switcher =====
const LANGUAGE_KEY = 'cursed-errors-lang';
let currentLang = localStorage.getItem(LANGUAGE_KEY) || 'en';

function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');

    // Set initial language
    setLanguage(currentLang);

    // Add click handlers
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            localStorage.setItem(LANGUAGE_KEY, lang);
        });
    });
}

function setLanguage(lang) {
    currentLang = lang;

    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update content
    document.querySelectorAll('[data-en][data-ja]').forEach(element => {
        const text = element.dataset[lang];
        if (text) {
            // Check if element is an input or textarea
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = text;
            } else {
                element.textContent = text;
            }
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
}

// ===== Particle Background =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleEmojis = ['💀', '⚡', '✨', '🌟', '💫', '👻', '💜', '🔥', '💥'];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];

        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation delay
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';

        particlesContainer.appendChild(particle);
    }
}

// ===== Copy to Clipboard =====
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const textToCopy = btn.dataset.copy || btn.previousElementSibling?.textContent;

            if (textToCopy) {
                try {
                    await navigator.clipboard.writeText(textToCopy);

                    // Visual feedback
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<span style="font-size: 12px;">✓ Copied!</span>';
                    btn.style.background = '#00D4FF';

                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.style.background = '';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                    // Fallback for older browsers
                    fallbackCopyTextToClipboard(textToCopy, btn);
                }
            }
        });
    });
}

function fallbackCopyTextToClipboard(text, btn) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span style="font-size: 12px;">✓ Copied!</span>';
        btn.style.background = '#00D4FF';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 2000);
    } catch (err) {
        console.error('Fallback: Could not copy text:', err);
    }

    document.body.removeChild(textArea);
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card, .theme-card, .install-step, .config-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== Theme Cards Hover Effect =====
function initThemeCards() {
    const themeCards = document.querySelectorAll('.theme-card');

    themeCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const theme = card.dataset.theme;

            // Add sparkle effect
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = '2rem';
            sparkle.textContent = '✨';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.animation = 'sparkle 1s ease forwards';

            card.style.position = 'relative';
            card.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        });
    });

    // Add sparkle animation
    if (!document.getElementById('sparkle-animation')) {
        const style = document.createElement('style');
        style.id = 'sparkle-animation';
        style.textContent = `
            @keyframes sparkle {
                0% {
                    opacity: 0;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.5) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===== Feature Cards Interactive Effect =====
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== Floating Emojis on Cursor =====
function initCursorEffects() {
    let lastTime = 0;
    const throttleDelay = 200; // ms

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < throttleDelay) return;
        lastTime = now;

        // Only create effects on certain areas
        if (e.target.closest('.hero, .cta')) {
            createFloatingEmoji(e.clientX, e.clientY);
        }
    });
}

function createFloatingEmoji(x, y) {
    const emojis = ['✨', '💫', '⭐'];
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = 'fixed';
    emoji.style.left = x + 'px';
    emoji.style.top = y + 'px';
    emoji.style.fontSize = '1.5rem';
    emoji.style.pointerEvents = 'none';
    emoji.style.zIndex = '9999';
    emoji.style.animation = 'float-up 2s ease forwards';

    document.body.appendChild(emoji);

    setTimeout(() => emoji.remove(), 2000);
}

// Add float-up animation
if (!document.getElementById('float-up-animation')) {
    const style = document.createElement('style');
    style.id = 'float-up-animation';
    style.textContent = `
        @keyframes float-up {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== Easter Egg: Konami Code =====
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    // Create a shower of emojis
    const emojiShower = ['💀', '⚡', '✨', '🌟', '💫', '👻', '💜', '🔥', '💥', '🎉', '🎊'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojiShower[Math.floor(Math.random() * emojiShower.length)];
            emoji.style.position = 'fixed';
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.top = '-50px';
            emoji.style.fontSize = '2rem';
            emoji.style.pointerEvents = 'none';
            emoji.style.zIndex = '99999';
            emoji.style.animation = 'fall 3s linear forwards';

            document.body.appendChild(emoji);

            setTimeout(() => emoji.remove(), 3000);
        }, i * 100);
    }

    // Show message
    const message = document.createElement('div');
    message.textContent = currentLang === 'ja' ? '🎉 イースターエッグを発見！ 🎉' : '🎉 Easter Egg Found! 🎉';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.fontSize = '3rem';
    message.style.fontWeight = '900';
    message.style.color = '#FFD700';
    message.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
    message.style.zIndex = '100000';
    message.style.pointerEvents = 'none';
    message.style.animation = 'pulse 1s ease infinite';

    document.body.appendChild(message);

    setTimeout(() => message.remove(), 3000);
}

// Add fall animation
if (!document.getElementById('fall-animation')) {
    const style = document.createElement('style');
    style.id = 'fall-animation';
    style.textContent = `
        @keyframes fall {
            0% {
                top: -50px;
                transform: rotate(0deg);
                opacity: 1;
            }
            100% {
                top: 100%;
                transform: rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== Analytics (Placeholder) =====
function initAnalytics() {
    // Track page view
    console.log('Page viewed:', window.location.pathname);

    // Track button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget;
            const label = target.textContent.trim();
            const href = target.getAttribute('href');
            console.log('Button clicked:', label, href);
            // Here you would send to your analytics service
        });
    });
}

// ===== Initialize Everything =====
function init() {
    // Core functionality
    initLanguageSwitcher();
    createParticles();
    initCopyButtons();
    initSmoothScroll();

    // Visual effects
    initScrollAnimations();
    initThemeCards();
    initFeatureCards();
    initCursorEffects();

    // Easter eggs
    initKonamiCode();

    // Analytics
    initAnalytics();

    console.log('%c🎉 Cursed Errors Landing Page Loaded! ⚡✨', 'color: #7000B4; font-size: 20px; font-weight: bold;');
    console.log('%cTry the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #00D4FF; font-size: 14px;');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { setLanguage, createParticles };
}
