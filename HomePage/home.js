let allProducts =[];
let currentCategery='all';

async function fetchProducts() {
    try{
        const response= await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        allProducts = data;
        displayProducts();
        // console.log(allProducts);
    }catch(error){
       console.error("Error in fetching data:",error);
    }
}

function displayProducts(){
    let productContainer= document.getElementById("productContainer");
    productContainer.innerHTML="";
    

    let filteredProducts = allProducts;
    if(currentCategery !=="all"){
        filteredProducts =allProducts.filter(product=>product.category.toLowerCase()===currentCategery)
    }

    filteredProducts.forEach(product =>{
        const productCard=document.createElement("div");
        productCard.classList.add("productCard");

        productCard.innerHTML=`
        <div class="divimg"><img class="proimg" src="${product.image}" alt="${product.title}" ></img> </div>
        <div>
        <h1 class="proh">${product.title.substring(0,11)}...</h1>
        <p class="prop">${product.description.substring(0,100)}...</p>
        <hr>
        <p class="propri">  $ ${product.price}</p>
        <hr>
        <div class="probut">
        <button class="but1" id="but1">Details</button>
        <button class="but2" id="but2">Add to Cart</button>
        </div>
        </div>`

        productContainer.appendChild(productCard);
    });

    
}

document.getElementById('all').addEventListener('click', () => {
    currentCategery = 'all';
    displayProducts();
});

document.getElementById('mens').addEventListener('click', () => {
    currentCategery = 'men\'s clothing';
    displayProducts();
});

document.getElementById('womens').addEventListener('click', () => {
    currentCategery = 'women\'s clothing';
    displayProducts();
});

document.getElementById('jewelery').addEventListener('click', () => {
    currentCategery = 'jewelery';
    displayProducts();
});
document.getElementById('electronics').addEventListener('click', () => {
    currentCategery = 'electronics';
    displayProducts();
});

fetchProducts()

document.getElementById("point1").addEventListener("click", function(){
    window.location.href="../LoginPage/login.html";
});
document.getElementById("point2").addEventListener("click", function(){
    window.location.href="../RegisterPage/register.html";
});
document.getElementById("point3").addEventListener("click", function(){
    window.location.href="../CartPage/cart.html";
})
