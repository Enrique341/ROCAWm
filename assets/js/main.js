
"use strict";
(() => {
  const intro = document.getElementById("brand-intro");
  if (intro) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) intro.remove();
    else window.setTimeout(() => { intro.classList.add("intro-finished"); window.setTimeout(() => intro.remove(), 180); }, 1120);
  }


  // Videos verticales: reproducción silenciosa cuando están visibles y pausa fuera de pantalla.
  const motionVideos = [...document.querySelectorAll("[data-motion-video]")];
  if (motionVideos.length) {
    const motionObserver = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting && document.visibilityState === "visible") {
          const playAttempt = video.play();
          if (playAttempt && typeof playAttempt.catch === "function") playAttempt.catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.2 }) : null;
    motionVideos.forEach((video) => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      if (motionObserver) motionObserver.observe(video);
      else { const playAttempt = video.play(); if (playAttempt?.catch) playAttempt.catch(() => {}); }
      video.addEventListener("error", () => { video.pause(); }, { once: true });
    });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") motionVideos.forEach((video) => video.pause());
    });
  }

  const visibleAudioVideo = document.querySelector("[data-play-when-visible]");
  if (visibleAudioVideo && "IntersectionObserver" in window) {
    const audioVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting && document.visibilityState === "visible") {
          const audioStatus = video.parentElement.querySelector("[data-video-audio-status]");
          if (audioStatus) audioStatus.hidden = true;
          video.muted = false;
          video.defaultMuted = false;
          video.volume = 1;
          const playAttempt = video.play();
          if (playAttempt && typeof playAttempt.catch === "function") {
            playAttempt.catch((error) => {
              if (error.name === "NotAllowedError") {
                if (audioStatus) audioStatus.hidden = false;
              } else {
                console.error("No se pudo reproducir el video de la tienda.", error);
              }
            });
          }
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.35 });
    audioVideoObserver.observe(visibleAudioVideo);
  }

  // Al seguir un enlace a otra página, el documento nuevo vuelve a mostrar la entrada de marca.


  // Transición de marca breve al navegar entre páginas internas.
  const transition = document.getElementById("page-transition");
  if (transition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || link.target === "_blank" || link.hasAttribute("download") || /^(https?:|mailto:|tel:|javascript:)/i.test(href)) return;
      link.addEventListener("click", (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const destination = new URL(href, window.location.href);
        if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname && destination.search === window.location.search) return;
        event.preventDefault();
        transition.classList.add("is-active");
        window.setTimeout(() => { window.location.href = destination.href; }, 620);
      });
    });
  }


  // Acabado de navegación: header compacto al desplazarse.
  const header = document.querySelector(".site-header");
  const syncHeader = () => header?.classList.toggle("scrolled", window.scrollY > 18);
  window.addEventListener("scroll", syncHeader, { passive: true });
  syncHeader();

  // Microinteracción discreta en tarjetas: responde al puntero sin exagerar el efecto.
  if (window.matchMedia("(pointer:fine) and (prefers-reduced-motion:no-preference)").matches) {
    document.querySelectorAll(".product-card, .catalog-card, .featured-brand").forEach(card => {
      card.addEventListener("pointermove", e => {
        const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        card.style.setProperty("--mx", `${x*1.8}deg`); card.style.setProperty("--my", `${-y*1.8}deg`);
      });
      card.addEventListener("pointerleave", () => { card.style.removeProperty("--mx"); card.style.removeProperty("--my"); });
    });
  }

  const WHATSAPP_NUMBER = "51939017959";
  const whatsappUrl = (product = "") => {
    const cleanProduct = String(product).replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 120);
    const message = cleanProduct
      ? `Hola, Importadora de Repuestos La Roca. Quisiera consultar por ${cleanProduct}.`
      : "Hola, Importadora de Repuestos La Roca. Quisiera información sobre sus productos.";
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const detailRoot = document.querySelector("[data-product-detail]");
  if (detailRoot) {
    const params = new URLSearchParams(window.location.search);
    const safe = (value, fallback, max = 180) => (value || "").replace(/[\u0000-\u001f\u007f<>]/g, "").trim().slice(0, max) || fallback;
    const name = safe(params.get("nombre"), "Producto La Roca");
    const categoryValue = safe(params.get("categoria"), "productos", 50);
    const description = safe(params.get("descripcion"), "Consulta con nuestro equipo para confirmar características y disponibilidad.", 350);
    const fitment = safe(params.get("aplicacion"), "", 120);
    const imageValue = params.get("imagen") || "assets/img/ing.png";
    const image = /^(assets\/img\/[a-zA-Z0-9._-]+)$/.test(imageValue) ? imageValue : "assets/img/ing.png";
    const setText = (selector, value) => { const el = detailRoot.querySelector(selector); if (el) el.textContent = value; };
    setText("[data-detail-name]", name);
    setText("[data-detail-category]", categoryValue.replace(/-/g, " "));
    setText("[data-detail-description]", description);
    setText("[data-detail-breadcrumb]", name);
    const backLink = detailRoot.querySelector("[data-detail-back]");
    if (backLink && categoryValue === "repuestos") backLink.href = "repuestos.html";
    const img = detailRoot.querySelector("[data-detail-image]");
    if (img) { img.src = image; img.alt = name; }
    const consult = detailRoot.querySelector("[data-detail-whatsapp]");
    if (consult) consult.dataset.product = name;
    const specs = detailRoot.querySelector("[data-detail-specs]");
    const guidance = categoryValue === "motos"
      ? ["Consulta modelos y versiones disponibles.", "Solicita ficha técnica, garantía y condiciones de entrega.", "Confirma precio y stock antes de visitar la tienda."]
      : categoryValue === "repuestos"
      ? ["Comparte marca, modelo, año y cilindrada de tu moto.", "Envía una foto o código de la pieza si lo tienes.", "Verificaremos compatibilidad y disponibilidad contigo."]
      : ["Consulta marcas, medidas, tallas o presentaciones disponibles.", "Confirma compatibilidad con tu motocicleta.", "Precio y disponibilidad sujetos a confirmación de la tienda."];
    if (specs) {
      if (fitment) {
        const li = document.createElement("li");
        li.textContent = `Aplicación indicada: ${fitment}. Confirma año, versión y medidas antes de comprar.`;
        specs.append(li);
      }
      guidance.forEach((line) => { const li = document.createElement("li"); li.textContent = line; specs.append(li); });
    }
    document.title = `${name} | Importadora La Roca`;
  }

  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      const url = whatsappUrl(el.dataset.product || "");
      const opened = window.open(url, "_blank", "noopener,noreferrer");
      if (!opened) window.location.href = url;
    });
  });

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menú";
    };
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "Cerrar menú" : "Menú";
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", (event) => {
      if (nav.classList.contains("open") && !nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  const backTop = document.querySelector(".back-top");
  const updateBackTop = () => backTop?.classList.toggle("show", window.scrollY > 450);
  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();
  backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const search = document.querySelector("#catalog-search");
  const category = document.querySelector("#catalog-category");
  const cards = [...document.querySelectorAll("[data-product-card]")];
  function filterCatalog() {
    if (!cards.length) return;
    const query = (search?.value || "").toLocaleLowerCase("es").trim();
    const selectedCategory = category?.value || "all";
    let count = 0;
    cards.forEach((card) => {
      const text = (card.dataset.search || card.textContent || "").toLocaleLowerCase("es");
      const visible = text.includes(query) && (selectedCategory === "all" || card.dataset.category === selectedCategory || card.dataset.family === selectedCategory);
      card.hidden = !visible;
      if (visible) count += 1;
    });
    const counter = document.querySelector("#catalog-count");
    if (counter) counter.textContent = `${count} ${count === 1 ? "producto encontrado" : "productos encontrados"}`;
    const empty = document.querySelector("#catalog-empty");
    if (empty) empty.hidden = count !== 0;
  }
  search?.addEventListener("input", filterCatalog);
  category?.addEventListener("change", filterCatalog);
  filterCatalog();

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  // External links should not receive a reference to the originating page.
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.rel = "noopener noreferrer";
  });
})();
