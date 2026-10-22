(function () {
  'use strict';

  let currentBookings = [];
  let editingId = null;

  const totalEl = document.getElementById('statTotal');
  const pendingEl = document.getElementById('statPending');
  const confirmedEl = document.getElementById('statConfirmed');
  const completedEl = document.getElementById('statCompleted');
  const tableBody = document.getElementById('bookingsTableBody');
  const searchInput = document.getElementById('searchInput');
  const statusFilter = document.getElementById('statusFilter');
  const cityFilter = document.getElementById('cityFilter');
  const editModal = document.getElementById('editModal');
  const editForm = document.getElementById('editForm');
  const toast = document.getElementById('adminToast');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
  }

  // Fetch and update dashboard stats
  async function fetchStats() {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (data.success) {
        totalEl.textContent = data.stats.total;
        pendingEl.textContent = data.stats.pending;
        confirmedEl.textContent = data.stats.confirmed + data.stats.inProgress;
        completedEl.textContent = data.stats.completed;
      }
    } catch (e) {
      console.error('Error loading stats:', e);
    }
  }

  // Fetch and render bookings
  async function fetchBookings() {
    try {
      const search = searchInput.value.trim();
      const status = statusFilter.value;
      const city = cityFilter.value;

      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (status !== 'all') params.append('status', status);
      if (city !== 'all') params.append('city', city);

      const res = await fetch(`/api/bookings?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        currentBookings = data.bookings;
        renderTable(currentBookings);
      }
    } catch (e) {
      console.error('Error loading bookings:', e);
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 40px;">Failed to load bookings. Please check server.</td></tr>`;
    }
  }

  // Render Table
  function renderTable(bookings) {
    if (!bookings || bookings.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 40px;">No bookings found matching criteria.</td></tr>`;
      return;
    }

    tableBody.innerHTML = bookings.map(b => {
      const statusClass = b.status.replace(/\s+/g, '');
      const waNumber = b.phone.replace(/[^0-9]/g, '');
      const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hello ${b.customer_name}, regarding your HavenCare request (${b.ref_code}) for ${b.service}...`)}`;

      return `
        <tr>
          <td><span class="ref-tag">${b.ref_code}</span></td>
          <td class="customer-cell">
            <b>${escapeHtml(b.customer_name)}</b>
            <small>${escapeHtml(b.property_type || 'Villa')}</small>
          </td>
          <td>
            <div>${escapeHtml(b.phone)}</div>
            <small style="color: var(--brass);">${escapeHtml(b.city)}</small>
          </td>
          <td>
            <div style="font-weight: 500;">${escapeHtml(b.service)}</div>
            <small style="color: var(--text-muted);">${escapeHtml(b.estimated_cost || 'To be assessed')}</small>
          </td>
          <td>
            <div>${escapeHtml(b.preferred_date || 'Flexible')}</div>
            <small style="color: var(--text-muted);">${escapeHtml(b.preferred_slot || '')}</small>
          </td>
          <td>
            <select class="status-select ${statusClass}" onchange="updateStatus(${b.id}, this.value)">
              <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
              <option value="In Progress" ${b.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </td>
          <td>
            <span style="font-size: 13.5px; color: ${b.assigned_tech === 'Unassigned' ? 'var(--text-muted)' : 'var(--text-primary)'};">
              ${escapeHtml(b.assigned_tech || 'Unassigned')}
            </span>
          </td>
          <td>
            <div class="action-buttons">
              <a class="act-btn" href="${waLink}" target="_blank" title="WhatsApp Customer" aria-label="WhatsApp">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
              <a class="act-btn" href="tel:${b.phone}" title="Call Customer" aria-label="Call">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </a>
              <button class="act-btn" onclick="openEditModal(${b.id})" title="Edit Details" aria-label="Edit">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="act-btn delete" onclick="deleteBooking(${b.id})" title="Delete Booking" aria-label="Delete">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Instant Status Change
  window.updateStatus = async function (id, status) {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Status updated to "${status}"`);
        fetchStats();
        fetchBookings();
      }
    } catch (e) {
      showToast('Error updating status');
    }
  };

  // Open Edit Modal
  window.openEditModal = function (id) {
    const booking = currentBookings.find(b => b.id === id);
    if (!booking) return;

    editingId = id;
    document.getElementById('modalRef').textContent = booking.ref_code;
    document.getElementById('modalCustomer').textContent = booking.customer_name + ' (' + booking.phone + ')';
    document.getElementById('modalStatus').value = booking.status;
    document.getElementById('modalTech').value = booking.assigned_tech || '';
    document.getElementById('modalCost').value = booking.estimated_cost || '';
    document.getElementById('modalNotes').value = booking.notes || '';

    editModal.showModal();
  };

  // Save Edit Form
  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!editingId) return;

    const payload = {
      status: document.getElementById('modalStatus').value,
      assigned_tech: document.getElementById('modalTech').value,
      estimated_cost: document.getElementById('modalCost').value,
      notes: document.getElementById('modalNotes').value
    };

    try {
      const res = await fetch(`/api/bookings/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showToast('Booking details updated successfully.');
        editModal.close();
        fetchStats();
        fetchBookings();
      }
    } catch (e) {
      showToast('Error saving changes.');
    }
  });

  // Delete Booking
  window.deleteBooking = async function (id) {
    if (!confirm('Are you sure you want to remove this booking permanently?')) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('Booking removed.');
        fetchStats();
        fetchBookings();
      }
    } catch (e) {
      showToast('Error deleting booking.');
    }
  };

  // Light dismiss fallback for <dialog closedby="any">
  if (!('closedBy' in HTMLDialogElement.prototype) && editModal) {
    editModal.addEventListener('click', (event) => {
      if (event.target !== editModal) return;
      const rect = editModal.getBoundingClientRect();
      const inDialog = (
        rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX && event.clientX <= rect.left + rect.width
      );
      if (!inDialog) editModal.close();
    });
  }

  // Filter Listeners
  searchInput.addEventListener('input', debounce(fetchBookings, 300));
  statusFilter.addEventListener('change', fetchBookings);
  cityFilter.addEventListener('change', fetchBookings);

  function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initialize
  fetchStats();
  fetchBookings();
  // Auto refresh every 30 seconds
  setInterval(() => {
    fetchStats();
    fetchBookings();
  }, 30000);
})();
