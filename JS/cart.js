const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.querySelector(".cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {

    let totalCount = 0;

    cart.forEach(item => {
        totalCount += item.quantity;
    });

    if (cartCount) {
        cartCount.textContent = totalCount;
    }

}

function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">
                Корзина пустая
            </div>

        `;

        cartTotal.textContent = 0;

        updateCartCount();

        return;

    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <img src="${item.image}" class="cart-item__img">

                <div class="cart-item__info">

                    <h2>${item.title}</h2>

                    <p>Размер: ${item.size}</p>

                    <p>${item.price} грн</p>

                </div>

                <div class="cart-item__actions">

                    <div class="cart-quantity">

                        <button class="qty-btn minus" data-id="${item.id}">
                            -
                        </button>

                        <span>${item.quantity}</span>

renderCart();