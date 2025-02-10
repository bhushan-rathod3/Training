document.addEventListener("DOMContentLoaded", () => {
    displayCart();
    updateCartCount();
});

async function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartContainer.innerHTML = "";
    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="text-center">Your cart is empty.</p>`;
        cartTotal.textContent = "0.00";
        return;
    }

    const products = await Promise.all(cart.map(item => fetchProduct(item.id)));
    let totalPrice = 0;

    products.forEach((product, index) => {
        const item = cart[index];
        totalPrice += product.price * item.quantity;

        cartContainer.innerHTML += `
            <div id="cart-item-${product.id}" class="list-group-item d-flex align-items-center justify-content-between">
                <img src="${product.image}" class="me-3" style="width: 50px; height: 50px; object-fit: contain;">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${product.title}</h6>
                    <p class="mb-0 text-success">$<span id="price-${product.id}">${(product.price * item.quantity).toFixed(2)}</span></p>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-outline-danger btn-sm" onclick="updateCart(${product.id}, -1)">➖</button>
                    <span class="px-3 fw-bold" id="quantity-${product.id}">${item.quantity}</span>
                    <button class="btn btn-outline-success btn-sm" onclick="updateCart(${product.id}, 1)">➕</button>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${product.id})">🗑 Remove</button>
            </div>`;
    });

    cartTotal.textContent = totalPrice.toFixed(2);
}

async function fetchProduct(productId) {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    return response.json();
}

function updateCart(productId, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay(productId);
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById(`cart-item-${productId}`)?.remove();
    updateCartCount();
    updateTotalPrice();
}

function updateCartDisplay(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = cart.find(item => item.id === productId);

    if (!product) {
        removeFromCart(productId);
        return;
    }

    document.getElementById(`quantity-${productId}`).textContent = product.quantity;
    fetchProduct(productId).then(prod => {
        document.getElementById(`price-${productId}`).textContent = (prod.price * product.quantity).toFixed(2);
        updateTotalPrice();
    });

    updateCartCount();
}

async function updateTotalPrice() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;

    const products = await Promise.all(cart.map(item => fetchProduct(item.id)));

    products.forEach((product, index) => {
        totalPrice += product.price * cart[index].quantity;
    });

    document.getElementById("cart-total").textContent = totalPrice.toFixed(2);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalItems;
}

function checkout() {
    if (confirm("Do you want to clear the cart?")) {
        localStorage.removeItem("cart");
        document.getElementById("cart-items").innerHTML = `<p class="text-center">Your cart is empty.</p>`;
        document.getElementById("cart-total").textContent = "0.00";
        updateCartCount();
        alert("Thank you for your purchase!");
    }
}
