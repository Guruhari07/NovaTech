/* ==========================================================================
   NovaTech Hash-Based SPA Router
   ========================================================================== */

import { AppState } from './state.js';

// Import Page Renderers
import { renderHome } from './pages/home.js';
import { renderShop } from './pages/shop.js';
import { renderProductDetails } from './pages/product-details.js';
import { renderWishlist } from './pages/wishlist.js';
import { renderCart } from './pages/cart.js';
import { renderCheckout } from './pages/checkout.js';
import { renderAuth } from './pages/auth.js';
import { renderAccount } from './pages/account.js';
import { renderOrderSuccess } from './pages/order-success.js';
import { renderNotFound } from './pages/not-found.js';

// Static / Informational views rendered directly
const renderAbout = (container) => {
  container.innerHTML = `
    <div class="fade-in" style="max-width: 800px; margin: 2rem auto; display: flex; flex-direction: column; gap: 2rem;">
      <h1 class="auth-title" style="font-size: 2.5rem; text-align: left;">Engineering Premium Essentials.</h1>
      <p class="hero-description">Founded in 2026, NovaTech set out to re-imagine the relationship between creators, their workspaces, and the tools they rely on. Inspired by high-precision machinery and minimalist product aesthetics, we engineer premium desk accessories that elevate productivity and design.</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem;">
        <div>
          <h3 class="footer-title" style="margin-bottom: 0.5rem;">Pure Materials</h3>
          <p class="footer-desc" style="font-size: 0.875rem;">We build our products out of anodized aerospace aluminium, high-strength carbon composites, and medical-grade silicone. Built to last a lifetime.</p>
        </div>
        <div>
          <h3 class="footer-title" style="margin-bottom: 0.5rem;">Aesthetic Integrity</h3>
          <p class="footer-desc" style="font-size: 0.875rem;">Every port placement, LED indicator, and click weight is calibrated to eliminate distraction. Form serves function, absolutely.</p>
        </div>
      </div>
      
      <div class="special-offer-banner" style="padding: 2.5rem; grid-template-columns: 1fr; margin-top: 1rem; border-radius: var(--radius-md);">
        <div class="offer-content" style="align-items: center; text-align: center; margin: 0 auto; max-width: 500px;">
          <h2 class="offer-title" style="font-size: 1.75rem;">Join Our Mission</h2>
          <p class="offer-desc" style="font-size: 0.9rem;">We are a small, dedicated team based in San Francisco, California. We design and ship accessories to creative professionals globally.</p>
          <a href="#/shop" class="btn btn-primary" style="margin-top: 1rem;">Browse Collection</a>
        </div>
      </div>
    </div>
  `;
};

const renderContact = (container) => {
  container.innerHTML = `
    <div class="fade-in" style="max-width: 600px; margin: 2rem auto;">
      <div class="auth-header">
        <h1 class="auth-title">Get in Touch</h1>
        <p class="auth-subtitle">Have a question about your order or our materials? We'd love to help.</p>
      </div>
      
      <form id="contact-form" style="display: flex; flex-direction: column; gap: 1.25rem; margin-top: 2rem;">
        <div class="form-group">
          <label class="form-label" for="contact-name">Full Name</label>
          <input type="text" id="contact-name" class="form-input" placeholder="e.g. Sarah Jenkins" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="contact-email">Email Address</label>
          <input type="email" id="contact-email" class="form-input" placeholder="e.g. sarah@example.com" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="contact-msg">Your Message</label>
          <textarea id="contact-msg" class="form-input" rows="5" placeholder="Tell us how we can help..." style="resize: vertical; font-family: inherit;" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; height: 46px;">Send Message</button>
      </form>
    </div>
  `;

  // Handle contact form submit simulation
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Show dynamic toast notification using window function
      if (window.showToast) {
        window.showToast("Message Sent!", "Thank you for reaching out. A support rep will respond in 24 hours.", "success");
      }
      form.reset();
    });
  }
};

const routes = [
  { path: /^\/$/, render: renderHome, title: "Home" },
  { path: /^\/shop$/, render: renderShop, title: "Shop Collection" },
  { path: /^\/product\/([\w-]+)$/, render: renderProductDetails, title: "Product Details" },
  { path: /^\/wishlist$/, render: renderWishlist, title: "My Wishlist" },
  { path: /^\/cart$/, render: renderCart, title: "Shopping Cart" },
  { path: /^\/checkout$/, render: renderCheckout, title: "Secure Checkout", protected: true },
  { path: /^\/login$/, render: (c, params) => renderAuth(c, 'login', params), title: "Login" },
  { path: /^\/signup$/, render: (c, params) => renderAuth(c, 'signup', params), title: "Signup" },
  { path: /^\/account$/, render: renderAccount, title: "My Account", protected: true },
  { path: /^\/order-success\/([\w-]+)$/, render: renderOrderSuccess, title: "Order Completed" },
  { path: /^\/about$/, render: renderAbout, title: "About Us" },
  { path: /^\/contact$/, render: renderContact, title: "Contact Us" }
];

export const Router = {
  appContainer: null,
  breadcrumbsContainer: null,
  breadcrumbCurrent: null,

  init(containerId) {
    this.appContainer = document.getElementById(containerId);
    this.breadcrumbsContainer = document.getElementById('breadcrumb-container');
    this.breadcrumbCurrent = document.getElementById('breadcrumb-current');

    // Attach listeners
    window.addEventListener('hashchange', () => this.handleRouting());
    window.addEventListener('load', () => this.handleRouting());
  },

  navigate(hashPath) {
    window.location.hash = hashPath;
  },

  handleRouting() {
    let hash = window.location.hash || '#/';
    // Strip hash character
    let path = hash.substring(1);
    
    // Parse query params if any
    const queryIndex = path.indexOf('?');
    let queryParams = {};
    if (queryIndex !== -1) {
      const queryString = path.substring(queryIndex + 1);
      path = path.substring(0, queryIndex);
      queryParams = Object.fromEntries(new URLSearchParams(queryString));
    }

    // Match path against regex configurations
    let matchedRoute = null;
    let pathParams = [];

    for (const route of routes) {
      const match = path.match(route.path);
      if (match) {
        matchedRoute = route;
        pathParams = match.slice(1); // captures grouped params
        break;
      }
    }

    // Hide breadcrumbs on Home view
    if (path === '/') {
      this.breadcrumbsContainer.classList.add('hidden');
    } else {
      this.breadcrumbsContainer.classList.remove('hidden');
    }

    // Handle Mobile Menu Close on route change
    const mobMenu = document.getElementById('mobile-menu');
    const hamBtn = document.getElementById('hamburger-toggle');
    if (mobMenu && !mobMenu.classList.contains('hidden')) {
      mobMenu.classList.add('hidden');
      mobMenu.classList.remove('open');
      if (hamBtn) {
        const openIcon = hamBtn.querySelector('.menu-open-icon');
        const closeIcon = hamBtn.querySelector('.menu-close-icon');
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    }

    // If Route Not Found
    if (!matchedRoute) {
      document.title = "NovaTech | Page Not Found";
      this.updateBreadcrumbs("404 Page");
      renderNotFound(this.appContainer);
      return;
    }

    // Authentication Guard
    if (matchedRoute.protected && !AppState.isAuthenticated()) {
      if (window.showToast) {
        window.showToast("Login Required", "You must be signed in to access this page.", "info");
      }
      // Redirect to login, passing the current page hash as a redirect target
      this.navigate(`/login?redirect=${encodeURIComponent(hash)}`);
      return;
    }

    // If Auth pages and already logged in, redirect to Account
    if ((path === '/login' || path === '/signup') && AppState.isAuthenticated()) {
      this.navigate('/account');
      return;
    }

    // Update Page Meta Title
    document.title = `NovaTech | ${matchedRoute.title}`;

    // Update Breadcrumbs UI
    this.updateBreadcrumbs(matchedRoute.title, path);

    // Update Sticky Header Active Link Highlight
    this.updateNavbarActiveLink(path);

    // Scroll to Top smoothly
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Render skeleton page loader before executing template
    this.appContainer.innerHTML = `
      <div class="skeleton-page-loader">
        <div class="spinner"></div>
      </div>
    `;

    // Render the view with a small delay for premium visual loading feels
    setTimeout(() => {
      try {
        const combinedParams = { pathParams, queryParams };
        matchedRoute.render(this.appContainer, combinedParams);
        
        // Re-trigger Lucide icon instantiation for dynamic content
        if (window.lucide) {
          window.lucide.createIcons();
        }
      } catch (err) {
        console.error("View Rendering Error:", err);
        this.appContainer.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon" style="color: var(--color-error);"><i data-lucide="alert-triangle"></i></div>
            <h2 class="empty-state-title">Rendering Error</h2>
            <p class="empty-state-desc">Something went wrong while attempting to load this page. Please try refreshing.</p>
            <a href="#/" class="btn btn-primary">Return Home</a>
          </div>
        `;
        if (window.lucide) {
          window.lucide.createIcons();
        }
      }
    }, 150);
  },

  updateBreadcrumbs(currentTitle, path) {
    if (!this.breadcrumbCurrent) return;
    this.breadcrumbCurrent.textContent = currentTitle;
  },

  updateNavbarActiveLink(currentPath) {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('data-path');
      if (linkPath && currentPath === linkPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
};
