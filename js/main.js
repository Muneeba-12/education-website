/**
 * EDUCATOR - GLOBAL MAIN JAVASCRIPT
 * Handles navigation, mobile drawer, search modal, stats counters, testimonials, wishlist, toasts, and shared utilities.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initSearchModal();
  initStatsCounter();
  initTestimonialsSlider();
  initWishlist();
  initBackToTop();
  initNewsletter();
});

/* ==========================================================================
   1. STICKY HEADER
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const closeBtn = document.querySelector('.drawer-close-btn');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Close drawer on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. GLOBAL SEARCH MODAL
   ========================================================================== */
function initSearchModal() {
  const searchTriggers = document.querySelectorAll('.search-trigger-btn');
  let searchModal = document.getElementById('global-search-modal');

  if (!searchModal) {
    // Inject global search modal dynamically if not already in markup
    searchModal = document.createElement('div');
    searchModal.id = 'global-search-modal';
    searchModal.className = 'modal-overlay';
    searchModal.innerHTML = `
      <div class="modal-dialog" style="max-width: 600px; padding: 2rem;">
        <button class="modal-close-btn" aria-label="Close search">&times;</button>
        <h3 style="margin-bottom: 1.25rem;">Search Educator</h3>
        <div style="position: relative; margin-bottom: 1.5rem;">
          <input type="text" id="global-search-input" placeholder="Search courses, instructors, topics..." 
                 class="form-input" style="padding-left: 2.75rem; font-size: 1.1rem; height: 52px;" autofocus>
          <svg style="position: absolute; left: 1rem; top: 16px; width: 20px; height: 20px; color: var(--text-light);" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <div class="search-quick-tags" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
          <span style="font-size: 0.85rem; color: var(--text-muted); align-self: center;">Popular:</span>
          <a href="courses.html?cat=web" class="category-pill" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">Web Development</a>
          <a href="courses.html?cat=python" class="category-pill" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">Python</a>
          <a href="courses.html?cat=uiux" class="category-pill" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">UI/UX Design</a>
          <a href="courses.html?cat=data" class="category-pill" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">Data Science</a>
        </div>
        <div id="search-modal-results" style="max-height: 240px; overflow-y: auto;">
          <p style="font-size: 0.9rem; color: var(--text-muted); text-align: center; padding: 1rem 0;">Type to search over 150+ verified courses...</p>
        </div>
      </div>
    `;
    document.body.appendChild(searchModal);
  }

  const closeBtn = searchModal.querySelector('.modal-close-btn');
  const searchInput = searchModal.querySelector('#global-search-input');
  const resultsContainer = searchModal.querySelector('#search-modal-results');

  function openSearch() {
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 100);
  }

  function closeSearch() {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  searchTriggers.forEach(btn => btn.addEventListener('click', openSearch));
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  // Handle Search Input in Modal
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        resultsContainer.innerHTML = `<p style="font-size: 0.9rem; color: var(--text-muted); text-align: center; padding: 1rem 0;">Type to search over 150+ verified courses...</p>`;
        return;
      }

      const sampleCourses = [
        { title: 'Complete Web Development Bootcamp', cat: 'Web Development', url: 'course-details.html?id=1', price: '$89.99' },
        { title: 'JavaScript Mastery: Modern ES6+ & TypeScript', cat: 'Programming', url: 'course-details.html?id=2', price: '$69.99' },
        { title: 'Python for Data Analysis & Machine Learning', cat: 'Data Science', url: 'course-details.html?id=3', price: '$94.99' },
        { title: 'UI/UX Design Masterclass with Figma', cat: 'Design', url: 'course-details.html?id=4', price: '$74.99' },
        { title: 'Digital Marketing & Growth Strategy', cat: 'Marketing', url: 'course-details.html?id=5', price: '$59.99' },
        { title: 'Cloud DevOps Engineering with AWS & Docker', cat: 'Cloud', url: 'course-details.html?id=6', price: '$99.99' }
      ];

      const matches = sampleCourses.filter(c => c.title.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q));

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<p style="font-size: 0.9rem; color: var(--text-muted); text-align: center; padding: 1rem 0;">No courses found for "${q}".</p>`;
      } else {
        resultsContainer.innerHTML = matches.map(m => `
          <a href="${m.url}" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; border-radius: 8px; margin-bottom: 0.5rem; background: var(--bg-surface); text-decoration: none;">
            <div>
              <div style="font-weight: 600; color: var(--primary-navy); font-size: 0.95rem;">${m.title}</div>
              <div style="font-size: 0.8rem; color: var(--brand-blue);">${m.cat}</div>
            </div>
            <span style="font-weight: 700; color: var(--primary-navy);">${m.price}</span>
          </a>
        `).join('');
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = searchInput.value.trim();
        if (val) {
          window.location.href = `courses.html?search=${encodeURIComponent(val)}`;
        }
      }
    });
  }
}

/* ==========================================================================
   4. ANIMATED STATISTICS COUNTERS
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-counter-number, .stat-number');
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetText = el.getAttribute('data-target') || el.textContent;
        const numeric = parseInt(targetText.replace(/[^0-9]/g, ''), 10);
        const suffix = targetText.replace(/[0-9]/g, '');

        if (!isNaN(numeric)) {
          let current = 0;
          const duration = 1800; // ms
          const stepTime = 20;
          const increment = numeric / (duration / stepTime);

          const timer = setInterval(() => {
            current += increment;
            if (current >= numeric) {
              el.textContent = numeric.toLocaleString() + suffix;
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(current).toLocaleString() + suffix;
            }
          }, stepTime);
        }
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach(num => observer.observe(num));
}

/* ==========================================================================
   5. TESTIMONIALS SLIDER
   ========================================================================== */
function initTestimonialsSlider() {
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const slideCount = slides.length;
  let autoplayTimer = null;

  // Build dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetAutoplay();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();
}

/* ==========================================================================
   6. WISHLIST PERSISTENCE & TOGGLING
   ========================================================================== */
function initWishlist() {
  updateWishlistCount();

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.course-wishlist-btn');
    if (!btn) return;

    e.preventDefault();
    const courseId = btn.getAttribute('data-course-id') || 'course-item';
    let wishlist = JSON.parse(localStorage.getItem('educator_wishlist') || '[]');

    if (wishlist.includes(courseId)) {
      wishlist = wishlist.filter(id => id !== courseId);
      btn.classList.remove('active');
      showToast('Removed from wishlist', 'warning');
    } else {
      wishlist.push(courseId);
      btn.classList.add('active');
      showToast('Added to your wishlist!', 'success');
    }

    localStorage.setItem('educator_wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
  });
}

function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem('educator_wishlist') || '[]');
  const countBadges = document.querySelectorAll('.wishlist-count-badge');
  countBadges.forEach(badge => {
    badge.textContent = wishlist.length;
    badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
  });

  // Also sync active state for all visible wishlist buttons
  document.querySelectorAll('.course-wishlist-btn').forEach(btn => {
    const id = btn.getAttribute('data-course-id');
    if (id && wishlist.includes(id)) {
      btn.classList.add('active');
    }
  });
}

/* ==========================================================================
   7. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg style="width:20px;height:20px;color:var(--accent-emerald);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg style="width:20px;height:20px;color:var(--accent-rose);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
  } else if (type === 'warning') {
    iconSvg = `<svg style="width:20px;height:20px;color:var(--accent-gold);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
  } else {
    iconSvg = `<svg style="width:20px;height:20px;color:var(--brand-blue);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <div style="flex-grow: 1;">${message}</div>
    <button style="color:#94a3b8; font-size:1.1rem; line-height:1;" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('visible'), 20);

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ==========================================================================
   8. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'back-to-top-btn';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = `<svg style="width:20px;height:20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>`;
  btn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    width: 44px;
    height: 44px;
    border-radius: var(--radius-full);
    background: var(--brand-blue);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-lg);
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all var(--transition-normal);
  `;
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.style.opacity = '1';
      btn.style.visibility = 'visible';
      btn.style.transform = 'translateY(0)';
    } else {
      btn.style.opacity = '0';
      btn.style.visibility = 'hidden';
      btn.style.transform = 'translateY(20px)';
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   9. NEWSLETTER SUBSCRIPTION
   ========================================================================== */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        showToast('Thank you for subscribing to Educator updates!', 'success');
        input.value = '';
      }
    });
  });
}

// Global expose
window.showToast = showToast;
