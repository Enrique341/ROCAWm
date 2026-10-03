"use strict";
(() => {
  const products = [
    ["Kit cilindro MK150", "Motor", "Cilindro para motor MK150; confirma diámetro y versión.", "MK150", 10, 175, "cilindro"],
    ["Kit cilindro GL125 CBI", "Motor", "Conjunto de cilindro para GL125 CBI; valida el código del motor.", "GL125 CBI", 6, 168, "cilindro"],
    ["Kit cilindro CB125 Twister", "Motor", "Conjunto de cilindro para CB125 Twister; confirma año y versión.", "CB125 Twister", 6, 148, "cilindro"],
    ["Kit cilindro 190", "Motor", "Cilindro para motor 190; confirma modelo y medidas antes de pedir.", "Modelos 190", 6, 249, "cilindro"],
    ["Kit cilindro Wave 110", "Motor", "Conjunto de cilindro para Wave 110; verifica versión y diámetro.", "Wave 110", 6, 179, "cilindro"],
    ["Kit arrastre Wave 110S", "Transmisión", "Kit de transmisión secundaria; confirma paso y número de dientes.", "Wave 110S", 10, 75, "cadena"],
    ["Kit arrastre XR", "Transmisión", "Kit de transmisión para XR; valida paso de cadena y aplicación.", "XR", 10, 119, "cadena"],
    ["Kit arrastre CB125 Twister", "Transmisión", "Kit de transmisión secundaria; confirma paso y número de dientes.", "CB125 Twister", 6, 77, "cadena"],
    ["Kit rodaje caja Ultra CGL", "Motor", "Rodamientos para caja de cambios; verifica medidas y aplicación.", "Ultra / CGL", 10, 29.9, "rodaje"],
    ["Pista MK150 CBF150 CB190", "Motor", "Pista para las aplicaciones indicadas; confirma ubicación y medidas.", "MK150 / CBF150 / CB190", 15, 27, "rodaje"],
    ["Pista Ultra GL Twister", "Motor", "Pista para las aplicaciones indicadas; confirma ubicación y medidas.", "Ultra / GL / Twister", 10, 18.99, "rodaje"],
    ["Pista XR Tornado XL200", "Motor", "Pista para las aplicaciones indicadas; confirma ubicación y medidas.", "XR / Tornado / XL200", 8, 32.5, "rodaje"],
    ["Filtro de aire XR190", "Admisión", "Elemento filtrante de admisión para XR190; verifica año y versión.", "XR190", 12, 16.5, "filtro"],
    ["Filtro de aire XR150", "Admisión", "Elemento filtrante de admisión para XR150; verifica año y versión.", "XR150", 10, 14.8, "filtro"],
    ["Filtro de aire Dio", "Admisión", "Elemento filtrante de admisión para Dio; confirma versión.", "Dio", 10, 19.5, "filtro"],
    ["Filtro de aire MK150 GL125 Twister", "Admisión", "Filtro de admisión; compara forma y aplicación con tu modelo.", "MK150 / GL125 / Twister", 15, 17.4, "filtro"],
    ["Filtro de aire Wave 110", "Admisión", "Elemento filtrante de admisión para Wave 110; confirma versión.", "Wave 110", 10, 17.5, "filtro"],
    ["Filtro de aire Elit FI 2017–2021", "Admisión", "Filtro de admisión para Elit FI; revisa el año de fabricación.", "Elit FI, 2017–2021", 6, 25.8, "filtro"],
    ["Retén telescópico CGL GL XR", "Suspensión", "Retenes para horquilla telescópica; verifica diámetro y aplicación.", "CGL / GL / XR", 50, 7.2, "reten"],
    ["Retén telescópico Ultra Wave", "Suspensión", "Retenes para horquilla telescópica; verifica diámetro y aplicación.", "Ultra / Wave", 10, 11.5, "reten"],
    ["Retén telescópico CB190 XL200", "Suspensión", "Retenes para horquilla telescópica; verifica diámetro y aplicación.", "CB190 / XL200", 10, 13.5, "reten"],
    ["Retén de válvula Wave XR marrón", "Motor", "Retén de válvula; confirma medida y color antes de instalar.", "Wave / XR, marrón", 100, 2.2, "reten"],
    ["Retén de válvula CGL Ultra", "Motor", "Retén de válvula para las aplicaciones indicadas; confirma medidas.", "CGL / Ultra", 100, 3.2, "reten"],
    ["Zapata Wave XR150", "Frenos", "Zapata de freno; confirma tambor y aplicación de tu motocicleta.", "Wave / XR150", 10, 14.95, "freno"],
    ["Zapata Ultra DT", "Frenos", "Zapata de freno; confirma tambor y aplicación de tu motocicleta.", "Ultra / DT", 10, 15.3, "freno"],
    ["Switch de freno MK150", "Eléctrico", "Interruptor de luz de freno; compara conexión y montaje.", "MK150", 15, 6.2, "switch"],
    ["Switch de freno Ultra", "Eléctrico", "Interruptor de luz de freno; compara conexión y montaje.", "Ultra", 15, 5.95, "switch"],
    ["Carbón de arrancador MK150", "Eléctrico", "Carbones para motor de arranque; confirma dimensiones y terminal.", "MK150", 20, 9.45, "carbon"],
    ["Cadena de leva MK150 XR150 CBF", "Motor", "Cadena de distribución (leva); verifica número de eslabones.", "MK150 / XR150 / CBF", 10, 41.5, "cadena"],
    ["Cadena de leva 190 CBF XR", "Motor", "Cadena de distribución (leva); verifica número de eslabones.", "190 / CBF / XR", 10, 22, "cadena"],
    ["Kit de chapa XR 2014–2023", "Chapas y llaves", "Conjunto de chapa y llaves; confirma modelo y año.", "XR, 2014–2023", 8, 118, "chapa"],
    ["Cadena 428H150L", "Transmisión", "Cadena de transmisión paso 428H, 150 eslabones; confirma longitud.", "428H / 150 eslabones", 30, 18.5, "cadena"],
    ["Kit de chapa Wave 110S", "Chapas y llaves", "Conjunto de chapa y llaves; confirma la versión Wave 110S.", "Wave 110S", 10, 49, "chapa"],
    ["Cadena 428H-130L", "Transmisión", "Cadena de transmisión paso 428H, 130 eslabones; confirma longitud.", "428H / 130 eslabones", 10, 72, "cadena"],
    ["Pista Wave 110S", "Motor", "Pista para Wave 110S; confirma ubicación y medidas con la muestra.", "Wave 110S", 10, 33.5, "rodaje"],
    ["Kit pistón estándar MK150 XR150", "Motor", "Kit de pistón estándar (STD); verifica diámetro y versión del motor.", "MK150 / XR150", 6, 55, "piston"],
    ["Kit pistón 0.25 MK150 XR150", "Motor", "Kit de pistón sobremedida 0.25; confirma rectificación del cilindro.", "MK150 / XR150", 6, 64, "piston"],
    ["Kit pistón estándar CB190 XR190", "Motor", "Kit de pistón estándar (STD); verifica diámetro y versión del motor.", "CB190 / XR190", 6, 69, "piston"],
    ["Kit pistón 0.25 CB190 XR190", "Motor", "Kit de pistón sobremedida 0.25; confirma rectificación del cilindro.", "CB190 / XR190", 6, 63, "piston"],
    ["Kit pistón estándar GL125 CB125 Twister", "Motor", "Kit de pistón estándar (STD); verifica diámetro y versión del motor.", "GL125 / CB125 Twister", 6, 65, "piston"],
    ["Kit pistón 0.25 GL125 CB125 Twister", "Motor", "Kit de pistón sobremedida 0.25; confirma rectificación del cilindro.", "GL125 / CB125 Twister", 6, 64, "piston"],
    ["Kit pistón estándar CGL Ultra", "Motor", "Kit de pistón estándar (STD); verifica diámetro y versión del motor.", "CGL / Ultra", 6, 54, "piston"],
    ["Kit pistón 0.25 CGL Ultra", "Motor", "Kit de pistón sobremedida 0.25; confirma rectificación del cilindro.", "CGL / Ultra", 6, 58, "piston"]
  ];

  const imageNames = {
    cilindro: "repuesto-cilindro.png",
    cadena: "repuesto-cadena.png",
    rodaje: "repuesto-rodaje.png",
    filtro: "repuesto-filtro.png",
    reten: "repuesto-reten.png",
    freno: "repuesto-freno.png",
    switch: "repuesto-switch.png",
    carbon: "repuesto-carbon.png",
    chapa: "repuesto-chapa.png",
    piston: "repuesto-piston.png"
  };

  const makeCard = ([name, family, description, fitment, minimum, price, imageKey]) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.productCard = "";
    card.dataset.category = "repuestos";
    card.dataset.family = family;
    card.dataset.search = `${name} ${family} ${description} ${fitment}`.toLocaleLowerCase("es");
    card.dataset.minimum = String(minimum);
    card.dataset.fitment = fitment;

    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image";
    const image = document.createElement("img");
    image.loading = "lazy";
    image.src = `assets/img/${imageNames[imageKey]}`;
    image.alt = `Ilustración referencial: ${name}`;
    const badge = document.createElement("span");
    badge.className = "product-badge";
    badge.textContent = family;
    imageWrap.append(image, badge);

    const info = document.createElement("div");
    info.className = "product-info";
    const type = document.createElement("span");
    type.className = "type";
    type.textContent = "Repuestos";
    const title = document.createElement("h3");
    title.textContent = name;
    const copy = document.createElement("p");
    copy.textContent = description;
    const application = document.createElement("p");
    application.className = "product-fitment";
    application.textContent = `Aplicación: ${fitment}`;
    const minimumLabel = document.createElement("p");
    minimumLabel.className = "product-minimum";
    minimumLabel.textContent = `Cantidad mínima: ${minimum}`;
    const consult = document.createElement("button");
    consult.className = "btn";
    consult.type = "button";
    consult.dataset.whatsapp = "";
    consult.dataset.product = name;
    consult.textContent = "Consultar disponibilidad";
    info.append(type, title, copy, application, minimumLabel, consult);
    card.append(imageWrap, info);
    return card;
  };

  const grids = [...document.querySelectorAll(".product-grid")];
  const isPartsPage = document.querySelector('.nav-links a.active[href="repuestos.html"]');
  const grid = grids[0];
  if (!grid) return;
  if (!isPartsPage) return;

  const tools = document.createElement("div");
  tools.className = "catalog-tools parts-tools";
  const search = document.createElement("input");
  search.id = "catalog-search";
  search.type = "search";
  search.placeholder = "Buscar repuesto, modelo o aplicación…";
  search.setAttribute("aria-label", "Buscar repuestos");
  const family = document.createElement("select");
  family.id = "catalog-category";
  family.setAttribute("aria-label", "Filtrar repuestos por tipo");
  [["all", "Todos los repuestos"], ["Motor", "Motor"], ["Transmisión", "Transmisión"], ["Admisión", "Admisión"], ["Suspensión", "Suspensión"], ["Frenos", "Frenos"], ["Eléctrico", "Eléctrico"], ["Chapas y llaves", "Chapas y llaves"]].forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    family.append(option);
  });
  tools.append(search, family);
  const counter = document.createElement("p");
  counter.id = "catalog-count";
  counter.className = "catalog-count";
  counter.setAttribute("aria-live", "polite");
  counter.textContent = "43 repuestos";
  const note = document.createElement("p");
  note.className = "parts-note";
  note.textContent = "Consulta precio y disponibilidad por WhatsApp. Cantidad mínima según la lista compartida.";
  const empty = document.createElement("p");
  empty.id = "catalog-empty";
  empty.className = "empty-state";
  empty.hidden = true;
  empty.textContent = "No encontramos repuestos con esa búsqueda. Prueba con otro término.";
  grid.before(tools, counter, note);
  grid.after(empty);
  grid.replaceChildren(...products.map(makeCard));
})();
