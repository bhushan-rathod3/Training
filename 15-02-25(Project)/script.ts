interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartItem {
  id: number;
  quantity: number;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
  updateCartCount();

  document.querySelectorAll(".category").forEach((categoryLink) => {
    categoryLink.addEventListener("click", function (event) {
      event.preventDefault();
      const category = (this as HTMLElement).dataset.category || "";
      fetchProducts(category);
    });
  });
});

async function fetchProducts(category: string = ""): Promise<void> {
  try {
    let url = "https://fakestoreapi.com/products";
    if (category) url += `/category/${category}`;

    const response = await fetch(url);
    const products: Product[] = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayProducts(products: Product[]): void {
  const productsContainer = document.getElementById("products") as HTMLElement;
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    productsContainer.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 d-flex flex-column">
                    <img src="${
                      product.image
                    }" class="card-img-top p-3" style="height: 250px; object-fit: contain;">
                    <div class="card-body d-flex flex-column flex-grow-1">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <div class="mt-auto">
                            <a href="product.html?id=${
                              product.id
                            }" class="btn btn-primary w-100">View</a>
                            <button class="btn btn-success w-100 mt-2" onclick="addToCart(${
                              product.id
                            })">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>`;
  });
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
}

function updateCartCount(): void {
  const cart: CartItem[] = getCart();
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalItems.toString();
  }
}

function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart: CartItem[]): void {
  localStorage.setItem("cart", JSON.stringify(cart));
}
