/* ==========================================================================
   NovaTech Product Details View Renderer
   ========================================================================== */

import { products } from '../data.js';
import { AppState } from '../state.js';
import { getStarRatingHtml, getProductCardHtml } from './home.js';

export const renderProductDetails = (container, params = {}) => {
  const pathParams = params.pathParams || [];
  const productId = parseInt(pathParams[0]);

  const product = products.find(p => p.id === productId);

  if (!product) {
    container.innerHTML = `
      <div class="empty-state fade-in">
        <div class="empty-state-icon" style="color: var(--color-error);"><i data-lucide="alert-triangle"></i></div>
        <h2 class="empty-state-title">Accessory Not Found</h2>
        <p class="empty-state-desc">The tech accessory you are looking for does not exist in our catalog or was removed.</p>
        <a href="#/shop" class="btn btn-primary">Return to Shop</a>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  // Track in recently viewed
  AppState.addRecentlyViewed(product.id);

  const isOutOfStock = product.stock <= 0;
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const isInWishlist = AppState.isInWishlist(product.id);

  // Get Related Products (same category, exclude current)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  // Get Recently Viewed products
  const recentlyViewed = AppState.getRecentlyViewed().filter(p => p.id !== product.id).slice(0, 4);

  container.innerHTML = `
    <div class="product-detail-layout fade-in">
      <!-- Left Column: Gallery -->
      <div class="product-gallery">
        <div class="product-gallery-main" id="zoom-gallery">
          <div class="card-badges">
            ${hasDiscount ? `<span class="badge-discount">-${discountPercent}%</span>` : ''}
            ${isOutOfStock ? `<span class="badge-stock out-of-stock">Out of Stock</span>` : ''}
          </div>
          <div id="main-image-viewport" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
            ${product.imageSvg}
          </div>
        </div>
        <!-- Thumbnails -->
        <div class="product-gallery-thumbnails">
          <button class="thumbnail-btn active" data-index="0">
            ${product.imageSvg}
          </button>
          <!-- Additional thumbnail angles (with slightly rotated SVGs to simulate premium photography angles) -->
          <button class="thumbnail-btn" data-index="1">
            <div style="transform: rotate(25deg) scale(0.95); width: 100%; height: 100%;">
              ${product.imageSvg}
            </div>
          </button>
          <button class="thumbnail-btn" data-index="2">
            <div style="transform: rotate(-25deg) scale(0.95); width: 100%; height: 100%;">
              ${product.imageSvg}
            </div>
          </button>
        </div>
      </div>

      <!-- Right Column: Info & Actions -->
      <div class="product-info-panel">
        <div>
          <span class="product-brand">${product.brand} &bull; ${product.category.toUpperCase()}</span>
          <h1 class="product-title" style="margin-top: 0.5rem; margin-bottom: 0.75rem;">${product.name}</h1>
          <div class="product-meta-rating">
            <div class="star-rating" style="font-size: 1.1rem;">
              ${getStarRatingHtml(product.rating)}
            </div>
            <span class="rating-count" style="font-size: 0.875rem;">${product.rating} average rating (${product.reviewsCount} reviews)</span>
          </div>
        </div>

        <div class="product-detail-price">
          <span class="price-detail-current">$${product.price.toFixed(2)}</span>
          ${hasDiscount ? `<span class="price-detail-old">$${product.oldPrice.toFixed(2)}</span>` : ''}
        </div>

        <p class="product-description">${product.description}</p>

        <!-- Product Options Row (Quantity and Action buttons) -->
        <div class="product-actions-row">
          <div class="quantity-selector">
            <button class="qty-btn" id="qty-decrement" aria-label="Decrease quantity"><i data-lucide="minus" style="width: 14px;"></i></button>
            <input type="text" class="qty-input" id="detail-qty-input" value="1" readonly>
            <button class="qty-btn" id="qty-increment" aria-label="Increase quantity"><i data-lucide="plus" style="width: 14px;"></i></button>
          </div>

          <button id="detail-add-to-cart" class="btn btn-primary" style="flex-grow: 1; height: 42px;" ${isOutOfStock ? 'disabled' : ''}>
            <i data-lucide="shopping-cart"></i> Add to Cart
          </button>
          
          <button id="detail-wishlist-toggle" class="btn btn-outline btn-icon ${isInWishlist ? 'active' : ''}" style="height: 42px; width: 42px;" title="Wishlist">
            <i data-lucide="heart" style="${isInWishlist ? 'fill: currentColor;' : ''}"></i>
          </button>
        </div>

        <!-- Specifications Section -->
        <div class="specs-section">
          <h3 class="specs-title">Technical Specifications</h3>
          <table class="specs-table">
            <tbody>
              ${Object.entries(product.specs).map(([key, val]) => `
                <tr>
                  <td class="specs-key">${key}</td>
                  <td class="specs-value">${val}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Related Products Grid -->
    ${related.length > 0 ? `
      <section class="home-section container" style="margin-top: 5rem; border-top: 1px solid var(--color-border); padding-top: 4rem;">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">Related Accessories</h2>
            <p class="section-subtitle">Upgrade your custom setup with matching gear</p>
          </div>
        </div>
        <div class="products-grid">
          ${related.map(p => getProductCardHtml(p)).join('')}
        </div>
      </section>
    ` : ''}

    <!-- Recently Viewed Section -->
    ${recentlyViewed.length > 0 ? `
      <section class="home-section container" style="border-top: 1px solid var(--color-border); padding-top: 4rem; padding-bottom: 2rem;">
        <div class="section-header">
          <div class="section-title-wrapper">
            <h2 class="section-title">Recently Viewed</h2>
            <p class="section-subtitle">Gear you looked at recently</p>
          </div>
        </div>
        <div class="products-grid">
          ${recentlyViewed.map(p => getProductCardHtml(p)).join('')}
        </div>
      </section>
    ` : ''}
  `;

  // Attach dynamic event listeners
  bindEventListeners(product);
};

const bindEventListeners = (product) => {
  const container = document.getElementById('app-content');
  if (!container) return;

  // 1. Quantity Selector bindings
  const qtyInput = container.querySelector('#detail-qty-input');
  const btnDec = container.querySelector('#qty-decrement');
  const btnInc = container.querySelector('#qty-increment');

  if (qtyInput && btnDec && btnInc) {
    btnDec.addEventListener('click', () => {
      let currentVal = parseInt(qtyInput.value);
      if (currentVal > 1) {
        qtyInput.value = currentVal - 1;
      }
    });

    btnInc.addEventListener('click', () => {
      let currentVal = parseInt(qtyInput.value);
      if (currentVal < product.stock) {
        qtyInput.value = currentVal + 1;
      } else {
        if (window.showToast) {
          window.showToast("Stock Limit Reached", `Only ${product.stock} items left in stock.`, "info");
        }
      }
    });
  }

  // 2. Add To Cart binding
  const addToCartBtn = container.querySelector('#detail-add-to-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const qty = parseInt(qtyInput.value);
      const res = AppState.addToCart(product.id, qty);
      if (res.success) {
        if (window.showToast) {
          window.showToast("Added to Cart!", `${qty} x ${product.name} added to your shopping cart.`, "success");
        }
      } else {
        if (window.showToast) {
          window.showToast("Limit Reached", res.error, "error");
        }
      }
    });
  }

  // 3. Wishlist toggle binding
  const wishlistBtn = container.querySelector('#detail-wishlist-toggle');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      const added = AppState.toggleWishlist(product.id);
      wishlistBtn.classList.toggle('active', added);
      const heartIcon = wishlistBtn.querySelector('i');
      if (heartIcon) {
        if (added) {
          heartIcon.style.fill = 'currentColor';
          if (window.showToast) window.showToast("Saved!", `${product.name} added to wishlist.`, "success");
        } else {
          heartIcon.style.fill = 'transparent';
          if (window.showToast) window.showToast("Removed!", `${product.name} removed from wishlist.`, "info");
        }
      }
    });
  }

  // 4. Thumbnail angle selector bindings
  const thumbnailBtns = container.querySelectorAll('.thumbnail-btn');
  const mainImageContainer = container.querySelector('#main-image-viewport');
  thumbnailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbnailBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update viewport content to match the clicked button's SVG content
      if (mainImageContainer) {
        const svgContent = btn.innerHTML;
        mainImageContainer.innerHTML = svgContent;
      }
    });
  });

  // 5. Glassmorphism interactive hover Zoom Effect
  const galleryMain = container.querySelector('#zoom-gallery');
  if (galleryMain && mainImageContainer) {
    galleryMain.addEventListener('mousemove', (e) => {
      const rect = galleryMain.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position inside elements
      const y = e.clientY - rect.top;  // y position inside elements
      
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      const innerElement = mainImageContainer.querySelector('svg, img');
      if (innerElement) {
        innerElement.style.transform = "scale(1.6)";
        innerElement.style.transformOrigin = `${xPercent}% ${yPercent}%`;
      }
    });

    galleryMain.addEventListener('mouseleave', () => {
      const innerElement = mainImageContainer.querySelector('svg, img');
      if (innerElement) {
        innerElement.style.transform = "scale(1)";
        innerElement.style.transformOrigin = "center center";
      }
    });
  }
};
