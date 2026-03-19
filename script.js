const settings = {
  businessName: "Valence Detailing",
  detailerEmail: "detailer@example.com",
  detailerPhone: "15555551234"
};

const menuButton = document.getElementById("menuButton");
const siteNav = document.getElementById("siteNav");
const intakeForm = document.getElementById("intakeForm");
const formMessage = document.getElementById("formMessage");

function toggleMenu() {
  const isOpen = siteNav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
}

function closeMenu() {
  siteNav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", toggleMenu);

siteNav.querySelectorAll("a").forEach((navLink) => {
  navLink.addEventListener("click", closeMenu);
});

function buildMessage(formData) {
  return [
    `${settings.businessName} Intake Request`,
    "",
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    `Phone: ${formData.phone}`,
    `Vehicle: ${formData.vehicle}`,
    `Service: ${formData.service}`,
    `Preferred Contact: ${formData.preferredContact}`,
    `Notes: ${formData.notes || "None"}`
  ].join("\n");
}

function startEmail(subject, message) {
  const emailLink = `mailto:${settings.detailerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  window.location.href = emailLink;
}

function startSms(message) {
  const smsLink = `sms:${settings.detailerPhone}?body=${encodeURIComponent(message)}`;
  window.location.href = smsLink;
}

intakeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const rawData = new FormData(intakeForm);
  const formData = Object.fromEntries(rawData.entries());
  const subject = `${settings.businessName} - New Client Request`;
  const message = buildMessage(formData);

  if (formData.preferredContact === "sms") {
    startSms(message);
    formMessage.textContent = "Opening your text message app...";
  } else {
    startEmail(subject, message);
    formMessage.textContent = "Opening your email app...";
  }
});
