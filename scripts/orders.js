import { addToCart, cart } from '../data/cart.js';

const cartCount = document.querySelector('.js-cart-quantity');
const updateCartCount = () => {
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
};

updateCartCount();

document.querySelectorAll('.js-buy-again').forEach((button) => {
  button.addEventListener('click', () => {
    addToCart(button.dataset.productId);
    updateCartCount();
    const message = button.querySelector('.buy-again-message');
    const originalMessage = message.textContent;
    message.textContent = 'Added to your bag';
    window.setTimeout(() => {
      message.textContent = originalMessage;
    }, 1400);
  });
});
