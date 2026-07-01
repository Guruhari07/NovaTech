/* ==========================================================================
   NovaTech Checkout Page View Renderer
   ========================================================================== */

import { AppState } from '../state.js';
import { Router } from '../router.js';

export const renderCheckout = (container) => {
  const items = AppState.getCartItems();
  const totals = AppState.getCartTotals();

  // Guard: If cart is empty, redirect to cart page
  if (items.length === 0) {
    Router.navigate('/cart');
    return;
  }

  // Prepopulate values if user profile has saved details
  const profile = AppState.getUserProfile() || {};
  const savedAddress = profile.address || {};

  container.innerHTML = `
    <div class="checkout-layout fade-in">
      <!-- Left side: Forms -->
      <div class="checkout-forms-panel">
        <div class="section-title-wrapper" style="border-bottom: 1px solid var(--color-border); padding-bottom: 1.25rem; margin-bottom: 2rem;">
          <h1 class="section-title">Secure Checkout</h1>
          <p class="section-subtitle">Please enter your shipping address and choose a payment method</p>
        </div>

        <form id="checkout-main-form">
          <!-- 1. Shipping Address -->
          <div class="checkout-section">
            <h3 class="checkout-section-title"><i data-lucide="map-pin" style="width:16px; display:inline-block; vertical-align:text-bottom; margin-right:0.25rem;"></i> Shipping Details</h3>
            
            <div class="checkout-form-grid">
              <div class="form-group grid-col-span-2">
                <label class="form-label" for="shipping-name">Full Name</label>
                <input type="text" id="shipping-name" class="form-input" value="${profile.name || ''}" placeholder="e.g. Jane Doe" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="shipping-email">Email Address</label>
                <input type="email" id="shipping-email" class="form-input" value="${profile.email || ''}" placeholder="jane@example.com" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="shipping-phone">Phone Number</label>
                <input type="tel" id="shipping-phone" class="form-input" value="${savedAddress.phone || ''}" placeholder="e.g. +1 (555) 019-2834" required>
              </div>
              <div class="form-group grid-col-span-2">
                <label class="form-label" for="shipping-street">Street Address</label>
                <input type="text" id="shipping-street" class="form-input" value="${savedAddress.street || ''}" placeholder="e.g. 123 Tech Lane" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="shipping-city">City</label>
                <input type="text" id="shipping-city" class="form-input" value="${savedAddress.city || ''}" placeholder="e.g. San Francisco" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="shipping-state">State / Province</label>
                <input type="text" id="shipping-state" class="form-input" value="${savedAddress.state || ''}" placeholder="e.g. CA" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="shipping-zip">ZIP / Postal Code</label>
                <input type="text" id="shipping-zip" class="form-input" value="${savedAddress.zip || ''}" placeholder="e.g. 94107" required>
              </div>
            </div>
          </div>

          <!-- 2. Payment Method -->
          <div class="checkout-section" style="margin-top: 2.5rem;">
            <h3 class="checkout-section-title"><i data-lucide="credit-card" style="width:16px; display:inline-block; vertical-align:text-bottom; margin-right:0.25rem;"></i> Payment Method</h3>
            
            <div class="payment-methods">
              <!-- Cash on Delivery -->
              <label class="payment-method-option selected" id="opt-cod">
                <input type="radio" name="payment-option" value="COD" checked class="form-checkbox" style="margin-top: 3px;">
                <div class="payment-method-info">
                  <span class="payment-method-name">Cash on Delivery</span>
                  <span class="payment-method-desc">Pay with cash upon delivery of your packages.</span>
                </div>
              </label>

              <!-- UPI -->
              <label class="payment-method-option" id="opt-upi">
                <input type="radio" name="payment-option" value="UPI" class="form-checkbox" style="margin-top: 3px;">
                <div class="payment-method-info">
                  <span class="payment-method-name">UPI (Unified Payments Interface)</span>
                  <span class="payment-method-desc">Pay instantly using your favorite UPI mobile app.</span>
                </div>
              </label>

              <!-- Credit Card -->
              <label class="payment-method-option" id="opt-card">
                <input type="radio" name="payment-option" value="Card" class="form-checkbox" style="margin-top: 3px;">
                <div class="payment-method-info">
                  <span class="payment-method-name">Credit / Debit Card</span>
                  <span class="payment-method-desc">Pay securely using Visa, Mastercard, or Amex.</span>
                </div>
              </label>
            </div>

            <!-- Dynamic Payment Form Slots -->
            <div id="payment-details-form-container">
              <!-- Rendered dynamically -->
            </div>
          </div>
        </form>
      </div>

      <!-- Right side: Order Summary Card -->
      <div class="checkout-summary-panel">
        <div class="checkout-order-summary">
          <h2 class="summary-title" style="border-bottom: 1px solid var(--color-border); padding-bottom: 1rem;">Your Order</h2>
          
          <!-- Itemized list -->
          <div class="checkout-items-list">
            ${items.map(item => `
              <div class="checkout-item-row">
                <div class="checkout-item-details">
                  <div class="checkout-item-img">
                    ${item.imageSvg}
                  </div>
                  <div>
                    <span class="checkout-item-name" style="display: block; font-size: 0.85rem; max-width: 150px;">${item.name}</span>
                    <span style="font-size: 0.75rem; color: var(--text-secondary);">Qty: ${item.quantity}</span>
                  </div>
                </div>
                <span class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
          </div>

          <div class="dropdown-divider"></div>

          <div class="summary-row">
            <span>Subtotal</span>
            <span>$${totals.subtotal.toFixed(2)}</span>
          </div>

          ${totals.discount > 0 ? `
            <div class="summary-row" style="color: var(--color-success); font-weight: 500;">
              <span>Promo Code (10%)</span>
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

          <div class="summary-row total" style="border-top: 1px solid var(--color-border); padding-top: 1.25rem; font-size: 1.2rem;">
            <span>Grand Total</span>
            <span style="color: var(--color-primary); font-weight: 700;">$${totals.grandTotal.toFixed(2)}</span>
          </div>

          <button type="submit" form="checkout-main-form" class="btn btn-primary" style="width: 100%; height: 46px; margin-top: 1rem;">
            <i data-lucide="lock" style="width: 16px;"></i> Complete Order ($${totals.grandTotal.toFixed(2)})
          </button>
          
          <p style="font-size: 0.75rem; color: var(--text-tertiary); text-align: center;">
            <i data-lucide="shield-check" style="width: 14px; display:inline-block; vertical-align:middle;"></i> Bank-grade 256-bit SSL encryption.
          </p>
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
  const form = container.querySelector('#checkout-main-form');
  const methodOptions = container.querySelectorAll('.payment-method-option');
  const detailsContainer = container.querySelector('#payment-details-form-container');

  // Helper to render dynamic fields based on payment method
  const renderPaymentDetails = (method) => {
    if (method === "UPI") {
      detailsContainer.innerHTML = `
        <div class="payment-details-box fade-in">
          <div class="upi-qr-mock">
            <p style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">SCAN QR TO PAY SIMULATION</p>
            <div class="upi-qr-image">
              <!-- Beautiful minimalist dot matrix QR code illustration in SVG -->
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="25" height="25" stroke="black" stroke-width="3" fill="none"/>
                <rect x="15" y="15" width="15" height="15" fill="black"/>
                <rect x="65" y="10" width="25" height="25" stroke="black" stroke-width="3" fill="none"/>
                <rect x="70" y="15" width="15" height="15" fill="black"/>
                <rect x="10" y="65" width="25" height="25" stroke="black" stroke-width="3" fill="none"/>
                <rect x="15" y="70" width="15" height="15" fill="black"/>
                
                <!-- Dot matrix lines simulating QR patterns -->
                <circle cx="48" cy="18" r="3" fill="black"/>
                <circle cx="48" cy="30" r="3" fill="black"/>
                <circle cx="58" cy="18" r="3" fill="black"/>
                <circle cx="58" cy="30" r="3" fill="black"/>
                
                <circle cx="48" cy="48" r="3" fill="black"/>
                <circle cx="48" cy="58" r="3" fill="black"/>
                <circle cx="58" cy="48" r="3" fill="black"/>
                <circle cx="58" cy="58" r="3" fill="black"/>
                <circle cx="68" cy="48" r="3" fill="black"/>
                <circle cx="68" cy="58" r="3" fill="black"/>
                
                <circle cx="18" cy="48" r="3" fill="black"/>
                <circle cx="30" cy="48" r="3" fill="black"/>
                <circle cx="18" cy="58" r="3" fill="black"/>
                <circle cx="30" cy="58" r="3" fill="black"/>
                
                <circle cx="48" cy="68" r="3" fill="black"/>
                <circle cx="48" cy="80" r="3" fill="black"/>
                <circle cx="58" cy="68" r="3" fill="black"/>
                <circle cx="58" cy="80" r="3" fill="black"/>
                
                <circle cx="78" cy="68" r="3" fill="black"/>
                <circle cx="78" cy="80" r="3" fill="black"/>
                <circle cx="68" cy="74" r="3" fill="black"/>
              </svg>
            </div>
            <p style="font-size: 0.8rem; color: var(--text-secondary);">UPI ID: <strong style="color: var(--color-primary);">novatech@upi</strong></p>
            
            <div class="form-group" style="width: 100%; text-align: left; margin-top: 0.5rem;">
              <label class="form-label" for="upi-vpa-input">Verify UPI Address (VPA)</label>
              <input type="text" id="upi-vpa-input" class="form-input" placeholder="e.g. user@okaxis" required>
            </div>
          </div>
        </div>
      `;
    } else if (method === "Card") {
      detailsContainer.innerHTML = `
        <div class="payment-details-box fade-in">
          <div class="checkout-form-grid" style="grid-template-columns: 1fr 1fr;">
            <div class="form-group grid-col-span-2">
              <label class="form-label" for="card-num-input">Card Number</label>
              <input type="text" id="card-num-input" class="form-input" placeholder="4111 2222 3333 4444" maxlength="19" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="card-expiry-input">Expiry Date</label>
              <input type="text" id="card-expiry-input" class="form-input" placeholder="MM/YY" maxlength="5" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="card-cvv-input">CVV / Security Code</label>
              <input type="password" id="card-cvv-input" class="form-input" placeholder="000" maxlength="4" required>
            </div>
          </div>
        </div>
      `;
      
      // Auto-format card spacings and exp slash
      const cardInput = detailsContainer.querySelector('#card-num-input');
      if (cardInput) {
        cardInput.addEventListener('input', (e) => {
          let value = e.target.value.replace(/\D/g, '');
          let formatted = value.match(/.{1,4}/g)?.join(' ') || '';
          e.target.value = formatted;
        });
      }

      const expiryInput = detailsContainer.querySelector('#card-expiry-input');
      if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
          let value = e.target.value.replace(/\D/g, '');
          if (value.length > 2) {
            value = value.substr(0, 2) + '/' + value.substr(2, 2);
          }
          e.target.value = value;
        });
      }
    } else {
      detailsContainer.innerHTML = ""; // COD has no extra fields
    }
  };

  // Payment Options change handlers
  methodOptions.forEach(opt => {
    const radio = opt.querySelector('input[type="radio"]');
    opt.addEventListener('click', () => {
      methodOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      radio.checked = true;
      renderPaymentDetails(radio.value);
    });
  });

  // Main Form Submit checkout
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather form fields
      const name = container.querySelector('#shipping-name').value.trim();
      const phone = container.querySelector('#shipping-phone').value.trim();
      const street = container.querySelector('#shipping-street').value.trim();
      const city = container.querySelector('#shipping-city').value.trim();
      const state = container.querySelector('#shipping-state').value.trim();
      const zip = container.querySelector('#shipping-zip').value.trim();
      
      const paymentOption = container.querySelector('input[name="payment-option"]:checked').value;

      // Create address object
      const shippingAddress = { name, phone, street, city, state, zip };

      // Extra payment specific simulation checks
      if (paymentOption === "Card") {
        const cardNum = container.querySelector('#card-num-input').value.replace(/\s/g, '');
        const expiry = container.querySelector('#card-expiry-input').value;
        const cvv = container.querySelector('#card-cvv-input').value;
        if (cardNum.length < 15 || expiry.length < 5 || cvv.length < 3) {
          if (window.showToast) window.showToast("Payment Details Incomplete", "Please check your dummy credit card formatting.", "error");
          return;
        }
      } else if (paymentOption === "UPI") {
        const vpa = container.querySelector('#upi-vpa-input').value;
        if (!vpa.includes('@')) {
          if (window.showToast) window.showToast("UPI Validation", "Please enter a valid UPI address (e.g., user@upi).", "error");
          return;
        }
      }

      // Execute order placement
      const result = AppState.placeOrder(shippingAddress, paymentOption);
      if (result.success) {
        if (window.showToast) {
          window.showToast("Order Placed Successfully!", `Your order ${result.orderId} is confirmed.`, "success");
        }
        // Redirect to Success page with Order ID
        Router.navigate(`/order-success/${result.orderId}`);
      } else {
        if (window.showToast) {
          window.showToast("Checkout Failed", result.error, "error");
        }
      }
    });
  }
};
