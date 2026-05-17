document.querySelectorAll(".product-gallery__item img").forEach(img => {

    img.addEventListener("click", function () {

        const mainImage = document.getElementById("mainImage");

        if (mainImage) {
            mainImage.src = this.src;
        }

    });

});

let count = 1;

const countEl = document.getElementById("count");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");

if (plus && minus && countEl) {

    plus.addEventListener("click", () => {

        count++;
        countEl.textContent = count;

    });

    minus.addEventListener("click", () => {

        if (count > 1) {

            count--;
            countEl.textContent = count;

        }

    });

}

document.querySelectorAll(".product-sizes__btn").forEach(btn => {

    btn.addEventListener("click", function () {

        document.querySelectorAll(".product-sizes__btn")
            .forEach(b => b.classList.remove("active"));

        this.classList.add("active");

    });

});

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function openCart() {

    if (cartSidebar && cartOverlay) {

        cartSidebar.classList.add("active");
        cartOverlay.classList.add("active");

    }

}

function closeCartFunc() {

    if (cartSidebar && cartOverlay) {

        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");

    }

}

if (cartBtn) {

    cartBtn.addEventListener("click", (e) => {

        e.preventDefault();
        openCart();

    });

}

if (closeCart) {
    closeCart.addEventListener("click", closeCartFunc);
}

if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCartFunc);
}

function updateCart() {

    if (!cartItems || !cartTotal || !cartCount) return;

    cartItems.innerHTML = "";

    let total = 0;
    let totalCount = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `

        <div class="empty-cart">
            Корзина пуста
        </div>

        `;

    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        totalCount += item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" class="cart-item__img">

            <div class="cart-item__info">

                <h3>${item.title}</h3>

                ${item.size ? `<p>Размер: ${item.size}</p>` : ""}

                <div class="cart-item__controls">

                    <button onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                </div>

            </div>

            <div class="cart-item__right">

                <div class="cart-item__price">
                    ${item.price * item.quantity} грн
                </div>

                <button class="cart-item__delete" onclick="removeItem(${index})">
                    🗑
                </button>

            </div>

        </div>

        `;

    });

    cartTotal.textContent = total + " грн";
    cartCount.textContent = totalCount;

    localStorage.setItem("cart", JSON.stringify(cart));

}

function removeItem(index) {

    cart.splice(index, 1);
    updateCart();

}

function changeQuantity(index, value) {

    cart[index].quantity += value;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();

}

const addToCartBtn = document.querySelector(".product-cart");

if (addToCartBtn) {

    addToCartBtn.addEventListener("click", () => {

        const title =
            document.querySelector(".product-info__title").textContent;

        const priceText =
            document.querySelector(".product-info__price").textContent;

        const price =
            parseInt(priceText.replace(/\D/g, ""));

        const image =
            document.getElementById("mainImage").src;

        const sizeBtn =
            document.querySelector(".product-sizes__btn.active");

        const size = sizeBtn ? sizeBtn.textContent : "";

        const existingItem = cart.find(item =>
            item.title === title && item.size === size
        );

        if (existingItem) {

            existingItem.quantity += count;

        } else {

            cart.push({
                title,
                price,
                image,
                size,
                quantity: count
            });

        }

        updateCart();

        addToCartBtn.textContent = "Добавлено ✓";

        setTimeout(() => {

            addToCartBtn.textContent = "Добавить в корзину";

        }, 1500);

    });

}

updateCart();