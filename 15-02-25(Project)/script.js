var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
    updateCartCount();
    document.querySelectorAll(".category").forEach(function (categoryLink) {
        categoryLink.addEventListener("click", function (event) {
            event.preventDefault();
            var category = this.dataset.category || "";
            fetchProducts(category);
        });
    });
});
function fetchProducts() {
    return __awaiter(this, arguments, void 0, function (category) {
        var url, response, products, error_1;
        if (category === void 0) { category = ""; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    url = "https://fakestoreapi.com/products";
                    if (category)
                        url += "/category/".concat(category);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    products = _a.sent();
                    displayProducts(products);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching products:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function displayProducts(products) {
    var productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";
    products.forEach(function (product) {
        productsContainer.innerHTML += "\n            <div class=\"col-md-4 mb-4\">\n                <div class=\"card h-100 d-flex flex-column\">\n                    <img src=\"".concat(product.image, "\" class=\"card-img-top p-3\" style=\"height: 250px; object-fit: contain;\">\n                    <div class=\"card-body d-flex flex-column flex-grow-1\">\n                        <h5 class=\"card-title\">").concat(product.title, "</h5>\n                        <p class=\"card-text\">$").concat(product.price.toFixed(2), "</p>\n                        <div class=\"mt-auto\">\n                            <a href=\"product.html?id=").concat(product.id, "\" class=\"btn btn-primary w-100\">View</a>\n                            <button class=\"btn btn-success w-100 mt-2\" onclick=\"addToCart(").concat(product.id, ")\">Add to Cart</button>\n                        </div>\n                    </div>\n                </div>\n            </div>");
    });
}
function addToCart(productId) {
    var cart = getCart();
    var existingProduct = cart.find(function (item) { return item.id === productId; });
    if (existingProduct) {
        existingProduct.quantity++;
    }
    else {
        cart.push({ id: productId, quantity: 1 });
    }
    saveCart(cart);
    updateCartCount();
}
function updateCartCount() {
    var cart = getCart();
    var totalItems = cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    var cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = totalItems.toString();
    }
}
// Utility functions for Local Storage
function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
