let products = [
{ id:1,name:"Dell Laptop",price:55000,category:"electronics",img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8"},
{ id:2,name:"iPhone",price:80000,category:"electronics",img:"https://images.unsplash.com/photo-1510557880182-3d4d3cba35b5"},
{ id:3,name:"Headphones",price:2500,category:"electronics",img:"https://images.unsplash.com/photo-1518441902113-c5f2c5e1a3a2"},
{ id:4,name:"Smart Watch",price:5000,category:"electronics",img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30"},
{ id:5,name:"Camera",price:45000,category:"electronics",img:"https://images.unsplash.com/photo-1519183071298-a2962e3a8c3c"},

{ id:6,name:"Men Shirt",price:1200,category:"fashion",img:"https://images.unsplash.com/photo-1520975916090-3105956dac38"},
{ id:7,name:"Women Dress",price:2000,category:"fashion",img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d"},
{ id:8,name:"Shoes",price:3000,category:"fashion",img:"https://images.unsplash.com/photo-1528701800489-20be3c3f1f9c"},
{ id:9,name:"Jeans",price:1800,category:"fashion",img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246"},
{ id:10,name:"Jacket",price:3500,category:"fashion",img:"https://images.unsplash.com/photo-1521336575822-6da63fb45455"},

{ id:11,name:"Sofa",price:25000,category:"home",img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7"},
{ id:12,name:"Dining Table",price:15000,category:"home",img:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"},
{ id:13,name:"Bed",price:20000,category:"home",img:"https://images.unsplash.com/photo-1505691938895-1758d7feb511"},
{ id:14,name:"Lamp",price:1200,category:"home",img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c"},
{ id:15,name:"Chair",price:2500,category:"home",img:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4"},

{ id:16,name:"Backpack",price:1800,category:"accessories",img:"https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb"},
{ id:17,name:"Sunglasses",price:1500,category:"accessories",img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083"},
{ id:18,name:"Wallet",price:900,category:"accessories",img:"https://images.unsplash.com/photo-1580910051074-3eb694886505"},
{ id:19,name:"Handbag",price:2200,category:"accessories",img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3"},
{ id:20,name:"Cap",price:500,category:"accessories",img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"},

{ id:21,name:"Gaming Mouse",price:1500,category:"electronics",img:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7"},
{ id:22,name:"Keyboard",price:2000,category:"electronics",img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8"},
{ id:23,name:"Bluetooth Speaker",price:3000,category:"electronics",img:"https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"},
{ id:24,name:"Tablet",price:25000,category:"electronics",img:"https://images.unsplash.com/photo-1542751110-97427bbecf20"},
{ id:25,name:"Power Bank",price:1200,category:"electronics",img:"https://images.unsplash.com/photo-1580910051074-3eb694886505"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

/* DISPLAY */
function displayProducts(list){
    let div=document.getElementById("products");
    div.innerHTML="";
    list.forEach(p=>{
        div.innerHTML+=`
        <div class="card">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });
}

/* SEARCH */
function searchProduct(val){
    let f=products.filter(p=>p.name.toLowerCase().includes(val.toLowerCase()));
    displayProducts(f);
}

/* FILTER */
function filterCategory(cat){
    if(cat==="all") displayProducts(products);
    else displayProducts(products.filter(p=>p.category===cat));
}

/* CART */
function addToCart(id){
    let item=cart.find(p=>p.id===id);
    if(item) item.qty++;
    else cart.push({...products.find(p=>p.id===id),qty:1});
    saveCart(); updateCart();
}

function updateCart(){
    let div=document.getElementById("cartItems");
    let total=0;
    div.innerHTML="";
    cart.forEach(i=>{
        total+=i.price*i.qty;
        div.innerHTML+=`
        <div>
        ${i.name} (${i.qty}) - ₹${i.price*i.qty}
        <button onclick="changeQty(${i.id},1)">+</button>
        <button onclick="changeQty(${i.id},-1)">-</button>
        </div>`;
    });
    document.getElementById("total").innerText=total;
    document.getElementById("count").innerText=cart.length;
}

function changeQty(id,c){
    let i=cart.find(p=>p.id===id);
    i.qty+=c;
    if(i.qty<=0) cart=cart.filter(p=>p.id!==id);
    saveCart(); updateCart();
}

function saveCart(){
    localStorage.setItem("cart",JSON.stringify(cart));
}

/* UI */
function toggleCart(){
    document.getElementById("cart").classList.toggle("active");
}

/* CHECKOUT */
function checkout(){
    document.getElementById("checkout").style.display="block";
}

document.addEventListener("change",e=>{
    if(e.target.id==="payment"){
        document.getElementById("onlineMode").style.display=
        e.target.value==="online"?"block":"none";
    }
});

/* ORDER */
function placeOrder(){
    let order={
        id:Date.now(),
        name:document.getElementById("name").value,
        address:document.getElementById("address").value,
        payment:document.getElementById("payment").value,
        items:cart,
        status:"Order Placed"
    };

    orders.push(order);
    localStorage.setItem("orders",JSON.stringify(orders));

    alert("Order placed successfully!");
    cart=[]; saveCart(); updateCart();
    closeCheckout();
}

/* ORDERS */
function showOrders(){
    document.getElementById("orders").style.display="block";
    let div=document.getElementById("orderList");
    div.innerHTML="";
    orders.forEach(o=>{
        div.innerHTML+=`
        <div>
        <h4>Order #${o.id}</h4>
        <p>${o.name}</p>
        <p>Status: ${o.status}</p>
        <p>${o.address}</p>
        </div>`;
    });
}

function closeOrders(){
    document.getElementById("orders").style.display="none";
}

function closeCheckout(){
    document.getElementById("checkout").style.display="none";
}

displayProducts(products);
updateCart();
