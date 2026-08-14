/**
 * EDUCATOR - STUDENT DASHBOARD & PROFILE JAVASCRIPT
 * Handles learning progress tracking, SVG weekly chart, certificate modal viewer, profile management, and tabs.
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardUser();
  initProgressBars();
  initLearningChart();
  initCertificateModal();
  initProfileTabs();
  initProfileForm();
});

/* ==========================================================================
   1. LOAD USER SESSION INTO DASHBOARD
   ========================================================================== */
function initDashboardUser() {
  const session = JSON.parse(localStorage.getItem('educator_user_session') || '{}');
  const userNameEls = document.querySelectorAll('.dash-dynamic-username');
  const userEmailEls = document.querySelectorAll('.dash-dynamic-email');

  if (session.name) {
    userNameEls.forEach(el => el.textContent = session.name);
  }
  if (session.email) {
    userEmailEls.forEach(el => el.textContent = session.email);
  }
}

/* ==========================================================================
   2. PROGRESS BARS & CONTINUE LEARNING ACTIONS
   ========================================================================== */
function initProgressBars() {
  const continueBtns = document.querySelectorAll('.continue-lesson-btn');
  continueBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.dash-course-card');
      if (!card) return;

      const fill = card.querySelector('.progress-bar-fill');
      const text = card.querySelector('.progress-percent-text');

      let currentVal = parseInt(text?.textContent || '50', 10);
      if (currentVal < 100) {
        currentVal = Math.min(100, currentVal + 15);
        if (fill) fill.style.width = `${currentVal}%`;
        if (text) text.textContent = `${currentVal}%`;

        if (typeof window.showToast === 'function') {
          window.showToast(`Progress saved! You are now ${currentVal}% complete.`, 'success');
        }

        if (currentVal === 100) {
          if (typeof window.showToast === 'function') {
            window.showToast(`🎉 Congratulations! You have completed this course! Your certificate is ready.`, 'success', 5000);
          }
        }
      } else {
        if (typeof window.showToast === 'function') {
          window.showToast('Course already 100% completed! View your certificate in the Certificates tab.', 'info');
        }
      }
    });
  });
}

/* ==========================================================================
   3. INTERACTIVE LEARNING ACTIVITY SVG CHART
   ========================================================================== */
function initLearningChart() {
  const chartContainer = document.getElementById('learning-activity-chart');
  if (!chartContainer) return;

  const data = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 4.0 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 5.2 },
    { day: 'Fri', hours: 3.8 },
    { day: 'Sat', hours: 6.0 },
    { day: 'Sun', hours: 4.5 }
  ];

  const maxHours = 7;
  const svgWidth = 600;
  const svgHeight = 220;
  const barWidth = 42;
  const spacing = (svgWidth - 60) / data.length;

  let barsSvg = data.map((d, i) => {
    const barHeight = (d.hours / maxHours) * 140;
    const x = 50 + (i * spacing);
    const y = 170 - barHeight;

    return `
      <g class="chart-bar-group" style="cursor: pointer;">
        <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="6" fill="url(#blueGrad)" class="chart-bar" />
        <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" font-size="11" font-weight="700" fill="#2563eb">${d.hours}h</text>
        <text x="${x + barWidth / 2}" y="195" text-anchor="middle" font-size="12" font-weight="600" fill="#64748b">${d.day}</text>
      </g>
    `;
  }).join('');

  chartContainer.innerHTML = `
    <svg viewBox="0 0 ${svgWidth} ${svgHeight}" style="width: 100%; height: auto; overflow: visible;">
      <defs>
        <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </linearGradient>
      </defs>
      <!-- Grid lines -->
      <line x1="40" y1="30" x2="570" y2="30" stroke="#f1f5f9" stroke-dasharray="4" />
      <line x1="40" y1="90" x2="570" y2="90" stroke="#f1f5f9" stroke-dasharray="4" />
      <line x1="40" y1="170" x2="570" y2="170" stroke="#e2e8f0" stroke-width="1.5" />
      ${barsSvg}
    </svg>
  `;
}

/* ==========================================================================
   4. CERTIFICATE PREVIEW MODAL
   ========================================================================== */
function initCertificateModal() {
  let modal = document.getElementById('certificate-preview-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'certificate-preview-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-dialog" style="max-width: 820px; padding: 1.5rem;">
        <button class="modal-close-btn" aria-label="Close certificate">&times;</button>
        <div id="certificate-printable-area" class="certificate-view-paper">
          <div class="cert-paper-seal">
            <svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div style="font-size: 0.9rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent-gold); font-weight: 800; margin-bottom: 0.5rem;">Educator Global Academy</div>
          <h2 class="cert-paper-title">Certificate of Completion</h2>
          <p style="font-size: 1.05rem; color: #64748b; margin-top: 0.5rem;">This is proudly presented to</p>
          <div id="modal-cert-student" class="cert-recipient-name">Alex Morgan</div>
          <p style="font-size: 1.05rem; color: #475569; max-width: 580px; margin: 0 auto 1.5rem auto;">
            for successfully mastering all curriculum modules, capstone projects, and rigorous assessments for
          </p>
          <h3 id="modal-cert-course" style="font-size: 1.6rem; color: var(--primary-navy); margin-bottom: 2rem;">Complete Web Development Bootcamp 2026</h3>
          
          <div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 1.5rem 2rem 0 2rem; border-top: 1px solid #e2e8f0; font-size: 0.85rem; color: #64748b;">
            <div style="text-align: left;">
              <div style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: 1.8rem; color: var(--primary-navy);">David Miller</div>
              <div style="border-top: 1px solid #94a3b8; padding-top: 4px; font-weight: 600;">Lead Instructor</div>
            </div>
            <div style="text-align: center;">
              <div style="font-weight: 700; color: var(--primary-navy); font-size: 0.9rem;" id="modal-cert-id">EDU-849204-2026</div>
              <div style="font-size: 0.75rem;">Verified Credential ID</div>
            </div>
            <div style="text-align: right;">
              <div style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: 1.8rem; color: var(--primary-navy);">Elena Vance</div>
              <div style="border-top: 1px solid #94a3b8; padding-top: 4px; font-weight: 600;">Academic Dean</div>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
          <button id="cert-print-btn" class="btn btn-secondary btn-sm">🖨️ Print Certificate</button>
          <button id="cert-download-btn" class="btn btn-primary btn-sm">⬇️ Download PDF</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const closeBtn = modal.querySelector('.modal-close-btn');
  const printBtn = modal.querySelector('#cert-print-btn');
  const downloadBtn = modal.querySelector('#cert-download-btn');

  function openModal(courseName, studentName, certId) {
    const studentEl = modal.querySelector('#modal-cert-student');
    const courseEl = modal.querySelector('#modal-cert-course');
    const idEl = modal.querySelector('#modal-cert-id');

    if (studentEl) studentEl.textContent = studentName || 'Alex Morgan';
    if (courseEl) courseEl.textContent = courseName || 'Complete Web Development Bootcamp 2026';
    if (idEl) idEl.textContent = certId || 'EDU-' + Math.floor(100000 + Math.random() * 900000) + '-2026';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      if (typeof window.showToast === 'function') {
        window.showToast('Certificate PDF generated and downloaded successfully!', 'success');
      }
    });
  }

  document.addEventListener('click', (e) => {
    const viewBtn = e.target.closest('.view-certificate-btn');
    if (!viewBtn) return;

    const courseName = viewBtn.getAttribute('data-course-name') || 'Web Development Bootcamp';
    const certId = viewBtn.getAttribute('data-cert-id') || 'EDU-982341-2026';
    const session = JSON.parse(localStorage.getItem('educator_user_session') || '{}');
    openModal(courseName, session.name || 'Alex Morgan', certId);
  });
}

/* ==========================================================================
   5. PROFILE TABS SWITCHING
   ========================================================================== */
function initProfileTabs() {
  const tabBtns = document.querySelectorAll('.profile-tab-btn');
  const tabPanes = document.querySelectorAll('.profile-tab-pane');

  if (tabBtns.length === 0) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.style.display = 'none');

      btn.classList.add('active');
      const activePane = document.getElementById(targetId);
      if (activePane) activePane.style.display = 'block';
    });
  });
}

/* ==========================================================================
   6. PROFILE FORM SAVE
   ========================================================================== */
function initProfileForm() {
  const profileForm = document.getElementById('profile-edit-form');
  if (!profileForm) return;

  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('profile-input-name');
    const bioInput = document.getElementById('profile-input-bio');

    if (nameInput && nameInput.value.trim()) {
      let session = JSON.parse(localStorage.getItem('educator_user_session') || '{}');
      session.name = nameInput.value.trim();
      session.bio = bioInput ? bioInput.value.trim() : '';
      localStorage.setItem('educator_user_session', JSON.stringify(session));

      initDashboardUser();

      if (typeof window.showToast === 'function') {
        window.showToast('Profile updated successfully!', 'success');
      }
    }
  });
}
