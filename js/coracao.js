const button = document.getElementById('heart-button');
let raining = true;

// Corações caindo
const rainInterval = setInterval(() => {
  if (raining) createFallingHeart();
}, 200);

function createFallingHeart() {
  const heart = document.createElement("div");
  heart.classList.add("falling-heart");
  heart.textContent = "💗";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 15 + Math.random() * 25 + "px";
  heart.style.animationDuration = 3 + Math.random() * 2 + "s";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

button.addEventListener('click', () => {
  raining = false;
  clearInterval(rainInterval);

  explodeHearts();

  setTimeout(() => {
    window.location.href = "page/index.html";
  }, 1000);
});

function explodeHearts() {
  const count = 20;
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.classList.add("exploding-heart");
    heart.textContent = "💖";

    // Posiciona no centro do botão
    heart.style.left = `${centerX}px`;
    heart.style.top = `${centerY}px`;

    // Direção aleatória
    const angle = Math.random() * 2 * Math.PI;
    const distance = 150 + Math.random() * 100;
    const x = Math.cos(angle) * distance + "px";
    const y = Math.sin(angle) * distance + "px";

    heart.style.setProperty('--x', x);
    heart.style.setProperty('--y', y);

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
}
