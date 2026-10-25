// Real-world SaaS App: Billing & Seat Management Business Logic
// Preserved across original and Pure SaaS versions

const state = {
  activeTab: 'overview',
  billingCycle: 'monthly', // monthly ($24/seat) or annual ($20/seat)
  seats: 8,
  monthlyRate: 24,
  annualRate: 20,
  filterRole: 'all',
  members: [
    { id: 1, name: 'Elena Rostova', email: 'elena@acme.dev', role: 'admin', status: 'active', lastActive: '12m ago' },
    { id: 2, name: 'Marcus Chen', email: 'mchen@acme.dev', role: 'member', status: 'active', lastActive: '2h ago' },
    { id: 3, name: 'Sarah Jenkins', email: 'sarah.j@acme.dev', role: 'member', status: 'invited', lastActive: 'Pending' },
    { id: 4, name: 'David Kim', email: 'dkim@acme.dev', role: 'viewer', status: 'active', lastActive: '1d ago' },
    { id: 5, name: 'Amina Diallo', email: 'amina@acme.dev', role: 'member', status: 'active', lastActive: '3d ago' },
  ],
  invoices: [
    { id: 'INV-2026-004', date: 'Oct 01, 2026', amount: '$192.00', status: 'Paid', downloadUrl: '#' },
    { id: 'INV-2026-003', date: 'Sep 01, 2026', amount: '$192.00', status: 'Paid', downloadUrl: '#' },
    { id: 'INV-2026-002', date: 'Aug 01, 2026', amount: '$168.00', status: 'Paid', downloadUrl: '#' },
    { id: 'INV-2026-001', date: 'Jul 01, 2026', amount: '$168.00', status: 'Paid', downloadUrl: '#' },
  ]
};

function calculatePricing() {
  const rate = state.billingCycle === 'annual' ? state.annualRate : state.monthlyRate;
  const total = state.seats * rate;
  const annualSavings = (state.monthlyRate - state.annualRate) * state.seats * 12;
  return { rate, total, annualSavings };
}

function updateBillingUI() {
  const { rate, total, annualSavings } = calculatePricing();
  const rateEl = document.getElementById('rate-display');
  const totalEl = document.getElementById('total-display');
  const savingsEl = document.getElementById('savings-display');
  const seatCountEl = document.getElementById('seat-count-display');
  
  if (rateEl) rateEl.textContent = `$${rate}/user/mo`;
  if (totalEl) totalEl.textContent = `$${total}.00 / month`;
  if (seatCountEl) seatCountEl.textContent = `${state.seats} active seats`;
  if (savingsEl) {
    if (state.billingCycle === 'annual') {
      savingsEl.textContent = `Saving $${annualSavings}/year with annual billing`;
      savingsEl.style.display = 'inline-block';
    } else {
      savingsEl.textContent = `Switch to annual to save $${annualSavings}/year`;
      savingsEl.style.display = 'inline-block';
    }
  }
}

function updateTabUI() {
  const tabs = ['overview', 'invoices', 'team'];
  tabs.forEach(tab => {
    const btn = document.getElementById(`tab-btn-${tab}`);
    const view = document.getElementById(`view-${tab}`);
    if (btn && view) {
      if (tab === state.activeTab) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        view.classList.remove('hidden');
        view.style.display = 'block';
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        view.classList.add('hidden');
        view.style.display = 'none';
      }
    }
  });
}

function renderMembers() {
  const listEl = document.getElementById('member-list-body');
  if (!listEl) return;
  
  const filtered = state.members.filter(m => {
    if (state.filterRole === 'all') return true;
    return m.role === state.filterRole;
  });
  
  listEl.innerHTML = '';
  filtered.forEach(m => {
    const tr = document.createElement('tr');
    tr.className = 'member-row';
    tr.id = `member-${m.id}`;
    tr.innerHTML = `
      <td class="col-name">
        <span class="member-name">${m.name}</span>
        <span class="member-email">${m.email}</span>
      </td>
      <td class="col-role"><span class="badge badge-role">${m.role.toUpperCase()}</span></td>
      <td class="col-status"><span class="badge badge-status status-${m.status}">${m.status}</span></td>
      <td class="col-active tabular-num">${m.lastActive}</td>
      <td class="col-actions">
        <button class="action-btn remove-btn" data-id="${m.id}" title="Remove user">Remove</button>
      </td>
    `;
    listEl.appendChild(tr);
  });
  
  const countEl = document.getElementById('filtered-count');
  if (countEl) countEl.textContent = `Showing ${filtered.length} of ${state.members.length} members`;
}

function initApp() {
  // Tab click listeners
  ['overview', 'invoices', 'team'].forEach(tab => {
    const btn = document.getElementById(`tab-btn-${tab}`);
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        state.activeTab = tab;
        updateTabUI();
      });
    }
  });

  // Billing cycle listeners
  const cycleMonthly = document.getElementById('billing-cycle-monthly');
  const cycleAnnual = document.getElementById('billing-cycle-annual');
  if (cycleMonthly && cycleAnnual) {
    cycleMonthly.addEventListener('click', () => {
      state.billingCycle = 'monthly';
      cycleMonthly.classList.add('selected');
      cycleAnnual.classList.remove('selected');
      updateBillingUI();
    });
    cycleAnnual.addEventListener('click', () => {
      state.billingCycle = 'annual';
      cycleAnnual.classList.add('selected');
      cycleMonthly.classList.remove('selected');
      updateBillingUI();
    });
  }

  // Seat slider listeners
  const seatSlider = document.getElementById('seat-slider');
  if (seatSlider) {
    seatSlider.value = state.seats;
    seatSlider.addEventListener('input', (e) => {
      state.seats = parseInt(e.target.value, 10);
      updateBillingUI();
    });
  }

  // Member filter listeners
  const filterSelect = document.getElementById('role-filter');
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      state.filterRole = e.target.value;
      renderMembers();
    });
  }

  // Add member form
  const addForm = document.getElementById('add-member-form');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('new-name');
      const emailInput = document.getElementById('new-email');
      const roleInput = document.getElementById('new-role');
      if (nameInput && emailInput && nameInput.value && emailInput.value) {
        const newId = Date.now();
        state.members.push({
          id: newId,
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          role: roleInput ? roleInput.value : 'member',
          status: 'invited',
          lastActive: 'Just now'
        });
        nameInput.value = '';
        emailInput.value = '';
        renderMembers();
      }
    });
  }

  // Delegate remove member
  const memberTable = document.getElementById('member-list-body');
  if (memberTable) {
    memberTable.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('remove-btn')) {
        const id = parseInt(e.target.getAttribute('data-id'), 10);
        state.members = state.members.filter(m => m.id !== id);
        renderMembers();
      }
    });
  }

  // Initial render
  updateTabUI();
  updateBillingUI();
  renderMembers();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Export for test harness automation
if (typeof window !== 'undefined') {
  window.__APP_STATE__ = state;
  window.__APP_API__ = { calculatePricing, updateBillingUI, updateTabUI, renderMembers };
}
