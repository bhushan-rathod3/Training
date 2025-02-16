interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem {
  id: number;
  quantity: number;
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = Number(urlParams.get("id"));

  if (!productId) {
    console.error("Invalid product ID");
    return;
  }

  fetchProductDetails(productId);
  updateCartCount();
});

async function fetchProductDetails(productId: number): Promise<void> {
  try {
    const product = await fetchProduct(productId);
    if (!product) {
      console.error(`Product with ID ${productId} not found.`);
      return;
    }

    const productDetails = document.getElementById(
      "product-details"
    ) as HTMLElement;
    productDetails.innerHTML = `
            <div class="card mx-auto p-4" style="max-width: 600px;">
                <img src="${
                  product.image
                }" class="card-img-top p-3" style="height: 400px; object-fit: contain;">
                <div class="card-body">
                    <h2 class="card-title">${product.title}</h2>
                    <p class="card-text">${product.description}</p>
                    <h4 class="text-success">$${product.price.toFixed(2)}</h4>
                    <button class="btn btn-success" onclick="addToCart(${
                      product.id
                    })">Add to Cart</button>
                </div>
            </div>`;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

async function fetchProduct(productId: number): Promise<Product> {
  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  );
  return response.json();
}

function addToCart(productId: number): void {
  let cart: CartItem[] = getCart();

  let existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
  alert("Product added to cart!");
}

function updateCartCount(): void {
  const cart: CartItem[] = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count")!.textContent = totalItems.toString();
}

function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart: CartItem[]): void {
  localStorage.setItem("cart", JSON.stringify(cart));
}
