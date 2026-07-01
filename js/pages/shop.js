/* ==========================================================================
   NovaTech Shop Page View Renderer with Filtering & Sorting
   ========================================================================== */

import { products } from '../data.js';
import { AppState } from '../state.js';
import { getProductCardHtml } from './home.js';

// Local transient filter state (resets on load, or takes query params)
let filterState = {
  search: "",
  categories: [],
  maxPrice: 150,
  minRating: 0,
  sortBy: "popularity", // popularity (by rating), price-low, price-high, newest
  currentPage: 1
};

const ITEMS_PER_PAGE = 6;

export const renderShop = (container, params = {}) => {
  const queryParams = params.queryParams || {};

  // Check URL query parameters to prepopulate filter state (useful for footer/navbar links)
  if (queryParams.category) {
    filterState.categories = [queryParams.category.toLowerCase()];
    filterState.currentPage = 1;
  } else if (!queryParams.category && Object.keys(queryParams).length > 0 && queryParams.reset) {
    // Reset filters
    filterState.categories = [];
    filterState.maxPrice = 150;
    filterState.minRating = 0;
    filterState.search = "";
    filterState.sortBy = "popularity";
    filterState.currentPage = 1;
  }

  // Prepopulate search if query parameter exists
  if (queryParams.search) {
    filterState.search = queryParams.search;
    filterState.currentPage = 1;
  }

  const renderView = () => {
    // 1. Filter products
    let filtered = products.filter(product => {
      // Category Filter
      if (filterState.categories.length > 0 && !filterState.categories.includes(product.category.toLowerCase())) {
        return false;
      }
      // Price Filter
      if (product.price > filterState.maxPrice) {
        return false;
      }
      // Rating Filter
      if (product.rating < filterState.minRating) {
        return false;
      }
      // Search Filter
      if (filterState.search) {
        const query = filterState.search.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesDesc) {
          return false;
        }
      }
      return true;
    });

    // 2. Sort products
    if (filterState.sortBy === "popularity") {
      // Sort by rating (highest first), then reviews count
      filtered.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    } else if (filterState.sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filterState.sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filterState.sortBy === "newest") {
      // Sort by product ID (higher is newer)
      filtered.sort((a, b) => b.id - a.id);
    }

    // 3. Pagination bounds
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
    
    // Safety check for currentPage index out of bounds
    if (filterState.currentPage > totalPages) {
      filterState.currentPage = totalPages;
    }
    
    const startIndex = (filterState.currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
    const paginatedProducts = filtered.slice(startIndex, endIndex);

    // Compute Category counts for filter labels
    const getCategoryCount = (cat) => products.filter(p => p.category === cat).length;

    container.innerHTML = `
      <div class="shop-layout fade-in">
        <!-- Sidebar Filters -->
        <aside class="filter-sidebar" id="shop-filter-sidebar">
          <div class="filter-section" style="display: flex; justify-content: space-between; align-items: center; border-bottom: none; padding-bottom: 0;">
            <h3 class="filter-title" style="margin-bottom: 0;">Filters</h3>
            <button id="clear-filters-btn" class="btn-text" style="font-size: 0.75rem; padding: 0;">Reset All</button>
          </div>
          <div class="dropdown-divider"></div>

          <!-- Category Checkboxes -->
          <div class="filter-section">
            <h4 class="filter-title">Categories</h4>
            <div class="filter-list">
              <label class="form-checkbox-label">
                <input type="checkbox" class="category-filter-checkbox form-checkbox" value="input" ${filterState.categories.includes("input") ? "checked" : ""}>
                <span>Inputs & Mounts (${getCategoryCount("input")})</span>
              </label>
              <label class="form-checkbox-label">
                <input type="checkbox" class="category-filter-checkbox form-checkbox" value="audio" ${filterState.categories.includes("audio") ? "checked" : ""}>
                <span>Audio Gear (${getCategoryCount("audio")})</span>
              </label>
              <label class="form-checkbox-label">
                <input type="checkbox" class="category-filter-checkbox form-checkbox" value="power" ${filterState.categories.includes("power") ? "checked" : ""}>
                <span>Charging & Power (${getCategoryCount("power")})</span>
              </label>
              <label class="form-checkbox-label">
                <input type="checkbox" class="category-filter-checkbox form-checkbox" value="storage" ${filterState.categories.includes("storage") ? "checked" : ""}>
                <span>Storage & Smartwear (${getCategoryCount("storage")})</span>
              </label>
            </div>
          </div>

          <!-- Price Slider -->
          <div class="filter-section">
            <h4 class="filter-title">Price Limit</h4>
            <div class="price-slider-container">
              <input type="range" class="range-slider" id="price-range-slider" min="30" max="150" step="5" value="${filterState.maxPrice}">
              <div class="price-range-inputs">
                <span class="text-secondary">$30.00</span>
                <span style="color: var(--color-primary); font-weight: 700;">Up to $${filterState.maxPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <!-- Rating Stars -->
          <div class="filter-section">
            <h4 class="filter-title">Reviews Rating</h4>
            <div class="filter-list">
              <div class="star-filter-btn" data-rating="4.8">
                <input type="radio" name="rating-filter" class="form-checkbox" ${filterState.minRating === 4.8 ? "checked" : ""}>
                <span style="font-size: 0.85rem; font-weight: 500;">4.8 ★ & Above</span>
              </div>
              <div class="star-filter-btn" data-rating="4.7">
                <input type="radio" name="rating-filter" class="form-checkbox" ${filterState.minRating === 4.7 ? "checked" : ""}>
                <span style="font-size: 0.85rem; font-weight: 500;">4.7 ★ & Above</span>
              </div>
              <div class="star-filter-btn" data-rating="4.6">
                <input type="radio" name="rating-filter" class="form-checkbox" ${filterState.minRating === 4.6 ? "checked" : ""}>
                <span style="font-size: 0.85rem; font-weight: 500;">4.6 ★ & Above</span>
              </div>
              <div class="star-filter-btn" data-rating="0">
                <input type="radio" name="rating-filter" class="form-checkbox" ${filterState.minRating === 0 ? "checked" : ""}>
                <span style="font-size: 0.85rem; font-weight: 500;">Show All</span>
              </div>
            </div>
          </div>
          
          <!-- Close Mobile Filters Button -->
          <button id="close-mobile-filters" class="btn btn-secondary mobile-filter-toggle" style="width: 100%; margin-top: 1rem;">Apply Filters</button>
        </aside>

        <!-- Main Products Display -->
        <main class="shop-main">
          <!-- Control Row -->
          <div class="shop-controls">
            <div class="shop-results-count">
              Showing ${totalItems === 0 ? 0 : startIndex + 1}–${endIndex} of ${totalItems} products
            </div>
            
            <div style="display: flex; gap: 0.75rem;">
              <!-- Mobile Filters Button Toggle -->
              <button id="toggle-mobile-filters" class="btn btn-outline mobile-filter-toggle" style="padding: 0.45rem 1rem; font-size: 0.875rem;">
                <i data-lucide="sliders-horizontal" style="width: 16px;"></i> Filters
              </button>
              
              <div class="shop-sorting">
                <label for="sort-select">Sort By</label>
                <select id="sort-select" class="sort-select">
                  <option value="popularity" ${filterState.sortBy === "popularity" ? "selected" : ""}>Popularity</option>
                  <option value="price-low" ${filterState.sortBy === "price-low" ? "selected" : ""}>Price: Low → High</option>
                  <option value="price-high" ${filterState.sortBy === "price-high" ? "selected" : ""}>Price: High → Low</option>
                  <option value="newest" ${filterState.sortBy === "newest" ? "selected" : ""}>Newest Arrivals</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Product Cards Grid -->
          ${paginatedProducts.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon"><i data-lucide="search-slash"></i></div>
              <h3 class="empty-state-title">No Products Found</h3>
              <p class="empty-state-desc">We couldn't find any tech accessories matching your selected criteria. Try resetting filters.</p>
              <button id="reset-empty-filters" class="btn btn-primary">Clear All Filters</button>
            </div>
          ` : `
            <div class="products-grid">
              ${paginatedProducts.map(p => getProductCardHtml(p)).join('')}
            </div>

            <!-- Pagination Row -->
            ${totalPages > 1 ? `
              <div class="pagination-container">
                <button class="page-btn prev-page-btn ${filterState.currentPage === 1 ? 'disabled' : ''}">
                  <i data-lucide="chevron-left" style="width: 16px;"></i>
                </button>
                ${Array.from({ length: totalPages }, (_, i) => i + 1).map(num => `
                  <button class="page-btn num-page-btn ${filterState.currentPage === num ? 'active' : ''}" data-page="${num}">${num}</button>
                `).join('')}
                <button class="page-btn next-page-btn ${filterState.currentPage === totalPages ? 'disabled' : ''}">
                  <i data-lucide="chevron-right" style="width: 16px;"></i>
                </button>
              </div>
            ` : ''}
          `}
        </main>
      </div>
    `;

    // Rebind Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Attach Event Listeners inside rendering
    bindEventListeners();
  };

  const bindEventListeners = () => {
    // 1. Category checklist change
    const checkboxes = container.querySelectorAll('.category-filter-checkbox');
    checkboxes.forEach(box => {
      box.addEventListener('change', () => {
        const val = box.value;
        if (box.checked) {
          filterState.categories.push(val);
        } else {
          filterState.categories = filterState.categories.filter(c => c !== val);
        }
        filterState.currentPage = 1;
        renderView();
      });
    });

    // 2. Price slider input change
    const slider = container.querySelector('#price-range-slider');
    if (slider) {
      slider.addEventListener('input', (e) => {
        filterState.maxPrice = parseFloat(e.target.value);
        filterState.currentPage = 1;
        // Just update price text instantly during dragging
        const rangeText = container.querySelector('.price-range-inputs span:last-child');
        if (rangeText) {
          rangeText.textContent = `Up to $${filterState.maxPrice.toFixed(2)}`;
        }
      });
      // Perform full render only on mouseup/change to conserve draw calls
      slider.addEventListener('change', () => {
        renderView();
      });
    }

    // 3. Radio Ratings Filter
    const starRows = container.querySelectorAll('.star-filter-btn');
    starRows.forEach(row => {
      row.addEventListener('click', () => {
        const rating = parseFloat(row.getAttribute('data-rating'));
        filterState.minRating = rating;
        filterState.currentPage = 1;
        renderView();
      });
    });

    // 4. Sorting select change
    const sortSelect = container.querySelector('#sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        filterState.sortBy = e.target.value;
        renderView();
      });
    }

    // 5. Reset buttons
    const clearBtn = container.querySelector('#clear-filters-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        filterState.categories = [];
        filterState.maxPrice = 150;
        filterState.minRating = 0;
        filterState.search = "";
        filterState.currentPage = 1;
        renderView();
      });
    }
    const resetEmptyBtn = container.querySelector('#reset-empty-filters');
    if (resetEmptyBtn) {
      resetEmptyBtn.addEventListener('click', () => {
        filterState.categories = [];
        filterState.maxPrice = 150;
        filterState.minRating = 0;
        filterState.search = "";
        filterState.currentPage = 1;
        renderView();
      });
    }

    // 6. Pagination Navigation
    const prevBtn = container.querySelector('.prev-page-btn');
    if (prevBtn && filterState.currentPage > 1) {
      prevBtn.addEventListener('click', () => {
        filterState.currentPage--;
        renderView();
      });
    }
    const nextBtn = container.querySelector('.next-page-btn');
    if (nextBtn) {
      const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE); // simplified check
      if (filterState.currentPage < totalPages) {
        nextBtn.addEventListener('click', () => {
          filterState.currentPage++;
          renderView();
        });
      }
    }
    const pageNumBtns = container.querySelectorAll('.num-page-btn');
    pageNumBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterState.currentPage = parseInt(btn.getAttribute('data-page'));
        renderView();
      });
    });

    // 7. Mobile Filter Panel Slide Actions
    const toggleMobileBtn = container.querySelector('#toggle-mobile-filters');
    const closeMobileBtn = container.querySelector('#close-mobile-filters');
    const sidebar = container.querySelector('#shop-filter-sidebar');

    if (toggleMobileBtn && sidebar) {
      toggleMobileBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
      });
    }
    if (closeMobileBtn && sidebar) {
      closeMobileBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
      });
    }
  };

  // Initial draw
  renderView();
};
