function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartQuantity = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    const cartButton = document.getElementById('point3');

    if (cartQuantity > 0) {
        cartButton.innerHTML = `Cart(${cartQuantity})`;
    } else {
        cartButton.innerHTML = `Cart`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartContainer = document.getElementById('productContainer');
    const productMain1 = document.createElement('div');
    const productMain2 = document.createElement('div');
    
    productMain1.innerHTML = `<div class="hcont"><h2 class="item-list-heading">Item List</h2></div><hr class="line1">`;
    productMain2.innerHTML = `<div class="hcont1"><h2 class="item-list-heading1">Cart Summary</h2>`;

    productMain1.classList.add("container1");
    productMain2.classList.add("container2");

    cartContainer.appendChild(productMain1);
    cartContainer.appendChild(productMain2);

    if (Object.keys(cart).length === 0) {
        cartContainer.innerHTML = 
           `<div class="godiv"> 
        <p class="cartH">Your Cart is Empty</p>
         <button class="gobut" id="goBackButton"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg> Continue Shopping</button>
        </div>`;
        document.getElementById('goBackButton').addEventListener('click', function () {
            window.location.href = '../HomePage/home.html';
        });
    } else {
        let totalAmount = 0;
        let totalQuantity = 0;  
        for (const productId in cart) {
            const product = cart[productId];
            const productCard = document.createElement('div');
            productCard.classList.add('productCard');
            productCard.innerHTML = `
                <div class="picdiv"> 
                    <img class="cartpic" src="${product.image}" alt="${product.title}">
                </div>
                <div class="picName"><h3>${product.title}</h3></div>
                <div class="picinfo"> 
                    <div class="picinfo1">
                        <p class="decrement" data-product-id="${productId}">-</p> 
                        <p class="quant">${product.quantity}</p> 
                        <p class="increment" data-product-id="${productId}">+</p>
                    </div>
                    <div class="picinfo2">
                        <P class="pprice">${product.quantity} × $${product.price}</p>
                    </div>
                </div>`;
            totalAmount += product.quantity * product.price;
            totalQuantity += product.quantity;  

            productMain1.appendChild(productCard);
        }

        const productTotal = document.createElement('div');
        productTotal.classList.add("total");
        productTotal.innerHTML = `
        <div class="first"> 
            <div class="subt1">
                <p class="bp">Products(${totalQuantity})</p>  <!-- Displaying the total number of products -->
                <p class="bp">Shipping</p>
                <h2 class="bh">Total Amount</h2>
            </div>
            
            <div class="subt2">
                <p class="bp1">${totalAmount}</p>
                <p class="bp1">30</p>
                <h2 class="bh1">$${totalAmount + 30}</h2>
            </div> 
        </div>
        <div class="butT">
            <button class="check">Go to checkout</button>
        </div>`;

        productMain2.appendChild(productTotal);
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
