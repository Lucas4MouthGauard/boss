// GirlBoss Pixel Website - Optimized JavaScript
class GirlBossApp {
    constructor() {
        this.isLoaded = false;
        this.particles = [];
        this.matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.initMatrix();
        this.initParticles();
        
        // Simulate loading with progress
        this.simulateLoading();
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const progress = document.getElementById('loadingProgress');
        
        let currentProgress = 0;
        const targetProgress = 100;
        const duration = 3000; // 3 seconds
        const increment = targetProgress / (duration / 16); // 60fps
        
        const updateProgress = () => {
            currentProgress += increment;
            if (currentProgress >= targetProgress) {
                currentProgress = targetProgress;
                progress.style.width = currentProgress + '%';
                
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    this.startAnimations();
                }, 500);
                return;
            }
            
            progress.style.width = currentProgress + '%';
            requestAnimationFrame(updateProgress);
        };
        
        updateProgress();
    }

    simulateLoading() {
        // Preload critical resources
        const img = new Image();
        img.onload = () => {
            this.isLoaded = true;
        };
        img.src = 'girlboss.png';
    }

    setupEventListeners() {
        // Power button interaction
        const powerBtn = document.getElementById('powerBtn');
        if (powerBtn) {
            powerBtn.addEventListener('click', this.activatePower.bind(this));
        }

        // CA Address copy functionality
        const copyCABtn = document.getElementById('copyCA');
        if (copyCABtn) {
            copyCABtn.addEventListener('click', this.copyCAAddress.bind(this));
        }

        // Buy button (disabled for now)
        const buyBtn = document.getElementById('buyBtn');
        if (buyBtn) {
            buyBtn.addEventListener('click', this.handleBuyClick.bind(this));
        }

        // Smooth scrolling for navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.smoothScroll.bind(this));
        });

        // Intersection Observer for animations
        this.setupIntersectionObserver();

        // Optimize scroll performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(this.handleScroll.bind(this));
                ticking = true;
            }
        });

        // Resize handler with debouncing
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    smoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animate power bars when they come into view
                    if (entry.target.classList.contains('power')) {
                        this.animatePowerBars();
                    }
                }
            });
        }, options);

        // Observe sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    animatePowerBars() {
        const powerBars = document.querySelectorAll('.bar-fill');
        powerBars.forEach((bar, index) => {
            setTimeout(() => {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
                
                // Add sound effect simulation
                this.playPowerUpEffect(bar);
            }, index * 200);
        });
    }

    playPowerUpEffect(element) {
        // Visual feedback for power up
        element.style.boxShadow = '0 0 30px rgba(255, 0, 110, 1)';
        setTimeout(() => {
            element.style.boxShadow = '0 0 20px rgba(255, 0, 110, 0.5)';
        }, 300);
    }

    activatePower() {
        const btn = document.getElementById('powerBtn');
        const originalText = btn.textContent;
        
        // Button animation
        btn.style.transform = 'scale(0.95)';
        btn.textContent = 'POWER ACTIVATED!';
        btn.style.background = 'linear-gradient(45deg, #39ff14, #00d4ff)';
        
        // Screen flash effect
        this.createScreenFlash();
        
        // Particle burst
        this.createParticleBurst();
        
        // Glitch effect on title
        this.createGlitchEffect();
        
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            btn.textContent = originalText;
            btn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
        }, 2000);
    }

    createScreenFlash() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(57, 255, 20, 0.3), transparent);
            pointer-events: none;
            z-index: 9998;
            animation: flash 0.5s ease-out;
        `;
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            document.body.removeChild(flash);
        }, 500);
    }

    createParticleBurst() {
        const heroImage = document.querySelector('.girlboss-image');
        const rect = heroImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 20; i++) {
            this.createBurstParticle(centerX, centerY);
        }
    }

    createBurstParticle(x, y) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * Math.random());
        const velocity = 2 + Math.random() * 4;
        const size = 4 + Math.random() * 6;
        const colors = ['#ff006e', '#8338ec', '#3a86ff', '#39ff14', '#ff10f0'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            left: ${x}px;
            top: ${y}px;
            box-shadow: 0 0 10px ${color};
        `;
        
        document.body.appendChild(particle);
        
        let currentX = x;
        let currentY = y;
        let currentVelocity = velocity;
        let opacity = 1;
        
        const animate = () => {
            currentX += Math.cos(angle) * currentVelocity;
            currentY += Math.sin(angle) * currentVelocity;
            currentVelocity *= 0.98; // Deceleration
            opacity -= 0.02;
            
            particle.style.left = currentX + 'px';
            particle.style.top = currentY + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        };
        
        requestAnimationFrame(animate);
    }

    createGlitchEffect() {
        const title = document.querySelector('.main-title');
        title.style.animation = 'glitch 0.5s ease-in-out';
        
        setTimeout(() => {
            title.style.animation = 'glitch 3s infinite';
        }, 500);
    }

    copyCAAddress() {
        const caAddress = document.getElementById('caAddress').textContent;
        const copyBtn = document.getElementById('copyCA');
        
        // Try to copy to clipboard
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(caAddress).then(() => {
                this.showCopySuccess(copyBtn);
            }).catch(() => {
                this.fallbackCopyTextToClipboard(caAddress, copyBtn);
            });
        } else {
            this.fallbackCopyTextToClipboard(caAddress, copyBtn);
        }
    }

    fallbackCopyTextToClipboard(text, btn) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopySuccess(btn);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
    }

    showCopySuccess(btn) {
        btn.classList.add('ca-copied');
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = `
            <svg class="copy-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
        `;
        
        setTimeout(() => {
            btn.classList.remove('ca-copied');
            btn.innerHTML = originalHTML;
        }, 1000);
    }

    handleBuyClick() {
        // Show coming soon message
        const btn = document.getElementById('buyBtn');
        const originalText = btn.textContent;
        
        btn.textContent = 'COMING SOON...';
        
        // Create notification
        this.showNotification('BUY functionality coming soon! Stay tuned! 🚀');
        
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-family: var(--font-tech);
            font-weight: 700;
            box-shadow: 0 10px 30px rgba(255, 0, 110, 0.5);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }

    initMatrix() {
        const canvas = document.getElementById('matrix-bg');
        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const columns = Math.floor(canvas.width / 20);
        const drops = Array(columns).fill(1);
        
        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff41';
            ctx.font = '15px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const char = this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
                ctx.fillText(char, i * 20, drops[i] * 20);
                
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        // Optimize animation loop
        let lastTime = 0;
        const targetFPS = 30;
        const frameTime = 1000 / targetFPS;
        
        const animate = (currentTime) => {
            if (currentTime - lastTime >= frameTime) {
                drawMatrix();
                lastTime = currentTime;
            }
            requestAnimationFrame(animate);
        };
        
        animate(0);
    }

    initParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = window.innerWidth < 768 ? 30 : 50; // Reduce on mobile
        
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const startX = Math.random() * window.innerWidth;
            const duration = 6000 + Math.random() * 4000;
            const size = 2 + Math.random() * 4;
            const colors = ['#ff006e', '#8338ec', '#3a86ff', '#39ff14'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                left: ${startX}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                box-shadow: 0 0 ${size * 2}px ${color};
                animation: float ${duration}ms linear infinite;
            `;
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                if (particlesContainer.contains(particle)) {
                    particlesContainer.removeChild(particle);
                }
            }, duration);
        };
        
        // Create initial particles
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => createParticle(), i * 200);
        }
        
        // Continuously create new particles
        setInterval(createParticle, 2000);
    }

    startAnimations() {
        // Add CSS class to trigger animations
        document.body.classList.add('loaded');
        
        // Start any additional animations
        this.animateOnScroll();
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.about-card, .power-bar');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero image
        const heroImage = document.querySelector('.girlboss-image');
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${rate * 0.3}px)`;
        }
        
        // Update header background opacity
        const header = document.querySelector('.header');
        if (header) {
            const opacity = Math.min(scrolled / 100, 0.95);
            header.style.background = `rgba(10, 10, 10, ${opacity})`;
        }
    }

    handleResize() {
        // Reinitialize matrix canvas
        const canvas = document.getElementById('matrix-bg');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
}

// Performance optimizations
const addCSSAnimation = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flash {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
        
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    addCSSAnimation();
    new GirlBossApp();
});

// Service Worker for caching (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Preload critical resources
const preloadResources = () => {
    const criticalResources = [
        'girlboss.png'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.png') ? 'image' : 'fetch';
        document.head.appendChild(link);
    });
};

// Initialize preloading
preloadResources();

// Twitter functionality enhancement
document.addEventListener('click', (e) => {
    // Handle Twitter share buttons
    if (e.target.closest('.social-btn.twitter-share')) {
        e.preventDefault();
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('Just discovered the ultimate GirlBoss energy on @girlbossonsol! 💪🎮 #GirlBoss #PixelPower');
        const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
    }
    
    // Handle direct Twitter profile links (let them navigate normally)
    // No need to intercept .btn-twitter or .social-btn.twitter as they go directly to the profile
});