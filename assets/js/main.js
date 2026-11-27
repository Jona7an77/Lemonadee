/* Lemonadee — shared page behaviour */

(function () {
  /* ---------- Mobile menu ---------- */
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
  }
  window.lemonToast = toast;

  /* ---------- Cart (placeholder until checkout is chosen) ----------
     Counts items in this browser only. Replace with Stripe Payment Links,
     Snipcart, Shopify Buy Button, etc. when you decide on checkout. */
  const KEY = "lemonadee-cart-count";
  function getCount() {
    try { return parseInt(localStorage.getItem(KEY) || "0", 10) || 0; } catch (e) { return 0; }
  }
  function setCount(n) {
    try { localStorage.setItem(KEY, String(n)); } catch (e) { /* storage off */ }
    renderCount();
  }
  function renderCount() {
    const n = getCount();
    document.querySelectorAll("[data-cart-count]").forEach(el => (el.textContent = n));
    document.querySelectorAll(".cart-btn").forEach(el => el.setAttribute("aria-label", `Cart, ${n} item${n === 1 ? "" : "s"}`));
  }
  window.lemonAddToCart = function (qty) {
    setCount(getCount() + (qty || 1));
    toast("Added to cart. Online checkout is coming soon — use Custom order to buy now.");
  };
  document.querySelectorAll(".cart-btn").forEach(btn =>
    btn.addEventListener("click", e => {
      e.preventDefault();
      toast("Checkout is coming soon. Send an order request from the Custom order page.");
    })
  );
  renderCount();

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));
})();
