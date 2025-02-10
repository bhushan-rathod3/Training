document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    updateCartCount();

    document.querySelectorAll(".category").forEach(categoryLink => {
        categoryLink.addEventListener("click", function (event) {
            event.preventDefault();
            fetchProducts(this.dataset.category);
        });
    });
});

function fetchProducts(category = "") {
    let url = "https://fakestoreapi.com/products";
    if (category) url += `/category/${category}`;

    fetch(url)
        .then(res => res.json())
        .then(products => displayProducts(products));
}

function displayProducts(products) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";

    products.forEach(product => {
        productsContainer.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 d-flex flex-column">
                    <img src="${product.image}" class="card-img-top p-3" style="height: 250px; object-fit: contain;">
                    <div class="card-body d-flex flex-column flex-grow-1">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">$${product.price}</p>
                        <div class="mt-auto">
                            <a href="product.html?id=${product.id}" class="btn btn-primary w-100">View</a>
                            <button class="btn btn-success w-100 mt-2" onclick="addToCart(${product.id})">Add to Cart</button>
                        </div>
                    </div>
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
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalItems;
}
