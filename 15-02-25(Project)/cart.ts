interface CartItem {
  id: number;
  quantity: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const productCache: Map<number, Product> = new Map();

document.addEventListener("DOMContentLoaded", () => {
  displayCart();
  updateCartCount();
});

async function displayCart(): Promise<void> {
  const cart: CartItem[] = getCart();
  const cartContainer = document.getElementById("cart-items") as HTMLElement;
  const cartTotal = document.getElementById("cart-total") as HTMLElement;

  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="text-center">Your cart is empty.</p>`;
    cartTotal.textContent = "0.00";
    return;
  }

  const products: Product[] = await Promise.all(
    cart.map((item) => fetchProduct(item.id))
  );
  let totalPrice = 0;

  products.forEach((product, index) => {
    productCache.set(product.id, product);
    const item = cart[index];
    totalPrice += product.price * item.quantity;

    cartContainer.innerHTML += `
            <div id="cart-item-${
              product.id
            }" class="list-group-item d-flex align-items-center justify-content-between">
                <img src="${
                  product.image
                }" class="me-3" style="width: 50px; height: 50px; object-fit: contain;">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${product.title}</h6>
                    <p class="mb-0 text-success">$<span id="price-${
                      product.id
                    }">${(product.price * item.quantity).toFixed(2)}</span></p>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-outline-danger btn-sm" onclick="updateCart(${
                      product.id
                    }, -1)">➖</button>
                    <span class="px-3 fw-bold" id="quantity-${product.id}">${
      item.quantity
    }</span>
                    <button class="btn btn-outline-success btn-sm" onclick="updateCart(${
                      product.id
                    }, 1)">➕</button>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${
                  product.id
                })">🗑 Remove</button>
            </div>`;
  });

  cartTotal.textContent = totalPrice.toFixed(2);
}

async function fetchProduct(productId: number): Promise<Product> {
  if (productCache.has(productId)) {
    return productCache.get(productId)!;
  }
  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  );
  const product = await response.json();
  productCache.set(productId, product);
  return product;
}

function updateCart(productId: number, change: number): void {
  let cart = getCart();
  let product = cart.find((item) => item.id === productId);

  if (product) {
    product.quantity += change;
    if (product.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
  updateCartDisplay(productId, cart);
}

function removeFromCart(productId: number): void {
  let cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);

  document.getElementById(`cart-item-${productId}`)?.remove();
  updateCartCount();
  updateTotalPrice(cart);
}

function updateCartDisplay(productId: number, cart: CartItem[]): void {
  let product = cart.find((item) => item.id === productId);

  if (!product) {
    removeFromCart(productId);
    return;
  }

  document.getElementById(`quantity-${productId}`)!.textContent =
    product.quantity.toString();
  fetchProduct(productId).then((prod) => {
    document.getElementById(`price-${productId}`)!.textContent = (
      prod.price * product.quantity
    ).toFixed(2);
  });
  updateTotalPrice(cart);
  updateCartCount();
}

function updateTotalPrice(cart: CartItem[]): void {
  let totalPrice = cart.reduce((sum, item) => {
    const product = productCache.get(item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  document.getElementById("cart-total")!.textContent = totalPrice.toFixed(2);
}

function updateCartCount(): void {
  const cart = getCart();
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count")!.textContent = totalItems.toString();
}

function checkout(): void {
  if (confirm("Do you want to clear the cart?")) {
    localStorage.removeItem("cart");
    document.getElementById(
      "cart-items"
    )!.innerHTML = `<p class="text-center">Your cart is empty.</p>`;
    document.getElementById("cart-total")!.textContent = "0.00";
    updateCartCount();
    alert("Thank you for your purchase!");
  }
}

function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart: CartItem[]): void {
  localStorage.setItem("cart", JSON.stringify(cart));
}
