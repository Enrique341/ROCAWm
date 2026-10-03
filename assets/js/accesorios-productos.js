"use strict";
(() => {
  const products = [
    {
      name: "Aceite Yamalube mineral",
      description: "Aceite mineral para motocicleta. Consulta aplicación, presentación y compatibilidad con tu motor.",
      details: "Tipo mineral · Marca Yamalube",
      minimum: "10 cajas",
      image: "aceite-yamalube-mineral.png"
    },
    {
      name: "Aceite Honda mineral",
      description: "Aceite mineral para motocicleta. Confirma viscosidad y aplicación recomendada para tu modelo.",
      details: "Tipo mineral · Marca Honda",
      minimum: "10 cajas",
      image: "aceite-honda-mineral.png"
    },
    {
      name: "Aceite Honda semisintético 10W-30",
      description: "Aceite semisintético con viscosidad 10W-30. Verifica que corresponda a las especificaciones de tu moto.",
      details: "Tipo semisintético · SAE 10W-30",
      minimum: "10 cajas",
      image: "aceite-honda-semisintetico.png"
    },
    {
      name: "Aceite Honda full sintético 10W-30",
      description: "Aceite full sintético con viscosidad 10W-30. Verifica que corresponda a las especificaciones de tu moto.",
      details: "Tipo full sintético · SAE 10W-30",
      minimum: "5 cajas",
      image: "aceite-honda-full-sintetico.png"
    }
  ];

  const makeCard = (product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.productCard = "";
    card.dataset.category = "lubricantes";
    card.dataset.search = `${product.name} ${product.description} ${product.details} ${product.minimum}`.toLocaleLowerCase("es");

    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image";
    const image = document.createElement("img");
    image.loading = "lazy";
    image.src = `assets/img/${product.image}`;
    image.alt = `Ilustración referencial: ${product.name}`;
    const badge = document.createElement("span");
    badge.className = "product-badge";
    badge.textContent = "Lubricantes";
    imageWrap.append(image, badge);

    const info = document.createElement("div");
    info.className = "product-info";
    const type = document.createElement("span");
    type.className = "type";
    type.textContent = "Accesorios y cuidado";
    const title = document.createElement("h3");
    title.textContent = product.name;
    const description = document.createElement("p");
    description.textContent = product.description;
    const details = document.createElement("p");
    details.className = "product-fitment";
    details.textContent = product.details;
    const minimum = document.createElement("p");
    minimum.className = "product-minimum";
    minimum.textContent = `Cantidad mínima: ${product.minimum}`;
    const consult = document.createElement("button");
    consult.className = "btn";
    consult.type = "button";
    consult.dataset.whatsapp = "";
    consult.dataset.product = product.name;
    consult.textContent = "Consultar por WhatsApp";
    info.append(type, title, description, details, minimum, consult);
    card.append(imageWrap, info);
    return card;
  };

  const grid = document.querySelector(".product-grid");
  if (!grid) return;

  grid.replaceChildren(...products.map(makeCard));
})();
