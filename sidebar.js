// ============================================================
// js/sidebar.js — Renders the shared sidebar navigation
// ============================================================

export function renderMemberSidebar(profile) {
  return `
  <div class="sidebar-overlay" id="sidebar-overlay"></div>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="brand-logo">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 14.5h-2v-4.5H8.5v-2H11V7h2v3h2.5v2H13v4.5z"/></svg>
        </div>
        <div class="brand-text">
          <span class="brand-name">Future Physicians</span>
          <span class="brand-sub">Member Portal</span>
        </div>
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section">
        <div class="nav-label">Main</div>
        <a href="dashboard.html" class="nav-item" data-page="dashboard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Dashboard
        </a>
        <a href="events.html" class="nav-item" data-page="events">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Events
        </a>
        <a href="announcements.html" class="nav-item" data-page="announcements">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
          Announcements
        </a>
      </div>

      <div class="nav-section">
        <div class="nav-label">Activity</div>
        <a href="volunteer-hours.html" class="nav-item" data-page="volunteer-hours">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Volunteer Hours
        </a>
        <a href="attendance.html" class="nav-item" data-page="attendance">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
          Attendance History
        </a>
      </div>

      <div class="nav-section">
        <div class="nav-label">Account</div>
        <a href="profile.html" class="nav-item" data-page="profile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          My Profile
        </a>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="user-avatar" id="sidebar-avatar">??</div>
        <div class="user-info">
          <div class="user-name" id="sidebar-user-name">Loading…</div>
          <div class="user-role" id="sidebar-user-role">Member</div>
        </div>
        <button class="btn-signout" id="btn-signout" aria-label="Sign out" title="Sign out">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>
    </div>
  </aside>`;
}

export function renderAdminSidebar(profile) {
  return `
  <div class="sidebar-overlay" id="sidebar-overlay"></div>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="brand-logo">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 14.5h-2v-4.5H8.5v-2H11V7h2v3h2.5v2H13v4.5z"/></svg>
        </div>
        <div class="brand-text">
          <span class="brand-name">Future Physicians</span>
          <span class="brand-sub">Admin Portal</span>
        </div>
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section">
        <div class="nav-label">Overview</div>
        <a href="admin-dashboard.html" class="nav-item" data-page="admin-dashboard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Dashboard
        </a>
      </div>

      <div class="nav-section">
        <div class="nav-label">Management</div>
        <a href="admin-events.html" class="nav-item" data-page="admin-events">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Events
        </a>
        <a href="admin-announcements.html" class="nav-item" data-page="admin-announcements">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
          Announcements
        </a>
        <a href="admin-hours.html" class="nav-item" data-page="admin-hours">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Volunteer Hours
          <span class="nav-badge" id="pending-badge" style="display:none;">0</span>
        </a>
        <a href="admin-users.html" class="nav-item" data-page="admin-users">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          Users
        </a>
      </div>

      <div class="nav-section">
        <div class="nav-label">Account</div>
        <a href="profile.html" class="nav-item" data-page="profile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          My Profile
        </a>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="user-avatar" id="sidebar-avatar">??</div>
        <div class="user-info">
          <div class="user-name" id="sidebar-user-name">Loading…</div>
          <div class="user-role" id="sidebar-user-role">Administrator</div>
        </div>
        <button class="btn-signout" id="btn-signout" aria-label="Sign out" title="Sign out">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>
    </div>
  </aside>`;
}
