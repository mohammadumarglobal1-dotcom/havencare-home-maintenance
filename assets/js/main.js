(function () {
  'use strict';

  /* ---------- sticky nav shadow ---------- */
  var nav = document.querySelector('.site-nav');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  function setMenu(open) {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    mobileMenu.classList.toggle('open', open);
  }
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      setMenu(!(menuToggle.getAttribute('aria-expanded') === 'true'));
    });
    mobileMenu.addEventListener('click', function (ev) {
      if (ev.target && ev.target.tagName === 'A') setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) setMenu(false);
    });
  }

  /* ---------- toast ---------- */
  var toast = document.getElementById('toast');
  var toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3000);
  }

  /* ---------- pre-select service from cards & plans ---------- */
  var serviceSelect = document.getElementById('fService');
  function pickService(value) {
    if (!serviceSelect) return;
    var opts = serviceSelect.options;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].textContent.trim() === value.trim()) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
    var target = document.getElementById('book');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast('Service selected — finish your details below.');
  }
  document.querySelectorAll('.svc-book, .plan-quote').forEach(function (btn) {
    btn.addEventListener('click', function () { pickService(btn.getAttribute('data-service')); });
  });

  /* ---------- contact config ---------- */
  var HAVENCARE_EMAIL = 'contact@havencare.ae';
  var HAVENCARE_WHATSAPP = '923107146019';

  /* ---------- booking form & backend integration ---------- */
  var form = document.getElementById('bookForm');
  var dateInput = document.getElementById('fDate');
  var preview = document.getElementById('preview');
  var previewText = document.getElementById('previewText');
  var confirmationModal = document.getElementById('confirmationModal');
  var trackModal = document.getElementById('trackModal');

  if (dateInput) {
    var today = new Date();
    var pad = function (n) { return String(n).padStart(2, '0'); };
    dateInput.min = today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());
  }

  function field(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }
  function chosenSlot() {
    var r = document.querySelector('input[name="slot"]:checked');
    return r ? r.value : '';
  }
  function niceDate(iso) {
    if (!iso) return '';
    var parts = iso.split('-');
    if (parts.length !== 3) return iso;
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return parseInt(parts[2], 10) + ' ' + months[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
  }

  function markInvalid(el, bad) {
    if (!el) return;
    el.style.borderColor = bad ? '#B4433A' : '';
    el.style.boxShadow = bad ? '0 0 0 3px rgba(180,67,58,0.16)' : '';
  }

  if (form) {
    form.addEventListener('submit', async function (ev) {
      ev.preventDefault();
      var name = document.getElementById('fName');
      var phone = document.getElementById('fPhone');
      var city = document.getElementById('fCity');
      var ok = true;
      [[name, !field('fName')], [phone, !field('fPhone')], [city, !field('fCity')], [serviceSelect, !field('fService')]]
        .forEach(function (pair) { markInvalid(pair[0], pair[1]); if (pair[1]) ok = false; });
      if (!ok) {
        showToast('Please complete all highlighted required fields.');
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Saving Booking...';
      }

      var payload = {
        name: field('fName'),
        phone: field('fPhone'),
        city: field('fCity'),
        service: field('fService'),
        propertyType: field('fProperty'),
        preferredDate: field('fDate'),
        preferredSlot: chosenSlot(),
        notes: field('fNotes')
      };

      try {
        var response = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        var result = await response.json();

        if (result.success && result.booking) {
          var b = result.booking;
          // Populate confirmation modal
          document.getElementById('receiptRef').textContent = b.ref_code;
          document.getElementById('receiptName').textContent = b.customer_name;
          document.getElementById('receiptService').textContent = b.service;
          document.getElementById('receiptCity').textContent = b.city;
          document.getElementById('receiptSchedule').textContent = (niceDate(b.preferred_date) || 'Flexible') + ' (' + b.preferred_slot + ')';
          
          var modalWaBtn = document.getElementById('receiptWaBtn');
          if (modalWaBtn) {
            modalWaBtn.href = result.whatsappUrl || ('https://wa.me/' + HAVENCARE_WHATSAPP);
          }

          if (confirmationModal) {
            confirmationModal.showModal();
          }

          // Also populate on-page preview
          var reqText = [
            'HavenCare — Confirmed Booking',
            'Reference: ' + b.ref_code,
            'Name: ' + b.customer_name,
            'Phone: ' + b.phone,
            'Emirate: ' + b.city,
            'Service: ' + b.service,
            'Preferred date: ' + (niceDate(b.preferred_date) || 'Flexible'),
            'Preferred time: ' + b.preferred_slot,
            'Status: ' + b.status
          ].join('\n');

          if (previewText) previewText.textContent = reqText;
          if (preview) preview.classList.add('show');

          form.reset();
          showToast('Booking ' + b.ref_code + ' confirmed in system!');
        } else {
          showToast(result.message || 'Error creating booking.');
        }
      } catch (err) {
        console.error('Submission error:', err);
        showToast('Network error while saving booking.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Request Booking';
        }
      }
    });

    form.addEventListener('input', function (ev) {
      var t = ev.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA')) markInvalid(t, false);
    });
  }

  /* ---------- Track Booking Dialog Logic ---------- */
  var openTrackBtn = document.getElementById('openTrackBtn');
  var openTrackMobileBtn = document.getElementById('openTrackMobileBtn');
  var trackForm = document.getElementById('trackForm');
  var trackQueryInput = document.getElementById('trackQueryInput');
  var trackResultArea = document.getElementById('trackResultArea');

  function openTracking() {
    if (!trackModal) return;
    if (trackResultArea) trackResultArea.innerHTML = '';
    if (trackQueryInput) trackQueryInput.value = '';
    trackModal.showModal();
  }

  if (openTrackBtn) openTrackBtn.addEventListener('click', openTracking);
  if (openTrackMobileBtn) openTrackMobileBtn.addEventListener('click', openTracking);

  if (trackForm) {
    trackForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      var q = trackQueryInput.value.trim();
      if (!q) {
        showToast('Please enter a reference code or phone number.');
        return;
      }

      trackResultArea.innerHTML = '<div style="text-align: center; color: var(--muted); padding: 18px;">Checking HavenCare records...</div>';

      try {
        var res = await fetch('/api/bookings/track?query=' + encodeURIComponent(q));
        var data = await res.json();

        if (data.success && data.bookings && data.bookings.length > 0) {
          trackResultArea.innerHTML = data.bookings.map(function (b) {
            var statusClass = (b.status || 'Pending').replace(/\s+/g, '');
            return `
              <div class="track-result-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong style="font-family: monospace; font-size: 17px; color: var(--brass);">${b.ref_code}</strong>
                  <span class="track-badge ${statusClass}">${b.status}</span>
                </div>
                <div style="font-size: 15px; font-weight: 500;">${b.service}</div>
                <div style="font-size: 13.5px; color: var(--muted);">
                  📍 ${b.city} (${b.property_type || 'Villa'}) • 🗓️ ${b.preferred_date || 'Flexible'} (${b.preferred_slot || ''})
                </div>
                <div style="font-size: 13px; padding-top: 8px; border-top: 1px dashed var(--line); color: var(--ink-soft);">
                  Assigned Crew: <strong>${b.assigned_tech || 'Unassigned'}</strong>
                </div>
              </div>
            `;
          }).join('');
        } else {
          trackResultArea.innerHTML = `
            <div style="text-align: center; color: #B4433A; padding: 18px;">
              ${data.message || 'No booking found matching that reference.'}
            </div>
          `;
        }
      } catch (err) {
        trackResultArea.innerHTML = '<div style="text-align: center; color: #B4433A; padding: 18px;">Error connecting to tracking service.</div>';
      }
    });
  }

  /* ---------- Modern Web Guidance: Light Dismiss Fallback for Modals ---------- */
  [confirmationModal, trackModal].forEach(function (dlg) {
    if (!dlg) return;
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dlg.addEventListener('click', function (event) {
        if (event.target !== dlg) return;
        var rect = dlg.getBoundingClientRect();
        var inDialog = (
          rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX && event.clientX <= rect.left + rect.width
        );
        if (!inDialog) dlg.close();
      });
    }
  });

  /* ---------- send / copy / download helpers ---------- */
  var copyBtn = document.getElementById('copyBtn');
  var downloadBtn = document.getElementById('downloadBtn');
  var whatsappBtn = document.getElementById('whatsappBtn');
  var emailBtn = document.getElementById('emailBtn');

  function getPreviewText() { return previewText ? previewText.textContent : ''; }

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = getPreviewText();
      function copied() { showToast('Request copied to clipboard.'); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(copied, function () { fallbackCopy(text, copied); });
      } else {
        fallbackCopy(text, copied);
      }
    });
  }
  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* noop */ }
    document.body.removeChild(ta);
    done();
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      var text = getPreviewText();
      var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'HavenCare-booking-request.txt';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 400);
      showToast('Downloaded as HavenCare-booking-request.txt');
    });
  }

  /* Modern Web Guidance: Sync aria-invalid with CSS :user-invalid state */
  var syncAria = function (el) {
    if (!el || typeof el.setAttribute !== 'function') return;
    if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') {
      var isUserInvalid = false;
      try {
        isUserInvalid = el.matches(':user-invalid');
      } catch (e) {
        isUserInvalid = false;
      }
      if (isUserInvalid) {
        el.setAttribute('aria-invalid', 'true');
      } else if (el.hasAttribute('aria-invalid')) {
        el.removeAttribute('aria-invalid');
      }
    }
  };

  document.addEventListener('blur', function (e) { syncAria(e.target); }, true);
  document.addEventListener('input', function (e) {
    if (e.target && e.target.hasAttribute && e.target.hasAttribute('aria-invalid')) syncAria(e.target);
  });
})();
