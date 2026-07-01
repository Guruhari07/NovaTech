/* ==========================================================================
   NovaTech Test Verification Runner Logic
   ========================================================================== */

import { AppState } from './state.js';
import { products } from './data.js';

// Setup click handler
document.addEventListener('DOMContentLoaded', () => {
  const runBtn = document.getElementById('run-tests-btn');
  if (runBtn) {
    runBtn.addEventListener('click', runAllTests);
  }
});

async function runAllTests() {
  const summaryBox = document.getElementById('test-summary');
  summaryBox.style.backgroundColor = "#eff6ff";
  summaryBox.style.color = "#1e3a8a";
  summaryBox.style.borderColor = "#bfdbfe";
  summaryBox.textContent = "Running test scripts...";

  // Clear local storage test fixtures to ensure clean runs
  localStorage.clear();
  
  let passedCount = 0;
  const totalTests = 7;

  // Test 1: State Init
  const t1 = testStateInit();
  updateRowStatus('test-state-init', t1.pass, t1.error);
  if (t1.pass) passedCount++;

  // Test 2: Registration
  const t2 = testUserRegistration();
  updateRowStatus('test-user-registration', t2.pass, t2.error);
  if (t2.pass) passedCount++;

  // Test 3: Login
  const t3 = testUserLogin();
  updateRowStatus('test-user-login', t3.pass, t3.error);
  if (t3.pass) passedCount++;

  // Test 4: Cart
  const t4 = testCartOperations();
  updateRowStatus('test-cart-operations', t4.pass, t4.error);
  if (t4.pass) passedCount++;

  // Test 5: Coupon Codes
  const t5 = testCouponCode();
  updateRowStatus('test-coupon-code', t5.pass, t5.error);
  if (t5.pass) passedCount++;

  // Test 6: Wishlist
  const t6 = testWishlistToggle();
  updateRowStatus('test-wishlist-toggle', t6.pass, t6.error);
  if (t6.pass) passedCount++;

  // Test 7: Checkout
  const t7 = testCheckoutPlacement();
  updateRowStatus('test-checkout-placement', t7.pass, t7.error);
  if (t7.pass) passedCount++;

  // Render final summary
  if (passedCount === totalTests) {
    summaryBox.style.backgroundColor = "#d1fae5";
    summaryBox.style.color = "#065f46";
    summaryBox.style.borderColor = "#a7f3d0";
    summaryBox.textContent = `Success! All ${passedCount} of ${totalTests} test cases passed.`;
  } else {
    summaryBox.style.backgroundColor = "#fee2e2";
    summaryBox.style.color = "#991b1b";
    summaryBox.style.borderColor = "#fca5a5";
    summaryBox.textContent = `Failed: Only ${passedCount} of ${totalTests} tests passed. See console for error details.`;
  }
}

function updateRowStatus(rowId, passed, errorMsg = "") {
  const row = document.getElementById(rowId);
  if (!row) return;

  const statusBadge = row.querySelector('.test-status');
  if (passed) {
    statusBadge.textContent = "Pass";
    statusBadge.className = "test-status status-pass";
  } else {
    statusBadge.textContent = "Fail";
    statusBadge.className = "test-status status-fail";
    console.error(`Test [${rowId}] failed: ${errorMsg}`);
  }
}

// --------------------------------------------------------------------------
// TEST CASE FUNCTIONS
// --------------------------------------------------------------------------

function testStateInit() {
  try {
    AppState.init();
    
    // Verify default parameters
    if (Array.isArray(AppState.data.users) && 
        AppState.data.currentUser === null && 
        Array.isArray(AppState.data.cart) &&
        Array.isArray(AppState.data.wishlist)) {
      return { pass: true };
    }
    return { pass: false, error: "Initial state structures are invalid." };
  } catch (err) {
    return { pass: false, error: err.message };
  }
}

function testUserRegistration() {
  try {
    // 1. Valid registration
    const reg = AppState.signup("Tester", "tester@test.com", "password123");
    if (!reg.success) {
      return { pass: false, error: `Signup failed: ${reg.error}` };
    }

    // Check saved database
    const savedUsers = JSON.parse(localStorage.getItem('novatech_users') || "[]");
    const match = savedUsers.find(u => u.email === "tester@test.com");
    if (!match) {
      return { pass: false, error: "Registered user was not saved in LocalStorage." };
    }
    if (match.passwordHash === "password123") {
      return { pass: false, error: "Password stored in plain text (should be obfuscated)." };
    }

    // 2. Prevent duplicate email registration check
    const dup = AppState.signup("Tester Dup", "tester@test.com", "pass5678");
    if (dup.success) {
      return { pass: false, error: "Allowed duplicate registration on identical email address." };
    }

    return { pass: true };
  } catch (err) {
    return { pass: false, error: err.message };
  }
}

function testUserLogin() {
  try {
    AppState.logout();
    if (AppState.isAuthenticated()) {
      return { pass: false, error: "Logout failed to clear active user session." };
    }

    // 1. Incorrect password login check
    const badLogin = AppState.login("tester@test.com", "wrongpass");
    if (badLogin.success) {
      return { pass: false, error: "Logged in successfully despite incorrect password." };
    }

    // 2. Correct password login check
    const goodLogin = AppState.login("tester@test.com", "password123");
    if (!goodLogin.success) {
      return { pass: false, error: `Correct password login failed: ${goodLogin.error}` };
    }
    if (!AppState.isAuthenticated() || AppState.data.currentUser.email !== "tester@test.com") {
      return { pass: false, error: "Session variables mismatch after login." };
    }

    return { pass: true };
  } catch (err) {
    return { pass: false, error: err.message };
  }
}

function testCartOperations() {
  try {
    AppState.clearCart();
    
    // 1. Add product 1 (stock = 12)
    const add1 = AppState.addToCart(1, 2);
    if (!add1.success) {
      return { pass: false, error: `Adding product to cart failed: ${add1.error}` };
    }
    let cartItems = AppState.getCartItems();
    if (cartItems.length !== 1 || cartItems[0].quantity !== 2) {
      return { pass: false, error: "Item count or quantity mismatch in cart." };
    }

    // 2. Update quantity to 5
    const update1 = AppState.updateCartQty(1, 5);
    if (!update1.success) {
      return { pass: false, error: `Quantity increment failed: ${update1.error}` };
    }
    cartItems = AppState.getCartItems();
    if (cartItems[0].quantity !== 5) {
      return { pass: false, error: "Cart update quantity was not written." };
    }

    // 3. Exceeding stock check (stock is 12, trying to add 10 more, total 15)
    const exceed = AppState.addToCart(1, 10);
    if (exceed.success) {
      return { pass: false, error: "Allowed adding more quantity than available in stock." };
    }

    // 4. Remove item
    AppState.removeFromCart(1);
    cartItems = AppState.getCartItems();
    if (cartItems.length !== 0) {
      return { pass: false, error: "Removing item failed to empty cart." };
    }

    return { pass: true };
  } catch (err) {
    return { pass: false, error: err.message };
  }
}

function testCouponCode() {
  try {
    AppState.clearCart();
    // Add product 2 (ApexType Carbon keyboard, price = 129.99)
    AppState.addToCart(2, 1);

    // 1. Invalid coupon test
    const badCoupon = AppState.applyCoupon("WRONGCODE");
    if (badCoupon.success) {
      return { pass: false, error: "Accepted an invalid promo discount coupon code." };
    }

    // 2. Valid coupon test (NOVATECH10)
    const goodCoupon = AppState.applyCoupon("NOVATECH10");
    if (!goodCoupon.success) {
      return { pass: false, error: `Failed to apply valid coupon: ${goodCoupon.error}` };
    }
    const totals = AppState.getCartTotals();
    // Expected discount is 10% of 129.99 = 13.00
    if (totals.discount !== 13.00) {
      return { pass: false, error: `Discount calculation mismatch: Expected $13.00, got $${totals.discount}` };
    }

    return { pass: true };
  } catch (err) {
    return { pass: false, error: err.message };
  }
}

function testWishlistToggle() {
  try {
    // Clear wishlist
    localStorage.removeItem('novatech_wishlist');
    AppState.data.wishlist = [];

    // 1. Add product 3
    const added = AppState.toggleWishlist(3);
    if (!added || !AppState.isInWishlist(3)) {
      return { pass: false, error: "Wishlist toggle failed to add item." };
    }
    let list = AppState.getWishlistItems();
    if (list.length !== 1 || list[0].id !== 3) {
      return { pass: false, error: "Saved item was not found in wishlist array query." };
    }

    // 2. Remove product 3
    const removed = AppState.toggleWishlist(3);
    if (removed || AppState.isInWishlist(3)) {
      return { pass: false, error: "Wishlist toggle failed to remove item on second click." };
    }

    return { pass: true };
  } catch (err) {
    return { pass: false, error: err.message };
  }
}

function testCheckoutPlacement() {
  try {
    AppState.clearCart();
    // Re-verify logged in
    if (!AppState.isAuthenticated()) {
      AppState.login("tester@test.com", "password123");
    }

    // Add product 2 (ApexType Carbon keyboard, price = 129.99, stock = 5)
    AppState.addToCart(2, 1);
    
    // shipping address details
    const shipping = {
      name: "Tester",
      phone: "+1 (555) 019-2834",
      street: "123 Test Ave",
      city: "San Francisco",
      state: "CA",
      zip: "94107"
    };

    // Place order
    const originalStock = products.find(p => p.id === 2).stock;
    const checkout = AppState.placeOrder(shipping, "Credit Card");
    if (!checkout.success) {
      return { pass: false, error: `Checkout placement failed: ${checkout.error}` };
    }

    // 1. Verify Cart Cleared
    if (AppState.getCartItems().length !== 0) {
      return { pass: false, error: "Checkout failed to empty active shopping cart." };
    }

    // 2. Verify Order Saved in history
    const orders = AppState.getUserOrders();
    const orderMatch = orders.find(o => o.orderId === checkout.orderId);
    if (!orderMatch) {
      return { pass: false, error: "Order details not saved to user account history." };
    }
    if (orderMatch.totals.grandTotal <= 0) {
      return { pass: false, error: "Order calculation saved zero totals." };
    }

    // 3. Verify Stock Deducted (was 5, should be 4)
    const newStock = products.find(p => p.id === 2).stock;
    if (newStock !== originalStock - 1) {
      return { pass: false, error: `Stock deduction failed: Original was ${originalStock}, new is ${newStock}` };
    }

    return { pass: true };
  } catch (err) {
    return { pass: false, error: err.message };
  }
}
