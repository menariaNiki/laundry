document.addEventListener("DOMContentLoaded", () => {

    let cart = [];

    const cartItems = document.querySelector(".cart-items");
    const totalAmountEl = document.querySelector(".cart-total strong");

    const serviceLists = document.querySelectorAll(".service-list");

    serviceLists.forEach(service => {

        const btn = service.querySelector(".btn");

        btn.addEventListener("click", () => {

            const name = service.childNodes[0].nodeValue.trim();
            const priceText = service.querySelector("span").innerText;
            const price = Number(priceText.replace("₹", ""));

            if (btn.innerText === "Add Item") {
                addToCart(name, price);
                btn.innerText = "Remove";
                btn.style.background = "#fee2e2";
                btn.style.color = "#b91c1c";
            } else {
                removeFromCart(name);
                btn.innerText = "Add Item";
                btn.style.background = "#eef2ff";
                btn.style.color = "#4f46e5";
            }
        });
    });

    function addToCart(name, price) {
        const item = cart.find(i => i.name === name);

        if (!item) {
            cart.push({ name, price });
        }

        renderCart();
    }

    function removeFromCart(name) {
        cart = cart.filter(item => item.name !== name);
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;

            const li = document.createElement("li");
            li.style.display = "grid";
            li.style.gridTemplateColumns = "15% 55% 30%";
            li.style.padding = "8px 0";
            li.style.borderBottom = "1px solid #eee";

            li.innerHTML = `
                <span>${index + 1}</span>
                <span>${item.name}</span>
                <span>₹${item.price}</span>
            `;

            cartItems.appendChild(li);
        });

        totalAmountEl.innerText = `₹${total.toFixed(2)}`;
    }

});
