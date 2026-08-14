/**
 * EDUCATOR - AUTHENTICATION & VALIDATION JAVASCRIPT
 * Handles login, registration, password visibility toggles, strength meter, and mock sessions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggles();
  initPasswordStrength();
  initLoginForm();
  initRegisterForm();
  initDemoCredentials();
});

/* ==========================================================================
   1. PASSWORD VISIBILITY TOGGLE
   ========================================================================== */
function initPasswordToggles() {
  const toggleBtns = document.querySelectorAll('.password-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = `<svg style="width:20px;height:20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"></path></svg>`;
      } else {
        input.type = 'password';
        btn.innerHTML = `<svg style="width:20px;height:20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`;
      }
    });
  });
}

/* ==========================================================================
   2. PASSWORD STRENGTH METER
   ========================================================================== */
function initPasswordStrength() {
  const regPasswordInput = document.getElementById('reg-password');
  const strengthBar = document.getElementById('password-strength-bar');
  const strengthText = document.getElementById('password-strength-text');

  if (!regPasswordInput || !strengthBar) return;

  regPasswordInput.addEventListener('input', () => {
    const val = regPasswordInput.value;
    let score = 0;

    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    let percentage = 0;
    let color = '#f43f5e';
    let label = 'Weak';

    if (score === 1 || score === 2) {
      percentage = 35;
      color = '#f43f5e';
      label = 'Weak';
    } else if (score === 3 || score === 4) {
      percentage = 70;
      color = '#f59e0b';
      label = 'Medium';
    } else if (score >= 5) {
      percentage = 100;
      color = '#10b981';
      label = 'Strong';
    }

    strengthBar.style.width = `${percentage}%`;
    strengthBar.style.background = color;
    if (strengthText) {
      strengthText.textContent = val ? `Strength: ${label}` : '';
      strengthText.style.color = color;
    }
  });
}

/* ==========================================================================
   3. LOGIN FORM VALIDATION & SUBMISSION
   ========================================================================== */
function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const submitBtn = form.querySelector('button[type="submit"]');

    let isValid = true;

    // Email validation
    const emailVal = emailInput.value.trim();
    if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      emailError.textContent = 'Please enter a valid email address';
      emailError.classList.add('visible');
      isValid = false;
    } else {
      emailError.classList.remove('visible');
    }

    // Password validation
    const passwordVal = passwordInput.value;
    if (!passwordVal || passwordVal.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters';
      passwordError.classList.add('visible');
      isValid = false;
    } else {
      passwordError.classList.remove('visible');
    }

    if (isValid) {
      submitBtn.innerHTML = `Signing in...`;
      submitBtn.disabled = true;

      // Mock user session
      const userSession = {
        name: emailVal.split('@')[0].toUpperCase(),
        email: emailVal,
        role: 'Student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        token: 'mock_jwt_token_educator_2026'
      };
      localStorage.setItem('educator_user_session', JSON.stringify(userSession));

      setTimeout(() => {
        if (typeof window.showToast === 'function') {
          window.showToast('Login successful! Welcome back.', 'success');
        }
        window.location.href = 'dashboard.html';
      }, 1000);
    }
  });
}

/* ==========================================================================
   4. REGISTRATION FORM VALIDATION
   ========================================================================== */
function initRegisterForm() {
  const form = document.getElementById('register-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('reg-name');
    const emailInput = document.getElementById('reg-email');
    const passInput = document.getElementById('reg-password');
    const confirmPassInput = document.getElementById('reg-confirm-password');
    const termsCheck = document.getElementById('reg-terms');

    const nameError = document.getElementById('reg-name-error');
    const emailError = document.getElementById('reg-email-error');
    const passError = document.getElementById('reg-pass-error');
    const confirmPassError = document.getElementById('reg-confirm-error');
    const termsError = document.getElementById('reg-terms-error');
    const submitBtn = form.querySelector('button[type="submit"]');

    let isValid = true;

    // Full Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
      nameError.textContent = 'Please enter your full name (min 3 characters)';
      nameError.classList.add('visible');
      isValid = false;
    } else {
      nameError.classList.remove('visible');
    }

    // Email
    if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address';
      emailError.classList.add('visible');
      isValid = false;
    } else {
      emailError.classList.remove('visible');
    }

    // Password
    if (!passInput.value || passInput.value.length < 6) {
      passError.textContent = 'Password must be at least 6 characters';
      passError.classList.add('visible');
      isValid = false;
    } else {
      passError.classList.remove('visible');
    }

    // Confirm Password
    if (confirmPassInput.value !== passInput.value) {
      confirmPassError.textContent = 'Passwords do not match';
      confirmPassError.classList.add('visible');
      isValid = false;
    } else {
      confirmPassError.classList.remove('visible');
    }

    // Terms
    if (termsCheck && !termsCheck.checked) {
      if (termsError) {
        termsError.textContent = 'You must agree to the Terms of Service';
        termsError.classList.add('visible');
      }
      isValid = false;
    } else if (termsError) {
      termsError.classList.remove('visible');
    }

    if (isValid) {
      submitBtn.innerHTML = `Creating Account...`;
      submitBtn.disabled = true;

      const userSession = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        role: document.querySelector('input[name="user-role"]:checked')?.value || 'Student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        token: 'mock_jwt_token_educator_2026'
      };
      localStorage.setItem('educator_user_session', JSON.stringify(userSession));

      setTimeout(() => {
        if (typeof window.showToast === 'function') {
          window.showToast('Account created successfully! Welcome to Educator.', 'success');
        }
        window.location.href = 'dashboard.html';
      }, 1000);
    }
  });
}

/* ==========================================================================
   5. DEMO CREDENTIALS QUICK FILL
   ========================================================================== */
function initDemoCredentials() {
  const demoStudentBtn = document.getElementById('demo-student-fill');
  const demoInstructorBtn = document.getElementById('demo-instructor-fill');

  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');

  if (demoStudentBtn && emailInput && passwordInput) {
    demoStudentBtn.addEventListener('click', () => {
      emailInput.value = 'alex.morgan@educator.edu';
      passwordInput.value = 'Educator2026!';
      if (typeof window.showToast === 'function') {
        window.showToast('Filled demo student credentials', 'info');
      }
    });
  }

  if (demoInstructorBtn && emailInput && passwordInput) {
    demoInstructorBtn.addEventListener('click', () => {
      emailInput.value = 'david.miller@educator.edu';
      passwordInput.value = 'Educator2026!';
      if (typeof window.showToast === 'function') {
        window.showToast('Filled demo instructor credentials', 'info');
      }
    });
  }
}
