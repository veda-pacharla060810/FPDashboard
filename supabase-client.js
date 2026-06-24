// ============================================================
// js/supabase-client.js
// Configure your Supabase credentials below
// ============================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// ⚠️  REPLACE THESE WITH YOUR SUPABASE PROJECT DETAILS
// Found in: Supabase Dashboard → Settings → API
const SUPABASE_URL = 'https://YOUR_PROJECT_REF.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'fp-auth'
  }
});

// ============================================================
// Auth helpers
// ============================================================
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function requireAuth(redirectTo = '/pages/login.html') {
  const session = await getSession();
  if (!session) {
    window.location.href = redirectTo;
    return null;
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (!session) return null;
  const profile = await getProfile(session.user.id);
  if (profile.role !== 'admin') {
    window.location.href = '/pages/dashboard.html';
    return null;
  }
  return { session, profile };
}

export async function requireMember() {
  const session = await requireAuth();
  if (!session) return null;
  const profile = await getProfile(session.user.id);
  return { session, profile };
}

export async function signOut() {
  await supabase.auth.signOut();
  window.location.href = '/pages/login.html';
}

// ============================================================
// Events helpers
// ============================================================
export async function getUpcomingEvents(limit = 10) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_published', true)
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function getAllEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*, profiles(full_name)')
    .order('event_date', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getEvent(id) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function createEvent(payload) {
  const session = await getSession();
  const { data, error } = await supabase
    .from('events')
    .insert({ ...payload, created_by: session.user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateEvent(id, payload) {
  const { data, error } = await supabase
    .from('events')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteEvent(id) {
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) throw error;
}

// ============================================================
// Announcements helpers
// ============================================================
export async function getAnnouncements(limit = 10) {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function getAllAnnouncements() {
  const { data, error } = await supabase
    .from('announcements')
    .select('*, profiles(full_name)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createAnnouncement(payload) {
  const session = await getSession();
  const { data, error } = await supabase
    .from('announcements')
    .insert({ ...payload, created_by: session.user.id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateAnnouncement(id, payload) {
  const { data, error } = await supabase
    .from('announcements')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteAnnouncement(id) {
  const { error } = await supabase.from('announcements').delete().eq('id', id);
  if (error) throw error;
}

// ============================================================
// Volunteer hours helpers
// ============================================================
export async function getMyHours(userId) {
  const { data, error } = await supabase
    .from('volunteer_hours')
    .select('*, events(title)')
    .eq('user_id', userId)
    .order('date_performed', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getAllHours() {
  const { data, error } = await supabase
    .from('volunteer_hours')
    .select('*, profiles(full_name, email), events(title)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function submitHours(payload) {
  const session = await getSession();
  const { data, error } = await supabase
    .from('volunteer_hours')
    .insert({ ...payload, user_id: session.user.id, status: 'pending' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function reviewHours(id, status, adminNote = '') {
  const session = await getSession();
  const { data, error } = await supabase
    .from('volunteer_hours')
    .update({
      status,
      admin_note: adminNote,
      reviewed_by: session.user.id,
      reviewed_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteHoursRecord(id) {
  const { error } = await supabase.from('volunteer_hours').delete().eq('id', id);
  if (error) throw error;
}

// ============================================================
// Users helpers (admin)
// ============================================================
export async function getAllUsers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('full_name', { ascending: true });
  if (error) throw error;
  return data;
}

export async function updateUserRole(userId, role) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(userId, payload) {
  const { data, error } = await supabase
    .from('profiles')
    .update(payload)
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ============================================================
// Attendance helpers
// ============================================================
export async function getMyAttendance(userId) {
  const { data, error } = await supabase
    .from('attendance')
    .select('*, events(title, event_date, category, volunteer_hours)')
    .eq('user_id', userId)
    .order('checked_in_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function checkInToEvent(eventId) {
  const session = await getSession();
  const { data, error } = await supabase
    .from('attendance')
    .insert({ user_id: session.user.id, event_id: eventId })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ============================================================
// Stats helpers (admin dashboard)
// ============================================================
export async function getPlatformStats() {
  const [users, events, pending, totalHours] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('events').select('id', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('volunteer_hours').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('volunteer_hours').select('hours').eq('status', 'approved')
  ]);

  const hoursSum = (totalHours.data || []).reduce((a, r) => a + Number(r.hours), 0);

  return {
    totalMembers: users.count || 0,
    totalEvents: events.count || 0,
    pendingReviews: pending.count || 0,
    totalVolunteerHours: hoursSum.toFixed(1)
  };
}
