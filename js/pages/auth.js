/* ==========================================================================
   NovaTech Authentication Pages View Renderer (Login & Signup)
   ========================================================================== */

import { AppState } from '../state.js';
import { Router } from '../router.js';

export const renderAuth = (container, mode = 'login', params = {}) => {
  // Capture redirect hash if present in query parameters (e.g. ?redirect=#/checkout)
  const redirectTarget = params.queryParams?.redirect 
    ? decodeURIComponent(params.queryParams.redirect) 
    : '#/account';

  const isLogin = mode === 'login';

  container.innerHTML = `
    <div class="auth-container fade-in">
      <div class="auth-header">
        <h1 class="auth-title">${isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p class="auth-subtitle">${isLogin ? 'Sign in to access your premium workspace preferences' : 'Register to save addresses and track accessory order history'}</p>
      </div>

      <!-- General Error Display -->
      <div id="auth-error" class="error-text hidden" style="background-color: #fee2e2; border: 1px solid #fca5a5; padding: 0.75rem 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; color: var(--color-error); font-size: 0.8125rem;"></div>

      <form id="auth-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${!isLogin ? `
          <div class="form-group">
            <label class="form-label" for="auth-name">Full Name</label>
            <input type="text" id="auth-name" class="form-input" placeholder="e.g. Jane Doe" required>
            <span class="error-text hidden" id="err-name"></span>
          </div>
        ` : ''}

        <div class="form-group">
          <label class="form-label" for="auth-email">Email Address</label>
          <input type="email" id="auth-email" class="form-input" placeholder="jane@example.com" required>
          <span class="error-text hidden" id="err-email"></span>
        </div>

        <div class="form-group">
          <label class="form-label" for="auth-password">Password</label>
          <input type="password" id="auth-password" class="form-input" placeholder="Min. 8 characters" required>
          <span class="error-text hidden" id="err-password"></span>
        </div>

        ${!isLogin ? `
          <div class="form-group">
            <label class="form-label" for="auth-confirm-password">Confirm Password</label>
            <input type="password" id="auth-confirm-password" class="form-input" placeholder="Re-enter password" required>
            <span class="error-text hidden" id="err-confirm"></span>
          </div>
        ` : ''}

        ${isLogin ? `
          <div class="form-checkbox-label" style="justify-content: flex-start; margin-top: -0.25rem;">
            <input type="checkbox" id="auth-remember" class="form-checkbox" checked>
            <span>Keep me logged in</span>
          </div>
        ` : ''}

        <button type="submit" class="btn btn-primary" style="width: 100%; height: 46px; margin-top: 0.5rem;">
          ${isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div class="auth-footer">
        ${isLogin 
          ? `Don't have a workspace account? <a href="#/signup?redirect=${encodeURIComponent(redirectTarget)}" class="btn-text" style="padding:0; font-weight:700;">Sign Up</a>` 
          : `Already registered with NovaTech? <a href="#/login?redirect=${encodeURIComponent(redirectTarget)}" class="btn-text" style="padding:0; font-weight:700;">Sign In</a>`
        }
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Bind Listeners
  bindEventListeners(container, isLogin, redirectTarget);
};

const bindEventListeners = (container, isLogin, redirectTarget) => {
  const form = container.querySelector('#auth-form');
  const errorBox = container.querySelector('#auth-error');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous error messages
      errorBox.classList.add('hidden');
      errorBox.textContent = "";
      
      const email = container.querySelector('#auth-email').value.trim();
      const password = container.querySelector('#auth-password').value;

      // 1. Handle Login logic
      if (isLogin) {
        const result = AppState.login(email, password);
        if (result.success) {
          if (window.showToast) {
            window.showToast("Signed In", `Welcome back, ${result.user.name}!`, "success");
          }
          // Redirect to destination
          window.location.hash = redirectTarget;
        } else {
          errorBox.textContent = result.error;
          errorBox.classList.remove('hidden');
        }
      } 
      // 2. Handle Signup logic
      else {
        const name = container.querySelector('#auth-name').value.trim();
        const confirmPass = container.querySelector('#auth-confirm-password').value;

        // Client-side quick checks before hitting State
        if (password !== confirmPass) {
          errorBox.textContent = "Passwords do not match. Please try again.";
          errorBox.classList.remove('hidden');
          return;
        }

        const result = AppState.signup(name, email, password);
        if (result.success) {
          if (window.showToast) {
            window.showToast("Account Created!", `Welcome to NovaTech, ${result.user.name}!`, "success");
          }
          // Redirect
          window.location.hash = redirectTarget;
        } else {
          errorBox.textContent = result.error;
          errorBox.classList.remove('hidden');
        }
      }
    });
  }
};
