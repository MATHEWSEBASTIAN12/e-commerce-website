let products = [
    {
        id:1,
        name:"Dell Laptop",
        price:55000,
        category:"electronics",
        rating:"⭐⭐⭐⭐",
        img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    },
    {
        id:2,
        name:"iPhone",
        price:80000,
        category:"electronics",
        rating:"⭐⭐⭐⭐⭐",
        img:"https://images.unsplash.com/photo-1510557880182-3d4d3cba35b5"
    },
    {
        id:3,
        name:"Headphones",
        price:2500,
        category:"electronics",
        rating:"⭐⭐⭐⭐",
        img:"https://images.unsplash.com/photo-1518441902113-c5f2c5e1a3a2"
    },
    {
        id:4,
        name:"Men Shirt",
        price:1200,
        category:"fashion",
        rating:"⭐⭐⭐⭐",
        img:"https://images.unsplash.com/photo-1520975916090-3105956dac38"
    },
    {
        id:5,
        name:"Shoes",
        price:3000,
        category:"fashion",
        rating:"⭐⭐⭐⭐⭐",
        img:"https://images.unsplash.com/photo-1528701800489-20be3c3f1f9c"
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* DISPLAY PRODUCTS */
function displayProducts(list){
    let container = document.getElementById("products");
    container.innerHTML = "";

    list.forEach(p=>{
        container.innerHTML += `
        <div class="card">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>${p.rating}</p>
            <p>₹${p.price}</p>
            <button class="add" onclick="addToCart(${p.id})">Add to Cart</button>
            <button class="wish" onclick="wishlist('${p.name}')">❤️ Wishlist</button>
        </div>
        `;
    });
}

/* SEARCH */
function searchProduct(){
    let value = document.getElementById("search").value.toLowerCase();
    let filtered = products.filter(p => p.name.toLowerCase().includes(value));
    displayProducts(filtered);
}

/* FILTER */
function filterCategory(cat){
    if(cat==="all"){
        displayProducts(products);
    } else {
        let filtered = products.filter(p=>p.category===cat);
        displayProducts(filtered);
    }
}

/* ADD TO CART */
function addToCart(id){
    let item = cart.find(p=>p.id===id);

    if(item){
        item.qty++;
    } else {
        let product = products.find(p=>p.id===id);
        cart.push({...product, qty:1});
    }

    saveCart();
    updateCart();
}

/* UPDATE CART */
function updateCart(){
    let cartDiv = document.getElementById("cartItems");
    let total = 0;
    cartDiv.innerHTML = "";

    cart.forEach(item=>{
        total += item.price * item.qty;

        cartDiv.innerHTML += `
        <div>
            <h4>${item.name}</h4>
            <p>₹${item.price} x ${item.qty}</p>
            <button onclick="changeQty(${item.id},1)">+</button>
            <button onclick="changeQty(${item.id},-1)">-</button>
            <button onclick="removeItem(${item.id})">❌</button>
        </div>
        `;
    });

    document.getElementById("total").innerText = total;
    document.getElementById("count").innerText = cart.length;
}

/* SAVE CART */
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* QTY */
function changeQty(id,change){
    let item = cart.find(p=>p.id===id);
    item.qty += change;

    if(item.qty<=0){
        removeItem(id);
    }

    saveCart();
    updateCart();
}

/* REMOVE */
function removeItem(id){
    cart = cart.filter(p=>p.id!==id);
    saveCart();
    updateCart();
}

/* CART TOGGLE */
function toggleCart(){
    document.getElementById("cart").classList.toggle("active");
}

/* WISHLIST */
function wishlist(name){
    alert(name + " added to wishlist ❤️");
}

/* CHECKOUT */
function checkout(){
    alert("Order placed successfully!");
    cart=[];
    saveCart();
    updateCart();
}

displayProducts(products);
updateCart();
