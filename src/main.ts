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
let savedCart: any[] = JSON.parse(localStorage.getItem('savedCart') || '[]');

// CS stores sizes, price and loaded multiple files list { file: File, src: string }
const CS: any = {
  art: { files: [], size: null, price: null },
  print: { files: [], size: null, price: null }
};

export const PREMIUM_PRODUCTS = [
  {
    id: 'poster',
    name: 'Custom Poster',
    tagline: 'Classic display',
    originalPrice: 179,
    salePrice: 129,
    desc: 'Classic high-resolution aesthetic canvas prints with crisp edge finishes and anti-fade protection. Perfect for bedrooms, offices, living spaces, or study desks.',
    img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600',
    mockupBg: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
    maxFiles: 10,
    sizes: [
      { name: 'A5', label: 'A5 Size', price: 80, dims: '14.8×21cm' },
      { name: 'A4', label: 'A4 Size', price: 129, dims: '21×29.7cm' },
      { name: 'A3', label: 'A3 Size', price: 249, dims: '29.7×42cm' }
    ]
  },
  {
    id: 'split',
    name: 'Custom Split Poster',
    tagline: '3-Piece Canvas',
    originalPrice: 399,
    salePrice: 299,
    desc: 'Breathtaking split artwork across 3 premium adjacent landscape/portrait panels. Creates an imposing and premium modern style statement in any room.',
    img: 'https://images.unsplash.com/photo-1544207240-8f1015480d52?auto=format&fit=crop&q=80&w=600',
    mockupBg: 'https://images.unsplash.com/photo-1544207240-8f1015480d52?auto=format&fit=crop&q=80&w=800',
    maxFiles: 10,
    sizes: [
      { name: 'Standard S', label: 'Standard Split (Pack of 3)', price: 299, dims: '3 Panels (A5 each)' },
      { name: 'Classic M', label: 'Classic Split (Pack of 3)', price: 499, dims: '3 Panels (A4 each)' },
      { name: 'Premium L', label: 'Premium Split (Pack of 3)', price: 899, dims: '3 Panels (A3 each)' }
    ]
  },
  {
    id: 'split2x2',
    name: 'Custom Split Poster 2x2',
    tagline: 'Quad Grid',
    originalPrice: 499,
    salePrice: 379,
    desc: 'Perfect symmetry across 4 quadrant grid panels. Excellent for storytelling, travel milestones, wedding highlights, and aesthetic photo series compilations.',
    img: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=600',
    mockupBg: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=800',
    maxFiles: 10,
    sizes: [
      { name: 'Standard S', label: 'Standard Grid (Pack of 4)', price: 379, dims: '4 Panels (A5 each)' },
      { name: 'Classic M', label: 'Classic Grid (Pack of 4)', price: 599, dims: '4 Panels (A4 each)' }
    ]
  },
  {
    id: 'retro',
    name: 'Custom Retro Prints',
    tagline: 'Polaroid style',
    originalPrice: 199,
    salePrice: 149,
    desc: 'Classic aesthetic vintage printed square cards with spacious base headers to write custom captions. Includes sturdy wooden clothespins and warm cozy fairy string lights.',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
    mockupBg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    maxFiles: 10,
    sizes: [
      { name: 'Pack of 6', label: '6 Polaroid Prints', price: 149, dims: '6x Prints + Pegs + Lights' },
      { name: 'Pack of 12', label: '12 Polaroid Prints', price: 249, dims: '12x Prints + Pegs + Lights' },
      { name: 'Pack of 24', label: '24 Polaroid Prints', price: 449, dims: '24x Prints + Pegs + Lights' }
    ]
  },
  {
    id: 'mini',
    name: 'Custom Mini Pocket Photo',
    tagline: 'Phone case card',
    originalPrice: 99,
    salePrice: 69,
    desc: 'Specially engineered ultra slim card prints sized perfectly to slide inside transparent smartphone casings, wallet segments, or keychains.',
    img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
    mockupBg: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
    maxFiles: 10,
    sizes: [
      { name: 'Pack of 4', label: '4 Pocket Prints', price: 69, dims: '4x Pocket Cards' },
      { name: 'Pack of 8', label: '8 Pocket Prints', price: 129, dims: '8x Pocket Cards' }
    ]
  },
  {
    id: 'photobooth',
    name: 'Custom Photobooth Strip',
    tagline: 'Bookmark strip',
    originalPrice: 120,
    salePrice: 89,
    desc: 'Vintage bookmark styled strip of memories. Features 4 square photos stacked vertically on heavy textured ivory cardstock.',
    img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
    mockupBg: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    maxFiles: 10,
    sizes: [
      { name: 'Set of 3', label: '3 Photobooth Strips', price: 89, dims: '3x Strips (12 photos total)' },
      { name: 'Set of 6', label: '6 Photobooth Strips', price: 159, dims: '6x Strips (24 photos total)' }
    ]
  }
];

export let activeProdId = 'poster';
export let activeSizeIndex = 1; // Default to A4/Index 1
export let activeQty = 1;
export interface UploadedFile {
  file: File;
  src: string;
  originalSrc?: string;
}
export let uploadedMockupFiles: UploadedFile[] = [];

// Expose functions globally for inline HTML event handlers
declare global {
  interface Window {
    doFilter: any; addToCart: any; addCustom: any; removeFromCart: any;
    changeQty: any; openCart: any; closeCart: any; proceedToCheckout: any;
    payWithUPI: any; payWithWhatsApp: any; onFile: any; rmFile: any;
    pickSz: any; dOver: any; dLeave: any; dDrop: any; submitForm: any;
    closeMob: any;
    goToStep: any; removeUpload: any; closeCartAndClear: any;
    triggerPolicy: any; closePolicy: any;
    saveForLater: any; moveToActiveCart: any; removeSavedItem: any;
    clearSavedWithConfirm: any; closeConfirmModal: any; confirmClearSaved: any;
    shareWebsite: any;
    quickWhatsAppOrder: any; orderCustomWhatsApp: any; closeQuickWAModal: any; submitQuickWhatsAppOrder: any;
    // New premium customizer additions
    selectPremiumProduct: any; selectPremiumSize: any; changePremiumQty: any;
    onPremiumFiles: any; removePremiumUpload: any; submitPremiumOrderToCart: any;
    submitPremiumOrderToWhatsApp: any; toggleSizeGuideModal: any; scrollToCustomizer: any; showPage: any; clickCatalogProduct: any; toggleFaqItem: any; clickPremiumCard: any;
    // Crop engine functionality
    openCropModal: any; closeCropModal: any; applyAndSaveCrop: any;
    onCropZoomChange: any; onCropShiftChange: any; rotateCropImage: any;
    setCropRatio: any;
  }
}

let currentOrderId: string | null = null;
let currentCustomer = { name: '', phone: '', address: '' };
let currentStep = 1; // 1: Cart, 2: Details, 3: Pay, 4: Done

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
  grid.innerHTML = list.map((p, index) => {
    const delayMs = index * 32;
    return `
    <div class="p-card card-filter-animate" onclick="window.clickCatalogProduct(${p.id})" style="cursor: pointer; display: flex; flex-direction: column; animation-delay: ${delayMs}ms;" data-aos="fade-up">
      <div class="p-img" style="position: relative; overflow: hidden;">
        <img src="${p.img}" alt="${p.name}" class="p-card-img" loading="lazy" onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <div class="p-emoji fallback-emoji" style="display:none;">${p.e}</div>
        
        <!-- Premium Dual Badges Overlay -->
        <span class="p-badge-el ${p.cat === 'art' ? 'b-art' : 'b-print'}" style="position: absolute; top: 10px; left: 10px; z-index: 2;">
          ${p.cat === 'art' ? '🎨 Art' : '🖼️ Print'}
        </span>
        ${p.pop ? `
        <span class="p-badge-el b-pop" style="position: absolute; top: 10px; right: 10px; left: auto; z-index: 2;">
          ⭐ Popular
        </span>` : ''}
      </div>
      <div class="p-info" style="display: flex; flex-direction: column; flex: 1;">
        <div class="p-cat">${p.cat === 'art' ? 'Hand-Drawn Art' : 'Print & Gift'}</div>
        <div class="p-name" style="font-family:'Playfair Display', serif; font-size:1.05rem; font-weight:700; color:var(--ink);">${p.name}</div>
        <div class="p-desc-txt" style="flex: 1;">${p.desc}</div>
        
        <!-- Clean Price & Action Trigger row -->
        <div class="p-price-area" style="margin-top: auto; padding-top: 12px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(184,132,74,0.06);">
          <span class="p-price" style="font-family:'Playfair Display', serif; font-size:1.15rem; font-weight:700; color:var(--amber);">
            <span style="font-size:0.68rem; font-family:'DM Sans', sans-serif; font-weight:500; color:var(--muted); text-transform:uppercase; letter-spacing:0.02em; display:inline-block; margin-right:4px;">from</span>₹${p.price}+
          </span>
          <span style="font-size:0.75rem; color:var(--print); font-weight:700; letter-spacing:0.02em; display: flex; align-items: center; gap: 4px;">
            Customize &rarr;
          </span>
        </div>
      </div>
    </div>`;
  }).join('');
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
    if (ex) { 
      ex.qty++; 
      renderCart(); 
      showToast('🛒 Quantity updated in cart!'); 
    } else { 
      cart.push({ ...item, qty: 1 }); 
      renderCart(); 
      showToast(`✅ "${item.name}" added to cart!`); 
    }
  } else {
    cart.push({ ...item, qty: 1 }); 
    renderCart(); 
    showToast(`✅ "${item.name}" custom order added!`);
  }
  const btn = document.getElementById('ab' + pid);
  if (btn) { 
    btn.classList.add('done'); 
    btn.textContent = 'Added ✓'; 
    btn.style.background = 'var(--print)';
    setTimeout(() => { 
      btn.classList.remove('done'); 
      btn.textContent = 'Add to Cart +'; 
      btn.style.background = 'var(--ink)';
    }, 1500); 
  }
}

export function addCustom(type: string) {
  const s = CS[type];
  const filesCount = s.files ? s.files.length : 0;
  if (filesCount === 0 || !s.size) {
    showToast('⚠️ Please upload at least one photo and pick a size!');
    return;
  }
  const name = (type === 'art' ? 'Custom Portrait' : 'Custom Print') + ' (' + s.size + ')';
  const firstSrc = s.files[0].src;
  const metaDetail = (type === 'art' ? 'Hand-Drawn Portrait' : 'Print/Polaroid') + ` · Size: ${s.size} (${filesCount} images)`;
  
  addToCart(null, { 
    id: 'c' + Date.now(), 
    name, 
    e: type === 'art' ? '🎨' : '🖼️', 
    price: s.price, 
    meta: metaDetail, 
    qty: 1, 
    src: firstSrc 
  });
  
  // Clean custom order slot
  s.files = [];
  renderUploadPreviews(type);
  openCart();
}

export function removeFromCart(id: string) { cart = cart.filter(c => c.id !== id); renderCart(); }
export function changeQty(id: string, d: number) { const i = cart.find(c => c.id === id); if (i) { i.qty = Math.max(1, i.qty + d); renderCart(); } }

export function getCartTotalRaw() {
  return cart.reduce((s, c) => s + c.price * c.qty, 0);
}

export function getCartTotal() {
  const raw = getCartTotalRaw();
  const totalQty = cart.reduce((s, c) => s + c.qty, 0);
  let discountPercent = 0;
  if (totalQty >= 11) discountPercent = 0.20;
  else if (totalQty >= 6) discountPercent = 0.10;
  return Math.round(raw * (1 - discountPercent));
}

export function renderCart() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const rawSubtotal = getCartTotalRaw();
  
  // Bulk discounts calculations
  let bulkDiscount = 0;
  let tierText = "";
  let progressTip = "";
  
  if (count >= 11) {
    bulkDiscount = Math.round(rawSubtotal * 0.20);
    tierText = "Wholesale Volume Discount (20% Off)";
    progressTip = "🎉 Max 20% discount unlocked. You are getting the best deal!";
  } else if (count >= 6) {
    bulkDiscount = Math.round(rawSubtotal * 0.10);
    tierText = "Bulk Volume Discount (10% Off)";
    const left = 11 - count;
    progressTip = `🔥 10% discount applied! Add <strong>${left} more items</strong> to unlock a massive <strong>20% off</strong>!`;
  } else {
    const left = 6 - count;
    progressTip = `💡 Add <strong>${left} more items</strong> to unlock a special <strong>10% wholesale discount</strong>!`;
  }
  
  const totalAmount = rawSubtotal - bulkDiscount;

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
  } else {
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
        <button class="save-later-btn" onclick="window.saveForLater('${item.id}')" style="background:none; border:none; color:var(--amber); font-size:0.7rem; font-weight:700; cursor:pointer; padding: 4px 0 0 0; text-align:left; text-decoration:underline; display:block; transition:color 0.2s;" onmouseover="this.style.color='var(--ink)'" onmouseout="this.style.color='var(--amber)'">
          💾 Save for Later
        </button>
      </div>
      <div class="cart-item-right">
        <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
        <button class="remove-item" onclick="window.removeFromCart('${item.id}')" title="Remove">🗑️</button>
      </div>
    </div>`).join('');
  }
  
  // Always render/update Saved for Later section
  const savedSection = document.getElementById('savedSection');
  const savedBody = document.getElementById('savedBody');
  const savedBadge = document.getElementById('savedBadge');

  if (savedSection && savedBody && savedBadge) {
    savedBadge.textContent = savedCart.length.toString();
    if (savedCart.length > 0) {
      savedSection.style.display = 'block';
      savedBody.innerHTML = savedCart.map(item => `
        <div class="cart-item" style="padding: 12px 0; border-bottom: 1px solid rgba(184,132,74,0.12); gap:12px;">
          <div class="cart-thumb" style="width: 44px; height: 44px; border-radius: 6px; overflow: hidden; background: #fafafa; display: flex; align-items: center; justify-content: center; flex-shrink:0;">
            ${item.src ? `<img src="${item.src}" alt="" style="width: 100%; height: 100%; object-fit: cover;">` : item.e}
          </div>
          <div class="cart-item-info" style="flex: 1; min-width:0;">
            <div class="cart-item-name" style="font-size: 0.82rem; font-weight: 600; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${item.name}</div>
            <div class="cart-item-meta" style="font-size: 0.72rem; color: var(--muted); margin-bottom: 6px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${item.meta} (qty: ${item.qty})</div>
            <button onclick="window.moveToActiveCart('${item.id}')" class="move-active-btn" style="background: var(--print); color: #fff; border: none; font-size: 0.68rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; cursor: pointer; transition: opacity 0.2s; display: inline-flex; align-items: center; gap: 4px;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
              🛒 Move to Cart
            </button>
          </div>
          <div class="cart-item-right" style="text-align: right; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end; flex-shrink:0;">
            <div class="cart-item-price" style="font-size: 0.82rem; font-weight: 600; color:var(--ink); font-family:inherit;">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
            <button onclick="window.removeSavedItem('${item.id}')" title="Delete Saved" style="background: none; border: none; cursor: pointer; font-size: 0.82rem; padding: 4px 0 0 4px; opacity: 0.6; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.6'">
              🗑️
            </button>
          </div>
        </div>
      `).join('');
    } else {
      savedSection.style.display = 'none';
    }
  }
  
  // Build totals area dynamically
  const totalsSection = document.getElementById('totalsSection');
  if (totalsSection) {
    let bulkRow = "";
    if (bulkDiscount > 0) {
      bulkRow = `<div class="cart-sum-row" style="color:var(--print); font-weight:700;"><span>🔥 ${tierText}</span><span>-₹${bulkDiscount.toLocaleString('en-IN')}</span></div>`;
    }
    
    totalsSection.innerHTML = `
      <div class="cart-sum-row"><span>Items Subtotal</span><span>₹${rawSubtotal.toLocaleString('en-IN')}</span></div>
      ${bulkRow}
      <div class="cart-sum-row"><span>Standard Delivery</span><span style="color:var(--print); font-weight:700;">Free 🎁</span></div>
      
      <div class="bulk-progress-banner" style="background: rgba(184, 132, 74, 0.06); padding: 10px 12px; border-radius: var(--rs); font-size: 0.72rem; line-height: 1.4; color: var(--ink); margin: 10px 0;">
        ${progressTip}
      </div>
      
      <div class="cart-total-row" style="margin-top: 8px;"><span>Total Amount</span><span>₹${totalAmount.toLocaleString('en-IN')}</span></div>
    `;
  }
  
  // Safe default total sync for checkout sections
  const cSub = document.getElementById('cSub');
  const cTotal = document.getElementById('cTotal');
  if(cSub) cSub.textContent = '₹' + rawSubtotal.toLocaleString('en-IN');
  if(cTotal) cTotal.textContent = '₹' + totalAmount.toLocaleString('en-IN');
  
  // Real-time update step views on change
  if (currentStep === 2) {
    goToStep(2);
  } else if (currentStep === 3) {
    goToStep(3);
  }
}

export function saveForLater(id: string) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  cart = cart.filter(c => c.id !== id);
  const ex = savedCart.find(s => s.name === item.name && s.meta === item.meta);
  if (ex) {
    ex.qty += item.qty;
  } else {
    savedCart.push({ ...item });
  }
  localStorage.setItem('savedCart', JSON.stringify(savedCart));
  renderCart();
  showToast('💾 Item saved for later!');
}

export function moveToActiveCart(id: string) {
  const item = savedCart.find(s => s.id === id);
  if (!item) return;
  savedCart = savedCart.filter(s => s.id !== id);
  localStorage.setItem('savedCart', JSON.stringify(savedCart));
  const ex = cart.find(c => c.name === item.name && c.meta === item.meta);
  if (ex) {
    ex.qty += item.qty;
  } else {
    cart.push({ ...item });
  }
  renderCart();
  showToast('🛒 Item moved back to cart!');
}

export function removeSavedItem(id: string) {
  savedCart = savedCart.filter(s => s.id !== id);
  localStorage.setItem('savedCart', JSON.stringify(savedCart));
  renderCart();
  showToast('🗑️ Saved item removed!');
}

export function clearSavedWithConfirm() {
  const modal = document.getElementById('confirmModal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

export function closeConfirmModal() {
  const modal = document.getElementById('confirmModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

export function confirmClearSaved() {
  savedCart = [];
  localStorage.setItem('savedCart', JSON.stringify(savedCart));
  renderCart();
  closeConfirmModal();
  showToast('🗑️ Saved list cleared completely!');
}

export function openCart() {
  document.getElementById('overlay')?.classList.add('open');
  document.getElementById('drawer')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  goToStep(1);
}

export function closeCart() {
  document.getElementById('overlay')?.classList.remove('open');
  document.getElementById('drawer')?.classList.remove('open');
  document.body.style.overflow = '';
}

export function goToStep(stepNum: number) {
  currentStep = stepNum;
  
  const step1Sec = document.getElementById('cartItemsSection');
  const step2Sec = document.getElementById('detailsSection');
  const step3Sec = document.getElementById('paySection');
  const step4Sec = document.getElementById('orderConfirmInfo');
  const footerSec = document.getElementById('cartFooter');

  if(step1Sec) step1Sec.style.display = 'none';
  if(step2Sec) step2Sec.style.display = 'none';
  if(step3Sec) step3Sec.style.display = 'none';
  if(step4Sec) step4Sec.style.display = 'none';

  // Toggle active progress states
  const ds1 = document.getElementById('ds1');
  const ds2 = document.getElementById('ds2');
  const ds3 = document.getElementById('ds3');
  const ds4 = document.getElementById('ds4');

  [ds1, ds2, ds3, ds4].forEach(ds => ds?.classList.remove('active', 'completed'));

  if (stepNum >= 1) ds1?.classList.add(stepNum > 1 ? 'completed' : 'active');
  if (stepNum >= 2) ds2?.classList.add(stepNum > 2 ? 'completed' : 'active');
  if (stepNum >= 3) ds3?.classList.add(stepNum > 3 ? 'completed' : 'active');
  if (stepNum >= 4) ds4?.classList.add('active');

  const totalsSection = document.getElementById('totalsSection');
  const btnProceedCheckout = document.getElementById('btnProceedCheckout');
  const paymentOptions = document.getElementById('paymentOptions');
  const trustBadges = document.getElementById('trustBadges');

  if (totalsSection) totalsSection.style.display = 'block';
  if (trustBadges) trustBadges.style.display = 'flex';
  if (btnProceedCheckout) btnProceedCheckout.style.display = 'none';
  if (paymentOptions) paymentOptions.style.display = 'none';

  if (stepNum === 1) {
    if (step1Sec) step1Sec.style.display = 'flex';
    if (footerSec) footerSec.style.display = cart.length ? 'block' : 'none';
    if (btnProceedCheckout) {
      btnProceedCheckout.style.display = 'block';
      (btnProceedCheckout as HTMLButtonElement).style.display = 'block';
      (btnProceedCheckout as HTMLButtonElement).textContent = "Proceed to Details →";
      (btnProceedCheckout as HTMLButtonElement).style.background = "var(--ink)";
    }
  } else if (stepNum === 2) {
    if (step2Sec) step2Sec.style.display = 'block';
    const sumEl = document.getElementById('compactOrderSummary');
    if (sumEl) {
      const total = getCartTotal();
      const count = cart.reduce((s, c) => s + c.qty, 0);
      sumEl.innerHTML = `
        <div class="compact-sum-box" style="padding: 12px 14px; background: rgba(184,132,74,0.06); border-radius: var(--rs); border-left: 3px solid var(--amber); font-size: 0.8rem; display:flex; justify-content:space-between; align-items:center;">
          <div>🛒 Ordering <strong>${count} items</strong></div>
          <div style="font-weight:700; color:var(--amber);">Total: ₹${total.toLocaleString('en-IN')}</div>
        </div>
      `;
    }
    if (btnProceedCheckout) {
      btnProceedCheckout.style.display = 'block';
      (btnProceedCheckout as HTMLButtonElement).style.display = 'block';
      (btnProceedCheckout as HTMLButtonElement).textContent = "Continue to Payment →";
      (btnProceedCheckout as HTMLButtonElement).style.background = "var(--print)";
    }
  } else if (stepNum === 3) {
    if (step3Sec) step3Sec.style.display = 'block';
    const viewEl = document.getElementById('paymentOverview');
    if (viewEl) {
      const name = (document.getElementById('custName') as HTMLInputElement).value;
      const phone = (document.getElementById('custPhone') as HTMLInputElement).value;
      const address = (document.getElementById('custAddress') as HTMLInputElement).value;
      const total = getCartTotal();
      viewEl.innerHTML = `
        <div class="compact-pay-box" style="padding:14px; background: #fff; border: 1.5px solid var(--beige); border-radius: var(--rs); margin-bottom: 20px; font-size: 0.8rem; display:flex; flex-direction:column; gap:8px;">
          <div>👤 <strong>Deliver to:</strong> ${name} (${phone})</div>
          <div style="opacity:0.8;">📍 <strong>Address:</strong> ${address}</div>
          <div style="padding-top:8px; border-top:1px solid var(--beige); font-size: 0.9rem; margin-top: 4px;">
            💰 <strong>Total Amount:</strong> <strong style="color:var(--amber);">₹${total.toLocaleString('en-IN')}</strong> <span style="font-size: 0.7rem; color:var(--print);">(Standard Express Delivery Free)</span>
          </div>
        </div>
      `;
    }
    if (paymentOptions) paymentOptions.style.display = 'flex';
  } else if (stepNum === 4) {
    if (step4Sec) step4Sec.style.display = 'flex';
    if (totalsSection) totalsSection.style.display = 'none';
    if (trustBadges) trustBadges.style.display = 'none';
    if (footerSec) footerSec.style.display = 'block';
    if (paymentOptions) paymentOptions.style.display = 'none';
  }
}

export function proceedToCheckout() {
  if (currentStep === 1) {
    goToStep(2);
  } else if (currentStep === 2) {
    if (!validateForm()) return;
    goToStep(3);
  }
}

export function validateForm(): boolean {
  const form = document.getElementById('checkoutForm') as HTMLFormElement;
  if (!form) return false;
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
  goToStep(4);
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
  const filesList = input.files;
  if (!filesList) return;
  
  if (!CS[type].files) CS[type].files = [];
  
  const currentLength = CS[type].files.length;
  const slotLeft = Math.max(0, 10 - currentLength);
  const filesToAdd = Array.from(filesList).slice(0, slotLeft);
  
  if (filesList.length > slotLeft) {
    showToast(`⚠️ You can upload maximum 10 photos. Selected first ${slotLeft}.`);
  }

  let loadedCount = 0;
  for (const f of filesToAdd) {
    const r = new FileReader();
    r.onload = e => {
      CS[type].files.push({
        file: f,
        src: e.target?.result as string
      });
      loadedCount++;
      if (loadedCount === filesToAdd.length) {
        renderUploadPreviews(type);
        chkBtn(type);
      }
    };
    r.readAsDataURL(f);
  }
  input.value = ''; // Reset input so same image can upload
}

export function removeUpload(type: string, idx: number) {
  if (CS[type].files) {
    CS[type].files.splice(idx, 1);
    renderUploadPreviews(type);
    chkBtn(type);
  }
}

export function renderUploadPreviews(type: string) {
  const gridEl = document.getElementById(type + 'PrevGrid');
  const zoneEl = document.getElementById(type + 'Zone');
  if(!gridEl || !zoneEl) return;
  
  const files = CS[type].files || [];
  if (files.length === 0) {
    gridEl.style.display = 'none';
    zoneEl.style.display = 'block';
    return;
  }
  
  zoneEl.style.display = 'none';
  gridEl.style.display = 'grid';
  
  let html = '';
  files.forEach((f: any, idx: number) => {
    html += `
      <div class="thumb-item">
        <img src="${f.src}" alt="Image ${idx + 1}" />
        <button class="thumb-del" onclick="window.removeUpload('${type}', ${idx})" title="Delete Image">✕</button>
      </div>
    `;
  });
  
  if (files.length < 10) {
    html += `
      <div class="add-more-thumb" onclick="document.getElementById('${type}File').click()" title="Add custom image">
        <span>+</span>
      </div>
    `;
  }
  gridEl.innerHTML = html;
}

export function rmFile(type: string) {
  CS[type].files = [];
  renderUploadPreviews(type);
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
  const waBtn = document.getElementById(type + 'WAOrderBtn') as HTMLButtonElement;
  const hasFiles = CS[type].files && CS[type].files.length > 0;
  const ok = hasFiles && CS[type].size;
  if(btn) btn.disabled = !ok;
  if(waBtn) waBtn.disabled = !ok;
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
  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    const list = Array.from(files).filter(f => f.type === 'image/jpeg' || f.type === 'image/png');
    if (list.length > 0) {
      const dt = new DataTransfer();
      list.forEach(f => dt.items.add(f));
      const inp = document.getElementById(type + 'File') as HTMLInputElement;
      if (inp) {
        inp.files = dt.files;
        onFile(inp, type);
      }
    }
  }
}

export function submitForm(e: Event) {
  e.preventDefault();
  showToast("✅ Message sent! We'll reply within 24hrs on WhatsApp.");
  (e.target as HTMLFormElement).reset();
}

export function closeMob() {
  document.getElementById('mobMenu')?.classList.remove('open');
}

export function closeCartAndClear() {
  cart = [];
  renderCart();
  closeCart();
  goToStep(1);
}

// Policies popup trigger
const policyData: any = {
  refund: {
    title: "100% Refund & Replacement Casing",
    body: `Our custom artworks are crafted with deep passion and labor. Since each portrait outline is completed specifically for your family/photos, custom drawing payments are not eligible for standard cancellation.<br><br>
    <strong>Damage Protection Guarantee:</strong> Artlane Diaries delivers all print orders in double-padded transit frames. If you receive any artwork damaged or scratched in transit, simply share a video/photo on WhatsApp within 48 hours. We will execute a <strong>100% free premium replacement order</strong> or process a complete refund immediately without extra shipping questions.`
  },
  privacy: {
    title: "Privacy & Secured Reference Handling",
    body: `We understand that references contain family memories, kids portraits or personal life milestones. Keeping your photos confidential is our core priority.<br><br>
    All customer photos submitted via our file uploads are stored on secure local directories. <strong>We guarantee all photos are permanently deleted from our servers within 15 days of order delivery.</strong> We will NEVER share your photos on social media channels without your explicit consent.`
  },
  terms: {
    title: "Terms & Delivery Guidelines",
    body: `<strong>Delivery Timelines:</strong> Regular print products & polaroids are hand-packed and dispatched within 24-48 business hours. True hand-drawn portraits take 2-4 development days. Deliveries across Major Cities take <strong>3-5 working days</strong>. Standard Express Delivery is 100% Free on all custom orders.<br><br>
    <strong>Order Approval:</strong> Before packing custom pencil art, our studio shares a digital preview with you via WhatsApp. Minor modifications or color adjustments are handled instantly free of charge before transit dispatch.`
  }
};

export function triggerPolicy(key: string) {
  const p = policyData[key];
  if (!p) return;
  const modal = document.getElementById('policyModal');
  const title = document.getElementById('policyModalTitle');
  const content = document.getElementById('policyModalBody');
  if (modal && title && content) {
    title.textContent = p.title;
    content.innerHTML = p.body;
    modal.style.display = 'flex';
  }
}

export function closePolicy() {
  const modal = document.getElementById('policyModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

let activeQuickWAItem: any = null;

const recentOrdersList = [
  { name: 'Priya Sharma', city: 'Adyar, Chennai', product: 'Pencil Portrait (A4)' },
  { name: 'Rohan Sundar', city: 'Indiranagar, Bangalore', product: 'Custom Polaroid Prints Pack' },
  { name: 'Meera Krishnan', city: 'Velachery, Chennai', product: 'Couple Illustration on Canvas (A3)' },
  { name: 'Siddharth Mani', city: 'Mylapore, Chennai', product: 'Aesthetic Strip Poster Design' },
  { name: 'Karthik Raja', city: 'Anna Nagar, Chennai', product: 'Watercolor Pet Portrait sketch' },
  { name: 'Deepa Venkat', city: 'Velachery, Chennai', product: 'Birthday Mini Portrait Album' },
  { name: 'Ananya & Varun', city: 'Nungambakkam, Chennai', product: 'Anniversary Pencil Art Frame (A2)' }
];

export function quickWhatsAppOrder(pid: number) {
  const prod = PRODS.find(p => p.id === pid);
  if (!prod) return;
  
  activeQuickWAItem = { type: 'catalog', prod };
  
  const em = document.getElementById('quickWAEmoji');
  const ti = document.getElementById('quickWATitle');
  const pr = document.getElementById('quickWAPrice');
  
  if (em) em.textContent = prod.e || '📦';
  if (ti) ti.textContent = prod.name;
  if (pr) pr.textContent = `₹${prod.price}`;
  
  // Pre-fill if exists
  const saved = localStorage.getItem('qCustomer');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const nameInp = document.getElementById('qCustName') as HTMLInputElement;
      const phoneInp = document.getElementById('qCustPhone') as HTMLInputElement;
      const addrInp = document.getElementById('qCustAddress') as HTMLTextAreaElement;
      if (nameInp && parsed.name) nameInp.value = parsed.name;
      if (phoneInp && parsed.phone) phoneInp.value = parsed.phone;
      if (addrInp && parsed.address) addrInp.value = parsed.address;
    } catch(e) {}
  }
  
  const modal = document.getElementById('quickWAModal');
  if (modal) modal.style.display = 'flex';
}

export function orderCustomWhatsApp(subType: string) {
  const s = CS[subType];
  const filesCount = s.files ? s.files.length : 0;
  
  activeQuickWAItem = { 
    type: 'custom', 
    subType, 
    size: s.size, 
    price: s.price, 
    filesCount,
    prodId: subType === 'art' ? 'ART-SLOT' : 'PRINT-SLOT',
    prodName: subType === 'art' ? 'Hand-Drawn Portrait upload' : 'Custom Print Pack upload'
  };
  
  const em = document.getElementById('quickWAEmoji');
  const ti = document.getElementById('quickWATitle');
  const pr = document.getElementById('quickWAPrice');
  
  if (em) em.textContent = subType === 'art' ? '🎨' : '🖼️';
  if (ti) ti.textContent = `${subType === 'art' ? 'Hand-Drawn Portrait' : 'Custom Print/Gift'} (${s.size}) · ${filesCount} files`;
  if (pr) pr.textContent = `₹${s.price}`;
  
  // Pre-fill if exists
  const saved = localStorage.getItem('qCustomer');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const nameInp = document.getElementById('qCustName') as HTMLInputElement;
      const phoneInp = document.getElementById('qCustPhone') as HTMLInputElement;
      const addrInp = document.getElementById('qCustAddress') as HTMLTextAreaElement;
      if (nameInp && parsed.name) nameInp.value = parsed.name;
      if (phoneInp && parsed.phone) phoneInp.value = parsed.phone;
      if (addrInp && parsed.address) addrInp.value = parsed.address;
    } catch(e) {}
  }
  
  const modal = document.getElementById('quickWAModal');
  if (modal) modal.style.display = 'flex';
}

export function closeQuickWAModal() {
  const modal = document.getElementById('quickWAModal');
  if (modal) modal.style.display = 'none';
}

export function submitQuickWhatsAppOrder() {
  const nameInp = document.getElementById('qCustName') as HTMLInputElement;
  const phoneInp = document.getElementById('qCustPhone') as HTMLInputElement;
  const addrInp = document.getElementById('qCustAddress') as HTMLTextAreaElement;
  
  if (!nameInp || !phoneInp || !addrInp) return;
  
  const name = nameInp.value.trim();
  const phone = phoneInp.value.trim();
  const address = addrInp.value.trim();
  
  if (!name || !phone || !address) {
    showToast('⚠️ Please fill out all shipping details!');
    return;
  }
  
  // Save credentials for reuse
  localStorage.setItem('qCustomer', JSON.stringify({ name, phone, address }));
  
  const orderId = 'ORD-WA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  let text = '';
  
  if (activeQuickWAItem && activeQuickWAItem.type === 'catalog') {
    const p = activeQuickWAItem.prod;
    const formattedId = p.id < 10 ? `AL-0${p.id}` : `AL-${p.id}`;
    text = `Hi Artlane Diaries! 🎨\nI want to place an Instant Order via your social 1-click checkout.\n\n✨ *Product:* ${p.name}\n🆔 *Product ID:* #${formattedId}\n*Order ID:* ${orderId}\n*Price:* ₹${p.price}\n\n*Delivery Details:*\n👤 *Name:* ${name}\n📞 *WhatsApp:* ${phone}\n📍 *Address:* ${address}\n\n*Payment Flow:*\n🔗 Please confirm design sizing details next, and text me the secure payment link!`;
  } else if (activeQuickWAItem && activeQuickWAItem.type === 'custom') {
    const q = activeQuickWAItem;
    let finalItemName = q.prodName || '';
    let finalProdId = q.prodId || 'CUSTOM';

    if (!finalItemName && activeCatalogProduct) {
      finalItemName = activeCatalogProduct.name;
      finalProdId = activeCatalogProduct.id;
    }

    if (!finalItemName) {
      const activeProd = PREMIUM_PRODUCTS.find(p => p.id === activeProdId);
      if (activeProd) {
        finalItemName = activeProd.name;
        finalProdId = activeProd.id.toUpperCase();
      } else {
        finalItemName = q.subType === 'art' ? 'Hand-Drawn Portrait' : 'Custom Polaroid/Gift Print Pack';
        finalProdId = q.subType === 'art' ? 'ART-SLOT' : 'PRINT-SLOT';
      }
    }

    const formattedProdId = typeof finalProdId === 'number'
      ? (finalProdId < 10 ? `AL-0${finalProdId}` : `AL-${finalProdId}`)
      : `AL-${finalProdId}`;

    text = `Hi Artlane Diaries! 🎨\nI want to place an Instant Custom Order via your photo-upload checkout.\n\n✨ *Product Name:* ${finalItemName}\n🆔 *Product ID:* #${formattedProdId}\n*Order ID:* ${orderId}\n*Type:* ${q.subType === 'art' ? 'Hand-Drawn Portrait Detail' : 'Custom Polaroid/Gift Print'}\n*Size Selected:* ${q.size || 'N/A'}\n*Total Files Selected:* ${q.filesCount}\n*Total Price:* ₹${q.price}\n\n*Delivery Details:*\n👤 *Name:* ${name}\n📞 *WhatsApp:* ${phone}\n📍 *Address:* ${address}\n\n*Payment Flow:*\n🔗 I have uploaded ${q.filesCount} memories in browser preview. Please confirm image borders & drop my secure payment link on WhatsApp!`;
    
    // Clean up corresponding custom slot state
    CS[q.subType].files = [];
    renderUploadPreviews(q.subType);
    chkBtn(q.subType);
  } else {
    showToast('⚠️ No active order context found.');
    return;
  }
  
  closeQuickWAModal();
  showToast('🚀 Opening WhatsApp Business Support...');
  
  window.open(`https://wa.me/919500565091?text=${encodeURIComponent(text)}`, '_blank');
}

// PREMIUM CUSTOMIZER CORE ENGINE
export function updateMockupPreview() {
  const mockupContainer = document.getElementById('mockupContainer');
  if (!mockupContainer) return;

  const currentProduct = PREMIUM_PRODUCTS.find(p => p.id === activeProdId);
  if (!currentProduct) return;

  // Render canvas layers inside the container
  let canvasHtml = '';
  const firstImgSrc = uploadedMockupFiles.length > 0 ? uploadedMockupFiles[0].src : null;

  if (activeProdId === 'poster') {
    canvasHtml = `
      <div class="canvas-poster">
        ${firstImgSrc ? `<img class="mockup-image-fade" src="${firstImgSrc}" style="width:100%; height:100%; object-fit:cover;" />` : 
        `<div class="canvas-placeholder">
          <span style="font-size:1.8rem; display:block; margin-bottom:6px;">🌅</span>
          <span style="font-size: 0.75rem; font-weight:700;">Click "Upload Photos" Below</span>
        </div>`}
      </div>
    `;
  } else if (activeProdId === 'split') {
    canvasHtml = `
      <div class="canvas-split-container">
        <div class="canvas-split-panel">
          ${firstImgSrc ? `<img class="mockup-image-fade" src="${firstImgSrc}" style="width:100%; height:100%; object-fit:cover;" />` : `<div class="canvas-placeholder"><span>Split A</span></div>`}
        </div>
        <div class="canvas-split-panel">
          ${uploadedMockupFiles.length > 1 ? `<img class="mockup-image-fade" src="${uploadedMockupFiles[1].src}" style="width:100%; height:100%; object-fit:cover;" />` : (firstImgSrc ? `<img class="mockup-image-fade" src="${firstImgSrc}" style="width:100%; height:100%; object-fit:cover; opacity: 0.82;" />` : `<div class="canvas-placeholder"><span>Split B</span></div>`)}
        </div>
        <div class="canvas-split-panel">
          ${uploadedMockupFiles.length > 2 ? `<img class="mockup-image-fade" src="${uploadedMockupFiles[2].src}" style="width:100%; height:100%; object-fit:cover;" />` : (firstImgSrc ? `<img class="mockup-image-fade" src="${firstImgSrc}" style="width:100%; height:100%; object-fit:cover; opacity: 0.65;" />` : `<div class="canvas-placeholder"><span>Split C</span></div>`)}
        </div>
      </div>
    `;
  } else if (activeProdId === 'split2x2') {
    canvasHtml = `
      <div class="canvas-grid2x2-container">
        <div class="canvas-grid2x2-panel">
          ${firstImgSrc ? `<img class="mockup-image-fade" src="${firstImgSrc}" style="width:100%; height:100%; object-fit:cover;" />` : `<div class="canvas-placeholder"><span>Panel 1</span></div>`}
        </div>
        <div class="canvas-grid2x2-panel">
          ${uploadedMockupFiles.length > 1 ? `<img class="mockup-image-fade" src="${uploadedMockupFiles[1].src}" style="width:100%; height:100%; object-fit:cover;" />` : (firstImgSrc ? `<img class="mockup-image-fade" src="${firstImgSrc}" style="width:100%; height:100%; object-fit:cover;" />` : `<div class="canvas-placeholder"><span>Panel 2</span></div>`)}
        </div>
        <div class="canvas-grid2x2-panel">
          ${uploadedMockupFiles.length > 2 ? `<img class="mockup-image-fade" src="${uploadedMockupFiles[2].src}" style="width:100%; height:100%; object-fit:cover;" />` : (firstImgSrc ? `<img class="mockup-image-fade" src="${firstImgSrc}" style="width:100%; height:100%; object-fit:cover;" />` : `<div class="canvas-placeholder"><span>Panel 3</span></div>`)}
        </div>
        <div class="canvas-grid2x2-panel">
          ${uploadedMockupFiles.length > 3 ? `<img class="mockup-image-fade" src="${uploadedMockupFiles[3].src}" style="width:100%; height:100%; object-fit:cover;" />` : (firstImgSrc ? `<img class="mockup-image-fade" src="${firstImgSrc}" style="width:100%; height:100%; object-fit:cover;" />` : `<div class="canvas-placeholder"><span>Panel 4</span></div>`)}
        </div>
      </div>
    `;
  } else if (activeProdId === 'retro') {
    canvasHtml = `
      <div class="canvas-retro-container">
        <div style="position:absolute; top:12%; left:8%; right:8%; height:2px; background:#e1d3b4; box-shadow:0 1px 4px rgba(254,240,138,0.5); z-index:1;"></div>
        ${uploadedMockupFiles.length > 0 ? 
          uploadedMockupFiles.slice(0, 4).map((f, i) => `
            <div class="canvas-retro-print" style="--rot:${(i % 2 === 0 ? 4 : -4) + (i * 1)}deg; z-index:2;">
              <img class="mockup-image-fade" src="${f.src}" style="width:100%; height:52px; object-fit:cover; margin-bottom:2px;" />
            </div>
          `).join('') : `
            <div class="canvas-retro-print" style="--rot:-4deg; z-index:2;">
              <div class="canvas-placeholder" style="font-size:0.55rem; height:52px;"><span>Retro A</span></div>
            </div>
            <div class="canvas-retro-print" style="--rot:5deg; z-index:2;">
              <div class="canvas-placeholder" style="font-size:0.55rem; height:52px;"><span>Retro B</span></div>
            </div>
          `
        }
      </div>
    `;
  } else if (activeProdId === 'mini') {
    canvasHtml = `
      <div class="canvas-phone-container">
        <div class="canvas-phone-insert">
          ${firstImgSrc ? `<img class="mockup-image-fade" src="${firstImgSrc}" style="width:100%; height:100%; object-fit:cover;" />` : 
          `<div class="canvas-placeholder" style="font-size:0.6rem;">
            <span>Mini Case Print</span>
          </div>`}
        </div>
      </div>
    `;
  } else if (activeProdId === 'photobooth') {
    canvasHtml = `
      <div class="canvas-strip-container">
        <div class="canvas-strip-cell">
          ${firstImgSrc ? `<img class="mockup-image-fade" src="${firstImgSrc}" style="width:100%; height:100%; object-fit:cover;" />` : `<div class="canvas-placeholder"></div>`}
        </div>
        <div class="canvas-strip-cell">
          ${uploadedMockupFiles.length > 1 ? `<img class="mockup-image-fade" src="${uploadedMockupFiles[1].src}" style="width:100%; height:100%; object-fit:cover;" />` : (firstImgSrc ? `<img class="mockup-image-fade" src="${firstImgSrc}" style="width:100%; height:100%; object-fit:cover; filter:sepia(0.24);" />` : `<div class="canvas-placeholder"></div>`)}
        </div>
        <div class="canvas-strip-cell">
          ${uploadedMockupFiles.length > 2 ? `<img class="mockup-image-fade" src="${uploadedMockupFiles[2].src}" style="width:100%; height:100%; object-fit:cover;" />` : (firstImgSrc ? `<img class="mockup-image-fade" src="${firstImgSrc}" style="width:100%; height:100%; object-fit:cover; filter:contrast(1.24);" />` : `<div class="canvas-placeholder"></div>`)}
        </div>
        <div class="canvas-strip-cell">
          ${uploadedMockupFiles.length > 3 ? `<img class="mockup-image-fade" src="${uploadedMockupFiles[3].src}" style="width:100%; height:100%; object-fit:cover;" />` : (firstImgSrc ? `<img class="mockup-image-fade" src="${firstImgSrc}" style="width:100%; height:100%; object-fit:cover; filter:grayscale(0.35);" />` : `<div class="canvas-placeholder"></div>`)}
        </div>
      </div>
    `;
  }

  mockupContainer.innerHTML = canvasHtml;
}

export function showPage(pageNum: number) {
  const p1Segments = document.querySelectorAll('.page1-segment');
  const p2Segment = document.getElementById('page2_preview');

  if (pageNum === 1) {
    p1Segments.forEach(el => {
      (el as HTMLElement).style.display = 'block';
    });
    if (p2Segment) {
      p2Segment.style.display = 'none';
      p2Segment.style.opacity = '0';
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else if (pageNum === 2) {
    p1Segments.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
    if (p2Segment) {
      p2Segment.style.display = 'block';
      setTimeout(() => {
        p2Segment.style.opacity = '1';
      }, 50);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

export let activeCatalogProduct: any = null;

export function isArtOrPainting(): boolean {
  if (!activeCatalogProduct) return false;
  return activeCatalogProduct.cat === 'art' && activeCatalogProduct.id !== 5 && activeCatalogProduct.id !== 6;
}

export function getCurrentSizes(prod: any): any[] {
  if (prod.id === 'poster') {
    const baseSizes = prod.sizes.filter((sz: any) => sz.name !== '13x19');
    if (isArtOrPainting()) {
      return baseSizes.filter((sz: any) => sz.name === 'A3');
    }
    return baseSizes;
  }
  return prod.sizes;
}

export function selectPremiumProduct(prodId: string, isInitial: boolean = false) {
  activeProdId = prodId;
  const prod = PREMIUM_PRODUCTS.find(p => p.id === prodId);
  if (!prod) return;

  const sizes = getCurrentSizes(prod);
  if (activeSizeIndex >= sizes.length) {
    activeSizeIndex = 0; // Choose first size by default
  }

  // Update selection CSS border on product scrolling cards
  document.querySelectorAll('.p-sliding-card').forEach(card => {
    card.classList.remove('selected-glow');
  });
  const selectedCard = document.getElementById('card_' + prodId);
  if (selectedCard) selectedCard.classList.add('selected-glow');

  // Update left vertical thumbnail list highlights
  document.querySelectorAll('.vertical-thumb-item').forEach(thumb => {
    thumb.classList.remove('selected-thumb');
  });
  const selectedThumb = document.getElementById('vthumb_' + prodId);
  if (selectedThumb) selectedThumb.classList.add('selected-thumb');

  // Update Breadcrumb
  const breadcrumb = document.getElementById('pBreadcrumb');
  if (breadcrumb) breadcrumb.innerHTML = `Home &gt; Custom Prints &gt; <span style="color:var(--amber); font-weight:700;">${prod.name}</span>`;

  // Update Title
  const title = document.getElementById('pTitle');
  if (title) title.textContent = prod.name;

  // Update Description
  const desc = document.getElementById('pDesc');
  if (desc) desc.textContent = prod.desc;

  // Update Pricing Displays
  const origPriceEl = document.getElementById('pOrigPrice');
  const activePriceEl = document.getElementById('pActivePrice');
  if (origPriceEl) origPriceEl.textContent = `₹${Math.round(sizes[activeSizeIndex].price * 1.4 + 19)}`;
  if (activePriceEl) activePriceEl.textContent = `₹${sizes[activeSizeIndex].price}`;

  // Update Sizes selection grid list
  const sizeGridEl = document.getElementById('pSizesGrid');
  if (sizeGridEl) {
    sizeGridEl.innerHTML = sizes.map((sz, idx) => `
      <button class="premium-size-btn ${idx === activeSizeIndex ? 'active' : ''}" onclick="window.selectPremiumSize(${idx})">
        <div class="sz-radio">${idx === activeSizeIndex ? '●' : '○'}</div>
        <div style="text-align:left; flex:1;">
          <span class="sz-name" style="font-weight:700; font-size:0.8rem; display:block; color:var(--ink);">${sz.label}</span>
          <span class="sz-dims" style="font-size:0.65rem; color:var(--muted); display:block; margin-top:2px;">${sz.dims}</span>
        </div>
        <span class="sz-price" style="font-family:'Playfair Display', serif; font-size:0.84rem; font-weight:700; color:var(--amber);">₹${sz.price}</span>
      </button>
    `).join('');
  }

  // Update Live Mockup Layout
  updateMockupPreview();

  // Update Live Order Summary
  renderPremiumSummary();

  // Switch views smoothly unless it's initial page configuration load
  if (!isInitial) {
    showPage(2);
  }
}

export function clickCatalogProduct(id: number) {
  const prod = PRODS.find(p => p.id === id);
  activeCatalogProduct = prod || null;

  const mapping: Record<number, string> = {
    1: 'poster',      // Pencil Portrait
    2: 'poster',      // Painting
    3: 'poster',      // Couple Portrait
    4: 'poster',      // Pet Portrait
    5: 'split',       // Split Posters
    6: 'mini',        // Mini Album
    7: 'retro',       // Polaroid Prints
    8: 'photobooth',  // Strip Poster
    9: 'split2x2',    // Photo Collage Print
    10: 'mini',       // Custom Gift
    11: 'poster',     // Poster Design
    12: 'poster'      // Sketch
  };

  const premiumId = mapping[id] || 'poster';
  selectPremiumProduct(premiumId);

  if (prod) {
    const titleEl = document.getElementById('pTitle');
    if (titleEl) {
      titleEl.textContent = prod.name;
    }
    const descEl = document.getElementById('pDesc');
    if (descEl) {
      descEl.textContent = prod.desc;
    }
    const breadcrumb = document.getElementById('pBreadcrumb');
    if (breadcrumb) {
      breadcrumb.innerHTML = `Home &gt; Browse Our Collection &gt; <span style="color:var(--amber); font-weight:700;">${prod.name}</span>`;
    }
  }

  showPage(2);
  setTimeout(() => {
    const customizer = document.getElementById('premiumCustomizerSection');
    if (customizer) {
      customizer.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

export function clickPremiumCard(prodId: string) {
  activeCatalogProduct = null;
  selectPremiumProduct(prodId);
  showPage(2);
  setTimeout(() => {
    const customizer = document.getElementById('premiumCustomizerSection');
    if (customizer) {
      customizer.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

export function toggleFaqItem(el: HTMLElement) {
  const isCurrentlyActive = el.classList.contains('active');

  // Close all other FAQ items for a clean accordion style
  const allItems = document.querySelectorAll('.faq-item');
  allItems.forEach(item => {
    item.classList.remove('active');
    const contentWrapper = item.querySelector('.faq-content-wrapper') as HTMLElement;
    if (contentWrapper) {
      contentWrapper.style.maxHeight = '0px';
    }
  });

  // If this item wasn't active, activate it and expand its height
  if (!isCurrentlyActive) {
    el.classList.add('active');
    const contentWrapper = el.querySelector('.faq-content-wrapper') as HTMLElement;
    const contentInner = el.querySelector('.faq-content') as HTMLElement;
    if (contentWrapper && contentInner) {
      contentWrapper.style.maxHeight = contentInner.scrollHeight + 'px';
    }
  }
}

export function selectPremiumSize(index: number) {
  activeSizeIndex = index;
  const prod = PREMIUM_PRODUCTS.find(p => p.id === activeProdId);
  if (!prod) return;

  const sizes = getCurrentSizes(prod);

  // Update Pricing Displays
  const origPriceEl = document.getElementById('pOrigPrice');
  const activePriceEl = document.getElementById('pActivePrice');
  if (origPriceEl) origPriceEl.textContent = `₹${Math.round(sizes[activeSizeIndex].price * 1.4 + 19)}`;
  if (activePriceEl) activePriceEl.textContent = `₹${sizes[activeSizeIndex].price}`;

  // Update active state in Size list buttons
  document.querySelectorAll('.premium-size-btn').forEach((btn, idx) => {
    if (idx === index) {
      btn.classList.add('active');
      const radio = btn.querySelector('.sz-radio');
      if (radio) radio.textContent = '●';
    } else {
      btn.classList.remove('active');
      const radio = btn.querySelector('.sz-radio');
      if (radio) radio.textContent = '○';
    }
  });

  renderPremiumSummary();
}

export function changePremiumQty(delta: number) {
  activeQty = Math.max(1, activeQty + delta);
  const qtyInput = document.getElementById('premiumQtyVal');
  if (qtyInput) qtyInput.textContent = activeQty.toString();
  renderPremiumSummary();
}

export function onPremiumFiles(input: HTMLInputElement) {
  const filesList = input.files;
  if (!filesList) return;

  const currentLength = uploadedMockupFiles.length;
  const slotLeft = Math.max(0, 10 - currentLength);
  const filesToAdd = Array.from(filesList).slice(0, slotLeft);

  if (filesList.length > slotLeft) {
    showToast(`⚠️ Maximum 10 photos permitted. Selected first ${slotLeft}.`);
  }

  let loadedCount = 0;
  for (const f of filesToAdd) {
    const r = new FileReader();
    r.onload = e => {
      const base64Data = e.target?.result as string;
      uploadedMockupFiles.push({
        file: f,
        src: base64Data,
        originalSrc: base64Data
      });
      loadedCount++;
      if (loadedCount === filesToAdd.length) {
        renderUploadedThumbs();
        updateMockupPreview();
        renderPremiumSummary();
        showToast(`📸 Loaded ${filesToAdd.length} image(s) into current live preview mockup!`);
      }
    };
    r.readAsDataURL(f);
  }
  input.value = ''; // Reset input to allow re-uploads
}

export function removePremiumUpload(idx: number) {
  uploadedMockupFiles.splice(idx, 1);
  renderUploadedThumbs();
  updateMockupPreview();
  renderPremiumSummary();
  showToast('🗑️ Photo removed from customization list');
}

export function renderUploadedThumbs() {
  const rowEl = document.getElementById('premiumThumbsRow');
  const zoneEmptyEl = document.getElementById('pZoneEmptyMsg');
  if (!rowEl) return;

  if (uploadedMockupFiles.length === 0) {
    rowEl.style.display = 'none';
    if (zoneEmptyEl) zoneEmptyEl.style.display = 'block';
    return;
  }

  if (zoneEmptyEl) zoneEmptyEl.style.display = 'none';
  rowEl.style.display = 'flex';

  let html = '';
  uploadedMockupFiles.forEach((fileObj, idx) => {
    html += `
      <div class="thumb-item" onclick="window.openCropModal(${idx})" style="position:relative; width:64px; height:64px; border-radius:8px; overflow:hidden; border:1.5px solid var(--beige); flex-shrink:0; background:#faf8f5; cursor:pointer;" title="Click to crop or adjust focus area">
        <img class="mockup-image-fade" src="${fileObj.src}" style="width:100%; height:100%; object-fit:cover;" />
        <div style="position:absolute; bottom:0; left:0; right:0; background:rgba(0,0,0,0.55); color:#fff; font-size:8px; text-align:center; padding:2px 0; font-family:'Inter',sans-serif; font-weight:600; pointer-events:none; display:flex; align-items:center; justify-content:center; gap:2x;">✏️ Focus</div>
        <button class="thumb-del" onclick="event.stopPropagation(); window.removePremiumUpload(${idx})" style="position:absolute; top:3px; right:3px; background:rgba(0,0,0,0.7); color:#fff; border:none; border-radius:50%; width:16px; height:16px; font-size:9px; display:flex; align-items:center; justify-content:center; cursor:pointer; line-height:1;" title="Remove image">✕</button>
      </div>
    `;
  });

  if (uploadedMockupFiles.length < 10) {
    html += `
      <div class="add-more-thumb" onclick="document.getElementById('premiumFileInput').click()" style="width:64px; height:64px; border-radius:8px; border:2px dashed var(--warm); display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:700; color:var(--muted); font-size:1.1rem; flex-shrink:0; background:rgba(196,168,130,0.04);">
        <span>+</span>
      </div>
    `;
  }

  rowEl.innerHTML = html;
}

export function renderPremiumSummary() {
  const summaryBox = document.getElementById('premiumSummaryBox');
  if (!summaryBox) return;

  const prod = PREMIUM_PRODUCTS.find(p => p.id === activeProdId);
  if (!prod) return;

  const sizes = getCurrentSizes(prod);
  const sizeObj = sizes[activeSizeIndex];
  const unitPrice = sizeObj.price;
  const rawSubtotal = unitPrice * activeQty;

  // Bulk discount details
  const fileCount = uploadedMockupFiles.length;
  let hasBulkDiscount = fileCount >= 4;
  let discountAmount = 0;
  
  if (hasBulkDiscount) {
    discountAmount = Math.round(rawSubtotal * 0.15); // 15% automatic discount
  }

  const finalPrice = rawSubtotal - discountAmount;

  // Show bulk discount alert details
  let bulkTriggerBanner = '';
  if (fileCount < 4) {
    bulkTriggerBanner = `
      <div class="bulk-promo-pill" onclick="document.getElementById('premiumFileInput').click()" style="background: rgba(184,132,74,0.06); border:1px dashed var(--warm); border-radius:var(--rs); padding:10px 12px; font-size:0.72rem; color:var(--ink); cursor:pointer; margin-top:10px; display:flex; align-items:center; gap:8px; line-height:1.4;">
        <span style="font-size:1.1rem; flex-shrink:0;">💸</span>
        <div>
          <strong>Uploading 4+ images?</strong> Add some more files to trigger our automatic <strong>15% Bulk Discount!</strong> <span style="text-decoration:underline; font-weight:700; color:var(--amber);">Upload more →</span>
        </div>
      </div>
    `;
  } else {
    // Discount applied!
    bulkTriggerBanner = `
      <div class="bulk-promo-pill" style="background: rgba(110,148,112,0.06); border:1.5px solid var(--print); border-radius:var(--rs); padding:10px 12px; font-size:0.72rem; color:var(--ink); margin-top:10px; display:flex; align-items:center; gap:8px; line-height:1.4;">
        <span style="font-size:1.1rem; flex-shrink:0;">🎉</span>
        <div>
          <strong style="color:var(--print); text-transform:uppercase; font-size:0.6rem; display:block; letter-spacing:0.04em; margin-bottom:1px;">Bulk Offer Activated</strong>
          <strong>15% automatic discount applied!</strong> Saved ₹${discountAmount.toLocaleString('en-IN')} on this configuration.
        </div>
      </div>
    `;
  }

  // Update design notification text
  const dNoteEl = document.getElementById('pDesignNotifyMsg');
  if (dNoteEl) {
    if (fileCount > 0) {
      if (activeProdId === 'retro') {
        dNoteEl.innerHTML = `🌟 Creating a custom polaroid printed memories pack with <strong>${fileCount}</strong> uploads!`;
      } else if (activeProdId === 'photobooth') {
        dNoteEl.innerHTML = `🎞️ Creating vintage photobooth strips using <strong>${fileCount}</strong> custom uploads!`;
      } else {
        dNoteEl.innerHTML = `🎨 Compiling a premium design mockup using your <strong>${fileCount}</strong> customized uploads!`;
      }
    } else {
      dNoteEl.textContent = 'Please choose a size, upload image references, and double-check your mockup setup.';
    }
  }

  summaryBox.innerHTML = `
    <div style="font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; font-family:'DM Sans', sans-serif; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--beige); padding-bottom:8px; margin-bottom:10px;">
      <span>Live Order Summary</span>
      <span style="color:var(--print); border:1px solid rgba(110,148,112,0.3); padding:1px 6px; border-radius:4px; font-size:0.6rem; text-transform:none;">Real-time update</span>
    </div>
    
    <div style="display:flex; flex-direction:column; gap:6px; font-size:0.8rem;">
      <div style="display:flex; justify-content:space-between;">
        <span style="color:var(--muted);">Product Line:</span>
        <strong style="color:var(--ink);">${prod.name}</strong>
      </div>
      <div style="display:flex; justify-content:space-between;">
        <span style="color:var(--muted);">Size Choice:</span>
        <strong style="color:var(--ink);">${sizeObj.label}</strong>
      </div>
      <div style="display:flex; justify-content:space-between;">
        <span style="color:var(--muted);">Quantity:</span>
        <strong style="color:var(--ink);">${activeQty} unit(s)</strong>
      </div>
      <div style="display:flex; justify-content:space-between;">
        <span style="color:var(--muted);">Photos Uploaded:</span>
        <strong style="color:var(--ink);">${fileCount} file(s)</strong>
      </div>
      
      ${discountAmount > 0 ? `
      <div style="display:flex; justify-content:space-between; color:var(--print); font-weight:700; padding:4px 0; border-top:1px dashed var(--beige);">
        <span>15% Bulk Save:</span>
        <span>-₹${discountAmount.toLocaleString('en-IN')}</span>
      </div>` : ''}
      
      <div style="display:flex; justify-content:space-between; font-weight:700; padding-top:8px; border-top:1px solid var(--beige); margin-top:2px; font-size:0.9rem;">
        <span style="color:var(--ink);">Calculated Total:</span>
        <span style="color:var(--amber); font-family:'Playfair Display',serif; font-size:1.1rem;">₹${finalPrice.toLocaleString('en-IN')}</span>
      </div>
    </div>
    
    ${bulkTriggerBanner}
  `;

  // Enable/Disable buttons based on uploads
  const addToCartBtn = document.getElementById('pAddToCartBtn') as HTMLButtonElement;
  const orderWABtn = document.getElementById('pOrderWABtn') as HTMLButtonElement;
  const hasFiles = fileCount > 0;

  if (addToCartBtn) addToCartBtn.disabled = !hasFiles;
  if (orderWABtn) orderWABtn.disabled = !hasFiles;
}

export function submitPremiumOrderToCart() {
  const prod = PREMIUM_PRODUCTS.find(p => p.id === activeProdId);
  if (!prod) return;

  const sizes = getCurrentSizes(prod);
  const sizeObj = sizes[activeSizeIndex];
  const unitPrice = sizeObj.price;
  const rawSubtotal = unitPrice * activeQty;
  const fileCount = uploadedMockupFiles.length;

  if (fileCount === 0) {
    showToast('⚠️ Please upload at least one photo for customization!');
    return;
  }

  let finalPrice = rawSubtotal;
  let appliedDiscountText = '';
  if (fileCount >= 4) {
    const discount = Math.round(rawSubtotal * 0.15);
    finalPrice = rawSubtotal - discount;
    appliedDiscountText = ' · 15% Bulk Discount Applied';
  }

  const name = `${prod.name} (${sizeObj.name})`;
  const metaDetail = `Size: ${sizeObj.label} · Qty: ${activeQty} · ${fileCount} images${appliedDiscountText}`;
  const firstSrc = uploadedMockupFiles[0].src;

  addToCart(null, {
    id: 'premium_' + Date.now(),
    name,
    e: '🖼️',
    price: Math.round(finalPrice / activeQty), // price per unit
    meta: metaDetail,
    qty: activeQty,
    src: firstSrc
  });

  // Clean customizer fields
  uploadedMockupFiles = [];
  activeQty = 1;
  const qtyInput = document.getElementById('premiumQtyVal');
  if (qtyInput) qtyInput.textContent = '1';

  renderUploadedThumbs();
  updateMockupPreview();
  renderPremiumSummary();
  openCart();
}

export function submitPremiumOrderToWhatsApp() {
  const prod = PREMIUM_PRODUCTS.find(p => p.id === activeProdId);
  if (!prod) return;

  const sizes = getCurrentSizes(prod);
  const sizeObj = sizes[activeSizeIndex];
  const unitPrice = sizeObj.price;
  const rawSubtotal = unitPrice * activeQty;
  const fileCount = uploadedMockupFiles.length;

  if (fileCount === 0) {
    showToast('⚠️ Please upload at least one photo for customization!');
    return;
  }

  let finalPrice = rawSubtotal;
  if (fileCount >= 4) {
    finalPrice = rawSubtotal - Math.round(rawSubtotal * 0.15);
  }

  // Open the Quick WhatsApp support details modal
  activeQuickWAItem = {
    type: 'custom',
    subType: 'print',
    size: sizeObj.label,
    price: finalPrice,
    filesCount: fileCount,
    prodId: activeCatalogProduct ? activeCatalogProduct.id : (prod ? prod.id : 'N/A'),
    prodName: activeCatalogProduct ? activeCatalogProduct.name : (prod ? prod.name : 'N/A')
  };

  const em = document.getElementById('quickWAEmoji');
  const ti = document.getElementById('quickWATitle');
  const pr = document.getElementById('quickWAPrice');

  if (em) em.textContent = '🖼️';
  if (ti) ti.textContent = `${prod.name} (${sizeObj.label}) · x${activeQty} · ${fileCount} image(s)`;
  if (pr) pr.textContent = `₹${finalPrice}`;

  // Pre-fill customer details if exists
  const saved = localStorage.getItem('qCustomer');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const nameInp = document.getElementById('qCustName') as HTMLInputElement;
      const phoneInp = document.getElementById('qCustPhone') as HTMLInputElement;
      const addrInp = document.getElementById('qCustAddress') as HTMLTextAreaElement;
      if (nameInp && parsed.name) nameInp.value = parsed.name;
      if (phoneInp && parsed.phone) phoneInp.value = parsed.phone;
      if (addrInp && parsed.address) addrInp.value = parsed.address;
    } catch (e) {}
  }

  const modal = document.getElementById('quickWAModal');
  if (modal) modal.style.display = 'flex';
}

export function scrollToCustomizer() {
  showPage(2);
  showToast('✨ Configure your design below!');
}

export function toggleSizeGuideModal(show: boolean) {
  const modal = document.getElementById('premiumSizeGuideModal');
  if (modal) {
    modal.style.display = show ? 'flex' : 'none';
  }
}

export function initRecentOrders() {
  const container = document.createElement('div');
  container.id = 'recentOrdersToaster';
  container.className = 'recent-orders-toaster';
  container.style.display = 'none';
  document.body.appendChild(container);

  function triggerPopup() {
    const o = recentOrdersList[Math.floor(Math.random() * recentOrdersList.length)];
    container.innerHTML = `
      <div style="font-size:1.8rem; flex-shrink:0;">🎨</div>
      <div style="flex:1;">
        <div style="font-weight:700; font-size:0.75rem; color:var(--muted); text-transform:uppercase; letter-spacing:0.04em; display:flex; align-items:center; gap:4px;">
          Verified Order Placed <span style="color:var(--print);">● Live</span>
        </div>
        <div style="font-size:0.8rem; color:var(--ink); margin-top:2px; line-height:1.4;">
          <strong>${o.name}</strong> from ${o.city} ordered <strong>${o.product}</strong>
        </div>
        <span style="font-size:0.68rem; opacity:0.65; display:block; margin-top:2px;">Just now · Secure WhatsApp Transaction ✅</span>
      </div>
      <button class="recent-orders-close" onclick="document.getElementById('recentOrdersToaster').style.display = 'none'">✕</button>
    `;
    container.style.display = 'flex';
    setTimeout(() => {
      container.style.display = 'none';
    }, 6000);
  }

  // Trigger popup starting in 5 seconds, recurring every 25 seconds
  setTimeout(() => {
    triggerPopup();
    setInterval(triggerPopup, 25000);
  }, 5000);
}

export function shareWebsite() {
  const shareData = {
    title: 'Artlane Diaries',
    text: 'Check out Artlane Diaries for beautiful custom hand-drawn portraits and aesthetic prints! 🎨🖼️',
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData)
      .then(() => showToast('❤️ Thank you for sharing!'))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          fallbackCopyToClipboard();
        }
      });
  } else {
    fallbackCopyToClipboard();
  }
}

function fallbackCopyToClipboard() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        showToast('📋 Link copied! Share it with friends ✨');
      })
      .catch(() => {
        showToast('⚠️ Failed to copy link automatically.');
      });
  } else {
    // Ultimate fallback if clipboard API is not permitted inside sandbox/iframes
    const textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    textArea.style.position = "fixed";  // Avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('📋 Link copied! Share it with friends ✨');
    } catch (err) {
      showToast('⚠️ Failed to copy link automatically.');
    }
    document.body.removeChild(textArea);
  }
}



// Crop Engine State Configuration
export let activeCropFileIndex: number | null = null;
export let cropImgInstance: HTMLImageElement | null = null;
export let cropAngle = 0;
export let cropZoom = 1.0;
export let cropPanX = 0;
export let cropPanY = 0;
export let cropAspectRatio = 1.0; // Default to square 1:1

let cropIsDragging = false;
let cropDragStartX = 0;
let cropDragStartY = 0;

export function drawCropCanvas() {
  const canvas = document.getElementById('cropCanvas') as HTMLCanvasElement;
  if (!canvas || !cropImgInstance) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const Cw = canvas.width;
  const Ch = canvas.height;

  // Clear first
  ctx.clearRect(0, 0, Cw, Ch);

  // Draw background grid pattern
  ctx.fillStyle = '#faf8f5';
  ctx.fillRect(0, 0, Cw, Ch);

  // Canvas bounds limits
  const maxW = 340;
  const maxH = 240;

  // Fit active aspect ratio inside bounds
  let cropW = maxW;
  let cropH = maxH;
  const A = cropAspectRatio;

  if (A > 0) {
    if (maxW / maxH > A) {
      cropH = maxH;
      cropW = maxH * A;
    } else {
      cropW = maxW;
      cropH = maxW / A;
    }
  } else {
    // Free form
    const imgA = cropImgInstance.width / cropImgInstance.height;
    if (maxW / maxH > imgA) {
      cropH = maxH;
      cropW = maxH * imgA;
    } else {
      cropW = maxW;
      cropH = maxW / imgA;
    }
  }

  // Centering crop selector box
  const cropX = (Cw - cropW) / 2;
  const cropY = (Ch - cropH) / 2;

  // 1. Save and apply image transforms behind the mask window
  ctx.save();
  ctx.translate(Cw / 2 + cropPanX, Ch / 2 + cropPanY);
  ctx.rotate((cropAngle * Math.PI) / 180);
  ctx.scale(cropZoom, cropZoom);

  // Draw original image centered
  ctx.drawImage(
    cropImgInstance,
    -cropImgInstance.width / 2,
    -cropImgInstance.height / 2
  );
  ctx.restore();

  // 2. Draw dim mask outside crop box
  ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
  // Top
  ctx.fillRect(0, 0, Cw, cropY);
  // Bottom
  ctx.fillRect(0, cropY + cropH, Cw, Ch - (cropY + cropH));
  // Left
  ctx.fillRect(0, cropY, cropX, cropH);
  // Right
  ctx.fillRect(cropX + cropW, cropY, Cw - (cropX + cropW), cropH);

  // 3. Draw active focus box outlines
  ctx.strokeStyle = '#b8844a'; // Amber accent
  ctx.lineWidth = 2.5;
  ctx.strokeRect(cropX, cropY, cropW, cropH);

  // Draw focus corner indicators
  ctx.fillStyle = '#b8844a';
  const cSize = 8;
  // Top Left
  ctx.fillRect(cropX - 2, cropY - 2, cSize, cSize);
  // Top Right
  ctx.fillRect(cropX + cropW - cSize + 2, cropY - 2, cSize, cSize);
  // Bottom Left
  ctx.fillRect(cropX - 2, cropY + cropH - cSize + 2, cSize, cSize);
  // Bottom Right
  ctx.fillRect(cropX + cropW - cSize + 2, cropY + cropH - cSize + 2, cSize, cSize);

  // 4. Draw stylish rule-of-thirds gridlines inside the focus box
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  // Vertical lines
  ctx.moveTo(cropX + cropW / 3, cropY);
  ctx.lineTo(cropX + cropW / 3, cropY + cropH);
  ctx.moveTo(cropX + (cropW * 2) / 3, cropY);
  ctx.lineTo(cropX + (cropW * 2) / 3, cropY + cropH);
  // Horizontal lines
  ctx.moveTo(cropX, cropY + cropH / 3);
  ctx.lineTo(cropX + cropW, cropY + cropH / 3);
  ctx.moveTo(cropX, cropY + (cropH * 2) / 3);
  ctx.lineTo(cropX + cropW, cropY + (cropH * 2) / 3);
  ctx.stroke();
  ctx.setLineDash([]);
}

export function initCropModalEvents() {
  const canvas = document.getElementById('cropCanvas') as HTMLCanvasElement;
  if (!canvas) return;

  const getMousePos = (e: MouseEvent | TouchEvent) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = ('touches' in e) ? e.touches[0].clientX : e.clientX;
    const clientY = ('touches' in e) ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleDown = (e: MouseEvent | TouchEvent) => {
    if (!cropImgInstance) return;
    cropIsDragging = true;
    const pos = getMousePos(e);
    cropDragStartX = pos.x - cropPanX;
    cropDragStartY = pos.y - cropPanY;
    if (e.cancelable) e.preventDefault();
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!cropIsDragging) return;
    const pos = getMousePos(e);
    cropPanX = pos.x - cropDragStartX;
    cropPanY = pos.y - cropDragStartY;

    // Direct clamping of values on Shift Sliders
    const sliderX = document.getElementById('cropShiftX') as HTMLInputElement;
    const sliderY = document.getElementById('cropShiftY') as HTMLInputElement;
    if (sliderX) sliderX.value = cropPanX.toString();
    if (sliderY) sliderY.value = cropPanY.toString();

    drawCropCanvas();
  };

  const handleUp = () => {
    cropIsDragging = false;
  };

  // Clear existing listeners to prevent compounding
  const clone = canvas.cloneNode(true) as HTMLCanvasElement;
  canvas.parentNode?.replaceChild(clone, canvas);

  clone.addEventListener('mousedown', handleDown);
  clone.addEventListener('mousemove', handleMove);
  clone.addEventListener('mouseup', handleUp);
  clone.addEventListener('mouseleave', handleUp);

  clone.addEventListener('touchstart', handleDown, { passive: false });
  clone.addEventListener('touchmove', handleMove, { passive: false });
  clone.addEventListener('touchend', handleUp, { passive: true });
}

export function openCropModal(idx: number) {
  activeCropFileIndex = idx;
  const fileObj = uploadedMockupFiles[idx];
  if (!fileObj) return;

  const modal = document.getElementById('imageCropModal');
  if (!modal) return;

  modal.style.display = 'flex';

  // Load image instance
  const img = new Image();
  img.src = fileObj.originalSrc || fileObj.src;
  cropImgInstance = img;

  img.onload = () => {
    cropAngle = 0;
    cropPanX = 0;
    cropPanY = 0;

    // Set crop aspect ratio dynamically based on selected style if not customized
    if (activeProdId === 'poster') {
      cropAspectRatio = 0.707; // Portrait default shape (A4)
    } else if (activeProdId === 'photobooth') {
      cropAspectRatio = 0.667; // 3:4 strips
    } else {
      cropAspectRatio = 1.0; // Square
    }

    // Centering calculation to find fitScale 
    const maxW = 340;
    const maxH = 240;
    let cropW = maxW;
    let cropH = maxH;
    const A = cropAspectRatio;

    if (maxW / maxH > A) {
      cropH = maxH;
      cropW = maxH * A;
    } else {
      cropW = maxW;
      cropH = maxW / A;
    }

    const fitScale = Math.max(cropW / img.width, cropH / img.height);
    cropZoom = Math.max(0.1, Math.round(fitScale * 1.15 * 100) / 100);

    // Sync input sliders
    const zoomInput = document.getElementById('cropZoom') as HTMLInputElement;
    if (zoomInput) {
      zoomInput.value = cropZoom.toString();
      const zoomValEl = document.getElementById('cropZoomVal');
      if (zoomValEl) zoomValEl.textContent = `${cropZoom.toFixed(2)}x`;
    }

    const sliderX = document.getElementById('cropShiftX') as HTMLInputElement;
    const sliderY = document.getElementById('cropShiftY') as HTMLInputElement;
    if (sliderX) {
      sliderX.min = (-img.width).toString();
      sliderX.max = img.width.toString();
      sliderX.value = '0';
    }
    if (sliderY) {
      sliderY.min = (-img.height).toString();
      sliderY.max = img.height.toString();
      sliderY.value = '0';
    }

    updateRatioBtnStates();
    initCropModalEvents();
    drawCropCanvas();
  };
}

export function updateRatioBtnStates() {
  const btn1 = document.getElementById('cropRatio1'); // 1:1
  const btn2 = document.getElementById('cropRatio2'); // 0.707
  const btn3 = document.getElementById('cropRatio3'); // 0.667
  const btn4 = document.getElementById('cropRatio4'); // Free

  const btns = [btn1, btn2, btn3, btn4];
  btns.forEach(b => {
    if (b) {
      b.style.background = '#fff';
      b.style.color = 'var(--muted)';
      b.style.borderColor = 'var(--beige)';
    }
  });

  const activeBtn = 
    cropAspectRatio === 1.0 ? btn1 :
    cropAspectRatio === 0.707 ? btn2 :
    cropAspectRatio === 0.667 ? btn3 :
    btn4;

  if (activeBtn) {
    activeBtn.style.background = 'var(--amber)';
    activeBtn.style.color = '#fff';
    activeBtn.style.borderColor = 'var(--amber)';
  }
}

export function onCropZoomChange(val: string) {
  cropZoom = parseFloat(val);
  const zoomValEl = document.getElementById('cropZoomVal');
  if (zoomValEl) zoomValEl.textContent = `${cropZoom.toFixed(2)}x`;
  drawCropCanvas();
}

export function onCropShiftChange(axis: 'x' | 'y', val: string) {
  if (axis === 'x') {
    cropPanX = parseInt(val);
  } else {
    cropPanY = parseInt(val);
  }
  drawCropCanvas();
}

export function rotateCropImage() {
  cropAngle = (cropAngle + 90) % 360;
  drawCropCanvas();
}

export function setCropRatio(ratio: number, btn?: HTMLElement) {
  cropAspectRatio = ratio;
  updateRatioBtnStates();
  
  // Re-fit scale after ratio change so it covers nicely
  if (cropImgInstance) {
    const maxW = 340;
    const maxH = 240;
    let cropW = maxW;
    let cropH = maxH;
    const A = cropAspectRatio > 0 ? cropAspectRatio : (cropImgInstance.width / cropImgInstance.height);

    if (maxW / maxH > A) {
      cropH = maxH;
      cropW = maxH * A;
    } else {
      cropW = maxW;
      cropH = maxW / A;
    }

    const fitScale = Math.max(cropW / cropImgInstance.width, cropH / cropImgInstance.height);
    cropZoom = Math.max(0.1, Math.round(fitScale * 1.15 * 100) / 100);

    const zoomInput = document.getElementById('cropZoom') as HTMLInputElement;
    if (zoomInput) {
      zoomInput.value = cropZoom.toString();
      const zoomValEl = document.getElementById('cropZoomVal');
      if (zoomValEl) zoomValEl.textContent = `${cropZoom.toFixed(2)}x`;
    }
  }

  drawCropCanvas();
}

export function closeCropModal() {
  const modal = document.getElementById('imageCropModal');
  if (modal) modal.style.display = 'none';
  activeCropFileIndex = null;
  cropImgInstance = null;
}

export function applyAndSaveCrop() {
  if (activeCropFileIndex === null || !cropImgInstance) return;

  // Fit active aspect ratio inside bounds
  const maxW = 340;
  const maxH = 240;
  let cropW = maxW;
  let cropH = maxH;
  const A = cropAspectRatio > 0 ? cropAspectRatio : (cropImgInstance.width / cropImgInstance.height);

  if (maxW / maxH > A) {
    cropH = maxH;
    cropW = maxH * A;
  } else {
    cropW = maxW;
    cropH = maxW / A;
  }

  // Create high-resolution export canvas (e.g. 1200px width for supreme printed outcome)
  const exportW = 1200;
  const exportH = Math.round(exportW / A);

  const offCanvas = document.createElement('canvas');
  offCanvas.width = exportW;
  offCanvas.height = exportH;
  const offCtx = offCanvas.getContext('2d');

  if (offCtx) {
    offCtx.clearRect(0, 0, exportW, exportH);

    // Fit preview to export coordinate systems 
    const ratio = exportW / cropW;

    offCtx.translate(exportW / 2 + cropPanX * ratio, exportH / 2 + cropPanY * ratio);
    offCtx.rotate((cropAngle * Math.PI) / 180);
    offCtx.scale(cropZoom * ratio, cropZoom * ratio);

    offCtx.drawImage(
      cropImgInstance,
      -cropImgInstance.width / 2,
      -cropImgInstance.height / 2
    );

    const croppedSrc = offCanvas.toDataURL('image/jpeg', 0.9);

    const fileObj = uploadedMockupFiles[activeCropFileIndex];
    if (!fileObj.originalSrc) {
      fileObj.originalSrc = fileObj.src; // Preserve unaltered high-res source
    }
    fileObj.src = croppedSrc;

    // Refresh layout, preview canvases and summary rows
    renderUploadedThumbs();
    updateMockupPreview();
    renderPremiumSummary();

    showToast('✨ Custom photo crop & focus saved successfully!');
  }

  closeCropModal();
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
window.goToStep = goToStep;
window.removeUpload = removeUpload;
window.closeCartAndClear = closeCartAndClear;
window.triggerPolicy = triggerPolicy;
window.closePolicy = closePolicy;
window.saveForLater = saveForLater;
window.moveToActiveCart = moveToActiveCart;
window.removeSavedItem = removeSavedItem;
window.clearSavedWithConfirm = clearSavedWithConfirm;
window.closeConfirmModal = closeConfirmModal;
window.confirmClearSaved = confirmClearSaved;
window.shareWebsite = shareWebsite;
window.quickWhatsAppOrder = quickWhatsAppOrder;
window.orderCustomWhatsApp = orderCustomWhatsApp;
window.closeQuickWAModal = closeQuickWAModal;
window.submitQuickWhatsAppOrder = submitQuickWhatsAppOrder;

// New Customizer Bindings
window.selectPremiumProduct = selectPremiumProduct;
window.selectPremiumSize = selectPremiumSize;
window.changePremiumQty = changePremiumQty;
window.onPremiumFiles = onPremiumFiles;
window.removePremiumUpload = removePremiumUpload;
window.submitPremiumOrderToCart = submitPremiumOrderToCart;
window.submitPremiumOrderToWhatsApp = submitPremiumOrderToWhatsApp;
window.toggleSizeGuideModal = toggleSizeGuideModal;
window.scrollToCustomizer = scrollToCustomizer;
window.showPage = showPage;
window.clickCatalogProduct = clickCatalogProduct;
window.toggleFaqItem = toggleFaqItem;
window.clickPremiumCard = clickPremiumCard;

// Crop Engine bindings
window.openCropModal = openCropModal;
window.closeCropModal = closeCropModal;
window.applyAndSaveCrop = applyAndSaveCrop;
window.onCropZoomChange = onCropZoomChange;
window.onCropShiftChange = onCropShiftChange;
window.rotateCropImage = rotateCropImage;
window.setCropRatio = setCropRatio;

// Intercept clicks on links with hash tags to restore Page 1 and scroll smoothly
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(this: HTMLAnchorElement, e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;

    e.preventDefault();
    showPage(1);

    setTimeout(() => {
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  });
});

// Setup
const customersCount = 214 + Math.floor(Math.random() * 30);
document.querySelectorAll('.dynamic-customers').forEach(el => el.textContent = `${customersCount}+`);

window.addEventListener('scroll', () => {
  document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('stb')?.classList.toggle('show', window.scrollY > 500);
  
  // Sticky mobile bar helper
  const stickyBar = document.getElementById('stickyMobileBar');
  if (stickyBar) {
    const isMobile = window.innerWidth <= 768;
    const scrollY = window.scrollY;
    
    // Hide if we are inside the customizer viewport itself
    const customizerView = document.getElementById('premiumCustomizerSection');
    let isInCustomizer = false;
    if (customizerView) {
      const rect = customizerView.getBoundingClientRect();
      isInCustomizer = rect.top < window.innerHeight && rect.bottom > 0;
    }
    
    if (isMobile && scrollY > 600 && !isInCustomizer) {
      stickyBar.classList.add('show-sticky');
    } else {
      stickyBar.classList.remove('show-sticky');
    }
  }
});

renderProds('all');
renderCart();
// initRecentOrders();

// Initialise customizer to default poster view without switching view
selectPremiumProduct('poster', true);
showPage(1);

// Initialise first FAQ item to be expanded
setTimeout(() => {
  const firstFaq = document.querySelector('.faq-item') as HTMLElement;
  if (firstFaq) {
    firstFaq.classList.add('active');
    const contentWrapper = firstFaq.querySelector('.faq-content-wrapper') as HTMLElement;
    const contentInner = firstFaq.querySelector('.faq-content') as HTMLElement;
    if (contentWrapper && contentInner) {
      contentWrapper.style.maxHeight = contentInner.scrollHeight + 'px';
    }
  }
}, 300);

// TOP PROMO BANNER CONTROLLER
(window as any).closePromoBanner = function() {
  const banner = document.getElementById('topPromoBanner');
  if (banner) {
    banner.style.display = 'none';
    localStorage.setItem('artlane_promo_dismissed', 'true');
  }
};

// Check if user dismissed first
const isPromoDismissed = localStorage.getItem('artlane_promo_dismissed') === 'true';
const promoBanner = document.getElementById('topPromoBanner');
if (promoBanner && !isPromoDismissed) {
  promoBanner.style.display = 'flex';
}

