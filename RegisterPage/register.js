document.getElementById("point1").addEventListener("click", function(){
    window.location.href="../LoginPage/login.html";
});
document.getElementById("point2").addEventListener("click", function(){
    window.location.href="../RegisterPage/register.html";
});
document.getElementById("point3").addEventListener("click", function(){
    window.location.href="../CartPage/cart.html";
})

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartQuantity = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    const cartButton = document.getElementById('point3');

    if (cartQuantity > 0) {
        cartButton.innerHTML = `Cart(${cartQuantity})`;
    } else {
        cartButton.innerHTML = `Cart()`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
});

