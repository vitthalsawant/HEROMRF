## HEROMRF Motors Website

Static website for **HEROMRF Motors – Hero MotoCorp Authorized Dealer, Krishnarajanagara**.

This project contains the main marketing site plus a front‑end **Coupon System** demo for service & spare parts.

---

### 1. Structure

- `wheels.stylox.design/website-theme-template-to-launch-e-bike-styloxdesign.html`  
  Main landing page for HEROMRF Motors (Hero bikes, features, contact, etc.).

- `wheels.stylox.design/coupons.html`  
  Public **Coupons** page: shows active coupons to customers and provides Staff/Admin login.

- `wheels.stylox.design/coupon-system.html`  
  Internal **Coupon Dashboard** (only accessible after Staff/Admin login).

- `wheels.stylox.design/style.css`  
  Global styles for the theme plus custom styles for the Coupon System.

- `wheels.stylox.design/COUPON-WORKFLOW.md`  
  Detailed documentation of the Coupon System workflow, roles and front‑end data flow.

---

### 2. Coupon System Overview

Roles:

- **Customer** – sees coupons on `coupons.html`, copies codes, no login required.
- **Service Staff** – logs in on `coupons.html` and uses the dashboard (`coupon-system.html`) to redeem and view coupons.
- **Admin** – logs in on `coupons.html`, opens the dashboard and can **create new coupons** which appear both:
  - in the dashboard list, and
  - on the public `coupons.html` grid.

Technical notes (current implementation):

- Uses **`localStorage`** in the browser to store:
  - `heromrfCoupons` – array of coupon objects.
  - `heromrfSession` – current logged‑in role (`admin` or `staff`).
- There is **no backend yet**; this is a front‑end demo ready to be wired to real APIs later.

For a full explanation, see `wheels.stylox.design/COUPON-WORKFLOW.md`.

---

### 3. Running the Site Locally

Because this is pure HTML/CSS/JS, you can view it in any browser:

1. Open the folder in a simple HTTP server (recommended to avoid CORS issues):

   ```bash
   # from: c:\Users\vitth\OneDrive\Desktop\project clients\NEW website\wheels.stylox.design
   python -m http.server 8000
   ```

2. In your browser, open:
   - `http://localhost:8000/website-theme-template-to-launch-e-bike-styloxdesign.html` – main site
   - `http://localhost:8000/coupons.html` – public coupons page
   - `http://localhost:8000/coupon-system.html` – dashboard (requires login)

---

### 4. Demo Login Details

On `coupons.html` → Staff/Admin Login:

- **Admin**  
  - Role: `Admin`  
  - Password: `admin123`

- **Service Staff**  
  - Role: `Service Staff`  
  - Password: `staff123`

> These credentials are for **demo only**. When a real backend is added, replace them with secure authentication and remove these defaults.

