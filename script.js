function functio(small) {
    var full = document.getElementById("imagebox");
    full.src = small.src;
}  
let cart = [];

const cartIcon = document.getElementById("cart-icon");
const cartDropdown = document.getElementById("cart-dropdown");
const cartList = document.getElementById("cart-list");
const totalPrice = document.getElementById("total-price");

cartIcon.addEventListener("click", () => {
  cartDropdown.classList.toggle("show");
});

function addToCart(productName, productPrice) {
  const existingProductIndex = cart.findIndex(
    (product) => product.name === productName
  );

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity++;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  cartList.innerHTML = "";

  let total = 0; 

  cart.forEach((product, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${product.name} - $${product.price} x ${product.quantity}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");
    removeButton.addEventListener("click", () => removeFromCart(index));

    listItem.appendChild(removeButton);
    cartList.appendChild(listItem);

    total += product.price * product.quantity;
  });

  totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);

  updateCart();
}

document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length > 0) {
    alert("Proceeding to checkout");
    cart = [];  
    updateCart();  
  } else {
    alert("Your cart is empty");
  }
});

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productCard = button.closest(".card");
    const productName = productCard.querySelector("h2").textContent;
    const productPrice = parseFloat(
      productCard.querySelector("h3").textContent.replace("$", "")
    );
    addToCart(productName, productPrice);
  });
  document.addEventListener('scroll', function () {
    const nav = document.querySelector('section nav');
    if (window.scrollY > 50) { // Adjust the value as needed
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

});
