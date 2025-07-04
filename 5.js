
// cart.js - Cart functionality for Karthik Tech Solutions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart if it doesn't exist in localStorage
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // Cart state
    let cart = JSON.parse(localStorage.getItem('cart'));

    // DOM elements
    const cartIcon = document.createElement('div');
    cartIcon.id = 'cart-icon';
    cartIcon.innerHTML = `
        <a href="#cart-modal" data-bs-toggle="modal" class="position-relative">
            <i class="fas fa-shopping-cart fa-lg text-white"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cart-count">
                ${cart.length}
            </span>
        </a>
    `;

    // Add cart icon to navbar
    const navbar = document.querySelector('.navbar .container');
    const cartIconContainer = document.createElement('div');
    cartIconContainer.className = 'ms-3';
    cartIconContainer.appendChild(cartIcon);
    navbar.appendChild(cartIconContainer);

    // Create cart modal
    const cartModal = document.createElement('div');
    cartModal.className = 'modal fade';
    cartModal.id = 'cart-modal';
    cartModal.tabIndex = '-1';
    cartModal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Your Cart</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="cart-items-container">
                        ${cart.length === 0 ? 
                            '<p class="text-center">Your cart is empty</p>' : 
                            generateCartItemsHTML(cart)}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Continue Browsing</button>
                    <button type="button" class="btn btn-primary" id="checkout-btn">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(cartModal);

    // Add "Add to Cart" buttons to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const serviceTitle = card.querySelector('h3').textContent;
        const serviceDescription = card.querySelector('p').textContent;
        
        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'btn btn-primary btn-sm mt-3';
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.addEventListener('click', () => {
            addToCart({
                title: serviceTitle,
                description: serviceDescription,
                price: 99.99 // Default price, you can customize this
            });
        });
        
        card.querySelector('.card-body').appendChild(addToCartBtn);
    });

    // Add to cart function
    function addToCart(item) {
        // Check if item already exists in cart
        const existingItem = cart.find(cartItem => cartItem.title === item.title);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            item.quantity = 1;
            cart.push(item);
        }
        
        updateCart();
        
        // Show toast notification
        showToast(`${item.title} added to cart`);
    }

    // Update cart in UI and localStorage
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('cart-count').textContent = cart.length;
        
        const cartItemsContainer = document.getElementById('cart-items-container');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = cart.length === 0 ? 
                '<p class="text-center">Your cart is empty</p>' : 
                generateCartItemsHTML(cart);
        }
    }

    // Generate HTML for cart items
    function generateCartItemsHTML(cartItems) {
        let total = 0;
        let html = `
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        cartItems.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            html += `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.description}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>
                        <div class="input-group input-group-sm" style="width: 100px;">
                            <button class="btn btn-outline-secondary decrease-quantity" data-index="${index}" type="button">-</button>
                            <input type="text" class="form-control text-center quantity-input" value="${item.quantity}" readonly>
                            <button class="btn btn-outline-secondary increase-quantity" data-index="${index}" type="button">+</button>
                        </div>
                    </td>
                    <td>$${itemTotal.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-danger btn-sm remove-item" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="4" class="text-end"><strong>Total:</strong></td>
                            <td><strong>$${total.toFixed(2)}</strong></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;
        
        return html;
    }

    // Event delegation for cart item actions
    document.addEventListener('click', function(e) {
        // Increase quantity
        if (e.target.classList.contains('increase-quantity')) {
            const index = e.target.getAttribute('data-index');
            cart[index].quantity += 1;
            updateCart();
        }
        
        // Decrease quantity
        if (e.target.classList.contains('decrease-quantity')) {
            const index = e.target.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
                updateCart();
            }
        }
        
        // Remove item
        if (e.target.classList.contains('remove-item') || 
            e.target.closest('.remove-item')) {
            const btn = e.target.classList.contains('remove-item') ? 
                e.target : e.target.closest('.remove-item');
            const index = btn.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        }
        
        // Checkout
        if (e.target.id === 'checkout-btn') {
            if (cart.length === 0) {
                alert('Your cart is empty. Please add services before checkout.');
                return;
            }
            
            // In a real application, you would redirect to a checkout page
            alert('Proceeding to checkout. In a real application, this would redirect to a payment page.');
            console.log('Checkout items:', cart);
        }
    });

    // Show toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-3';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        // Remove toast after it's hidden
        toast.addEventListener('hidden.bs.toast', function() {
            toast.remove();
        });
    }
});