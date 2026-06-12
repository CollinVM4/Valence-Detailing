const settings = {
  businessName: "Valence Details",
  detailerEmail: "devon@valencedetails.com",
  detailerPhone: "4079195814"
};

const packageData = {
  express: {
    id: "express",
    name: "Express Detail",
    snippet: "Basic interior & exterior detail",
    prices: { coupe: "$140", suv: "$150 - $160" },
    priceLabel: "Vehicle Type Price",
    note: "",
    includes: [
      "Snow foam pre-soak to loosen dirt & road grime",
      "2 bucket contact wash with pH neutral soap",
      "Bug & tar removal",
      "Wheels & tires cleaned",
      "Spot-free water rinse",
      "Hand dry",
      "Tire shine",
      "Interior air blow out",
      "Interior vacuum & detail",
      "Door jambs cleaned",
      "Windows & mirrors streak free clean"
    ]
  },
  premium: {
    id: "premium",
    name: "Premium Full Detail",
    snippet: "Deep interior & basic exterior",
    prices: { coupe: "$180", suv: "$190 - $210" },
    priceLabel: "Vehicle Type Price",
    note: "Price depends on condition of interior.",
    includes: [
      "Snow foam pre-soak to loosen dirt & road grime",
      "2 bucket contact wash with pH neutral soap",
      "Bug & tar removal",
      "Wheels & tires cleaned",
      "Spot-free water rinse",
      "3 month ceramic spray wax",
      "Hand dry",
      "Tire shine",
      "Interior blow out",
      "Deep vacuum & shampoo (carpets, seats, mats)",
      "Leather / plastics cleaned & protected",
      "Door jambs cleaned",
      "Windows & mirrors streak free clean"
    ]
  },
  paint: {
    id: "paint",
    name: "Paint Correction",
    snippet: "Exterior detail + clay bar & polish",
    prices: { coupe: "$80 exterior wash + $100 per hour machine polishing", suv: "$80 exterior wash + $100 per hour machine polishing" },
    priceLabel: "Pricing",
    note: "",
    includes: [
      "Snow foam pre-soak to loosen dirt & road grime",
      "2 bucket contact wash with pH neutral soap",
      "Bug & tar removal",
      "Wheels & barrels cleaned",
      "Spot-free water rinse",
      "Hand dry",
      "Tire shine",
      "Iron removal",
      "Clay bar",
      "Machine polish to remove light scratches and swirl marks",
      "Alcohol wipe down to remove polish residue",
      "Wax sealant to preserve paint"
    ]
  }
};

const addOns = [
  "Pet hair removal $30 - $50",
  "Headlight restoration $50",
  "Engine bay cleaning $60",
  "Severe stain removal $50",
  "Glass protectant $50",
  "Ceramic wax spray $30",
  "Leather treatment $20"
];

const homeCarouselImages = [
  {
    src: "media/carosuel.png",
    alt: "Clean red sports car after detailing",
    caption: ""
  },
  {
    src: "media/IMG_0483.png",
    alt: "HONDA",
    caption: "" 
  }

];

const galleryImagesByCategory = {
  exterior: [
    { src: "media/IMG_0482.png", alt: "Exterior detail example 2" },
    { src: "media/IMG_0483.png", alt: "Exterior detail example 3" },
    { src: "media/IMG_0568.png", alt: "Exterior detail example 4" },
    { src: "media/IMG_0569.png", alt: "Exterior detail example 4" },
    { src: "media/IMG_0570.png", alt: "Exterior detail example 5" },
    { src: "media/IMG_0572.png", alt: "Exterior detail example 6" }
  ],
  interior: [
    { src: "media/IMG_0479.png", alt: "Interior detail example 1" },
    { src: "media/IMG_0480.png", alt: "Interior detail example 2" },
    { src: "media/IMG_0481.png", alt: "Interior detail example 3" },
    { src: "media/IMG_0560.png", alt: "Interior detail example 4" },
    { src: "media/IMG_0561.png", alt: "Interior detail example 5" },
    { src: "media/IMG_0563.png", alt: "Interior detail example 6" },
    { src: "media/IMG_0564.png", alt: "Interior detail example 4" }
  ]
};

let selectedVehicleType = "coupe";

function formatPrice(value) {
  return value;
}

function startEmail(subject, message) {
  const emailLink = `mailto:${settings.detailerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  window.location.href = emailLink;
}

function startSms(message) {
  const smsLink = `sms:${settings.detailerPhone}?body=${encodeURIComponent(message)}`;
  window.location.href = smsLink;
}

function setupMenu() {
  const menuButton = document.getElementById("menuButton");
  const siteNav = document.getElementById("siteNav");

  if (!menuButton || !siteNav) {
    return;
  }

  menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((navLink) => {
    navLink.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

function buildCardMarkup(pkg) {
  return `
    <article class="service-card">
      <h3><a class="service-title-link" href="services.html#package-${pkg.id}">${pkg.name}</a></h3>
      <p>${pkg.snippet}</p>
      <p class="price-line"><strong>Price:</strong> <span data-price-for="${pkg.id}"></span></p>
      <a class="button" href="services.html#package-${pkg.id}">View Details</a>
    </article>
  `;
}

function renderPackageCards() {
  const homeContainer = document.getElementById("packageCardsHome");
  const cardsMarkup = Object.values(packageData)
    .map((pkg) => buildCardMarkup(pkg))
    .join("");

  if (homeContainer) {
    homeContainer.innerHTML = cardsMarkup;
  }

  updateCardPrices();
}

function updateCardPrices() {
  const label = selectedVehicleType === "coupe" ? "Coupe / Sedan" : "SUV / Truck";

  document.querySelectorAll("[data-price-for]").forEach((priceElement) => {
    const packageId = priceElement.getAttribute("data-price-for");
    const pkg = packageData[packageId];

    if (!pkg) {
      return;
    }

    const price = pkg.prices[selectedVehicleType] || pkg.prices.coupe;
    priceElement.textContent = `${label}: ${formatPrice(price)}`;
  });
}

function renderServicesPage() {
  const servicesPackages = document.getElementById("servicesPackages");

  if (!servicesPackages) {
    return;
  }

  const packageMarkup = Object.values(packageData)
    .map(
      (pkg) => `
        <article class="service-panel" id="package-${pkg.id}">
          <div class="service-panel-inner">
            <h2>${pkg.name}</h2>
            <p class="service-snippet">${pkg.snippet}</p>
            <p class="service-price-label"><strong>${pkg.priceLabel}</strong></p>
            ${
              pkg.id === "paint"
                ? `<p class="price-line">${pkg.prices.coupe}</p>`
                : `
                  <p class="price-line"><strong>Sedan / Coupe:</strong> ${pkg.prices.coupe}</p>
                  <p class="price-line"><strong>Truck / SUV:</strong> ${pkg.prices.suv}</p>
                `
            }
            ${pkg.note ? `<p class="price-note">*${pkg.note}*</p>` : ""}
            <h3>Includes</h3>
            <ul class="includes-list">
              ${pkg.includes.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </article>
      `
    )
    .join("");

  const addOnsMarkup = `
    <section class="service-panel add-ons-panel" id="package-add-ons">
      <div class="service-panel-inner">
        <h2>Add-Ons</h2>
        <ul class="includes-list">
          ${addOns.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </section>
  `;

  servicesPackages.innerHTML = `${packageMarkup}${addOnsMarkup}`;
}

function setupVehicleSelectors() {
  const selectorButtons = document.querySelectorAll("[data-vehicle-selector] .vehicle-button");

  selectorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedVehicleType = button.getAttribute("data-vehicle") || "coupe";

      selectorButtons.forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });

      updateCardPrices();
    });
  });
}

function setupHomeCarousel() {
  const image = document.getElementById("carouselImage");
  const caption = document.getElementById("carouselCaption");
  const prevButton = document.getElementById("carouselPrev");
  const nextButton = document.getElementById("carouselNext");

  if (!image || !caption || !prevButton || !nextButton) {
    return;
  }

  let currentIndex = 0;
  const carouselItems = homeCarouselImages.slice(0, 4);

  if (!carouselItems.length) {
    return;
  }

  function renderSlide() {
    const slide = carouselItems[currentIndex];
    image.src = slide.src;
    image.alt = slide.alt;
    caption.textContent = slide.caption;
  }

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    renderSlide();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    renderSlide();
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    renderSlide();
  }, 4000);

  renderSlide();
}

function setupGalleryPagination() {
  const galleryGrid = document.getElementById("galleryGrid");
  const prevButton = document.getElementById("galleryPrev");
  const nextButton = document.getElementById("galleryNext");
  const pageLabel = document.getElementById("galleryPageLabel");
  const toggleButtons = document.querySelectorAll("[data-gallery-type]");

  if (!galleryGrid || !prevButton || !nextButton || !pageLabel) {
    return;
  }

  const pageSize = 6;
  let currentPage = 1;
  let galleryType = "exterior";

  function getActiveImages() {
    return galleryImagesByCategory[galleryType] || [];
  }

  function renderPage() {
    const activeImages = getActiveImages();
    const totalPages = Math.max(1, Math.ceil(activeImages.length / pageSize));

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const start = (currentPage - 1) * pageSize;
    const pageItems = activeImages.slice(start, start + pageSize);

    galleryGrid.innerHTML = pageItems
      .map(
        (item) => `
          <figure class="gallery-item">
            <img src="${item.src}" alt="${item.alt}" />
          </figure>
        `
      )
      .join("");

    pageLabel.textContent = `Page ${currentPage} of ${totalPages}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  }

  prevButton.addEventListener("click", () => {
    const totalPages = Math.max(1, Math.ceil(getActiveImages().length / pageSize));

    if (currentPage > 1) {
      currentPage -= 1;
      renderPage();
    }
  });

  nextButton.addEventListener("click", () => {
    const totalPages = Math.max(1, Math.ceil(getActiveImages().length / pageSize));

    if (currentPage < totalPages) {
      currentPage += 1;
      renderPage();
    }
  });

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      galleryType = button.getAttribute("data-gallery-type") || "exterior";
      currentPage = 1;

      toggleButtons.forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });

      renderPage();
    });
  });

  renderPage();
}

function setupPackageDetailPage() {
  const packageName = document.getElementById("packageName");
  const packageSnippet = document.getElementById("packageSnippet");
  const packagePriceCoupe = document.getElementById("packagePriceCoupe");
  const packagePriceSuv = document.getElementById("packagePriceSuv");
  const packagePriceNote = document.getElementById("packagePriceNote");
  const packageIncludes = document.getElementById("packageIncludes");
  const bookNowButton = document.getElementById("bookNowButton");
  const bookingModal = document.getElementById("bookingModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const bookingForm = document.getElementById("bookingForm");
  const bookingMessage = document.getElementById("bookingMessage");
  const selectedPackageInput = document.getElementById("selectedPackage");

  if (!packageName || !packageSnippet || !packagePriceCoupe || !packagePriceSuv || !packagePriceNote || !packageIncludes || !bookNowButton || !bookingModal || !modalBackdrop || !modalClose || !bookingForm || !bookingMessage || !selectedPackageInput) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const packageId = params.get("package") || "express";
  const pkg = packageData[packageId] || packageData.express;

  packageName.textContent = pkg.name;
  packageSnippet.textContent = pkg.snippet;
  packagePriceCoupe.textContent = formatPrice(pkg.prices.coupe);
  packagePriceSuv.textContent = formatPrice(pkg.prices.suv);
  packagePriceNote.textContent = pkg.note;
  selectedPackageInput.value = pkg.name;

  packageIncludes.innerHTML = pkg.includes.map((line) => `<li>${line}</li>`).join("");

  function openModal() {
    bookingModal.classList.add("is-open");
    bookingModal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    bookingModal.classList.remove("is-open");
    bookingModal.setAttribute("aria-hidden", "true");
  }

  bookNowButton.addEventListener("click", openModal);
  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(bookingForm).entries());
    const subject = `${settings.businessName} - ${formData.selectedPackage} Booking Request`;
    const message = [
      `${settings.businessName} Booking Request`,
      "",
      `Package: ${formData.selectedPackage}`,
      `Name: ${formData.fullName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Preferred Contact: ${formData.preferredContact}`
    ].join("\n");

    if (formData.preferredContact === "sms") {
      startSms(message);
      bookingMessage.textContent = "Opening your text message app...";
    } else {
      startEmail(subject, message);
      bookingMessage.textContent = "Opening your email app...";
    }
  });
}

setupMenu();
renderPackageCards();
setupVehicleSelectors();
renderServicesPage();
setupHomeCarousel();
setupGalleryPagination();
setupPackageDetailPage();
