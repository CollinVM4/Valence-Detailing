const settings = {
  businessName: "Valence Details",
  detailerEmail: "devon@valencedetails.com",
  detailerPhone: "4079195814"
};

const packageData = {
  express: {
    id: "express",
    name: "Express Detail",
    snippet: "Basic interior & exterior detail.",
    prices: { coupe: 140, suv: 150, truck: 160 },
    note: "Price may vary by vehicle condition.",
    includes: [
      "Hand wash & dry",
      "Wheels cleaned",
      "Tire dressing",
      "Interior vacuum and wipe down",
      "Windows & mirrors cleaned"
    ]
  },
  premium: {
    id: "premium",
    name: "Premium Full Detail",
    snippet: "Deep interior & basic exterior.",
    prices: { coupe: 180, suv: 190, truck: 210 },
    note: "Price depends on condition of interior.",
    includes: [
      "Hand wash & dry",
      "Wheels cleaned",
      "Tire dressing",
      "Interior blow out",
      "Deep vacuum & shampoo (carpets, seats, mats)",
      "Leather/plastics cleaned & protected",
      "Door jambs cleaned",
      "Glass inside & out"
    ]
  },
  paint: {
    id: "paint",
    name: "Paint Correction",
    snippet: "Exterior detail + clay bar & polish.",
    prices: { coupe: 250, suv: 300, truck: 300 },
    note: "Final quote may vary by paint condition.",
    includes: [
      "Hand wash & dry",
      "Bug & tar removal",
      "Iron removal",
      "Clay bar",
      "Machine polish",
      "Wax sealant",
      "Wheels/tire shine, trim protection"
    ]
  }
};

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    alt: "Clean red sports car after detailing",
    caption: ""
  },
  {
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    alt: "Shiny black coupe in sunlight",
    caption: ""
  },
  {
    src: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    alt: "SUV exterior wash and polish",
    caption: ""
  },
  {
    src: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    alt: "Luxury sedan cleaned and waxed",
    caption: ""
  },
  {
    src: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80",
    alt: "Blue sports car parked outdoors",
    caption: ""
  },
  {
    src: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80",
    alt: "Black SUV after wash",
    caption: ""
  },
  {
    src: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&w=1200&q=80",
    alt: "White sedan close-up",
    caption: ""
  },
  {
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    alt: "Car front view on street",
    caption: ""
  },
  {
    src: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
    alt: "Silver car in lot",
    caption: ""
  }
];

let selectedVehicleType = "coupe";

function formatPrice(value) {
  return `$${value}`;
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
      <h3><a class="service-title-link" href="package.html?package=${pkg.id}">${pkg.name}</a></h3>
      <p>${pkg.snippet}</p>
      <p class="price-line"><strong>Price:</strong> <span data-price-for="${pkg.id}"></span></p>
      <a class="button" href="package.html?package=${pkg.id}">View Package</a>
    </article>
  `;
}

function renderPackageCards() {
  const homeContainer = document.getElementById("packageCardsHome");
  const servicesContainer = document.getElementById("packageCardsServices");
  const cardsMarkup = Object.values(packageData)
    .map((pkg) => buildCardMarkup(pkg))
    .join("");

  if (homeContainer) {
    homeContainer.innerHTML = cardsMarkup;
  }

  if (servicesContainer) {
    servicesContainer.innerHTML = cardsMarkup;
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

    const price = pkg.prices[selectedVehicleType];
    priceElement.textContent = `${label}: ${formatPrice(price)}`;
  });
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
  const carouselItems = galleryImages.slice(0, 4);

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

  if (!galleryGrid || !prevButton || !nextButton || !pageLabel) {
    return;
  }

  const pageSize = 6;
  let currentPage = 1;
  const totalPages = Math.ceil(galleryImages.length / pageSize);

  function renderPage() {
    const start = (currentPage - 1) * pageSize;
    const pageItems = galleryImages.slice(start, start + pageSize);

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
    if (currentPage > 1) {
      currentPage -= 1;
      renderPage();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage += 1;
      renderPage();
    }
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
setupHomeCarousel();
setupGalleryPagination();
setupPackageDetailPage();
