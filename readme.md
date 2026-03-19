# Valence Detailing Website (Static)

Simple static website using only HTML, CSS, and JavaScript.

## Files

- `index.html` - structure/content (header, gallery, services, intake form)
- `styles.css` - all styling
- `script.js` - menu toggle + intake form email/text launch

## Quick Customize

1. **Business name / logo text**
	- Edit the `.logo` text in `index.html`
	- Update `businessName` in `script.js`

2. **Contact destination for intake messages**
	- In `script.js`, update:
	  - `detailerEmail`
	  - `detailerPhone` (numbers only, include country code)

3. **Gallery photos**
	- In `index.html`, replace the image `src` values in the `#gallery` section

4. **Services list**
	- In `index.html`, edit cards inside `#services`

## Intake Form Behavior

- Form collects: name, email, phone, vehicle, service, preferred contact, notes
- On submit:
  - `Email` opens the user's default email app with a prefilled draft
  - `Text Message` opens the user's SMS app with a prefilled draft

## Run Locally

Open `index.html` in a browser.