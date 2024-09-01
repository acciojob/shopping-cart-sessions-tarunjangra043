const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
    { id: 4, name: "Product 4", price: 40 },
    { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

function renderProducts() {
    products.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
        productList.appendChild(li);
    });

    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const productId = parseInt(event.target.getAttribute("data-id"));
            addToCart(productId);
        });
    });
}

function getCart() {
    const cart = sessionStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    sessionStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    const cart = getCart();
    cartList.innerHTML = ""; 
    cart.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - $${item.price} x ${item.quantity || 1} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
        cartList.appendChild(li);
    });

    document.querySelectorAll(".remove-from-cart-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const productId = parseInt(event.target.getAttribute("data-id"));
            removeFromCart(productId);
        });
    });
}

function addToCart(productId) {
    let cart = getCart();
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;  // Increment quantity if the product is already in the cart
        } else {
            cart.push({ ...product, quantity: 1 });  // Add new product with quantity 1
        }
        saveCart(cart);
        renderCart();
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId); // Remove the product entirely from the cart
    saveCart(cart);
    renderCart();
}

function clearCart() {
    saveCart([]);
    renderCart();
}

renderProducts();
renderCart();

clearCartBtn.addEventListener("click", clearCart);
