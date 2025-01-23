// Function to update cart count (to be reused in both home.js and cart.js)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartQuantity = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    const cartButton = document.getElementById('point3');

    if (cartQuantity > 0) {
        // If there are items in the cart, display the quantity
        cartButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
            <span class="cart-quantity"> Cart(${cartQuantity})</span>`;
    } else {
        // If there are no items in the cart, only show the icon
        cartButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5"/>
            </svg>`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
});

document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartContainer = document.getElementById('productContainer');
    
    if (Object.keys(cart).length === 0) {
        cartContainer.innerHTML = `<div class="godiv"> 
        <p class="cartH">Your Cart is Empty</p>
         <button class="gobut" id="goBackButton"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg> Continue Shopping</button>
        <div>`;
        document.getElementById('goBackButton').addEventListener('click', function() {
            window.location.href = '../HomePage/home.html';
        });
    } else {
        for (const productId in cart) {
            const product = cart[productId];
            const productCard = document.createElement('div');
            productCard.classList.add('productCard');
            productCard.innerHTML = `
                <img class="proimg" src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <div>
                    <button class="decrement" data-product-id="${productId}">-</button>
                    <span class="quantity">${product.quantity}</span>
                    <button class="increment" data-product-id="${productId}">+</button>
                    <button class="remove" data-product-id="${productId}">Remove</button>
                </div>
            `;
            cartContainer.appendChild(productCard);
        }
    }

    
    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', handleDecrement);
    });
    
    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', handleIncrement);
    });

    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', handleRemove);
    });
});


function handleDecrement(event) {
    const productId = event.target.getAttribute('data-product-id');
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    if (cart[productId].quantity > 1) {
        cart[productId].quantity -= 1;
    } else {
        delete cart[productId];
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    location.reload(); 
}


function handleIncrement(event) {
    const productId = event.target.getAttribute('data-product-id');
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    cart[productId].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    location.reload(); 
}


function handleRemove(event) {
    const productId = event.target.getAttribute('data-product-id');
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    delete cart[productId];

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    location.reload();
}