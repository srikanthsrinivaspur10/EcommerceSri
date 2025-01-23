let allProducts = [];
let currentCategory = 'all';


let cart = JSON.parse(localStorage.getItem('cart')) || {};

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        allProducts = data;
        displayProducts();
    } catch (error) {
        console.error("Error in fetching data:", error);
    }
}


function displayProducts() {
    let productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";

    let filteredProducts = allProducts;
    if (currentCategory !== "all") {
        filteredProducts = allProducts.filter(product => product.category.toLowerCase() === currentCategory);
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("productCard");

        productCard.innerHTML = `
        <div class="divimg"><img class="proimg" src="${product.image}" alt="${product.title}" ></img> </div>
        <div>
        <h1 class="proh">${product.title.substring(0, 11)}...</h1>
        <p class="prop">${product.description.substring(0, 100)}...</p>
        <hr>
        <p class="propri">$ ${product.price}</p>
        <hr>
        <div class="probut">
        <button class="but1" id="but1">Details</button>
        <button class="but2" id="but2" data-product-id="${product.id}">Add to Cart</button>
        </div>
        </div>`;

        productContainer.appendChild(productCard);
    });


    const addToCartButtons = document.querySelectorAll('.but2');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    updateCartCount(); 
}


function handleAddToCart(event) {
    const productId = event.target.getAttribute('data-product-id');
    const product = allProducts.find(p => p.id == productId);

    
    if (cart[productId]) {
        cart[productId].quantity += 1;
    } else {
        cart[productId] = { ...product, quantity: 1 };
    }


    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();  
}


function updateCartCount() {
    const cartQuantity = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    const cartButton = document.getElementById('point3');

    if (cartQuantity > 0) {
        
        cartButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
            <span class="cart-quantity"> Cart(${cartQuantity})</span>`;
    } else {
        
        cartButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5"/>
            </svg>`;
    }
}


document.getElementById('all').addEventListener('click', () => {
    currentCategory = 'all';
    displayProducts();
});

document.getElementById('mens').addEventListener('click', () => {
    currentCategory = 'men\'s clothing';
    displayProducts();
});

document.getElementById('womens').addEventListener('click', () => {
    currentCategory = 'women\'s clothing';
    displayProducts();
});

document.getElementById('jewelery').addEventListener('click', () => {
    currentCategory = 'jewelery';
    displayProducts();
});

document.getElementById('electronics').addEventListener('click', () => {
    currentCategory = 'electronics';
    displayProducts();
});


fetchProducts();


document.getElementById("point1").addEventListener("click", function () {
    window.location.href = "../LoginPage/login.html";
});

document.getElementById("point2").addEventListener("click", function () {
    window.location.href = "../RegisterPage/register.html";
});

document.getElementById("point3").addEventListener("click", function () {
    window.location.href = "../CartPage/cart.html";
});
