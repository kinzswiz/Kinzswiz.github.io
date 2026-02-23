const products = [
  { id: 1, name: 'Apex Runner Sneakers', category: 'Shoes', price: 79 },
  { id: 2, name: 'Urban Leather Tote', category: 'Bags', price: 65 },
  { id: 3, name: 'Chrono Minimal Watch', category: 'Watches', price: 120 },
  { id: 4, name: 'Summit Trail Boots', category: 'Shoes', price: 95 },
  { id: 5, name: 'Commuter Sling Bag', category: 'Bags', price: 54 },
  { id: 6, name: 'Orbit Steel Watch', category: 'Watches', price: 140 }
];

const productGrid = document.getElementById('productGrid');
const categoryFilter = document.getElementById('categoryFilter');
const cartCount = document.getElementById('cartCount');
const cartButton = document.getElementById('cartButton');
const cartPanel = document.getElementById('cartPanel');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMessage = document.getElementById('newsletterMessage');

const cart = [];

function renderProducts(filter = 'all') {
  const visibleProducts = filter === 'all'
    ? products
    : products.filter((item) => item.category === filter);

  productGrid.innerHTML = visibleProducts
    .map(
      (item) => `
        <article class="product-card">
          <p>${item.category}</p>
          <h3>${item.name}</h3>
          <p class="price">$${item.price}</p>
          <button data-id="${item.id}">Add to cart</button>
        </article>
      `
    )
    .join('');
}

function renderCart() {
  if (!cart.length) {
    cartItems.innerHTML = '<li>Your cart is empty.</li>';
    cartTotal.textContent = '$0';
    cartCount.textContent = '0';
    return;
  }

  cartItems.innerHTML = cart
    .map((item) => `<li><span>${item.name} × ${item.qty}</span><strong>$${item.qty * item.price}</strong></li>`)
    .join('');

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  cartTotal.textContent = `$${total}`;
  cartCount.textContent = String(count);
}

productGrid.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]');
  if (!button) return;

  const id = Number(button.dataset.id);
  const selected = products.find((product) => product.id === id);
  const found = cart.find((item) => item.id === id);

  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...selected, qty: 1 });
  }

  renderCart();
});

categoryFilter.addEventListener('change', () => {
  renderProducts(categoryFilter.value);
});

cartButton.addEventListener('click', () => {
  cartPanel.classList.add('open');
  cartPanel.setAttribute('aria-hidden', 'false');
});

closeCart.addEventListener('click', () => {
  cartPanel.classList.remove('open');
  cartPanel.setAttribute('aria-hidden', 'true');
});

checkoutBtn.addEventListener('click', () => {
  if (!cart.length) {
    alert('Your cart is empty. Add some products first!');
    return;
  }

  alert('Checkout successful. Thank you for your order!');
  cart.length = 0;
  renderCart();
  cartPanel.classList.remove('open');
});

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailInput = document.getElementById('emailInput');

  newsletterMessage.textContent = `Thanks for subscribing, ${emailInput.value}!`;
  newsletterForm.reset();
});

renderProducts();
renderCart();
