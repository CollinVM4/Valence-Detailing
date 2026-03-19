# Valence Details Website (Static)

Simple multi-page site built with only HTML, CSS, and JavaScript.

## Pages

- `index.html` - homepage (simple info, picture carousel, package cards, BOOK NOW)
- `gallery.html` - gallery page with pagination
- `services.html` - services page with package cards
- `package.html` - dynamic package detail page + booking popup
- `styles.css` - all styling
- `script.js` - shared behavior and data

## Main Edits You Will Make

1. **Business contact settings** (`script.js`)
	- `settings.businessName`
	- `settings.detailerEmail`
	- `settings.detailerPhone`

2. **Package details and pricing** (`script.js`)
	- Edit `packageData` for names, snippets, includes, notes, and prices
	- Prices are split by:
	  - `coupe` (coupe/sedan)
	  - `suv` (SUV/truck)

3. **Gallery photos** (`script.js`)
	- Edit the `galleryImages` array (`src`, `alt`, `caption`)

## Booking Flow

- User clicks a package card → opens `package.html?package=...`
- `Book Now` opens a popup form collecting:
  - Full Name
  - Email
  - Phone
  - Preferred contact (email or SMS)
- The outgoing message automatically includes the selected package.

## Run

Open `index.html` in a browser.