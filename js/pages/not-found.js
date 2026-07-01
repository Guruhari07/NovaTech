/* ==========================================================================
   NovaTech 404 Not Found Page View Renderer
   ========================================================================== */

export const renderNotFound = (container) => {
  container.innerHTML = `
    <div class="empty-state fade-in" style="margin: 4rem auto; max-width: 500px; display: flex; flex-direction: column; gap: 1.5rem; align-items: center; text-align: center;">
      <!-- Minimalist Graphic -->
      <div style="font-family: var(--font-heading); font-size: 6rem; font-weight: 800; color: var(--color-primary-light); line-height: 1; letter-spacing: -0.05em; position: relative;">
        404
        <div style="font-size: 1rem; font-weight: 700; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.5rem;">Workspace Out of Bounds</div>
      </div>
      
      <p class="empty-state-desc" style="font-size: 0.95rem; line-height: 1.6;">The coordinates you entered do not map to any tech accessories in our catalog. Let's redirect you back to base.</p>
      
      <div style="display: flex; gap: 1rem; width: 100%; justify-content: center; margin-top: 1rem;">
        <a href="#/" class="btn btn-primary" style="height: 42px;">Return Home</a>
        <a href="#/shop" class="btn btn-outline" style="height: 42px;">Browse Catalog</a>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
};
