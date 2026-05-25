import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({duration:700,once:true,easing:'ease-out-cubic',offset:50});

export const PRODS: any[] = [
  {id:1,name:'Pencil Portrait',cat:'art',e:'✏️',img:'https://i.pinimg.com/736x/51/b1/5e/51b15e123b6335c35c0c42684ed360ac.jpg',desc:'Realistic grayscale pencil portrait from your reference photo.',price:200,from:true,pop:false},
  {id:2,name:'painting',cat:'art',e:'🎨',img:'https://i.pinimg.com/736x/7c/f1/2d/7cf12d244d961713c89b3e7a69a03a49.jpg',desc:'Full colour portrait using watercolour or colour pencils.',price:350,from:true,pop:true},
  {id:3,name:'Couple Portrait',cat:'art',e:'💑',img:'https://i.pinimg.com/736x/11/59/79/1159797888fca8daecb8ba701ee8d165.jpg',desc:'Romantic illustrated portrait — perfect anniversary gift.',price:450,from:true,pop:true},
  {id:4,name:'Pet Portrait',cat:'art',e:'🐾',img:'https://i.pinimg.com/736x/9c/29/2a/9c292ae426619716ff8c8aaa98de826b.jpg',desc:'Your fur baby immortalised in a beautiful hand-drawn sketch.',price:250,from:true,pop:false},
  {id:5,name:'split posters ',cat:'art',e:'⭐',img:'https://i.pinimg.com/1200x/9f/aa/9d/9faa9dd7044d5ec96fe79407ac33d678.jpg',desc:'Custom anime, movie, or celeb fan art in your chosen style.',price:200,from:true,pop:false},
  {id:6,name:'mini album',cat:'art',e:'🎂',img:'https://i.pinimg.com/1200x/82/28/e4/8228e460c07eff0506c4da2f12523876.jpg',desc:'Special birthday portrait as a heartfelt personalised gift.',price:99,from:true,pop:true},
  {id:7,name:'Polaroid Prints',cat:'print',e:'📷',img:'https://i.pinimg.com/736x/1a/b0/5a/1ab05a846f0c2cfe72b92e796f3a41a6.jpg',desc:'Classic polaroid-style photo prints — pack of 6 or 12.',price:80,from:true,pop:true},
  {id:8,name:'Strip Poster',cat:'print',e:'🎞️',img:'https://i.pinimg.com/736x/36/c3/29/36c3295bdd4baadddbee3e14e1fcb526.jpg',desc:'Aesthetic vertical strip with 4–6 of your favourite shots.',price:60,from:true,pop:false},
  {id:9,name:'Photo Collage Print',cat:'print',e:'🖼️',img:'https://i.pinimg.com/736x/c3/a8/86/c3a8865e25402f3aff2bcc4cf03c6323.jpg',desc:'Custom-designed collage of multiple photos in one A4 print.',price:80,from:true,pop:true},
  {id:10,name:'Custom Gift',cat:'print',e:'🎁',img:'https://i.pinimg.com/1200x/85/e3/5f/85e35f9d66a6474923e4381c32d5950d.jpg',desc:'Mugs, keychains, bookmarks & more with your design or photo.',price:120,from:true,pop:false},
  {id:11,name:'Poster Design',cat:'print',e:'🌟',img:'https://i.pinimg.com/736x/ad/a0/4b/ada04b70bc73e11555c7daabd96d2804.jpg',desc:'Minimalist, retro, or aesthetic custom poster layouts.',price:100,from:true,pop:false},
  {id:12,name:'Sketch',cat:'art',e:'💍',img:'https://i.pinimg.com/1200x/f4/9c/d0/f49cd0c72c1207c7f9a68740b91c86ea.jpg',desc:'Elegant illustrated wedding portrait on premium paper.',price:600,from:true,pop:false},
];

let cart: any[] = [];
const CS: any = {art:{file:null,size:null,price:null,src:null},print:{file:null,size:null,price:null,src:null}};

// Expose functions globally for inline HTML event handlers
declare global {
  interface Window {
    doFilter: any; addToCart: any; addCustom: any; removeFromCart: any;
    changeQty: any; openCart: any; closeCart: any; proceedToCheckout: any;
    payWithUPI: any; payWithWhatsApp: any; onFile: any; rmFile: any;
    pickSz: any; dOver: any; dLeave: any; dDrop: any; submitForm: any;
    closeMob: any;
  }
}

let currentOrderId: string | null = null;
let currentCustomer = { name: '', phone: '', address: '' };

export function showToast(msg: string) {
  const t = document.getElementById('toast');
  if(!t)return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

export function renderProds(filter: string) {
  const grid = document.getElementById('prodGrid');
  if(!grid)return;
  const list = filter === 'all' ? PRODS : filter === 'popular' ? PRODS.filter(p => p.pop) : PRODS.filter(p => p.cat === filter);
  grid.innerHTML = list.map(p => `
  <div class="p-card" data-aos="fade-up">
    <div class="p-img">
      <img src="${p.img}" alt="${p.name}" class="p-card-img" loading="lazy" onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';" />
      <div class="p-emoji fallback-emoji" style="display:none;">${p.e}</div>
      <span class="p-badge-el ${p.pop ? 'b-pop' : p.cat === 'art' ? 'b-art' : 'b-print'}">${p.pop ? '⭐ Popular' : p.cat === 'art' ? '🎨 Art' : '🖼️ Print'}</span>
      <div class="p-hover-overlay"><button class="quick-btn" onclick="window.addToCart(${p.id})">🛒 Add to Cart</button></div>
    </div>
    <div class="p-info">
      <div class="p-cat">${p.cat === 'art' ? 'Hand-Drawn Art' : 'Print & Gift'}</div>
      <div class="p-name">${p.name}</div>
      <div class="p-desc-txt">${p.desc}</div>
      <div class="p-bottom">
        <div class="p-price">${p.from ? '<span class="p-price-from">from</span>' : ''}₹${p.price}</div>
        <button class="p-add-btn" id="ab${p.id}" onclick="window.addToCart(${p.id})" title="Add to cart">+</button>
      </div>
    </div>
  </div>`).join('');
  AOS.refresh();
}

export function doFilter(f: string, btn: HTMLElement) {
  document.querySelectorAll('.f-tab').forEach(t => t.classList.remove('on'));
  btn.classList.add('on');
  renderProds(f);
}

export function addToCart(pid: number, customItem: any = null) {
  const prod = PRODS.find(p => p.id === pid);
  if (!prod && !customItem) return;
  const item = customItem || { id: 'p' + pid + Date.now(), name: prod.name, e: prod.e, price: prod.price, meta: prod.cat === 'art' ? 'Hand-Drawn Art' : 'Print & Gift', qty: 1, src: null };
  if (!customItem) {
    const ex = cart.find(c => c.name === item.name && c.meta === item.meta);
    if (ex) { ex.qty++; renderCart(); showToast('🛒 Qty updated!'); }
    else { cart.push({ ...item, qty: 1 }); renderCart(); showToast(`✅ "${item.name}" added!`); }
  } else {
    cart.push({ ...item, qty: 1 }); renderCart(); showToast(`✅ "${item.name}" added!`);
  }
  const btn = document.getElementById('ab' + pid);
  if (btn) { btn.classList.add('done'); btn.textContent = '✓'; setTimeout(() => { btn.classList.remove('done'); btn.textContent = '+'; }, 1200); }
}

export function addCustom(type: string) {
  const s = CS[type];
  if (!s.file || !s.size) return;
  const name = (type === 'art' ? 'Custom Portrait' : 'Custom Print') + ' (' + s.size + ')';
  addToCart(null, { id: 'c' + Date.now(), name, e: type === 'art' ? '🎨' : '🖼️', price: s.price, meta: (type === 'art' ? 'Hand-Drawn' : 'Print') + ' · ' + s.size, qty: 1, src: s.src });
  openCart();
}

export function removeFromCart(id: string) { cart = cart.filter(c => c.id !== id); renderCart(); }
export function changeQty(id: string, d: number) { const i = cart.find(c => c.id === id); if (i) { i.qty = Math.max(1, i.qty + d); renderCart(); } }

export function getCartTotal() {
  return cart.reduce((s, c) => s + c.price * c.qty, 0);
}

export function renderCart() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const total = getCartTotal();
  
  const navCount = document.getElementById('navCount');
  const cartBadge = document.getElementById('cartBadge');
  if(navCount) navCount.textContent = count.toString();
  if(cartBadge) cartBadge.textContent = count.toString();

  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  const btnProceed = document.getElementById('btnProceedCheckout') as HTMLButtonElement;

  if (!cart.length) {
    if(body) body.innerHTML = `<div class="cart-empty-state"><div class="cart-empty-icon">🛒</div><div class="cart-empty-text">Your cart is empty.<br>Add something beautiful!</div></div>`;
    if(footer) footer.dataset.empty = 'true';
    if(btnProceed) btnProceed.disabled = true;
    return;
  }
  
  if(footer) footer.dataset.empty = 'false';
  if(btnProceed) btnProceed.disabled = false;
  
  if(body) body.innerHTML = cart.map(item => `
  <div class="cart-item">
    <div class="cart-thumb">${item.src ? `<img src="${item.src}" alt="">` : item.e}</div>
    <div class="cart-item-info">
      <div class="cart-item-name">${item.name}</div>
      <div class="cart-item-meta">${item.meta}</div>
      <div class="qty-row">
        <button class="qty-btn" onclick="window.changeQty('${item.id}',-1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="window.changeQty('${item.id}',1)">+</button>
      </div>
    </div>
    <div class="cart-item-right">
      <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
      <button class="remove-item" onclick="window.removeFromCart('${item.id}')" title="Remove">🗑️</button>
    </div>
  </div>`).join('');
  
  const cSub = document.getElementById('cSub');
  const cTotal = document.getElementById('cTotal');
  if(cSub) cSub.textContent = '₹' + total.toLocaleString('en-IN');
  if(cTotal) cTotal.textContent = '₹' + total.toLocaleString('en-IN');
}

export function openCart() {
  document.getElementById('overlay')?.classList.add('open');
  document.getElementById('drawer')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  resetCartUI();
}

export function closeCart() {
  document.getElementById('overlay')?.classList.remove('open');
  document.getElementById('drawer')?.classList.remove('open');
  document.body.style.overflow = '';
}

export function resetCartUI() {
  const chk = document.getElementById('checkoutSection');
  const opts = document.getElementById('paymentOptions');
  const conf = document.getElementById('orderConfirmInfo');
  const btn = document.getElementById('btnProceedCheckout');
  
  if(chk) chk.style.display = 'none';
  if(opts) opts.style.display = 'none';
  if(conf) conf.style.display = 'none';
  if(btn) btn.style.display = 'flex';
}

export function proceedToCheckout() {
  const form = document.getElementById('checkoutSection');
  const btnProceed = document.getElementById('btnProceedCheckout');
  const paymentOpts = document.getElementById('paymentOptions');

  if(form) form.style.display = 'flex';
  if(btnProceed) btnProceed.style.display = 'none';
  if(paymentOpts) paymentOpts.style.display = 'flex';
  
  setTimeout(() => {
      const drawer = document.getElementById('drawer');
      if(drawer) drawer.scrollTo({ top: drawer.scrollHeight, behavior: 'smooth' });
  }, 50);
}

export function validateForm(): boolean {
  const form = document.getElementById('checkoutForm') as HTMLFormElement;
  if (!form.checkValidity()) {
      form.reportValidity();
      return false;
  }
  currentCustomer.name = (document.getElementById('custName') as HTMLInputElement).value;
  currentCustomer.phone = (document.getElementById('custPhone') as HTMLInputElement).value;
  currentCustomer.address = (document.getElementById('custAddress') as HTMLInputElement).value;
  return true;
}

export function generateOrderId() {
  return 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function showConfirmation(orderId: string) {
  const chk = document.getElementById('checkoutSection');
  const opts = document.getElementById('paymentOptions');
  const conf = document.getElementById('orderConfirmInfo');
  const btn = document.getElementById('btnProceedCheckout');
  
  if(chk) chk.style.display = 'none';
  if(opts) opts.style.display = 'none';
  if(btn) btn.style.display = 'none';
  
  if(conf) conf.style.display = 'flex';
  const displayObj = document.getElementById('displayOrderId');
  if(displayObj) displayObj.textContent = orderId;
}

export async function payWithUPI() {
  if (!validateForm()) return;
  const btn = document.getElementById('btnPayUPI') as HTMLButtonElement;
  btn.classList.add('btn-loading');
  btn.disabled = true;

  currentOrderId = generateOrderId();
  const total = getCartTotal();

  await new Promise(r => setTimeout(r, 800)); // Simulate processing

  btn.classList.remove('btn-loading');
  btn.disabled = false;

  showConfirmation(currentOrderId);
  
  showToast("Redirecting to your UPI app...");
  const upiId = "9500565091@paytm";
  const name = "Artlane Diaries";
  const note = `Order ${currentOrderId}`;
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${total}&cu=INR&tn=${encodeURIComponent(note)}`;
  
  window.location.href = upiLink;
}

export async function payWithWhatsApp() {
  if (!validateForm()) return;
  const btn = document.getElementById('btnPayWP') as HTMLButtonElement;
  btn.classList.add('btn-loading');
  btn.disabled = true;

  currentOrderId = generateOrderId();
  const total = getCartTotal();

  await new Promise(r => setTimeout(r, 800)); // Simulate processing

  btn.classList.remove('btn-loading');
  btn.disabled = false;

  showConfirmation(currentOrderId);

  showToast("Opening WhatsApp...");
  const itemsList = cart.map(c => `• ${c.name} (${c.meta}) x${c.qty} = ₹${c.price * c.qty}`).join('\n');
  const msg = `Hi Artlane Diaries! 🎨
I'd like to place an order.

*Order ID:* ${currentOrderId}
*Name:* ${currentCustomer.name}
*Phone:* ${currentCustomer.phone}
*Address:* ${currentCustomer.address}

*Order Summary:*
${itemsList}

*Total Amount:* ₹${total}

I have initiated the process. Please confirm my order!`;

  window.open(`https://wa.me/919500565091?text=${encodeURIComponent(msg)}`, '_blank');
}

export function onFile(input: HTMLInputElement, type: string) {
  const f = input.files?.[0]; if (!f) return;
  CS[type].file = f;
  const r = new FileReader();
  r.onload = e => {
      CS[type].src = e.target?.result;
      const img = document.getElementById(type + 'PrevImg') as HTMLImageElement;
      if(img) img.src = e.target?.result as string;
      const prev = document.getElementById(type + 'Prev');
      if(prev) prev.style.display = 'block';
      const zone = document.getElementById(type + 'Zone');
      if(zone) zone.style.display = 'none';
  };
  r.readAsDataURL(f); chkBtn(type);
}

export function rmFile(type: string) {
  CS[type].file = null; CS[type].src = null;
  const prev = document.getElementById(type + 'Prev');
  if(prev) prev.style.display = 'none';
  const zone = document.getElementById(type + 'Zone');
  if(zone) zone.style.display = 'block';
  const inp = document.getElementById(type + 'File') as HTMLInputElement;
  if(inp) inp.value = '';
  chkBtn(type);
}

export function pickSz(type: string, sz: string, price: number, el: HTMLElement) {
  document.querySelectorAll(`#${type}Sizes .size-btn`).forEach(b => b.classList.remove('sa', 'sp'));
  el.classList.add(type === 'art' ? 'sa' : 'sp');
  CS[type].size = sz; CS[type].price = price;
  
  const szEl = document.getElementById(type + 'Sz');
  if(szEl) szEl.textContent = sz;
  const prcEl = document.getElementById(type + 'Prc');
  if(prcEl) prcEl.textContent = '₹' + price;
  
  const sumEl = document.getElementById(type + 'Sum');
  if(sumEl) sumEl.classList.add('show');
  chkBtn(type);
}

export function chkBtn(type: string) { 
  const btn = document.getElementById(type + 'AddBtn') as HTMLButtonElement;
  if(btn) btn.disabled = !(CS[type].file && CS[type].size); 
}

export function dOver(e: Event, id: string) { 
  e.preventDefault(); 
  document.getElementById(id)?.classList.add('dg'); 
}

export function dLeave(id: string) { 
  document.getElementById(id)?.classList.remove('dg'); 
}

export function dDrop(e: DragEvent, type: string) {
  e.preventDefault(); dLeave(type + 'Zone');
  const f = e.dataTransfer?.files[0];
  if (f && (f.type === 'image/jpeg' || f.type === 'image/png')) {
      const dt = new DataTransfer(); dt.items.add(f);
      const inp = document.getElementById(type + 'File') as HTMLInputElement;
      if(inp) { inp.files = dt.files; onFile(inp, type); }
  }
}

export function submitForm(e: Event) {
  e.preventDefault();
  showToast("✅ Message sent! We'll reply within 24hrs.");
  (e.target as HTMLFormElement).reset();
}

export function closeMob() {
  document.getElementById('mobMenu')?.classList.remove('open');
}

// Window Bindings
window.doFilter = doFilter;
window.addToCart = addToCart;
window.addCustom = addCustom;
window.removeFromCart = removeFromCart;
window.changeQty = changeQty;
window.openCart = openCart;
window.closeCart = closeCart;
window.proceedToCheckout = proceedToCheckout;
window.payWithUPI = payWithUPI;
window.payWithWhatsApp = payWithWhatsApp;
window.onFile = onFile;
window.rmFile = rmFile;
window.pickSz = pickSz;
window.dOver = dOver;
window.dLeave = dLeave;
window.dDrop = dDrop;
window.submitForm = submitForm;
window.closeMob = closeMob;

// Setup
const customersCount = 214 + Math.floor(Math.random() * 30);
document.querySelectorAll('.dynamic-customers').forEach(el => el.textContent = `${customersCount}+`);

window.addEventListener('scroll', () => {
  document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('stb')?.classList.toggle('show', window.scrollY > 500);
});

renderProds('all');
renderCart();
