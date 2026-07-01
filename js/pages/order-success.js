/* ==========================================================================
   NovaTech Order Success Page View Renderer
   ========================================================================== */

import { AppState } from '../state.js';

export const renderOrderSuccess = (container, params = {}) => {
  const pathParams = params.pathParams || [];
  const orderId = pathParams[0];

  const order = AppState.data.orders.find(o => o.orderId === orderId);

  if (!order) {
    container.innerHTML = `
      <div class="empty-state fade-in">
        <div class="empty-state-icon" style="color: var(--color-error);"><i data-lucide="alert-triangle"></i></div>
        <h2 class="empty-state-title">Order Record Not Found</h2>
        <p class="empty-state-desc">The order ID specified does not match any transactions in your account database history.</p>
        <a href="#/shop" class="btn btn-primary">Return to Shop</a>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  // Calculate estimated delivery date (3 business days from order date)
  const deliveryDate = new Date(order.date);
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  container.innerHTML = `
    <div class="fade-in" style="max-width: 640px; margin: 3rem auto; text-align: center; display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <!-- Success Checked Icon Animation -->
      <div style="width: 80px; height: 80px; border-radius: var(--radius-full); background-color: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center;">
        <i data-lucide="check-circle" style="width: 48px; height: 48px;"></i>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <h1 class="auth-title" style="font-size: 2.25rem;">Workspace Upgrade Confirmed</h1>
        <p class="auth-subtitle">Thank you for choosing NovaTech. We're preparing your premium accessories.</p>
      </div>

      <div style="background-color: var(--bg-secondary); border: 1px solid var(--color-border); border-radius: var(--radius-lg); width: 100%; padding: 2rem; text-align: left; display: flex; flex-direction: column; gap: 1.25rem;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem;">
          <span style="font-size: 0.8125rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Order Reference</span>
          <strong style="color: var(--color-primary); font-family: var(--font-heading);">${order.orderId}</strong>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem;">
          <div style="display: flex; justify-content: space-between;">
            <span class="text-secondary">Estimated Delivery</span>
            <span style="font-weight: 600; color: var(--text-primary);">${formattedDelivery}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span class="text-secondary">Shipping Method</span>
            <span>Standard Express (Tracked)</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span class="text-secondary">Payment Method</span>
            <span style="font-weight: 600;">${order.paymentMethod}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span class="text-secondary">Grand Total</span>
            <span style="font-weight: 700; color: var(--color-primary);">$${order.totals.grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <div class="dropdown-divider"></div>

        <div>
          <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; display: block; margin-bottom: 0.5rem; letter-spacing: 0.05em;">Shipping Destination</span>
          <p style="font-weight: 600; font-size: 0.9rem;">${order.shippingAddress.name}</p>
          <p style="color: var(--text-secondary); font-size: 0.85rem;">${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}</p>
          <p style="color: var(--text-secondary); font-size: 0.85rem;">Phone: ${order.shippingAddress.phone}</p>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; width: 100%; margin-top: 1rem;">
        <a href="#/account?tab=orders" class="btn btn-outline" style="flex: 1; height: 44px;">
          <i data-lucide="package" style="width: 16px;"></i> Track Order History
        </a>
        <a href="#/shop" class="btn btn-primary" style="flex: 1; height: 44px;">
          Continue Shopping <i data-lucide="arrow-right" style="width: 16px;"></i>
        </a>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
};
