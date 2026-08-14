/**
 * EDUCATOR - COURSES & CURRICULUM JAVASCRIPT
 * Handles course catalog dataset, multi-criteria filtering, sorting, curriculum accordion, and course detail interactions.
 */

// Comprehensive Course Database
const COURSES_DATA = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp 2026',
    category: 'Web Development',
    categorySlug: 'web',
    level: 'Beginner',
    rating: 4.9,
    reviewsCount: 1420,
    studentsCount: '18,450',
    duration: '48 Hours',
    lectures: 142,
    price: 89.99,
    oldPrice: 129.99,
    isFree: false,
    instructor: {
      name: 'David Miller',
      title: 'Senior Full-Stack Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      id: 1
    },
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
    badge: 'Bestseller',
    description: 'Master HTML5, CSS3, JavaScript, React, Node.js, and databases with hands-on real world portfolio projects.',
    curriculum: [
      {
        module: 'Module 01 — Modern HTML5 & Semantic Web Architecture',
        duration: '4 Lectures • 3h 15m',
        lessons: ['Introduction to Modern HTML5 Elements', 'Document Object Structure & Accessibility (a11y)', 'Forms, Custom Validation & Semantic Tags', 'Module 01 Capstone Project']
      },
      {
        module: 'Module 02 — Advanced CSS3, Flexbox & Responsive Grid Systems',
        duration: '6 Lectures • 5h 45m',
        lessons: ['CSS Custom Properties & Design Tokens', 'Flexbox Alignment Deep-dive', 'CSS Grid for Complex Application Layouts', 'Responsive Breakpoints & Mobile-First Best Practices', 'Transitions, Transforms & Smooth Animations', 'Building a Modern Landing Page']
      },
      {
        module: 'Module 03 — JavaScript Core Fundamentals & ES6+ Mastery',
        duration: '8 Lectures • 7h 20m',
        lessons: ['Variables, Data Types & Scopes', 'Functions, Closures & Higher-Order Functions', 'DOM Manipulation & Event Listeners', 'Asynchronous JS: Promises, Async/Await & Fetch API', 'Local Storage & State Management Basics', 'Interactive Todo & Task App']
      },
      {
        module: 'Module 04 — Modern Front-End Frameworks & State Management',
        duration: '6 Lectures • 8h 10m',
        lessons: ['Component Architecture & Lifecycles', 'Props, State & Context APIs', 'Routing & Navigation', 'API Integration & Error Handling', 'Building a Full E-Commerce Client UI']
      },
      {
        module: 'Module 05 — Back-End Development with Node.js & Express',
        duration: '7 Lectures • 9h 30m',
        lessons: ['Node.js Runtime & NPM Ecosystem', 'RESTful API Architecture', 'Authentication & JWT Tokens', 'Database Modeling (SQL & NoSQL)', 'Server Deployment & CI/CD Pipelines']
      },
      {
        module: 'Module 06 — Final Capstone Production Project',
        duration: '5 Lectures • 14h 00m',
        lessons: ['Architecting the Full-Stack Education LMS App', 'Database Integration & User Auth', 'Payment Gateway Integration', 'Cloud Deployment on AWS & Docker', 'Final Code Review & Certification']
      }
    ]
  },
  {
    id: 2,
    title: 'JavaScript Mastery: Modern ES6+ & TypeScript',
    category: 'Programming',
    categorySlug: 'programming',
    level: 'Intermediate',
    rating: 4.8,
    reviewsCount: 980,
    studentsCount: '12,300',
    duration: '36 Hours',
    lectures: 98,
    price: 69.99,
    oldPrice: 99.99,
    isFree: false,
    instructor: {
      name: 'Sarah Jenkins',
      title: 'Principal Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      id: 2
    },
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    badge: 'Popular',
    description: 'Level up from beginner to pro with asynchronous JavaScript, design patterns, TypeScript, algorithms, and clean code principles.',
    curriculum: [
      {
        module: 'Module 01 — JavaScript Engine & Execution Context',
        duration: '5 Lectures • 4h 00m',
        lessons: ['Call Stack, Memory Heap & Event Loop', 'Hoisting, Closures & Lexical Scope', 'Prototypes & Prototypal Inheritance']
      },
      {
        module: 'Module 02 — TypeScript Foundations & Strict Type Safety',
        duration: '6 Lectures • 6h 30m',
        lessons: ['Generics, Interfaces & Type Aliases', 'Union & Intersection Types', 'Decorators & Metadata']
      },
      {
        module: 'Module 03 — Design Patterns & Performance Tuning',
        duration: '5 Lectures • 8h 15m',
        lessons: ['Singleton, Factory, Observer Patterns', 'Debouncing, Throttling & Memory Leak Prevention']
      }
    ]
  },
  {
    id: 3,
    title: 'Python for Data Analysis & Machine Learning',
    category: 'Data Science',
    categorySlug: 'data',
    level: 'Beginner',
    rating: 4.9,
    reviewsCount: 1650,
    studentsCount: '21,100',
    duration: '52 Hours',
    lectures: 160,
    price: 94.99,
    oldPrice: 149.99,
    isFree: false,
    instructor: {
      name: 'Dr. Michael Chang',
      title: 'AI & Data Science Researcher',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      id: 3
    },
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    badge: 'Featured',
    description: 'Master Pandas, NumPy, Matplotlib, Scikit-Learn, and build predictive statistical models from massive data sets.',
    curriculum: [
      {
        module: 'Module 01 — Python Programming Refresher',
        duration: '4 Lectures • 3h 30m',
        lessons: ['Data Structures & List Comprehensions', 'Object-Oriented Python', 'Working with Files & JSON']
      },
      {
        module: 'Module 02 — Data Wrangling with Pandas & NumPy',
        duration: '8 Lectures • 9h 00m',
        lessons: ['Data Cleaning & Missing Values', 'Merging, Grouping & Aggregations', 'Vectorized Operations']
      },
      {
        module: 'Module 03 — Machine Learning Algorithms',
        duration: '10 Lectures • 14h 00m',
        lessons: ['Linear & Logistic Regression', 'Decision Trees & Random Forests', 'Model Validation & ROC Curves']
      }
    ]
  },
  {
    id: 4,
    title: 'UI/UX Design Masterclass with Figma & Systems',
    category: 'Design',
    categorySlug: 'design',
    level: 'Beginner',
    rating: 4.9,
    reviewsCount: 820,
    studentsCount: '9,750',
    duration: '32 Hours',
    lectures: 75,
    price: 74.99,
    oldPrice: 110.00,
    isFree: false,
    instructor: {
      name: 'Elena Rostova',
      title: 'Lead Product Designer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      id: 4
    },
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80',
    badge: 'Hot',
    description: 'Design intuitive interfaces, create scalable design systems, master typography, interactive Figma prototypes, and user testing.',
    curriculum: [
      {
        module: 'Module 01 — User Research & Information Architecture',
        duration: '4 Lectures • 4h 00m',
        lessons: ['User Personas & Journey Mapping', 'Wireframing & Low-Fidelity Prototyping']
      },
      {
        module: 'Module 02 — Visual Design Hierarchy & Color Theory',
        duration: '6 Lectures • 6h 30m',
        lessons: ['Grid Systems & Spacing Rules', 'Typography Pairing & Scale', 'Color Psychology & Accessibility']
      },
      {
        module: 'Module 03 — Figma Components & Interactive Prototyping',
        duration: '8 Lectures • 10h 00m',
        lessons: ['Auto-Layout Mastery', 'Component Variants & Interactive States', 'Building a Comprehensive Design System']
      }
    ]
  },
  {
    id: 5,
    title: 'Digital Marketing & Growth Strategy 2026',
    category: 'Marketing',
    categorySlug: 'marketing',
    level: 'Beginner',
    rating: 4.7,
    reviewsCount: 650,
    studentsCount: '8,400',
    duration: '28 Hours',
    lectures: 64,
    price: 59.99,
    oldPrice: 89.99,
    isFree: false,
    instructor: {
      name: 'Marcus Vance',
      title: 'Chief Marketing Strategist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      id: 5
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    badge: 'Trending',
    description: 'Scale businesses with SEO, Google Ads, Content Marketing, Social Media Funnels, and high-converting email sequences.',
    curriculum: [
      {
        module: 'Module 01 — Search Engine Optimization (SEO)',
        duration: '5 Lectures • 5h 00m',
        lessons: ['Keyword Research & Competitor Analysis', 'On-Page & Technical SEO', 'High Authority Link Building']
      },
      {
        module: 'Module 02 — Paid Advertising & PPC Campaigns',
        duration: '6 Lectures • 7h 00m',
        lessons: ['Google Search & Display Ads', 'Meta & TikTok Ads Optimization', 'Retargeting & ROI Tracking']
      }
    ]
  },
  {
    id: 6,
    title: 'Cloud DevOps Engineering with AWS & Docker',
    category: 'Programming',
    categorySlug: 'programming',
    level: 'Advanced',
    rating: 4.9,
    reviewsCount: 1100,
    studentsCount: '11,200',
    duration: '44 Hours',
    lectures: 115,
    price: 99.99,
    oldPrice: 149.99,
    isFree: false,
    instructor: {
      name: 'David Miller',
      title: 'Senior Full-Stack Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      id: 1
    },
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    badge: 'Pro',
    description: 'Learn Kubernetes orchestration, Terraform Infrastructure as Code, CI/CD automated deployment pipelines on AWS cloud.',
    curriculum: [
      {
        module: 'Module 01 — Containerization with Docker',
        duration: '6 Lectures • 6h 30m',
        lessons: ['Dockerfiles, Multi-stage Builds & Images', 'Docker Compose Multi-Container Orchestration']
      },
      {
        module: 'Module 02 — AWS Cloud Architecture & Infrastructure',
        duration: '8 Lectures • 11h 00m',
        lessons: ['EC2, VPC, S3 & IAM Security Policies', 'Terraform Automated Provisioning']
      }
    ]
  },
  {
    id: 7,
    title: 'Modern Business Analytics & Executive Leadership',
    category: 'Business',
    categorySlug: 'business',
    level: 'Intermediate',
    rating: 4.8,
    reviewsCount: 490,
    studentsCount: '6,200',
    duration: '26 Hours',
    lectures: 50,
    price: 64.99,
    oldPrice: 89.99,
    isFree: false,
    instructor: {
      name: 'Marcus Vance',
      title: 'Chief Marketing Strategist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      id: 5
    },
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    badge: 'Executive',
    description: 'Develop strategic thinking, financial forecasting models, KPI analytics, and team leadership methodologies.',
    curriculum: [
      {
        module: 'Module 01 — Financial Modeling & Forecasting',
        duration: '5 Lectures • 5h 30m',
        lessons: ['Cashflow & P&L Analysis', 'Scenario Planning & Risk Management']
      }
    ]
  },
  {
    id: 8,
    title: 'Cybersecurity Fundamentals & Ethical Hacking',
    category: 'Programming',
    categorySlug: 'programming',
    level: 'Intermediate',
    rating: 4.9,
    reviewsCount: 1350,
    studentsCount: '15,800',
    duration: '40 Hours',
    lectures: 105,
    price: 84.99,
    oldPrice: 120.00,
    isFree: false,
    instructor: {
      name: 'Sarah Jenkins',
      title: 'Principal Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      id: 2
    },
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    badge: 'Security',
    description: 'Learn network vulnerability assessments, penetration testing, cryptography, defensive hardening, and OWASP Top 10.',
    curriculum: [
      {
        module: 'Module 01 — Network Protocols & Packet Analysis',
        duration: '5 Lectures • 5h 00m',
        lessons: ['Wireshark Inspection', 'Port Scanning & Reconnaissance']
      }
    ]
  },
  {
    id: 9,
    title: 'Introduction to Computer Science & Algorithms',
    category: 'Programming',
    categorySlug: 'programming',
    level: 'Beginner',
    rating: 4.9,
    reviewsCount: 2200,
    studentsCount: '28,900',
    duration: '20 Hours',
    lectures: 45,
    price: 0,
    oldPrice: 49.99,
    isFree: true,
    instructor: {
      name: 'Dr. Michael Chang',
      title: 'AI & Data Science Researcher',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      id: 3
    },
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    badge: 'Free Course',
    description: 'Foundational computer science concepts: binary arithmetic, data structures, recursion, time complexity (Big-O).',
    curriculum: [
      {
        module: 'Module 01 — Algorithms & Computational Thinking',
        duration: '4 Lectures • 3h 00m',
        lessons: ['Binary Search & Sorting', 'Stacks, Queues & Linked Lists']
      }
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initCoursesCatalog();
  initCourseDetails();
  initCurriculumAccordion();
  initEnrollment();
});

/* ==========================================================================
   1. COURSES CATALOG FILTERING & RENDERING
   ========================================================================== */
function initCoursesCatalog() {
  const container = document.getElementById('courses-catalog-grid');
  if (!container) return;

  const searchInput = document.getElementById('course-search-filter');
  const sortSelect = document.getElementById('course-sort-select');
  const countBadge = document.getElementById('course-count-display');
  const categoryPills = document.querySelectorAll('.category-pill[data-category]');
  const levelCheckboxes = document.querySelectorAll('input[name="filter-level"]');
  const priceRadios = document.querySelectorAll('input[name="filter-price"]');
  const ratingRadios = document.querySelectorAll('input[name="filter-rating"]');
  const resetBtn = document.getElementById('reset-filters-btn');

  // Check URL params for category or search queries
  const urlParams = new URLSearchParams(window.location.search);
  let activeCategory = urlParams.get('cat') || 'all';
  let activeSearch = urlParams.get('search') || '';

  if (activeSearch && searchInput) {
    searchInput.value = activeSearch;
  }

  // Set active pill if param exists
  categoryPills.forEach(pill => {
    if (pill.getAttribute('data-category') === activeCategory) {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    }
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      renderFilteredCourses();
    });
  });

  function renderFilteredCourses() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const sortBy = sortSelect?.value || 'popular';

    // Levels
    const selectedLevels = Array.from(levelCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    // Price
    const selectedPrice = Array.from(priceRadios).find(r => r.checked)?.value || 'all';

    // Rating
    const selectedRating = parseFloat(Array.from(ratingRadios).find(r => r.checked)?.value || '0');

    let filtered = COURSES_DATA.filter(course => {
      // Search filter
      const matchesSearch = !q || 
        course.title.toLowerCase().includes(q) || 
        course.description.toLowerCase().includes(q) || 
        course.instructor.name.toLowerCase().includes(q);

      // Category filter
      const matchesCat = activeCategory === 'all' || course.categorySlug === activeCategory;

      // Level filter
      const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level.toLowerCase());

      // Price filter
      let matchesPrice = true;
      if (selectedPrice === 'free') matchesPrice = course.isFree;
      if (selectedPrice === 'paid') matchesPrice = !course.isFree;

      // Rating filter
      const matchesRating = course.rating >= selectedRating;

      return matchesSearch && matchesCat && matchesLevel && matchesPrice && matchesRating;
    });

    // Sorting
    if (sortBy === 'popular') {
      filtered.sort((a, b) => parseInt(b.studentsCount.replace(/,/g, '')) - parseInt(a.studentsCount.replace(/,/g, '')));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    // Update count display
    if (countBadge) {
      countBadge.textContent = `Showing ${filtered.length} of ${COURSES_DATA.length} Courses`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: #ffffff; border-radius: var(--radius-lg); border: 1px solid var(--border-light);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="margin-bottom: 0.5rem;">No courses match your criteria</h3>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Try adjusting your keyword, resetting filters, or choosing another category.</p>
          <button id="clear-filters-action" class="btn btn-primary btn-sm">Clear All Filters</button>
        </div>
      `;
      const clearBtn = document.getElementById('clear-filters-action');
      if (clearBtn) clearBtn.addEventListener('click', resetAll);
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem('educator_wishlist') || '[]');

    container.innerHTML = filtered.map(course => {
      const isWishlisted = wishlist.includes(`course-${course.id}`);
      return `
        <div class="course-card">
          <div class="course-thumbnail-wrap">
            <img src="${course.image}" alt="${course.title}" class="course-thumbnail" loading="lazy">
            <span class="course-badge">${course.badge}</span>
            <button class="course-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                    data-course-id="course-${course.id}" 
                    aria-label="Save to wishlist">
              <svg style="width: 18px; height: 18px;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>
          <div class="course-content">
            <div class="course-meta-top">
              <span class="course-rating">
                <svg style="width: 16px; height: 16px;" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                ${course.rating} <span style="font-weight: normal; color: var(--text-light);">(${course.reviewsCount})</span>
              </span>
              <span>👥 ${course.studentsCount} students</span>
            </div>
            <h3 class="course-title">
              <a href="course-details.html?id=${course.id}">${course.title}</a>
            </h3>
            <p class="course-desc">${course.description}</p>
            
            <div class="course-instructor">
              <img src="${course.instructor.avatar}" alt="${course.instructor.name}" class="instructor-avatar">
              <span class="instructor-name">${course.instructor.name}</span>
            </div>

            <div class="course-card-footer">
              <div class="course-price ${course.isFree ? 'free' : ''}">
                ${course.isFree ? 'Free' : `$${course.price.toFixed(2)}`}
                ${course.oldPrice ? `<span class="old-price">$${course.oldPrice.toFixed(2)}</span>` : ''}
              </div>
              <a href="course-details.html?id=${course.id}" class="btn btn-primary btn-sm">View Course</a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function resetAll() {
    if (searchInput) searchInput.value = '';
    categoryPills.forEach(p => p.classList.remove('active'));
    document.querySelector('.category-pill[data-category="all"]')?.classList.add('active');
    activeCategory = 'all';
    levelCheckboxes.forEach(cb => cb.checked = false);
    priceRadios.forEach(r => r.checked = (r.value === 'all'));
    ratingRadios.forEach(r => r.checked = (r.value === '0'));
    if (sortSelect) sortSelect.value = 'popular';
    renderFilteredCourses();
  }

  if (searchInput) searchInput.addEventListener('input', renderFilteredCourses);
  if (sortSelect) sortSelect.addEventListener('change', renderFilteredCourses);
  levelCheckboxes.forEach(cb => cb.addEventListener('change', renderFilteredCourses));
  priceRadios.forEach(r => r.addEventListener('change', renderFilteredCourses));
  ratingRadios.forEach(r => r.addEventListener('change', renderFilteredCourses));
  if (resetBtn) resetBtn.addEventListener('click', resetAll);

  // Initial render
  renderFilteredCourses();
}

/* ==========================================================================
   2. COURSE DETAILS PAGE LOADER
   ========================================================================== */
function initCourseDetails() {
  const detailContainer = document.getElementById('course-details-root');
  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const courseId = parseInt(urlParams.get('id') || '1', 10);
  const course = COURSES_DATA.find(c => c.id === courseId) || COURSES_DATA[0];

  // Update Page Title
  document.title = `${course.title} | Educator Platform`;

  // Inject dynamic course data
  const titleEls = document.querySelectorAll('.dynamic-course-title');
  titleEls.forEach(el => el.textContent = course.title);

  const descEls = document.querySelectorAll('.dynamic-course-desc');
  descEls.forEach(el => el.textContent = course.description);

  const priceEls = document.querySelectorAll('.dynamic-course-price');
  priceEls.forEach(el => el.textContent = course.isFree ? 'Free' : `$${course.price.toFixed(2)}`);

  const instructorAvatarEls = document.querySelectorAll('.dynamic-instructor-avatar');
  instructorAvatarEls.forEach(el => el.src = course.instructor.avatar);

  const instructorNameEls = document.querySelectorAll('.dynamic-instructor-name');
  instructorNameEls.forEach(el => el.textContent = course.instructor.name);

  const instructorTitleEls = document.querySelectorAll('.dynamic-instructor-title');
  instructorTitleEls.forEach(el => el.textContent = course.instructor.title);

  // Render curriculum accordion
  const curriculumContainer = document.getElementById('course-curriculum-accordion');
  if (curriculumContainer && course.curriculum) {
    curriculumContainer.innerHTML = course.curriculum.map((mod, idx) => `
      <div class="accordion-item ${idx === 0 ? 'active' : ''}">
        <div class="accordion-header">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <svg style="width: 20px; height: 20px; color: var(--brand-blue);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span>${mod.module}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="font-size: 0.85rem; font-weight: normal; color: var(--text-muted);">${mod.duration}</span>
            <svg class="accordion-icon" style="width: 18px; height: 18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
        <div class="accordion-body">
          <ul style="display: flex; flex-direction: column; gap: 0.75rem; padding: 0.5rem 0;">
            ${mod.lessons.map((lesson, lIdx) => `
              <li style="display: flex; align-items: center; justify-content: space-between; font-size: 0.9rem;">
                <div style="display: flex; align-items: center; gap: 0.65rem;">
                  <svg style="width: 16px; height: 16px; color: var(--brand-blue);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Lesson 0${lIdx + 1}: ${lesson}</span>
                </div>
                <span style="font-size: 0.8rem; color: var(--text-light); background: var(--bg-surface); padding: 2px 8px; border-radius: 4px;">Video Preview</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   3. CURRICULUM & FAQ ACCORDION HANDLER
   ========================================================================== */
function initCurriculumAccordion() {
  document.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion-header');
    if (!header) return;

    const item = header.closest('.accordion-item');
    if (!item) return;

    const isAlreadyActive = item.classList.contains('active');
    
    // Toggle active state
    item.classList.toggle('active', !isAlreadyActive);
  });
}

/* ==========================================================================
   4. ENROLLMENT ACTION & SIMULATION
   ========================================================================== */
function initEnrollment() {
  const enrollBtns = document.querySelectorAll('.enroll-course-btn');
  enrollBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseTitle = document.querySelector('.dynamic-course-title')?.textContent || 'Course';
      
      btn.innerHTML = `<span style="display:inline-block;animation:spin 1s linear infinite;">⏳</span> Processing...`;
      btn.style.pointerEvents = 'none';

      setTimeout(() => {
        btn.innerHTML = `✓ Enrolled Successfully!`;
        btn.style.background = 'var(--accent-emerald)';
        showToast(`Congratulations! You are enrolled in "${courseTitle}". Redirecting to dashboard...`, 'success', 3000);

        // Add to enrolled courses in localStorage
        const enrolled = JSON.parse(localStorage.getItem('educator_enrolled_courses') || '[]');
        if (!enrolled.includes(courseTitle)) {
          enrolled.push(courseTitle);
          localStorage.setItem('educator_enrolled_courses', JSON.stringify(enrolled));
        }

        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1500);
      }, 900);
    });
  });
}

window.COURSES_DATA = COURSES_DATA;
