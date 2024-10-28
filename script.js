const playground = document.getElementById('playground');
const themeToggle = document.getElementById('themeToggle');
const animationToggle = document.getElementById('animationToggle');
let isNightMode = false;
let isAnimating = false;

const messages = [
    "¡Creatividad! ✨",
    "¡Diversión! 🎨",
    "¡Imaginación! 🌈",
    "¡Libertad! 🦋",
    "¡Magia! ⭐",
    "¡Inspírate! 🎭",
    "¡Sueña! 🌙",
    "¡Crea! 🎪"
];

const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEEAD',
    '#D4A5A5',
    '#9B5DE5',
    '#F15BB5'
];

function createBubble(x, y) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    
    const randomIndex = Math.floor(Math.random() * messages.length);
    bubble.textContent = messages[randomIndex];
    bubble.style.background = colors[randomIndex];
    
    bubble.style.animationDelay = `${Math.random() * 2}s`;
    playground.appendChild(bubble);

    bubble.addEventListener('click', () => {
        bubble.style.transform = 'scale(1.3)';
        createParticles(x, y);
        setTimeout(() => {
            bubble.style.transform = 'scale(1)';
        }, 300);
    });
}

function createParticles(x, y) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        
        const angle = (Math.random() * Math.PI * 2);
        const velocity = Math.random() * 5 + 2;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        
        playground.appendChild(particle);
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        function animate() {
            if (opacity <= 0) {
                particle.remove();
                return;
            }
            
            posX += dx;
            posY += dy;
            opacity -= 0.02;
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}

function toggleTheme() {
    isNightMode = !isNightMode;
    document.body.classList.toggle('night-mode');
    document.body.classList.toggle('day-mode');
    themeToggle.textContent = isNightMode ? '☀️' : '🌙';
    
    if (isNightMode) {
        createStars();
    } else {
        document.querySelectorAll('.star').forEach(star => star.remove());
    }
}

function createStars() {
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animation = `twinkle ${Math.random() * 3 + 1}s infinite`;
        playground.appendChild(star);
    }
}

function toggleAnimation() {
    isAnimating = !isAnimating;
    animationToggle.textContent = isAnimating ? '⏸️' : '▶️';
    
    if (isAnimating) {
        startBubbleAnimation();
    }
}

function startBubbleAnimation() {
    if (!isAnimating) return;
    
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    createBubble(x, y);
    
    setTimeout(startBubbleAnimation, 2000);
}

playground.addEventListener('click', (e) => {
    if (e.target === playground) {
        createBubble(e.clientX, e.clientY);
        createParticles(e.clientX, e.clientY);
    }
});

themeToggle.addEventListener('click', toggleTheme);
animationToggle.addEventListener('click', toggleAnimation);

// Inicializar con algunas burbujas
for (let i = 0; i < 5; i++) {
    createBubble(
        Math.random() * (window.innerWidth - 100),
        Math.random() * (window.innerHeight - 100)
    );
}
