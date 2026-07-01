/* ==========================================================================
   NovaTech Wishlist Page View Renderer
   ========================================================================== */

import { AppState } from '../state.js';
import { getProductCardHtml } from './home.js';

export const renderWishlist = (container) => {
  const items = AppState.getWishlistItems();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state fade-in">
        <div class="empty-state-icon">
          <i data-lucide="heart-off"></i>
        </div>
        <h1 class="empty-state-title">Your Wishlist is Empty</h1>
        <p class="empty-state-desc">Tap the heart icon on any product card in our shop catalog to save your favorite tech accessories here for later.</p>
        <a href="#/shop" class="btn btn-primary">Browse Shop Collection</a>
      </div>
    `;
    if (window.lucide) {
      window.lucide.createIcons();
    }
    return;
  }

  container.innerHTML = `
    <div class="fade-in" style="display: flex; flex-direction: column; gap: 2rem;">
      <div class="section-title-wrapper" style="border-bottom: 1px solid var(--color-border); padding-bottom: 1.25rem;">
        <h1 class="section-title">Saved Accessories</h1>
        <p class="section-subtitle">You have ${items.length} premium accessory item${items.length > 1 ? 's' : ''} saved in your wishlist</p>
      </div>

      <div class="products-grid">
        ${items.map(p => {
          // Custom card styling with a prominent "Move to Cart" button beneath card details
          const isOutOfStock = p.stock <= 0;
          return `
            <div class="product-card" data-id="${p.id}" style="display: flex; flex-direction: column; height: 100%;">
              <!-- Image shell -->
              <div class="product-card-img-wrapper" style="position: relative;">
                <div class="card-badges">
                  ${isOutOfStock ? `<span class="badge-stock out-of-stock">Out of Stock</span>` : ''}
                </div>
                <div onclick="window.location.hash='#/product/${p.id}'" style="width: 100%; height: 100%; cursor: pointer;">
                  ${p.imageSvg}
                </div>
                <button class="card-action-btn remove-wishlist-direct" data-id="${p.id}" style="position: absolute; top: 12px; right: 12px; background-color: var(--bg-primary); z-index: 5;" title="Remove">
                  <i data-lucide="trash-2" style="color: var(--color-error); width: 16px; height: 16px;"></i>
                </button>
              </div>
              
              <!-- Content -->
              <div class="product-card-body" style="padding: 1.25rem; flex-grow: 1; display: flex; flex-direction: column;">
                <span class="product-card-category" style="font-size: 0.75rem;">${p.category}</span>
                <h3 class="product-card-title" onclick="window.location.hash='#/product/${p.id}'" style="cursor: pointer; font-size: 1rem;">${p.name}</h3>
                <p class="price-current" style="margin-top: 0.5rem; margin-bottom: 1rem; font-size: 1.1rem;">$${p.price.toFixed(2)}</p>
                
                <button class="btn btn-secondary move-to-cart-direct-btn" data-id="${p.id}" ${isOutOfStock ? 'disabled' : ''} style="width: 100%; margin-top: auto; padding: 0.6rem; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 0.35rem;">
                  <i data-lucide="shopping-bag" style="width: 14px;"></i> Move to Cart
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Bind Event Listeners
  bindEventListeners();
};

const bindEventListeners = () => {
  const container = document.getElementById('app-content');
  if (!container) return;

  // 1. Direct trash removal binding
  const removeBtns = container.querySelectorAll('.remove-wishlist-direct');
  removeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      AppState.toggleWishlist(id);
      if (window.showToast) {
        window.showToast("Removed", "Item removed from wishlist.", "info");
      }
      renderWishlist(container); // Re-render instantly
    });
  });

  // 2. Direct Move to Cart binding
  const moveBtns = container.querySelectorAll('.move-to-cart-direct-btn');
  moveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      const res = AppState.moveWishlistToCart(id);
      if (res.success) {
        if (window.showToast) {
          window.showToast("Moved to Cart", "Product was successfully moved to your shopping cart.", "success");
        }
        renderWishlist(container); // Re-render to clear item from wishlist
      } else {
        if (window.showToast) {
          window.showToast("Limit Reached", res.error, "error");
        }
      }
    });
  });
};
