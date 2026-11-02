import { cart } from '../data/cart.js';

const quantity = cart.reduce((total, item) => total + item.quantity, 0);
const cartCount = document.querySelector('.js-cart-quantity');

if (cartCount) {
  cartCount.textContent = quantity;
}
