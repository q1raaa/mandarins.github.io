const cart = [];
const cartItemsList = document.querySelector('.cart-items');
const totalPriceElement = document.querySelector('.total-price');
const cartIcon = document.getElementById('cart-icon');
const cartMenu = document.getElementById('cart-menu');
const closeCartButton = document.getElementById('close-cart');

const buyButtons = document.querySelectorAll('.buy-btn');
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);
        const imageSrc = card.querySelector('img').src;

        cart.push({ name, price, imageSrc });
        updateCart();
    });
});

cartIcon.addEventListener('click', () => {
    cartMenu.classList.add('open'); // Показываем корзину
});

closeCartButton.addEventListener('click', () => {
    cartMenu.classList.remove('open'); // Скрываем корзину
});

function updateCart() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img src="${item.imageSrc}" alt="${item.name}">
            <p>${item.name} - ${item.price} грн</p>
            <button class="remove-btn">Удалить</button>
        `;
        cartItemsList.appendChild(div);

        total += item.price;
    });

    totalPriceElement.textContent = total;

    document.querySelectorAll('.remove-btn').forEach((button, index) => {
        button.addEventListener('click', () => {
            cart.splice(index, 1); // Удалить товар
            updateCart();
        });
    });
}

// Динамическое создание мандаринов
function createMandarin() {
    const mandarinContainer = document.getElementById('mandarin-container');

    const mandarin = document.createElement('div');
    mandarin.classList.add('mandarin');
    
    const startPositionX = Math.random() * (window.innerWidth - 80); // Учитываем размер мандарина
    const startPositionY = Math.random() * (window.innerHeight - 80); // Учитываем размер мандарина
    
    mandarin.style.left = `${startPositionX}px`;
    mandarin.style.top = `${startPositionY}px`;
    
    mandarinContainer.appendChild(mandarin);

    mandarin.addEventListener('animationiteration', () => {
        mandarin.remove();
    });
}

setInterval(createMandarin, 1500); // Создание мандаринов через 1.5 секунды
