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
var productCache = new Map();
document.addEventListener("DOMContentLoaded", function () {
    displayCart();
    updateCartCount();
});
function displayCart() {
    return __awaiter(this, void 0, void 0, function () {
        var cart, cartContainer, cartTotal, products, totalPrice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cart = getCart();
                    cartContainer = document.getElementById("cart-items");
                    cartTotal = document.getElementById("cart-total");
                    cartContainer.innerHTML = "";
                    if (cart.length === 0) {
                        cartContainer.innerHTML = "<p class=\"text-center\">Your cart is empty.</p>";
                        cartTotal.textContent = "0.00";
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Promise.all(cart.map(function (item) { return fetchProduct(item.id); }))];
                case 1:
                    products = _a.sent();
                    totalPrice = 0;
                    products.forEach(function (product, index) {
                        productCache.set(product.id, product); // Store in cache
                        var item = cart[index];
                        totalPrice += product.price * item.quantity;
                        cartContainer.innerHTML += "\n            <div id=\"cart-item-".concat(product.id, "\" class=\"list-group-item d-flex align-items-center justify-content-between\">\n                <img src=\"").concat(product.image, "\" class=\"me-3\" style=\"width: 50px; height: 50px; object-fit: contain;\">\n                <div class=\"flex-grow-1\">\n                    <h6 class=\"mb-1\">").concat(product.title, "</h6>\n                    <p class=\"mb-0 text-success\">$<span id=\"price-").concat(product.id, "\">").concat((product.price * item.quantity).toFixed(2), "</span></p>\n                </div>\n                <div class=\"d-flex align-items-center\">\n                    <button class=\"btn btn-outline-danger btn-sm\" onclick=\"updateCart(").concat(product.id, ", -1)\">\u2796</button>\n                    <span class=\"px-3 fw-bold\" id=\"quantity-").concat(product.id, "\">").concat(item.quantity, "</span>\n                    <button class=\"btn btn-outline-success btn-sm\" onclick=\"updateCart(").concat(product.id, ", 1)\">\u2795</button>\n                </div>\n                <button class=\"btn btn-danger btn-sm\" onclick=\"removeFromCart(").concat(product.id, ")\">\uD83D\uDDD1 Remove</button>\n            </div>");
                    });
                    cartTotal.textContent = totalPrice.toFixed(2);
                    return [2 /*return*/];
            }
        });
    });
}
function fetchProduct(productId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (productCache.has(productId)) {
                        return [2 /*return*/, productCache.get(productId)];
                    }
                    return [4 /*yield*/, fetch("https://fakestoreapi.com/products/".concat(productId))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    product = _a.sent();
                    productCache.set(productId, product);
                    return [2 /*return*/, product];
            }
        });
    });
}
function updateCart(productId, change) {
    var cart = getCart();
    var product = cart.find(function (item) { return item.id === productId; });
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
    }
    else {
        cart.push({ id: productId, quantity: 1 });
    }
    saveCart(cart);
    updateCartDisplay(productId, cart);
}
function removeFromCart(productId) {
    var _a;
    var cart = getCart().filter(function (item) { return item.id !== productId; });
    saveCart(cart);
    (_a = document.getElementById("cart-item-".concat(productId))) === null || _a === void 0 ? void 0 : _a.remove();
    updateCartCount();
    updateTotalPrice(cart);
}
function updateCartDisplay(productId, cart) {
    var product = cart.find(function (item) { return item.id === productId; });
    if (!product) {
        removeFromCart(productId);
        return;
    }
    document.getElementById("quantity-".concat(productId)).textContent =
        product.quantity.toString();
    fetchProduct(productId).then(function (prod) {
        document.getElementById("price-".concat(productId)).textContent = (prod.price * product.quantity).toFixed(2);
        updateTotalPrice(cart);
    });
    updateCartCount();
}
function updateTotalPrice(cart) {
    var totalPrice = cart.reduce(function (sum, item) {
        var product = productCache.get(item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    document.getElementById("cart-total").textContent = totalPrice.toFixed(2);
}
function updateCartCount() {
    var cart = getCart();
    var totalItems = cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
    document.getElementById("cart-count").textContent = totalItems.toString();
}
function checkout() {
    if (confirm("Do you want to clear the cart?")) {
        localStorage.removeItem("cart");
        document.getElementById("cart-items").innerHTML = "<p class=\"text-center\">Your cart is empty.</p>";
        document.getElementById("cart-total").textContent = "0.00";
        updateCartCount();
        alert("Thank you for your purchase!");
    }
}
// Utility functions to handle cart storage
function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
