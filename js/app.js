/* ==========================================================================
   NovaTech Main Application Entry Point & Global Controllers
   ========================================================================== */

import { AppState } from './state.js';
import { Router } from './router.js';
import { products } from './data.js';
import { getStarRatingHtml } from './pages/home.js';

// Setup Toast Notification System on window so pages can invoke it
window.showToast = (title, message, type = 'info') => {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  
  let iconName = "info";
  if (type === "success") iconName = "check-circle";
  if (type === "error") iconName = "x-circle";

  toast.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;

  container.appendChild(toast);
  
  // Render lucide icons for toast
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Animate sliding in
  setTimeout(() => toast.classList.add('show'), 50);

  // Auto remove after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    // Remove from DOM after transition completes
    toast.addEventListener('transitionend', () => toast.remove());
  }, 3500);
};

// Setup Quick View Modal System on window
window.openQuickView = (productId) => {
  const modal = document.getElementById('quick-view-modal');
  const content = document.getElementById('quick-view-content');
  if (!modal || !content) return;

  const product = products.find(p => p.id === productId);
  if (!product) return;

  const isOutOfStock = product.stock <= 0;
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const isInWishlist = AppState.isInWishlist(product.id);

  content.innerHTML = `
    <div class="product-detail-layout" style="grid-template-columns: 1.1fr 1fr; gap: 2rem; padding-top: 1rem;">
      <div class="product-gallery" style="background-color: var(--bg-secondary); border-radius: var(--radius-md); display:flex; align-items:center; justify-content:center; padding: 1.5rem; height: 320px; border:1px solid var(--color-border); position:relative;">
        <div class="card-badges">
          ${hasDiscount ? `<span class="badge-discount">-${discountPercent}%</span>` : ''}
          ${isOutOfStock ? `<span class="badge-stock out-of-stock">Out of Stock</span>` : ''}
        </div>
        <div style="width: 80%; height: 80%; display: flex; align-items:center; justify-content:center;">
          ${product.imageSvg}
        </div>
      </div>
      
      <div class="product-info-panel" style="gap: 1rem;">
        <div>
          <span class="product-brand" style="font-size: 0.75rem;">${product.brand}</span>
          <h2 class="product-title" style="font-size: 1.5rem; line-height: 1.3; margin-top:0.25rem;">${product.name}</h2>
          <div class="product-card-rating" style="margin-top: 0.5rem; margin-bottom: 0;">
            <div class="star-rating">${getStarRatingHtml(product.rating)}</div>
            <span class="rating-count">(${product.reviewsCount})</span>
          </div>
        </div>

        <div class="product-detail-price" style="font-size: 1.35rem;">
          <span class="price-detail-current" style="font-size: 1.5rem;">$${product.price.toFixed(2)}</span>
          ${hasDiscount ? `<span class="price-detail-old" style="font-size: 1.1rem;">$${product.oldPrice.toFixed(2)}</span>` : ''}
        </div>

        <p class="product-description" style="font-size: 0.85rem; line-height:1.6; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;">${product.description}</p>
        
        <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top: 0.5rem;">
          <button id="quick-add-to-cart-btn" class="btn btn-primary" style="height: 40px; font-size:0.85rem;" ${isOutOfStock ? 'disabled' : ''}>
            <i data-lucide="shopping-cart" style="width:16px;"></i> Add to Cart
          </button>
          
          <div style="display:flex; gap:0.5rem;">
            <a href="#/product/${product.id}" id="quick-view-go-details" class="btn btn-outline" style="flex:1; height: 38px; font-size:0.8rem; padding:0;">
              View Details
            </a>
            <button id="quick-wishlist-toggle" class="btn btn-outline btn-icon ${isInWishlist ? 'active' : ''}" style="height: 38px; width: 38px; display:flex; align-items:center; justify-content:center;">
              <i data-lucide="heart" style="width:16px; ${isInWishlist ? 'fill:currentColor;' : ''}"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Bind Quick view actions
  const addBtn = content.querySelector('#quick-add-to-cart-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const res = AppState.addToCart(product.id, 1);
      if (res.success) {
        window.showToast("Added to Cart!", `${product.name} added to cart.`, "success");
        modal.classList.remove('open');
        modal.classList.add('hidden');
      } else {
        window.showToast("Stock Limit", res.error, "error");
      }
    });
  }

  const wishBtn = content.querySelector('#quick-wishlist-toggle');
  if (wishBtn) {
    wishBtn.addEventListener('click', () => {
      const added = AppState.toggleWishlist(product.id);
      wishBtn.classList.toggle('active', added);
      const icon = wishBtn.querySelector('i');
      if (icon) {
        icon.style.fill = added ? 'currentColor' : 'transparent';
      }
      window.showToast(added ? "Saved!" : "Removed", added ? `${product.name} added to wishlist.` : `${product.name} removed from wishlist.`, added ? "success" : "info");
    });
  }

  // Add click listener to Go details to close modal
  const detailsLink = content.querySelector('#quick-view-go-details');
  if (detailsLink) {
    detailsLink.addEventListener('click', () => {
      modal.classList.remove('open');
      modal.classList.add('hidden');
    });
  }

  // Display modal
  modal.classList.remove('hidden');
  modal.classList.add('open');
};

// Document Mount Initialization
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize State
  AppState.init();

  // 2. Initialize Router
  Router.init('app-content');

  // 3. Set Header Badge Counts and Auth UI initially
  syncGlobalElements();

  // 4. Listen to State Updates for syncing counts
  window.addEventListener('statechange', (e) => {
    syncGlobalElements();
  });

  // 5. Scroll Page Navigation Styling & Back-to-Top
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-container');
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 300) {
      backToTopBtn.classList.remove('hidden-btn');
    } else {
      backToTopBtn.classList.add('hidden-btn');
    }
  });

  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Setup Theme Toggle Action
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = AppState.toggleTheme();
      const darkIcon = themeToggle.querySelector('.theme-icon-dark');
      const lightIcon = themeToggle.querySelector('.theme-icon-light');

      if (activeTheme === "dark") {
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
      } else {
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
      }
    });
  }

  // 7. Setup Profile Dropdown toggle click
  const profileBtn = document.getElementById('profile-btn');
  const profileDropdown = document.getElementById('profile-dropdown');
  
  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!profileDropdown.classList.contains('hidden') && !profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.add('hidden');
      }
    });
  }

  // Setup dropdown Auth Action (Login/Logout)
  const dropdownAuthBtn = document.getElementById('dropdown-auth-btn');
  if (dropdownAuthBtn) {
    dropdownAuthBtn.addEventListener('click', () => {
      if (AppState.isAuthenticated()) {
        AppState.logout();
        window.showToast("Logged Out", "Successfully logged out of your session.", "info");
        Router.navigate('/');
      } else {
        Router.navigate('/login');
      }
      profileDropdown.classList.add('hidden');
    });
  }

  // 8. Setup Mobile Hamburger Drawer Menu
  const hamburgerBtn = document.getElementById('hamburger-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const openIcon = hamburgerBtn.querySelector('.menu-open-icon');
      const closeIcon = hamburgerBtn.querySelector('.menu-close-icon');

      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        mobileMenu.classList.remove('open');
        mobileMenu.classList.add('hidden');
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      } else {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('open');
        openIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      }
    });
  }

  // 9. Setup Global Search (Live instant query overlay)
  setupGlobalSearch('global-search', 'live-search-results', 'clear-search');
  setupGlobalSearch('mobile-global-search', null, null, true); // Mobile search redirects directly on enter key

  // 10. Close Quick View modal
  const closeQuickViewBtn = document.getElementById('close-quick-view');
  const quickViewModal = document.getElementById('quick-view-modal');
  if (closeQuickViewBtn && quickViewModal) {
    const closeModal = () => {
      quickViewModal.classList.remove('open');
      quickViewModal.classList.add('hidden');
    };
    closeQuickViewBtn.addEventListener('click', closeModal);
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) closeModal();
    });
  }

  // 11. Reusable global Event Delegation for Product Cards actions (saves binding on re-renders)
  document.addEventListener('click', (e) => {
    // Quick View btn inside product cards
    const qvBtn = e.target.closest('.quick-view-btn');
    if (qvBtn) {
      e.stopPropagation();
      const id = parseInt(qvBtn.getAttribute('data-id'));
      window.openQuickView(id);
      return;
    }

    // Wishlist toggle btn inside cards
    const wishBtn = e.target.closest('.wishlist-toggle-btn');
    if (wishBtn) {
      e.stopPropagation();
      const id = parseInt(wishBtn.getAttribute('data-id'));
      const added = AppState.toggleWishlist(id);
      wishBtn.classList.toggle('active', added);
      
      const prod = products.find(p => p.id === id);
      if (prod) {
        window.showToast(added ? "Saved to Wishlist" : "Removed", added ? `${prod.name} added to wishlist.` : `${prod.name} removed from wishlist.`, added ? "success" : "info");
      }
      return;
    }

    // Add to Cart btn inside product cards
    const addCartBtn = e.target.closest('.add-to-cart-btn-quick');
    if (addCartBtn) {
      e.stopPropagation();
      const id = parseInt(addCartBtn.getAttribute('data-id'));
      const prod = products.find(p => p.id === id);
      const res = AppState.addToCart(id, 1);
      if (res.success) {
        if (prod) {
          window.showToast("Added to Cart!", `${prod.name} added to your shopping cart.`, "success");
        }
      } else {
        window.showToast("Limit Reached", res.error, "error");
      }
      return;
    }
  });

  // 12. Newsletter Form Submission Simulation
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMsg = document.getElementById('newsletter-message');
  if (newsletterForm && newsletterMsg) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      const email = emailInput.value.trim();

      if (email) {
        newsletterMsg.textContent = "Thank you! You are subscribed to NovaTech briefings.";
        newsletterMsg.className = "newsletter-message success";
        newsletterMsg.classList.remove('hidden');
        emailInput.value = "";

        setTimeout(() => newsletterMsg.classList.add('hidden'), 5000);
      }
    });
  }
});

// Helper: Setup live search queries
function setupGlobalSearch(inputId, resultsId, clearId, isMobile = false) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const results = resultsId ? document.getElementById(resultsId) : null;
  const clear = clearId ? document.getElementById(clearId) : null;

  if (clear) {
    clear.addEventListener('click', () => {
      input.value = "";
      clear.classList.add('hidden');
      if (results) {
        results.innerHTML = "";
        results.classList.add('hidden');
      }
    });
  }

  input.addEventListener('input', () => {
    const val = input.value.trim().toLowerCase();
    
    if (clear) {
      if (val) clear.classList.remove('hidden');
      else clear.classList.add('hidden');
    }

    if (isMobile) return; // Mobile search doesn't show instant dropdown to fit screen

    if (!results) return;

    if (!val) {
      results.innerHTML = "";
      results.classList.add('hidden');
      return;
    }

    const matches = products.filter(p => p.name.toLowerCase().includes(val) || p.brand.toLowerCase().includes(val)).slice(0, 5);

    if (matches.length === 0) {
      results.innerHTML = `<div class="search-dropdown-empty">No results found for "${input.value}"</div>`;
    } else {
      results.innerHTML = matches.map(p => `
        <div class="search-dropdown-item search-result-click" data-id="${p.id}">
          <div class="search-dropdown-img">
            ${p.imageSvg}
          </div>
          <div class="search-dropdown-info">
            <p class="search-dropdown-name">${p.name}</p>
            <p class="search-dropdown-price">$${p.price.toFixed(2)}</p>
          </div>
        </div>
      `).join('');
    }

    results.classList.remove('hidden');

    // Attach click listeners on live results
    const clickItems = results.querySelectorAll('.search-result-click');
    clickItems.forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        input.value = "";
        if (clear) clear.classList.add('hidden');
        results.classList.add('hidden');
        Router.navigate(`/product/${id}`);
      });
    });
  });

  // Handle enter key to redirect to shop page with search query
  input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
      const val = input.value.trim();
      if (val) {
        input.value = "";
        if (clear) clear.classList.add('hidden');
        if (results) results.classList.add('hidden');
        Router.navigate(`/shop?search=${encodeURIComponent(val)}`);
      }
    }
  });

  // Hide search dropdown if clicked outside
  if (results) {
    document.addEventListener('click', (e) => {
      if (!results.classList.contains('hidden') && !input.contains(e.target) && !results.contains(e.target)) {
        results.classList.add('hidden');
      }
    });
  }
}

// Sync cart counters, wishlist badge indicators, profile text
function syncGlobalElements() {
  const totals = AppState.getCartTotals();
  const wishCountVal = AppState.getWishlistItems().length;

  // Cart counts
  const cartBadge = document.getElementById('cart-count');
  const mobCartCount = document.getElementById('mobile-cart-count');
  if (cartBadge) cartBadge.textContent = totals.itemCount;
  if (mobCartCount) mobCartCount.textContent = totals.itemCount;

  // Wishlist counts
  const wishBadge = document.getElementById('wishlist-count');
  const mobWishCount = document.getElementById('mobile-wishlist-count');
  if (wishBadge) wishBadge.textContent = wishCountVal;
  if (mobWishCount) mobWishCount.textContent = wishCountVal;

  // Profile Header Sync
  const nameEl = document.getElementById('dropdown-user-name');
  const emailEl = document.getElementById('dropdown-user-email');
  const dropdownAuthBtn = document.getElementById('dropdown-auth-btn');

  if (AppState.isAuthenticated()) {
    const profile = AppState.getUserProfile() || {};
    if (nameEl) nameEl.textContent = profile.name || "Logged In User";
    if (emailEl) emailEl.textContent = profile.email || "Active Session";
    if (dropdownAuthBtn) {
      dropdownAuthBtn.innerHTML = '<i data-lucide="log-out"></i> Logout';
      dropdownAuthBtn.className = "dropdown-item logout-btn";
    }
  } else {
    if (nameEl) nameEl.textContent = "Guest User";
    if (emailEl) emailEl.textContent = "Sign in to your account";
    if (dropdownAuthBtn) {
      dropdownAuthBtn.innerHTML = '<i data-lucide="log-in"></i> Login';
      dropdownAuthBtn.className = "dropdown-item";
    }
  }

  // Sync theme icon displays in toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const darkIcon = themeToggle.querySelector('.theme-icon-dark');
    const lightIcon = themeToggle.querySelector('.theme-icon-light');
    if (AppState.data.theme === "dark") {
      darkIcon.classList.add('hidden');
      lightIcon.classList.remove('hidden');
    } else {
      lightIcon.classList.add('hidden');
      darkIcon.classList.remove('hidden');
    }
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
