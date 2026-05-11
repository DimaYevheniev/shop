
document.querySelectorAll(".product-gallery__item img").forEach(img => {
    img.addEventListener("click", function () {
        document.getElementById("mainImage").src = this.src;
    });
});


let count = 1;

const countEl = document.getElementById("count");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");

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

document.querySelectorAll(".product-sizes__btn").forEach(btn => {
    btn.addEventListener("click", function () {

  
        document.querySelectorAll(".product-sizes__btn")
            .forEach(b => b.classList.remove("active"));


        this.classList.add("active");
    });
});