/* ==========================================================================
   NovaTech User Account Dashboard View Renderer
   ========================================================================== */

import { AppState } from '../state.js';
import { Router } from '../router.js';
import { products } from '../data.js';

let activeTab = "profile"; // transient tab selection: profile, address, orders

export const renderAccount = (container, params = {}) => {
  // Read optional active tab from query parameter (e.g. #/account?tab=orders)
  if (params.queryParams?.tab) {
    activeTab = params.queryParams.tab;
  }

  const profile = AppState.getUserProfile();
  if (!profile) {
    Router.navigate('/login');
    return;
  }

  const renderDashboard = () => {
    container.innerHTML = `
      <div class="account-layout fade-in">
        <!-- Sidebar Navigation -->
        <aside class="account-tabs">
          <button class="account-tab-btn ${activeTab === 'profile' ? 'active' : ''}" data-tab="profile">
            <i data-lucide="user"></i> Profile Info
          </button>
          <button class="account-tab-btn ${activeTab === 'address' ? 'active' : ''}" data-tab="address">
            <i data-lucide="map-pin"></i> Shipping Address
          </button>
          <button class="account-tab-btn ${activeTab === 'orders' ? 'active' : ''}" data-tab="orders">
            <i data-lucide="package"></i> Order History
          </button>
          <div class="dropdown-divider" style="margin: 1rem 0;"></div>
          <button class="account-tab-btn" id="account-logout-btn" style="color: var(--color-error);">
            <i data-lucide="log-out"></i> Sign Out
          </button>
        </aside>

        <!-- Main Tab Content Area -->
        <main class="account-tab-content">
          ${renderTabContent(profile)}
        </main>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }

    bindEventListeners(profile);
  };

  const renderTabContent = (profile) => {
    // 1. Profile Details tab
    if (activeTab === "profile") {
      return `
        <div>
          <h2 class="specs-title" style="margin-bottom: 0.25rem;">Profile Information</h2>
          <p class="section-subtitle" style="margin-bottom: 1.5rem;">Update your account credentials and personal information</p>
          
          <form id="edit-profile-form" style="max-width: 480px; display: flex; flex-direction: column; gap: 1.25rem;">
            <div class="form-group">
              <label class="form-label" for="profile-name">Full Name</label>
              <input type="text" id="profile-name" class="form-input" value="${profile.name}" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="profile-email">Email Address</label>
              <input type="email" id="profile-email" class="form-input" value="${profile.email}" disabled style="cursor: not-allowed; opacity: 0.6;">
              <span class="error-text" style="font-size:0.75rem; color:var(--text-tertiary);">Email address changes are locked for safety.</span>
            </div>
            
            <div class="dropdown-divider" style="margin: 0.5rem 0;"></div>
            <p class="form-label" style="color:var(--text-primary);">Update Password (Optional)</p>

            <div class="form-group">
              <label class="form-label" for="profile-pass">New Password</label>
              <input type="password" id="profile-pass" class="form-input" placeholder="Leave blank to keep current">
            </div>

            <button type="submit" class="btn btn-primary" style="align-self: flex-start; height: 42px;">Save Changes</button>
          </form>
        </div>
      `;
    }

    // 2. Saved Address Tab
    if (activeTab === "address") {
      const addr = profile.address || {};
      const hasAddress = profile.address !== null;

      return `
        <div>
          <h2 class="specs-title" style="margin-bottom: 0.25rem;">Saved Address</h2>
          <p class="section-subtitle" style="margin-bottom: 1.5rem;">Your default shipping details utilized for fast checkout orders</p>
          
          <form id="edit-address-form" style="max-width: 540px; display: flex; flex-direction: column; gap: 1.25rem;">
            <div class="checkout-form-grid" style="grid-template-columns: 1fr 1fr; gap: 1.25rem;">
              <div class="form-group grid-col-span-2">
                <label class="form-label" for="addr-phone">Phone Number</label>
                <input type="tel" id="addr-phone" class="form-input" value="${addr.phone || ''}" placeholder="e.g. +1 (555) 019-2834" required>
              </div>
              <div class="form-group grid-col-span-2">
                <label class="form-label" for="addr-street">Street Address</label>
                <input type="text" id="addr-street" class="form-input" value="${addr.street || ''}" placeholder="e.g. 123 Tech Lane" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="addr-city">City</label>
                <input type="text" id="addr-city" class="form-input" value="${addr.city || ''}" placeholder="e.g. San Francisco" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="addr-state">State / Province</label>
                <input type="text" id="addr-state" class="form-input" value="${addr.state || ''}" placeholder="e.g. CA" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="addr-zip">ZIP / Postal Code</label>
                <input type="text" id="addr-zip" class="form-input" value="${addr.zip || ''}" placeholder="e.g. 94107" required>
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="align-self: flex-start; height: 42px;">Save Shipping Address</button>
          </form>
        </div>
      `;
    }

    // 3. Order History Tab
    if (activeTab === "orders") {
      const orders = AppState.getUserOrders();

      if (orders.length === 0) {
        return `
          <div class="empty-state" style="padding: 3rem 0; width: 100%;">
            <div class="empty-state-icon"><i data-lucide="package-open"></i></div>
            <h3 class="empty-state-title" style="font-size: 1.25rem;">No Orders Placed Yet</h3>
            <p class="empty-state-desc">Your order history is empty. Once you purchase gear at checkout, records will appear here.</p>
            <a href="#/shop" class="btn btn-primary">Upgrade Workspace</a>
          </div>
        `;
      }

      // Sort orders by date desc
      orders.sort((a, b) => new Date(b.date) - new Date(a.date));

      return `
        <div>
          <h2 class="specs-title" style="margin-bottom: 0.25rem;">Order History</h2>
          <p class="section-subtitle" style="margin-bottom: 1.5rem;">Track details and receipts for your past workspace upgrades</p>
          
          <div class="orders-list">
            ${orders.map(order => {
              const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });

              return `
                <div class="order-accordion" data-id="${order.orderId}">
                  <!-- Collapsible Header -->
                  <div class="order-header" data-id="${order.orderId}">
                    <div class="order-header-main">
                      <div class="order-header-info">
                        <span class="order-info-label">ORDER ID</span>
                        <span class="order-info-val">${order.orderId}</span>
                      </div>
                      <div class="order-header-info">
                        <span class="order-info-label">DATE PLACED</span>
                        <span class="order-info-val">${formattedDate}</span>
                      </div>
                      <div class="order-header-info">
                        <span class="order-info-label">TOTAL AMOUNT</span>
                        <span class="order-info-val" style="color: var(--color-primary); font-weight:700;">$${order.totals.grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div style="display:flex; align-items:center; gap:0.5rem;">
                      <div class="order-header-info status-processing">
                        <span class="order-info-label">STATUS</span>
                        <span class="order-info-val">Processing</span>
                      </div>
                      <i data-lucide="chevron-down" class="accordion-arrow" style="width:18px; height:18px; transition: var(--transition-fast);"></i>
                    </div>
                  </div>

                  <!-- Expanded body (hidden by default) -->
                  <div class="order-body hidden" id="body-${order.orderId}">
                    <div class="order-details-grid">
                      <!-- Items purchased -->
                      <div class="order-items">
                        <span class="order-info-label" style="margin-bottom: 0.5rem; display:block;">Ordered Items</span>
                        ${order.items.map(item => {
                          const prod = products.find(p => p.id === item.productId);
                          const svgRepresentation = prod ? prod.imageSvg : '';
                          return `
                            <div class="order-item-row">
                              <div class="order-item-img">
                                ${svgRepresentation}
                              </div>
                              <div style="flex-grow:1;">
                                <span class="order-item-name" style="display:block;">${item.name}</span>
                                <span style="font-size:0.75rem; color:var(--text-secondary);">${item.brand} &bull; Qty: ${item.quantity}</span>
                              </div>
                              <span style="font-weight:600; font-size:0.9rem;">$${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          `;
                        }).join('')}
                      </div>

                      <!-- Shipping Summary -->
                      <div class="order-shipping-summary">
                        <span class="order-info-label" style="margin-bottom: 0.25rem; display:block;">Shipping Destination</span>
                        <p style="font-weight: 600; color: var(--text-primary);">${order.shippingAddress.name}</p>
                        <p style="color: var(--text-secondary);">${order.shippingAddress.street}</p>
                        <p style="color: var(--text-secondary);">${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}</p>
                        <p style="color: var(--text-secondary); margin-top: 0.25rem;">Phone: ${order.shippingAddress.phone}</p>
                        <div class="dropdown-divider"></div>
                        <p style="font-size: 0.75rem; color: var(--text-tertiary);">Payment Method: <strong>${order.paymentMethod}</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }
  };

  const bindEventListeners = (profile) => {
    // 1. Sidebar tab navigation
    const tabBtns = container.querySelectorAll('.account-tab-btn[data-tab]');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-tab');
        renderDashboard();
      });
    });

    // 2. Sign Out button
    const logoutBtn = container.querySelector('#account-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        AppState.logout();
        if (window.showToast) {
          window.showToast("Signed Out", "You have logged out of your account successfully.", "info");
        }
        Router.navigate('/');
      });
    }

    // 3. Edit Profile form submit
    const profileForm = container.querySelector('#edit-profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = container.querySelector('#profile-name').value.trim();
        const pass = container.querySelector('#profile-pass').value;

        const updateData = { name };
        if (pass) {
          updateData.password = pass;
        }

        const res = AppState.updateUserProfile(updateData);
        if (res.success) {
          if (window.showToast) {
            window.showToast("Profile Updated!", "Your profile information was updated.", "success");
          }
          // Re-render
          renderAccount(container);
        } else {
          if (window.showToast) {
            window.showToast("Update Failed", res.error, "error");
          }
        }
      });
    }

    // 4. Edit Address form submit
    const addressForm = container.querySelector('#edit-address-form');
    if (addressForm) {
      addressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const phone = container.querySelector('#addr-phone').value.trim();
        const street = container.querySelector('#addr-street').value.trim();
        const city = container.querySelector('#addr-city').value.trim();
        const state = container.querySelector('#addr-state').value.trim();
        const zip = container.querySelector('#addr-zip').value.trim();

        const address = { phone, street, city, state, zip };

        const res = AppState.updateUserProfile({ address });
        if (res.success) {
          if (window.showToast) {
            window.showToast("Address Saved!", "Default checkout address details updated.", "success");
          }
          // Re-render
          renderAccount(container);
        } else {
          if (window.showToast) {
            window.showToast("Failed to Save", res.error, "error");
          }
        }
      });
    }

    // 5. Collapsible Order Accordion click handlers
    const orderHeaders = container.querySelectorAll('.order-header');
    orderHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const id = header.getAttribute('data-id');
        const body = container.querySelector(`#body-${id}`);
        const arrow = header.querySelector('.accordion-arrow');
        
        if (body) {
          const isHidden = body.classList.contains('hidden');
          if (isHidden) {
            body.classList.remove('hidden');
            body.classList.add('fade-in');
            if (arrow) arrow.style.transform = "rotate(180deg)";
          } else {
            body.classList.add('hidden');
            body.classList.remove('fade-in');
            if (arrow) arrow.style.transform = "rotate(0deg)";
          }
        }
      });
    });
  };

  // Initial draw execution
  renderDashboard();
};
