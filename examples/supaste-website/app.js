/**
 * Supaste Website Interactive Engine
 * Zero external dependencies.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNotchShelf();
  initHeroWindow();
  initPricingSwitcher();
  initFaqAccordions();
  initToast();
});

// Toast notification helper
let toastTimeout;
function showToast(message = "Copied to clipboard") {
  const toast = document.getElementById("toast-pill");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

/**
 * 1. MacBook Notch Shelf Simulator
 */
function initNotchShelf() {
  const notchSimulator = document.querySelector(".notch-shelf-simulator");
  const notchHardware = document.querySelector(".notch-hardware");
  const notchClips = document.querySelectorAll(".notch-clip-item");

  if (!notchSimulator || !notchHardware) return;

  // Toggle open on click
  notchHardware.addEventListener("click", (e) => {
    e.stopPropagation();
    notchSimulator.classList.toggle("is-open");
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!notchSimulator.contains(e.target)) {
      notchSimulator.classList.remove("is-open");
    }
  });

  // Click on clip inside notch
  notchClips.forEach((clip) => {
    clip.addEventListener("click", () => {
      const text = clip.querySelector(".notch-clip-text")?.textContent || "";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
      showToast(`Copied: "${text}"`);
    });
  });
}

/**
 * 2. Hero macOS App Window Filter & Search
 */
function initHeroWindow() {
  const searchInput = document.getElementById("window-search-input");
  const categoryTabs = document.querySelectorAll(".category-tab");
  const clipCards = document.querySelectorAll(".clip-card");

  let activeCategory = "all";
  let searchQuery = "";

  function filterCards() {
    clipCards.forEach((card) => {
      const type = card.dataset.type || "text";
      const text = card.textContent.toLowerCase();

      const matchesCategory = activeCategory === "all" || type === activeCategory;
      const matchesSearch = !searchQuery || text.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Category tab clicks
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      activeCategory = tab.dataset.category || "all";
      filterCards();
    });
  });

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterCards();
    });
  }

  // Card click to copy
  clipCards.forEach((card) => {
    card.addEventListener("click", () => {
      const content = card.querySelector(".clip-content")?.textContent || card.querySelector(".color-hex")?.textContent || "";
      if (content && navigator.clipboard) {
        navigator.clipboard.writeText(content).catch(() => {});
      }
      showToast(`Copied to clipboard: "${content.slice(0, 32)}..."`);
    });
  });
}

/**
 * 3. Interactive Pricing Switcher
 */
function initPricingSwitcher() {
  const tabButtons = document.querySelectorAll(".pricing-tab-btn");
  const mainPriceEl = document.getElementById("pricing-main-price");
  const regularPriceEl = document.getElementById("pricing-regular-price");
  const licenseLabelEl = document.getElementById("pricing-license-label");
  const ctaBtn = document.getElementById("pricing-cta-button");

  if (!tabButtons.length || !mainPriceEl) return;

  const tiers = {
    "1": {
      price: "$15",
      regular: "$29",
      label: "1 device license",
      url: "https://buy.polar.sh/polar_cl_YQNMbLCObEeox7yoSmkQdPZ0dPzKE9Vfc2paR3Z4IWl"
    },
    "2": {
      price: "$25",
      regular: "$49",
      label: "2 device licenses",
      url: "https://buy.polar.sh/polar_cl_wiEN3yz4Qbi87643iu4HlcNSH0p3hYZRpupeq2jlgeB"
    },
    "3": {
      price: "$35",
      regular: "$69",
      label: "3 device licenses",
      url: "https://buy.polar.sh/polar_cl_wPu94n7jBNBqoxyFpV1mCAaScGlkdJdAX2sDM3AAkHP"
    }
  };

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const devices = btn.dataset.devices || "1";
      const config = tiers[devices] || tiers["1"];

      mainPriceEl.textContent = config.price;
      if (regularPriceEl) regularPriceEl.textContent = config.regular;
      if (licenseLabelEl) licenseLabelEl.textContent = config.label;
      if (ctaBtn) {
        ctaBtn.href = config.url;
      }
    });
  });
}

/**
 * 4. Accessible FAQ Accordions
 */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question-btn");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      
      // Close all others for neat reading experience
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          const btn = other.querySelector(".faq-question-btn");
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });

      if (isOpen) {
        item.classList.remove("is-open");
        questionBtn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-open");
        questionBtn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/**
 * 5. Toast DOM element builder if missing
 */
function initToast() {
  if (!document.getElementById("toast-pill")) {
    const toast = document.createElement("div");
    toast.id = "toast-pill";
    toast.className = "toast-pill";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.textContent = "Copied to clipboard";
    document.body.appendChild(toast);
  }
}
