/* ==========================================================================
   NovaTech Home Page View Renderer
   ========================================================================== */

import { products } from '../data.js';
import { AppState } from '../state.js';

export function getStarRatingHtml(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars += `<i data-lucide="star" class="star-filled"></i>`;
    } else if (i === fullStars + 1 && hasHalfStar) {
      // Lucide icon star-half
      stars += `<i data-lucide="star-half" class="star-half-filled"></i>`;
    } else {
      stars += `<i data-lucide="star" class="star-empty"></i>`;
    }
  }
  return stars;
}

export function getProductCardHtml(product) {
  const isInWishlist = AppState.isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-card-img-wrapper">
        <!-- Badges -->
        <div class="card-badges">
          ${hasDiscount ? `<span class="badge-discount">-${discountPercent}%</span>` : ''}
          ${isOutOfStock ? `<span class="badge-stock out-of-stock">Out of Stock</span>` : ''}
        </div>
        
        <!-- Image SVG -->
        <div onclick="window.location.hash='#/product/${product.id}'" style="width: 100%; height: 100%; cursor: pointer;">
          ${product.imageSvg}
        </div>
        
        <!-- Hover actions overlay -->
        <div class="card-actions-overlay">
          <button class="card-action-btn quick-view-btn" data-id="${product.id}" title="Quick View">
            <i data-lucide="eye"></i>
          </button>
          <button class="card-action-btn wishlist-toggle-btn ${isInWishlist ? 'active' : ''}" data-id="${product.id}" title="Add to Wishlist">
            <i data-lucide="heart"></i>
          </button>
        </div>
      </div>
      
      <div class="product-card-body">
        <span class="product-card-category">${product.category}</span>
        <h3 class="product-card-title" onclick="window.location.hash='#/product/${product.id}'" style="cursor: pointer;">${product.name}</h3>
        
        <div class="product-card-rating">
          <div class="star-rating">
            ${getStarRatingHtml(product.rating)}
          </div>
          <span class="rating-count">(${product.reviewsCount})</span>
        </div>
        
        <div class="product-card-footer">
          <div class="product-card-price-wrapper">
            <span class="price-current">$${product.price.toFixed(2)}</span>
            ${hasDiscount ? `<span class="price-old">$${product.oldPrice.toFixed(2)}</span>` : ''}
          </div>
          
          <button class="add-to-cart-btn-quick" data-id="${product.id}" ${isOutOfStock ? 'disabled' : ''} title="Add to Cart">
            <i data-lucide="shopping-cart"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

export const renderHome = (container) => {
  // Select featured, best sellers and new arrivals
  const featuredProducts = products.filter(p => [1, 2, 3, 7].includes(p.id));
  const bestSellers = products.filter(p => p.rating >= 4.8).slice(0, 4);
  const newArrivals = products.filter(p => [2, 5, 8, 9].includes(p.id));

  container.innerHTML = `
    <!-- Hero Banner Section -->
    <section class="hero-section container fade-in">
      <div class="hero-content">
        <span class="hero-subtitle">Premium Desk Accessories</span>
        <h1 class="hero-title">Elevate Your Digital Workspace</h1>
        <p class="hero-description">Beautiful, high-precision tools designed to enhance your focus, ergonomics, and daily workflow. Engineered for minimalists and professionals alike.</p>
        <div class="hero-btn-group">
          <a href="#/shop" class="btn btn-primary">Shop Collection <i data-lucide="shopping-bag" style="width: 16px;"></i></a>
          <a href="#/about" class="btn btn-outline">Our Philosophy</a>
        </div>
      </div>
      <div class="hero-image-container">
        <!-- Minimalist Hero Graphic (Mechanical Keyboard + Mouse Vector) -->
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hero-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1" />
              <stop offset="100%" stop-color="#2563EB" stop-opacity="0.3" />
            </linearGradient>
            <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#2563EB" flood-opacity="0.15"/>
            </filter>
          </defs>
          <circle cx="50" cy="50" r="42" fill="url(#hero-grad)" />
          
          <!-- Laptop/Display stand base visual mockup -->
          <rect x="25" y="68" width="50" height="2" rx="1" fill="currentColor" opacity="0.3"/>
          <path d="M40 68 L44 58 H56 L60 68" stroke="currentColor" stroke-width="1.5" opacity="0.3" stroke-linejoin="round"/>
          <rect x="22" y="32" width="56" height="26" rx="4" stroke="currentColor" stroke-width="2" filter="url(#glow)"/>
          <line x1="22" y1="52" x2="78" y2="52" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="50" cy="36" r="1.5" fill="#2563EB"/>
          
          <!-- Floating decorative blueprints -->
          <circle cx="20" cy="25" r="4" stroke="#f59e0b" stroke-width="1.2"/>
          <line x1="20" y1="21" x2="20" y2="29" stroke="#f59e0b" stroke-width="1"/>
          <line x1="16" y1="25" x2="24" y2="25" stroke="#f59e0b" stroke-width="1"/>
          
          <rect x="75" y="70" width="8" height="8" rx="2" stroke="#2563EB" stroke-width="1" stroke-dasharray="2 2"/>
        </svg>
      </div>
    </section>

    <!-- Featured Categories Section -->
    <section class="home-section container">
      <div class="section-header">
        <div class="section-title-wrapper">
          <h2 class="section-title">Shop by Category</h2>
          <p class="section-subtitle">Find accessories tailored to your custom setup</p>
        </div>
      </div>
      <div class="categories-grid">
        <a href="#/shop?category=input" class="category-card">
          <div class="category-icon-wrapper"><i data-lucide="keyboard"></i></div>
          <span class="category-name">Inputs</span>
        </a>
        <a href="#/shop?category=audio" class="category-card">
          <div class="category-icon-wrapper"><i data-lucide="headphones"></i></div>
          <span class="category-name">Audio</span>
        </a>
        <a href="#/shop?category=power" class="category-card">
          <div class="category-icon-wrapper"><i data-lucide="zap"></i></div>
          <span class="category-name">Power</span>
        </a>
        <a href="#/shop?category=storage" class="category-card">
          <div class="category-icon-wrapper"><i data-lucide="hard-drive"></i></div>
          <span class="category-name">Storage</span>
        </a>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="home-section container">
      <div class="section-header">
        <div class="section-title-wrapper">
          <h2 class="section-title">Featured Gear</h2>
          <p class="section-subtitle">Customer-favorite essentials curated for performance</p>
        </div>
        <a href="#/shop" class="btn btn-outline" style="padding: 0.5rem 1.25rem;">View All</a>
      </div>
      <div class="products-grid">
        ${featuredProducts.map(p => getProductCardHtml(p)).join('')}
      </div>
    </section>

    <!-- Special Offer Banner -->
    <section class="home-section container">
      <div class="special-offer-banner">
        <div class="offer-content">
          <span class="offer-badge">Limited Time Offer</span>
          <h2 class="offer-title">Save 10% on Your First Workspace Upgrade</h2>
          <p class="offer-desc">Use coupon code <strong style="color: var(--color-primary); background-color: var(--bg-primary); padding: 0.2rem 0.5rem; border-radius: var(--radius-sm);">NOVATECH10</strong> at checkout to redeem. Exclusions apply.</p>
          <a href="#/shop" class="btn btn-primary" style="margin-top: 1rem;">Shop Premium Accessories</a>
        </div>
        <div class="offer-image-container">
          <!-- Hub/Power adapter graphic representation -->
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="off-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
                <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.4"/>
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="30" fill="url(#off-grad)" stroke="#2563EB" stroke-width="1.5" stroke-dasharray="3 3"/>
            <!-- Box -->
            <rect x="36" y="32" width="28" height="36" rx="6" stroke="var(--text-white)" stroke-width="2" fill="currentColor" fill-opacity="0.1"/>
            <path d="M50 32 V20 H65" stroke="var(--text-white)" stroke-width="2" stroke-linecap="round"/>
            <circle cx="65" cy="20" r="2" fill="#2563EB"/>
            <line x1="42" y1="42" x2="58" y2="42" stroke="var(--text-white)" stroke-width="1.5"/>
            <line x1="42" y1="50" x2="50" y2="50" stroke="var(--text-white)" stroke-width="1.5"/>
            <!-- Charging Bolt badge -->
            <path d="M50 50 L47 55 H52 L49 60" stroke="#f59e0b" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- New Arrivals Section -->
    <section class="home-section container">
      <div class="section-header">
        <div class="section-title-wrapper">
          <h2 class="section-title">New Arrivals</h2>
          <p class="section-subtitle">Freshly engineered products added to the catalogue</p>
        </div>
      </div>
      <div class="products-grid">
        ${newArrivals.map(p => getProductCardHtml(p)).join('')}
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="home-section container">
      <div class="section-header text-center" style="justify-content: center; flex-direction: column; gap: 0.5rem; align-items: center; margin-bottom: 3.5rem;">
        <h2 class="section-title">Engineered to Excel</h2>
        <p class="section-subtitle">We design with meticulous focus on details that matter most</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon-wrapper"><i data-lucide="truck"></i></div>
          <h3 class="feature-title">Free Shipping</h3>
          <p class="feature-desc">Receive free express shipping globally on all cart orders exceeding $75.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrapper"><i data-lucide="shield-check"></i></div>
          <h3 class="feature-title">2-Year Warranty</h3>
          <p class="feature-desc">Complete product protection. If it fails due to craftsmanship, we replace it.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrapper"><i data-lucide="refresh-cw"></i></div>
          <h3 class="feature-title">Easy Returns</h3>
          <p class="feature-desc">Not fully content with your layout? Return items within 30 days hassle-free.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrapper"><i data-lucide="message-square"></i></div>
          <h3 class="feature-title">Expert Support</h3>
          <p class="feature-desc">Speak directly to design and engineering specialists about integration questions.</p>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="home-section container">
      <div class="section-header">
        <div class="section-title-wrapper">
          <h2 class="section-title">Client Voices</h2>
          <p class="section-subtitle">What creators are saying about their workspace layouts</p>
        </div>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="testimonial-stars"><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i></div>
          <p class="testimonial-text">"The ApexType Carbon keyboard is a mechanical masterpiece. The keystrokes are incredibly smooth, and the 65% form factor fits my minimalist desk layout perfectly."</p>
          <div class="testimonial-user">
            <div class="testimonial-avatar">LH</div>
            <div>
              <p class="testimonial-user-name">Lucas Hayes</p>
              <p class="testimonial-user-role">Lead UI Designer</p>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <div class="testimonial-stars"><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i></div>
          <p class="testimonial-text">"NovaTech's 8-in-1 hub cleaned up my cable clutter instantly. It matches the aluminum finish of my laptop beautifully and the 4K 60Hz output works flawlessly."</p>
          <div class="testimonial-user">
            <div class="testimonial-avatar">MA</div>
            <div>
              <p class="testimonial-user-name">Meera Amin</p>
              <p class="testimonial-user-role">Software Engineer</p>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <div class="testimonial-stars"><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i></div>
          <p class="testimonial-text">"The AeroMouse Pro is completely silent. Clicks are tactile but produce zero sound, which is great for video calls and focus sessions late at night."</p>
          <div class="testimonial-user">
            <div class="testimonial-avatar">DP</div>
            <div>
              <p class="testimonial-user-name">David Park</p>
              <p class="testimonial-user-role">YouTube Creator</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
};
