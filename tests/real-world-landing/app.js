// Aether Engine Landing Page Runtime Interactions

const TERMINAL_SNIPPETS = {
  curl: [
    '<span class="cmd">$</span> aether deploy --cluster prod-global',
    'Compiling 14 modules to Wasm bytecode... [12ms]',
    'Distributing to 42 edge regions... [DONE]',
    'Cluster active: https://prod-global.aether.run (p99 latency 1.4ms)'
  ],
  node: [
    '<span class="cmd">$</span> npm install @aether/runtime',
    'import { serve } from "@aether/runtime";',
    'export default serve((req) => new Response("Fast!"));',
    'Ready at localhost:3000 [3ms]'
  ],
  rust: [
    '<span class="cmd">$</span> cargo aether build --release',
    'Finished release [optimized] target in 0.42s',
    'Binary size: 142KB (stripped)',
    'Verified deterministic footprint.'
  ]
};

const state = {
  activeTab: 'curl',
  billingCycle: 'monthly',
  copied: false
};

function initLanding() {
  const terminalTabs = document.querySelectorAll('.terminal-tabs .tab-btn');
  const terminalContent = document.getElementById('terminal-content');
  const cycleToggle = document.getElementById('cycle-toggle');
  const priceEnterprise = document.getElementById('price-enterprise');
  const copyBtn = document.getElementById('copy-btn');
  const installCmd = document.getElementById('install-command');

  if (terminalTabs && terminalContent) {
    terminalTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        if (!target || !TERMINAL_SNIPPETS[target]) return;

        state.activeTab = target;
        terminalTabs.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        terminalContent.innerHTML = TERMINAL_SNIPPETS[target]
          .map(line => `<p class="mono ${line.includes('$') ? '' : 'output'}">${line}</p>`)
          .join('');
      });
    });
  }

  if (cycleToggle && priceEnterprise) {
    cycleToggle.addEventListener('click', () => {
      if (state.billingCycle === 'monthly') {
        state.billingCycle = 'annual';
        cycleToggle.textContent = 'Switch to Monthly';
        priceEnterprise.textContent = '$96 /mo (Billed Annually)';
      } else {
        state.billingCycle = 'monthly';
        cycleToggle.textContent = 'Switch to Annual (-20%)';
        priceEnterprise.textContent = '$120 /mo';
      }
    });
  }

  if (copyBtn && installCmd) {
    copyBtn.addEventListener('click', () => {
      state.copied = true;
      copyBtn.setAttribute('title', 'Copied to clipboard!');
    });
  }

  // Mount API for programmatic and headless testing
  if (typeof window !== 'undefined') {
    window.__AETHER_STATE__ = state;
    window.__AETHER_SNIPPETS__ = TERMINAL_SNIPPETS;
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanding);
  } else {
    initLanding();
  }
}
