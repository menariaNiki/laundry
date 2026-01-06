document.addEventListener("DOMContentLoaded", () => {

    let cart = [];

    const cartItems = document.querySelector(".cart-items");
    const totalAmountEl = document.querySelector(".cart-total strong");

    const serviceLists = document.querySelectorAll(".service-list");

    serviceLists.forEach(service => {

        const btn = service.querySelector(".btn");

        btn.addEventListener("click", () => {

            // ✅ Safe service name extraction
            const name = service.childNodes[0].nodeValue.trim();

            // ✅ Safe price extraction
            const priceText = service.querySelector("span").innerText;
            const price = Number(priceText.replace("₹", ""));

            addToCart(name, price);
        });
    });

    function addToCart(name, price) {
        const item = cart.find(i => i.name === name);

        if (item) {
            item.qty++;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.qty;

            const li = document.createElement("li");
            li.style.display = "grid";
            li.style.gridTemplateColumns = "15% 55% 30%";
            li.style.padding = "8px 0";
            li.style.borderBottom = "1px solid #eee";

            li.innerHTML = `
                <span>${index + 1}</span>
                <span>${item.name} × ${item.qty}</span>
                <span>₹${item.price * item.qty}</span>
            `;

            cartItems.appendChild(li);
        });

        totalAmountEl.innerText = `₹${total.toFixed(2)}`;
    }

    function removeFromCart(name) {
        cart = cart.filter(item => item.name !== name);
        renderCart();
    }

    // RENDER CART
    function renderCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.qty;

            const li = document.createElement("li");
            li.style.display = "grid";
            li.style.gridTemplateColumns = "10% 40% 20% 30%";
            li.style.padding = "8px 0";
            li.style.borderBottom = "1px solid #eee";
            li.style.alignItems = "center";

            li.innerHTML = `
                <span>${index + 1}</span>
                <span>${item.name} × ${item.qty}</span>
                <span>₹${item.price * item.qty}</span>
                <button class="remove-btn">Remove</button>
            `;

            li.querySelector(".remove-btn").addEventListener("click", () => {
                removeFromCart(item.name);
            });

            cartItems.appendChild(li);
        });

        totalAmountEl.innerText = `₹${total.toFixed(2)}`;
    }

});
