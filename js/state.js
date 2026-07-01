/* ==========================================================================
   NovaTech Client-Side State Manager (Mock Backend)
   ========================================================================== */

import { products } from './data.js';

// Simple client-side string obfuscation for passwords
function hashPassword(password) {
  return btoa(password).split('').reverse().join('');
}

export const AppState = {
  // Database containers in LocalStorage
  keys: {
    users: "novatech_users",
    currentUser: "novatech_currentUser",
    cart: "novatech_cart",
    wishlist: "novatech_wishlist",
    orders: "novatech_orders",
    theme: "novatech_theme",
    recentlyViewed: "novatech_recentlyViewed"
  },

  // In-memory cache
  data: {
    users: [],
    currentUser: null,
    cart: [],
    wishlist: [],
    orders: [],
    theme: "light",
    recentlyViewed: [],
    activeCoupon: null // transient
  },

  // Initialize state from LocalStorage
  init() {
    this.data.users = this.getStorageItem(this.keys.users, []);
    this.data.currentUser = this.getStorageItem(this.keys.currentUser, null);
    this.data.cart = this.getStorageItem(this.keys.cart, []);
    this.data.wishlist = this.getStorageItem(this.keys.wishlist, []);
    this.data.orders = this.getStorageItem(this.keys.orders, []);
    this.data.theme = this.getStorageItem(this.keys.theme, "light");
    this.data.recentlyViewed = this.getStorageItem(this.keys.recentlyViewed, []);

    // Sync theme to body element immediately
    this.applyTheme(this.data.theme);

    // Dispatch initialized event
    this.emitChange('init');
  },

  // LocalStorage Helpers
  getStorageItem(key, defaultValue) {
    const val = localStorage.getItem(key);
    if (!val) return defaultValue;
    try {
      return JSON.parse(val);
    } catch {
      return defaultValue;
    }
  },

  setStorageItem(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },

  emitChange(eventDetail) {
    const event = new CustomEvent('statechange', { detail: eventDetail });
    window.dispatchEvent(event);
  },

  // AUTHENTICATION
  signup(name, email, password) {
    // Validations
    if (!name || !email || !password) {
      return { success: false, error: "All fields are required." };
    }
    if (password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters long." };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    // Check duplicate
    const exists = this.data.users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: "An account with this email already exists." };
    }

    // Create user
    const newUser = {
      id: "usr_" + Date.now() + Math.random().toString(36).substr(2, 5),
      name,
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
      address: null
    };

    this.data.users.push(newUser);
    this.setStorageItem(this.keys.users, this.data.users);

    // Auto-login after signup
    this.data.currentUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    this.setStorageItem(this.keys.currentUser, this.data.currentUser);

    this.emitChange('auth');
    return { success: true, user: this.data.currentUser };
  },

  login(email, password) {
    if (!email || !password) {
      return { success: false, error: "Email and password are required." };
    }

    const user = this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return { success: false, error: "No account found with this email." };
    }

    const inputHash = hashPassword(password);
    if (user.passwordHash !== inputHash) {
      return { success: false, error: "Incorrect password." };
    }

    this.data.currentUser = { id: user.id, name: user.name, email: user.email };
    this.setStorageItem(this.keys.currentUser, this.data.currentUser);

    // Merge/sync cart if needed or leave as is.
    this.emitChange('auth');
    return { success: true, user: this.data.currentUser };
  },

  logout() {
    this.data.currentUser = null;
    this.setStorageItem(this.keys.currentUser, null);
    this.emitChange('auth');
  },

  isAuthenticated() {
    return this.data.currentUser !== null;
  },

  getUserProfile() {
    if (!this.isAuthenticated()) return null;
    return this.data.users.find(u => u.id === this.data.currentUser.id) || null;
  },

  updateUserProfile(updatedData) {
    if (!this.isAuthenticated()) return { success: false, error: "Not logged in" };

    const userIndex = this.data.users.findIndex(u => u.id === this.data.currentUser.id);
    if (userIndex === -1) return { success: false, error: "User not found" };

    // Update fields
    const user = this.data.users[userIndex];
    if (updatedData.name) user.name = updatedData.name;
    
    if (updatedData.password) {
      if (updatedData.password.length < 8) {
        return { success: false, error: "Password must be at least 8 characters long" };
      }
      user.passwordHash = hashPassword(updatedData.password);
    }

    if (updatedData.address) {
      user.address = { ...user.address, ...updatedData.address };
    }

    this.data.users[userIndex] = user;
    this.setStorageItem(this.keys.users, this.data.users);

    // Sync currentUser name if updated
    if (updatedData.name) {
      this.data.currentUser.name = updatedData.name;
      this.setStorageItem(this.keys.currentUser, this.data.currentUser);
    }

    this.emitChange('auth');
    return { success: true, user };
  },

  // SHOPPING CART OPERATIONS
  getCartItems() {
    return this.data.cart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...product,
        quantity: item.quantity
      };
    }).filter(item => item !== undefined); // purge stale items
  },

  addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return { success: false, error: "Product not found" };
    
    // Check stock
    if (product.stock <= 0) {
      return { success: false, error: "Item is currently out of stock." };
    }

    const cartIndex = this.data.cart.findIndex(item => item.productId === productId);
    let newQuantity = quantity;

    if (cartIndex > -1) {
      newQuantity = this.data.cart[cartIndex].quantity + quantity;
      if (newQuantity > product.stock) {
        this.data.cart[cartIndex].quantity = product.stock;
        this.setStorageItem(this.keys.cart, this.data.cart);
        this.emitChange('cart');
        return { success: false, error: `Only ${product.stock} items available in stock.` };
      }
      this.data.cart[cartIndex].quantity = newQuantity;
    } else {
      if (quantity > product.stock) {
        return { success: false, error: `Only ${product.stock} items available in stock.` };
      }
      this.data.cart.push({ productId, quantity });
    }

    this.setStorageItem(this.keys.cart, this.data.cart);
    this.emitChange('cart');
    return { success: true };
  },

  updateCartQty(productId, qty) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (qty <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const cartIndex = this.data.cart.findIndex(item => item.productId === productId);
    if (cartIndex > -1) {
      if (qty > product.stock) {
        this.data.cart[cartIndex].quantity = product.stock;
        this.setStorageItem(this.keys.cart, this.data.cart);
        this.emitChange('cart');
        return { success: false, error: `Only ${product.stock} items in stock.` };
      }
      this.data.cart[cartIndex].quantity = qty;
      this.setStorageItem(this.keys.cart, this.data.cart);
      this.emitChange('cart');
    }
    return { success: true };
  },

  removeFromCart(productId) {
    this.data.cart = this.data.cart.filter(item => item.productId !== productId);
    this.setStorageItem(this.keys.cart, this.data.cart);
    this.emitChange('cart');
  },

  clearCart() {
    this.data.cart = [];
    this.setStorageItem(this.keys.cart, []);
    this.data.activeCoupon = null;
    this.emitChange('cart');
  },

  applyCoupon(code) {
    const normalized = code.toUpperCase().trim();
    if (normalized === "NOVATECH10") {
      this.data.activeCoupon = { code: "NOVATECH10", discountPercent: 10 };
      this.emitChange('cart');
      return { success: true, discountPercent: 10 };
    }
    return { success: false, error: "Invalid coupon code." };
  },

  getCartTotals() {
    const items = this.getCartItems();
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Coupon Discount
    let discount = 0;
    if (this.data.activeCoupon) {
      discount = subtotal * (this.data.activeCoupon.discountPercent / 100);
    }
    
    const discountedSubtotal = subtotal - discount;
    const shipping = discountedSubtotal > 75 || discountedSubtotal === 0 ? 0.00 : 5.99;
    const tax = discountedSubtotal * 0.08; // 8% tax rate
    const grandTotal = discountedSubtotal + shipping + tax;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      grandTotal: parseFloat(grandTotal.toFixed(2)),
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
    };
  },

  // WISHLIST OPERATIONS
  getWishlistItems() {
    return this.data.wishlist.map(id => products.find(p => p.id === id)).filter(p => p !== undefined);
  },

  toggleWishlist(productId) {
    const idx = this.data.wishlist.indexOf(productId);
    let added = false;
    if (idx > -1) {
      this.data.wishlist.splice(idx, 1);
    } else {
      this.data.wishlist.push(productId);
      added = true;
    }
    this.setStorageItem(this.keys.wishlist, this.data.wishlist);
    this.emitChange('wishlist');
    return added;
  },

  isInWishlist(productId) {
    return this.data.wishlist.includes(productId);
  },

  moveWishlistToCart(productId) {
    const res = this.addToCart(productId, 1);
    if (res.success) {
      // Remove from wishlist
      this.data.wishlist = this.data.wishlist.filter(id => id !== productId);
      this.setStorageItem(this.keys.wishlist, this.data.wishlist);
      this.emitChange('wishlist');
    }
    return res;
  },

  // ORDER MANAGEMENT
  getUserOrders() {
    if (!this.isAuthenticated()) return [];
    return this.data.orders.filter(o => o.userId === this.data.currentUser.id);
  },

  placeOrder(shippingAddress, paymentMethod) {
    if (!this.isAuthenticated()) {
      return { success: false, error: "Please log in to check out." };
    }
    
    const cartItems = this.getCartItems();
    if (cartItems.length === 0) {
      return { success: false, error: "Your shopping cart is empty." };
    }

    const totals = this.getCartTotals();
    
    // Deduct stocks
    cartItems.forEach(item => {
      const prod = products.find(p => p.id === item.id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });
    // Normally we'd write products back, but products are in-memory javascript arrays in data.js.
    // That's acceptable for a client-only runtime mockup.

    const orderId = "NT-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderId,
      userId: this.data.currentUser.id,
      date: new Date().toISOString(),
      items: cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        brand: item.brand
      })),
      totals,
      shippingAddress,
      paymentMethod
    };

    this.data.orders.push(newOrder);
    this.setStorageItem(this.keys.orders, this.data.orders);

    // Save/Update address in user profile
    this.updateUserProfile({ address: shippingAddress });

    // Clear cart
    this.clearCart();
    
    this.emitChange('orders');
    return { success: true, orderId };
  },

  // THEME MANAGEMENT
  setTheme(theme) {
    this.data.theme = theme;
    this.setStorageItem(this.keys.theme, theme);
    this.applyTheme(theme);
    this.emitChange('theme');
  },

  toggleTheme() {
    const newTheme = this.data.theme === "light" ? "dark" : "light";
    this.setTheme(newTheme);
    return newTheme;
  },

  applyTheme(theme) {
    const body = document.body;
    if (theme === "dark") {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
    }
  },

  // RECENTLY VIEWED PRODUCTS
  getRecentlyViewed() {
    return this.data.recentlyViewed.map(id => products.find(p => p.id === id)).filter(p => p !== undefined);
  },

  addRecentlyViewed(productId) {
    // Remove if already exists to push to front
    this.data.recentlyViewed = this.data.recentlyViewed.filter(id => id !== productId);
    this.data.recentlyViewed.unshift(productId);
    
    // Cap at 4 items for layout fitting
    if (this.data.recentlyViewed.length > 4) {
      this.data.recentlyViewed.pop();
    }
    
    this.setStorageItem(this.keys.recentlyViewed, this.data.recentlyViewed);
    this.emitChange('recentlyViewed');
  }
};
