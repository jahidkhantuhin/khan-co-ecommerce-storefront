import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

const productGrid = document.querySelector('.js-products-grid');
const searchInput = document.querySelector('.search-bar');
const productCount = document.querySelector('.js-product-count');
const emptyResults = document.querySelector('.js-empty-results');
const categoryButtons = document.querySelectorAll('.category-filter');
let activeCategory = 'all';

function getCategory(product) {
  const keywords = product.keywords.join(' ').toLowerCase();
  if (keywords.includes('kitchen') || keywords.includes('cook') || keywords.includes('dining') || keywords.includes('baking')) {
    return 'kitchen';
  }
  if (keywords.includes('apparel') || keywords.includes('mens') || keywords.includes('womens') || keywords.includes('shirt')) {
    return 'apparel';
  }
  if (keywords.includes('home') || keywords.includes('bedroom') || keywords.includes('bathroom') || keywords.includes('towels')) {
    return 'home';
  }
  if (keywords.includes('shoes') || keywords.includes('footwear') || keywords.includes('sandals')) {
    return 'footwear';
  }
  return 'all';
}

function updateCartQuantity() {
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('.js-cart-quantity').textContent = cartQuantity;
}

function renderProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const visibleProducts = products.filter((product) => {
    const matchesSearch = `${product.name} ${product.keywords.join(' ')}`.toLowerCase().includes(searchTerm);
    const matchesCategory = activeCategory === 'all' || getCategory(product) === activeCategory;
    return matchesSearch && matchesCategory;
  });

  productCount.textContent = visibleProducts.length;
  emptyResults.hidden = visibleProducts.length !== 0;
  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-category">${getCategory(product) === 'all' ? 'A good find' : getCategory(product)}</span>
      </div>
      <div class="product-name limit-text-to-2-lines">${product.name}</div>
      <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png" alt="${product.rating.stars} out of 5 stars">
        <span class="product-rating-count">(${product.rating.count})</span>
      </div>
      <div class="product-card-bottom">
        <div class="product-price">$${formatCurrency(product.priceCents)}</div>
        <label class="product-quantity-container">
          <span class="visually-hidden">Quantity</span>
          <select class="js-product-quantity" aria-label="Quantity for ${product.name}">
            ${Array.from({ length: 10 }, (_, index) => `<option value="${index + 1}">${index + 1}</option>`).join('')}
          </select>
        </label>
      </div>
      <div class="added-to-cart" aria-live="polite">
        <img src="images/icons/checkmark.png" alt="">
        Added to your bag
      </div>
      <button class="add-to-cart-button button-primary js-add-to-cart" type="button" data-product-id="${product.id}">
        Add to bag <span aria-hidden="true">+</span>
      </button>
    </article>
  `).join('');

  productGrid.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.product-container');
      const quantity = Number(card.querySelector('.js-product-quantity').value);
      for (let index = 0; index < quantity; index += 1) {
        addToCart(button.dataset.productId);
      }
      updateCartQuantity();
      const message = card.querySelector('.added-to-cart');
      message.classList.add('is-visible');
      window.setTimeout(() => message.classList.remove('is-visible'), 1600);
    });
  });
}

searchInput.addEventListener('input', renderProducts);
document.querySelector('.search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' });
});

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeCategory = button.dataset.category;
    categoryButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });
    renderProducts();
  });
});

const initialSearch = new URLSearchParams(window.location.search).get('q');
if (initialSearch) searchInput.value = initialSearch;
updateCartQuantity();
renderProducts();
