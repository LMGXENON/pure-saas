// Operon Interactive Logic & Scroll Choreography
// Grounded in Convio.dev Craft Analysis:
// - 4-stage stepper navigation with keyboard arrow navigation
// - Interactive live approval gate with status mutation
// - Pricing cycle toggle
// - IntersectionObserver entrance reveals with prefers-reduced-motion fallback

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Interactive 4-Stage Architectural Stepper
  const tabs = document.querySelectorAll('.stepper-tab');
  const panels = document.querySelectorAll('.stepper-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetStep = tab.getAttribute('data-step');

      // Update tabs
      tabs.forEach(t => {
        const isActive = t === tab;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Update panels
      panels.forEach(panel => {
        const matches = panel.getAttribute('data-step') === targetStep;
        if (matches) {
          panel.classList.remove('hidden');
          if (!prefersReducedMotion) {
            panel.classList.add('animate-cv-in');
          }
        } else {
          panel.classList.add('hidden');
          panel.classList.remove('animate-cv-in');
        }
      });
    });

    // Keyboard arrow navigation for tabs
    tab.addEventListener('keydown', (e) => {
      let index = Array.from(tabs).indexOf(tab);
      if (e.key === 'ArrowRight') {
        index = (index + 1) % tabs.length;
        tabs[index].focus();
        tabs[index].click();
      } else if (e.key === 'ArrowLeft') {
        index = (index - 1 + tabs.length) % tabs.length;
        tabs[index].focus();
        tabs[index].click();
      }
    });
  });

  // 2. Interactive Production Approval Gate (The core human-in-the-loop innovation)
  const approveBtn = document.getElementById('btn-approve-release');
  const gateStatusBadge = document.getElementById('gate-status-badge');
  const gateTitle = document.getElementById('gate-title-status');
  const gateHash = document.getElementById('gate-hash-sig');

  if (approveBtn && gateStatusBadge && gateTitle) {
    approveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isApproved = approveBtn.getAttribute('data-approved') === 'true';

      if (!isApproved) {
        // Mutate state to Approved
        approveBtn.setAttribute('data-approved', 'true');
        approveBtn.textContent = 'Revoke Approval';
        approveBtn.style.backgroundColor = 'var(--color-status-error)';
        
        gateStatusBadge.textContent = 'Approved · Ready to Deploy';
        gateStatusBadge.className = 'status-badge success';
        
        if (gateTitle) {
          gateTitle.textContent = 'Release Gate: Approved by Platform Lead';
        }
        if (gateHash) {
          gateHash.textContent = 'Sig: 0x9f4a7c1822e1b4f6 · Ed25519 Verified';
          gateHash.style.color = 'var(--color-status-success)';
        }
      } else {
        // Reset to pending
        approveBtn.setAttribute('data-approved', 'false');
        approveBtn.textContent = 'Sign & Release';
        approveBtn.style.backgroundColor = 'var(--color-status-success)';
        
        gateStatusBadge.textContent = 'Action Required';
        gateStatusBadge.className = 'status-badge warning';
        
        if (gateTitle) {
          gateTitle.textContent = 'Release Gate: Production Release Pending';
        }
        if (gateHash) {
          gateHash.textContent = 'Awaiting Ed25519 Lead Signature';
          gateHash.style.color = 'var(--color-text-muted)';
        }
      }
    });
  }

  // 3. Pricing Period Toggle
  const pricingCards = document.querySelectorAll('.pricing-card');
  const pricingPrices = {
    sandbox: { monthly: '$0', annual: '$0', subtext: 'Forever free in development' },
    pro: { monthly: '$39', annual: '$31', subtext: 'per user / month, billed annually' },
    enterprise: { monthly: '$120', annual: '$96', subtext: 'per seat / month, billed annually' }
  };

  // 4. Scroll-Triggered Entrance Reveals via IntersectionObserver
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-cv-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // If reduced motion is preferred, immediately show all elements without transitions
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  // Auto-trigger approved state if specified in URL query
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('approved') === 'true' && approveBtn) {
    approveBtn.click();
  }

  // Export for test harness automation
  if (typeof window !== 'undefined') {
    window.__OPERON_DEMO__ = {
      setActiveStep: (step) => {
        const t = document.querySelector(`.stepper-tab[data-step="${step}"]`);
        if (t) t.click();
      },
      triggerApproval: () => {
        if (approveBtn) approveBtn.click();
      }
    };
  }
});
