// Dummy users (for multi-login)
const users = [
  { username: "admin", password: "1234" },
  { username: "staff1", password: "1111" }
];

// Products & sales storage
let products = JSON.parse(localStorage.getItem("products")) || [];
let dailySales = JSON.parse(localStorage.getItem("dailySales")) || 0;

// Login function
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("loginMsg").textContent = "Invalid login!";
    }
  });
}

// Logout
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

// Add product
function addProduct() {
  const name = prompt("Enter product name:");
  const price = prompt("Enter product price (KES):");
  if (name && price) {
    products.push({ name, price: parseFloat(price) });
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    renderSaleOptions();
  }
}

// Render products
function renderProducts() {
  const productList = document.getElementById("productList");
  if (!productList) return;
  productList.innerHTML = "";
  products.forEach((p, index) => {
    const li = document.createElement("li");
    li.textContent = `${p.name} - KES ${p.price}`;
    productList.appendChild(li);
  });
}

// Render sale options
function renderSaleOptions() {
  const saleProduct = document.getElementById("saleProduct");
  if (!saleProduct) return;
  saleProduct.innerHTML = "";
  products.forEach((p, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = p.name;
    saleProduct.appendChild(option);
  });
}

// Make a sale
function makeSale() {
  const index = document.getElementById("saleProduct").value;
  const qty = parseInt(document.getElementById("saleQty").value);
  if (!products[index] || isNaN(qty) || qty <= 0) {
    document.getElementById("saleMsg").textContent = "Invalid sale!";
    return;
  }
  const total = products[index].price * qty;
  dailySales += total;
  localStorage.setItem("dailySales", dailySales);
  document.getElementById("dailyTotal").textContent = `KES ${dailySales}`;
  document.getElementById("saleMsg").textContent = `Sale recorded: KES ${total}`;
}

// Initialize dashboard
if (window.location.pathname.includes("dashboard.html")) {
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
  }
  renderProducts();
  renderSaleOptions();
  document.getElementById("dailyTotal").textContent = `KES ${dailySales}`;
}
