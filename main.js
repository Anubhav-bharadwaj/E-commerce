const products = [
  { id:1, name:"Oribe Matte Vase", category:"Ceramics", price:148, oldPrice:null, desc:"Hand-thrown in Kyoto using traditional oribe glaze technique. Each piece is entirely unique.", img:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&auto=format&fit=crop&q=80", badge:"New", stars:5 },
  { id:2, name:"Linen Day Throw", category:"Textiles", price:224, oldPrice:280, desc:"100% stonewashed Belgian linen. Naturally textured, gets softer with every wash.", img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80", badge:"Sale", stars:4 },
  { id:3, name:"Wabi Candleholder", category:"Living", price:86, oldPrice:null, desc:"Cast iron with a matte patina finish. Holds taper or pillar candles beautifully.", img:"https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=600&auto=format&fit=crop&q=80", badge:null, stars:5 },
  { id:4, name:"Rattan Pendant Light", category:"Lighting", price:345, oldPrice:null, desc:"Handwoven rattan shade from artisans in Lombok, Indonesia. Casts warm dappled light.", img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80", badge:"New", stars:5 },
  { id:5, name:"Stoneware Tea Set", category:"Ceramics", price:196, oldPrice:240, desc:"A four-piece set crafted in matte white stoneware. Minimal form, considered detail.", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80", badge:"Sale", stars:4 },
  { id:6, name:"Oak Tray", category:"Living", price:112, oldPrice:null, desc:"Solid white oak with a natural oil finish. Perfect for entryways, tables, and bedside.", img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80", badge:null, stars:4 },
  { id:7, name:"Merino Cushion Cover", category:"Textiles", price:94, oldPrice:null, desc:"Extra-fine merino wool in a natural undyed palette. 50×50cm with concealed zip.", img:"https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80", badge:"New", stars:5 },
  { id:8, name:"Papier Wall Light", category:"Lighting", price:278, oldPrice:null, desc:"Hand-formed from recycled paper pulp. A soft warm glow that transforms any corner.", img:"https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&auto=format&fit=crop&q=80", badge:null, stars:4 },
  { id:9, name:"Bizen Sake Cup Set", category:"Ceramics", price:138, oldPrice:165, desc:"An ornate handcrafted goblet set with intricate floral detailing and a timeless antique finish.", img:"https://images.unsplash.com/photo-1704346581026-75398ac2b83e?q=80&w=846&auto=format&fit=crop", badge:"Sale", stars:5 },
  { id:10, name:"Jute Runner", category:"Textiles", price:165, oldPrice:null, desc:"Hand-knotted jute and cotton blend. Natural, durable, beautiful underfoot.", img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80", badge:null, stars:4 },
  { id:11, name:"Brass Shelf Peg Set", category:"Living", price:64, oldPrice:null, desc:"Set of 4 solid brass pegs with wall anchors. Simple, enduring, practical.", img:"https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&auto=format&fit=crop&q=80", badge:"New", stars:5 },
  { id:12, name:"Terracotta Planter", category:"Living", price:82, oldPrice:null, desc:"Unglazed terracotta from a small family studio in Portugal. Naturally porous.", img:"https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80", badge:null, stars:4 },
];

let cart = [];
let wishlist = new Set();
let currentCat = 'All';

// Cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cursor.style.left=mx+'px'; cursor.style.top=my+'px'; });
(function animRing(){ rx+=(mx-rx)*0.18; ry+=(my-ry)*0.18; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(animRing); })();

// Render products
function renderProducts(cat) {
  const grid = document.getElementById('productsGrid');
  const filtered = cat === 'All' ? products : products.filter(p => p.category === cat);
  document.getElementById('productCount').textContent = filtered.length + ' objects';
  grid.innerHTML = filtered.map(p => `
    <div class="product-card reveal" data-cat="${p.category}" data-id="${p.id}">
      <div class="product-image-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<div class="product-badge${p.badge==='Sale'?' sale':''}">${p.badge}</div>` : ''}
        <button class="product-wishlist${wishlist.has(p.id)?' liked':''}" onclick="toggleWish(${p.id},this)" title="Save">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="${wishlist.has(p.id)?'currentColor':'none'}" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
        <div class="product-actions">
          <button class="action-btn" onclick="quickView(${p.id})">Quick View</button>
          <button class="action-btn primary-action" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-price-row">
          <div class="product-price">
            ${p.oldPrice ? `<span class="old-price">$${p.oldPrice}</span>` : ''}$${p.price}
          </div>
          <div class="product-stars">${'★'.repeat(p.stars)}${'☆'.repeat(5-p.stars)}</div>
        </div>
      </div>
    </div>
  `).join('');
  observeReveal();
}

function filterCat(cat, el) {
  currentCat = cat;
  document.querySelectorAll('.cat-btn, .nav-links a').forEach(b => b.classList.remove('active'));
  if(el) el.classList.add('active');
  renderProducts(cat);
  document.getElementById('shop').scrollIntoView({behavior:'smooth'});
}

function toggleWish(id, btn) {
  if(wishlist.has(id)) { wishlist.delete(id); btn.classList.remove('liked'); btn.innerHTML=btn.innerHTML.replace('currentColor','none'); }
  else { wishlist.add(id); btn.classList.add('liked'); btn.innerHTML=btn.innerHTML.replace('fill="none"','fill="currentColor"'); }
}

// Cart
function addToCart(id) {
  const p = products.find(x => x.id===id);
  const existing = cart.find(x => x.id===id);
  if(existing) existing.qty++;
  else cart.push({...p, qty:1});
  updateCartUI();
  showToast('Added — ' + p.name);
  toggleCart(true);
}

function updateCartUI() {
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const count = cart.reduce((s,i)=>s+i.qty,0);
  const badge = document.getElementById('cartBadge');
  badge.textContent = count;
  badge.style.display = count ? 'flex' : 'none';
  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  if(!cart.length) {
    cartItems.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">◯</div><p>Your selection is empty</p><p style="font-size:11px;color:var(--bronze);">Discover curated objects</p></div>`;
    cartFooter.style.display='none'; return;
  }
  cartFooter.style.display='block';
  document.getElementById('cartSubtotal').textContent = '$'+total.toLocaleString();
  document.getElementById('cartTotal').textContent = '$'+total.toLocaleString();
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}">
      <div>
        <div class="cart-item-cat">${item.category}</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        </div>
      </div>
      <div class="cart-item-price">$${(item.price*item.qty).toLocaleString()}</div>
    </div>
  `).join('');
}

function changeQty(id, delta) {
  const i = cart.findIndex(x=>x.id===id);
  if(i===-1) return;
  cart[i].qty += delta;
  if(cart[i].qty<=0) cart.splice(i,1);
  updateCartUI();
}

let cartOpen = false;
function toggleCart(forceOpen) {
  cartOpen = forceOpen===true ? true : !cartOpen;
  document.getElementById('cartOverlay').classList.toggle('open', cartOpen);
  document.body.style.overflow = cartOpen ? 'hidden' : '';
}
function closeCart(e) { if(e.target===document.getElementById('cartOverlay')) toggleCart(); }

// Search
let searchOpen = false;
function toggleSearch() {
  searchOpen = !searchOpen;
  document.getElementById('searchOverlay').classList.toggle('open', searchOpen);
  if(searchOpen) { document.getElementById('searchInput').value=''; setTimeout(()=>document.getElementById('searchInput').focus(),300); }
}
document.addEventListener('keydown', e => { if(e.key==='Escape') { if(searchOpen) toggleSearch(); if(cartOpen) toggleCart(); }});

// Toast
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 2800);
}

// Quick view (simple alert for demo)
function quickView(id) {
  const p = products.find(x=>x.id===id);
  showToast('Viewing — ' + p.name);
}

// Scroll reveal
function observeReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e,i) => { if(e.isIntersecting) { setTimeout(()=>e.target.classList.add('visible'), i*60); obs.unobserve(e.target); }});
  }, {threshold:0.08});
  els.forEach(el=>obs.observe(el));
}

// Init
renderProducts('All');
observeReveal();
