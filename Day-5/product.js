document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    fetchProductDetails(productId);
    updateCartCount();
});

function fetchProductDetails(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            document.getElementById("product-details").innerHTML = `
                <div class="card mx-auto p-4" style="max-width: 600px;">
                    <img src="${product.image}" class="card-img-top p-3" style="height: 400px; object-fit: contain;">
                    <div class="card-body">
                        <h2 class="card-title">${product.title}</h2>
                        <p class="card-text">${product.description}</p>
                        <h4 class="text-success">$${product.price}</h4>
                        <button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>`;
        });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Product added to cart!");
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalItems;
}
