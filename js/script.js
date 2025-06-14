document.addEventListener('DOMContentLoaded', function () {
    const carouselSlide = document.querySelector('.carousel-slide');

    const photos = [
        './assets/ft01.jpeg',
        './assets/ft02.jpeg',
        './assets/ft03.jpeg',
        './assets/ft04.jpeg',
        './assets/ft05.jpeg',
        './assets/ft06.jpeg',
        './assets/ft07.jpeg',
        './assets/ft08.jpeg',
        './assets/ft09.jpeg'
    ];
    
     // Adiciona imagens ao carrossel
    photos.forEach((photo, index) => {
        const img = document.createElement('img');
        img.src = photo;
        img.alt = `Nossa foto ${index + 1}`;
        carouselSlide.appendChild(img);
    });
    
    // Clonar a primeira e a última imagem
    const images = document.querySelectorAll('.carousel-slide img');
    const firstClone = images[0].cloneNode();
    const lastClone = images[images.length - 1].cloneNode();
    
    firstClone.id = 'firstClone';
    lastClone.id = 'lastClone';
    
    carouselSlide.appendChild(firstClone);
    carouselSlide.insertBefore(lastClone, images[0]);
    
    const allImages = document.querySelectorAll('.carousel-slide img');
    let counter = 1;
    let size = allImages[0].clientWidth;

    carouselSlide.style.transform = `translateX(${-size * counter}px)`;

    window.addEventListener('resize', () => {
        size = allImages[0].clientWidth;
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    });

    function moveCarousel() {
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        counter++;
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    }

    let interval = setInterval(moveCarousel, 3000);

    carouselSlide.addEventListener('transitionend', () => {
        if (allImages[counter].id === 'lastClone') {
            carouselSlide.style.transition = 'none';
            counter = allImages.length - 2;
            carouselSlide.style.transform = `translateX(${-size * counter}px)`;
        }

        if (allImages[counter].id === 'firstClone') {
            carouselSlide.style.transition = 'none';
            counter = 1;
            carouselSlide.style.transform = `translateX(${-size * counter}px)`;
        }
    });

   function updateTimeTogether() {
    const startDate = new Date(2020, 5, 14);
    
    const now = new Date();
    
    // tempo decorrido
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    // Ajuste para dias negativos
    if (days < 0) {
        months--;
        // Pegar o último dia do mês anterior
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += lastDayOfMonth;
    }

    // Ajuste para meses negativos
    if (months < 0) {
        years--;
        months += 12;
    }

    // Horas, minutos e segundos atuais
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Atualiza a exibição
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Atualiza a cada segundo
setInterval(updateTimeTogether, 1000);
updateTimeTogether(); // Executa imediatamente
});

// Estrelas animadas
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const starCount = 150;
const stars = [];

for (let i = 0; i < starCount; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3
    });
}

function drawStars() {
    ctx.fillStyle = '#0b0c2a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.x += star.dx;
        star.y += star.dy;

        if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
    });

    requestAnimationFrame(drawStars);
}
drawStars();
