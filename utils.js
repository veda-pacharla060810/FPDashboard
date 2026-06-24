// ============================================================
// js/utils.js — Shared utility functions
// ============================================================

// ── Toast notifications ──
let toastContainer = null;

function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(message, type = 'default', duration = 4000) {
  const icons = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`,
    error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
    warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`,
    default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>`
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${icons[type] || icons.default}<span>${message}</span>`;

  const container = getToastContainer();
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ── Modal helpers ──
export function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('hidden');
}

export function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add('hidden');
}

// Click outside modal to close
export function setupModalClose(modalId) {
  const backdrop = document.getElementById(modalId);
  if (!backdrop) return;
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal(modalId);
  });
}

// ── Date / time formatting ──
export function formatDate(dateStr, opts = {}) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d)) return '—';
  const defaults = { year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString('en-US', { ...defaults, ...opts });
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d)) return '—';
  return d.toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true
  });
}

export function formatTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function formatDateForInput(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function getEventMonth(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short' });
}

export function getEventDay(dateStr) {
  return new Date(dateStr).getDate();
}

export function timeAgo(dateStr) {
  const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
  const intervals = [
    [31536000,'year'],[2592000,'month'],[86400,'day'],
    [3600,'hour'],[60,'minute'],[1,'second']
  ];
  for (const [sec, label] of intervals) {
    const count = Math.floor(seconds / sec);
    if (count >= 1) return `${count} ${label}${count !== 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

// ── Category label / badge helpers ──
export const CATEGORY_LABELS = {
  volunteer:   'Volunteer',
  meeting:     'Meeting',
  social:      'Social',
  educational: 'Educational',
  clinical:    'Clinical',
  general:     'General'
};

export const CATEGORY_BADGES = {
  volunteer:   'badge-teal',
  meeting:     'badge-navy',
  social:      'badge-purple',
  educational: 'badge-amber',
  clinical:    'badge-green',
  general:     'badge-gray'
};

export const STATUS_BADGES = {
  pending:  'badge-amber',
  approved: 'badge-green',
  rejected: 'badge-red'
};

export const PRIORITY_BADGES = {
  low:    'badge-gray',
  normal: 'badge-teal',
  high:   'badge-amber',
  urgent: 'badge-red'
};

// ── Avatar initials ──
export function getInitials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';
}

// ── Button loading state ──
export function setButtonLoading(btn, loading, text = 'Save') {
  if (loading) {
    btn.disabled = true;
    btn.dataset.originalText = btn.innerHTML;
    btn.innerHTML = `<span class="spinner"></span> Saving…`;
  } else {
    btn.disabled = false;
    btn.innerHTML = btn.dataset.originalText || text;
  }
}

// ── Form validation helpers ──
export function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.classList.add('is-invalid');
  const err = document.getElementById(fieldId + '-error');
  if (err) { err.textContent = message; err.style.display = 'block'; }
}

export function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  if (field) field.classList.remove('is-invalid');
  const err = document.getElementById(fieldId + '-error');
  if (err) { err.textContent = ''; err.style.display = 'none'; }
}

export function clearAllErrors(form) {
  form.querySelectorAll('.form-error').forEach(el => { el.textContent = ''; el.style.display = 'none'; });
  form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
}

// ── Escape HTML to prevent XSS ──
export function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

// ── Sidebar toggle (shared) ──
export function setupSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const toggle  = document.querySelector('.menu-toggle');

  if (!sidebar || !toggle) return;

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }
}

// ── Set active nav link ──
export function setActiveNav(pageId) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === pageId);
  });
}

// ── Render user info in sidebar ──
export function renderSidebarUser(profile) {
  const nameEl   = document.getElementById('sidebar-user-name');
  const roleEl   = document.getElementById('sidebar-user-role');
  const avatarEl = document.getElementById('sidebar-avatar');
  if (nameEl)   nameEl.textContent   = profile.full_name || profile.email || 'Member';
  if (roleEl)   roleEl.textContent   = profile.role === 'admin' ? 'Administrator' : 'Member';
  if (avatarEl) avatarEl.textContent = getInitials(profile.full_name || profile.email);
}

// ── Confirmation dialog ──
export function confirmDialog(message) {
  return window.confirm(message);
}

// ── Hide page loader ──
export function hideLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) loader.classList.add('hidden');
}
