/* ==========================================================================
   NovaTech Shopping Cart Page View Renderer
   ========================================================================== */

import { AppState } from '../state.js';

export const renderCart = (container) => {
  const items = AppState.getCartItems();
  const totals = AppState.getCartTotals();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state fade-in">
        <div class="empty-state-icon">
          <i data-lucide="shopping-bag"></i>
        </div>
        <h1 class="empty-state-title">Your Cart is Empty</h1>
        <p class="empty-state-desc">You haven't added any tech accessories to your cart yet. Explore our shop to find premium workspace gear.</p>
        <a href="#/shop" class="btn btn-primary">Start Shopping</a>
      </div>
    `;
    if (window.lucide) {
      window.lucide.createIcons();
    }
    return;
  }

  const activeCoupon = AppState.data.activeCoupon;

  container.innerHTML = `
    <div class="cart-layout fade-in">
      <!-- Left: Cart Items List -->
      <div class="cart-items-panel">
        <div class="section-title-wrapper" style="border-bottom: 1px solid var(--color-border); padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
          <h1 class="section-title">Shopping Cart</h1>
          <p class="section-subtitle">You have ${items.length} accessory type${items.length > 1 ? 's' : ''} in your cart</p>
        </div>

        <div class="cart-table-wrapper">
          <table class="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th style="text-align: center;">Quantity</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr data-id="${item.id}">
                  <td>
                    <div class="cart-product-cell">
                      <div class="cart-item-img" onclick="window.location.hash='#/product/${item.id}'" style="cursor: pointer;">
                        ${item.imageSvg}
                      </div>
                      <div class="cart-item-info">
                        <span class="cart-item-brand">${item.brand}</span>
                        <a href="#/product/${item.id}" class="cart-item-name">${item.name}</a>
                        <button class="cart-item-remove-btn remove-cart-btn" data-id="${item.id}"><i data-lucide="trash-2" style="width:12px; height:12px; display:inline; vertical-align:middle;"></i> Remove</button>
                      </div>
                    </div>
                  </td>
                  <td style="text-align: center; vertical-align: middle;">
                    <div class="quantity-selector">
                      <button class="qty-btn dec-cart-qty" data-id="${item.id}"><i data-lucide="minus" style="width: 12px;"></i></button>
                      <input type="text" class="qty-input cart-qty-input" data-id="${item.id}" value="${item.quantity}" readonly>
                      <button class="qty-btn inc-cart-qty" data-id="${item.id}"><i data-lucide="plus" style="width: 12px;"></i></button>
                    </div>
                    <div class="price-detail" style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">
                      $${item.price.toFixed(2)} each
                    </div>
                  </td>
                  <td style="text-align: right; vertical-align: middle;" class="cart-price-cell">
                    $${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Cart Action Footer (Promo coupon / Reset Cart) -->
        <div class="cart-actions">
          <form id="cart-coupon-form" class="coupon-form">
            <input type="text" id="cart-coupon-input" class="form-input" placeholder="Promo Code (e.g. NOVATECH10)" value="${activeCoupon ? activeCoupon.code : ''}" ${activeCoupon ? 'disabled' : ''} style="height: 38px;">
            <button type="submit" class="btn btn-outline" style="height: 38px; padding: 0 1.25rem;" ${activeCoupon ? 'disabled' : ''}>Apply</button>
          </form>
          
          <button id="clear-cart-btn" class="btn btn-outline" style="color: var(--color-error); border-color: var(--color-border); height: 38px;">
            <i data-lucide="trash-2" style="width: 16px;"></i> Clear Cart
          </button>
        </div>
        ${activeCoupon ? `<p style="color: var(--color-success); font-size: 0.8rem; font-weight: 600; margin-top: 0.5rem;"><i data-lucide="check" style="width:14px; height:14px; display:inline-block; vertical-align:text-bottom;"></i> Coupon "${activeCoupon.code}" Applied: 10% Discount saved!</p>` : ''}
      </div>

      <!-- Right: Summary Card -->
      <div class="cart-summary">
        <div class="cart-summary-card">
          <h2 class="summary-title">Order Summary</h2>
          
          <div class="summary-row">
            <span>Subtotal</span>
            <span>$${totals.subtotal.toFixed(2)}</span>
          </div>

          ${totals.discount > 0 ? `
            <div class="summary-row" style="color: var(--color-success); font-weight: 500;">
              <span>Promo Discount (10%)</span>
              <span>-$${totals.discount.toFixed(2)}</span>
            </div>
          ` : ''}

          <div class="summary-row">
            <span>Shipping</span>
            <span>${totals.shipping === 0 ? '<span style="color: var(--color-success); font-weight:600;">FREE</span>' : `$${totals.shipping.toFixed(2)}`}</span>
          </div>

          <div class="summary-row">
            <span>Estimated Tax (8%)</span>
            <span>$${totals.tax.toFixed(2)}</span>
          </div>

          <div class="summary-row total">
            <span>Grand Total</span>
            <span style="color: var(--color-primary);">$${totals.grandTotal.toFixed(2)}</span>
          </div>

          <a href="#/checkout" class="btn btn-primary" style="width: 100%; height: 46px; margin-top: 1rem;">
            Proceed to Checkout <i data-lucide="arrow-right" style="width: 16px;"></i>
          </a>
          
          <a href="#/shop" class="btn btn-text" style="text-align: center; font-size: 0.8rem;">
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Bind Event Listeners
  bindEventListeners(container);
};

const bindEventListeners = (container) => {
  // 1. Remove individual cart item
  const removeBtns = container.querySelectorAll('.remove-cart-btn');
  removeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      AppState.removeFromCart(id);
      if (window.showToast) {
        window.showToast("Removed", "Item removed from cart.", "info");
      }
      renderCart(container); // Re-draw
    });
  });

  // 2. Quantity adjustments
  const decBtns = container.querySelectorAll('.dec-cart-qty');
  decBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      const input = container.querySelector(`.cart-qty-input[data-id="${id}"]`);
      if (input) {
        const val = parseInt(input.value);
        AppState.updateCartQty(id, val - 1);
        renderCart(container);
      }
    });
  });

  const incBtns = container.querySelectorAll('.inc-cart-qty');
  incBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      const input = container.querySelector(`.cart-qty-input[data-id="${id}"]`);
      if (input) {
        const val = parseInt(input.value);
        const res = AppState.updateCartQty(id, val + 1);
        if (res && !res.success) {
          if (window.showToast) window.showToast("Limit Reached", res.error, "error");
        }
        renderCart(container);
      }
    });
  });

  // 3. Clear cart
  const clearBtn = container.querySelector('#clear-cart-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      AppState.clearCart();
      if (window.showToast) {
        window.showToast("Cart Cleared", "All items removed from your cart.", "info");
      }
      renderCart(container);
    });
  }

  // 4. Coupon form submit
  const couponForm = container.querySelector('#cart-coupon-form');
  if (couponForm) {
    couponForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = container.querySelector('#cart-coupon-input');
      if (input && input.value) {
        const res = AppState.applyCoupon(input.value);
        if (res.success) {
          if (window.showToast) {
            window.showToast("Coupon Applied!", `You got a ${res.discountPercent}% discount.`, "success");
          }
          renderCart(container);
        } else {
          if (window.showToast) {
            window.showToast("Invalid Coupon", res.error, "error");
          }
        }
      }
    });
  }
};
