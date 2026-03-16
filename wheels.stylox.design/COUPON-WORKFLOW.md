## HEROMRF Coupon System – Workflow

This document explains how the coupon system works across three roles:

- **Customer** (public visitor)
- **Service Staff**
- **Admin**

It covers both the **public Coupons page** and the **internal Dashboard**.

---

## 1. Pages & Roles

- **Public site (main bike page)**
  - `website-theme-template-to-launch-e-bike-styloxdesign.html`
  - Header/footer link: **Coupons** → `coupons.html`

- **Public Coupons page**
  - `coupons.html`
  - Visible to everyone (customers + staff + admin)
  - Shows list of **active coupons**
  - Contains **Staff/Admin login form** (for dashboard access)

- **Internal Coupon Dashboard**
  - `coupon-system.html`
  - Only accessible after login (Staff or Admin)
  - **Service Staff**: can view & use coupons, distribution, redemption, reports.
  - **Admin**: everything Staff can do + **create new coupons**.

---

## 2. High-Level Flow (Mermaid Diagram)

```mermaid
flowchart TD
    Visitor[Visitor / Customer] -->|Clicks 'Coupons'| CouponsPage[Coupons Page (coupons.html)]

    CouponsPage --> ViewCoupons[View Available Coupons]
    CouponsPage --> LoginLink[Staff/Admin Login]

    LoginLink --> LoginForm[Enter Role + Password]
    LoginForm -->|Valid| SetSession[Set session in localStorage]
    SetSession --> Dashboard[coupon-system.html (Dashboard)]
    LoginForm -->|Invalid| LoginError[Show error message]

    Dashboard -->|role = staff| StaffView[Staff View (no create)]
    Dashboard -->|role = admin| AdminView[Admin View (can create)]

    AdminView --> CreateCoupon[Admin fills 'Create Coupon' form]
    CreateCoupon --> SaveLocal[Save coupon to localStorage]
    SaveLocal --> UpdateDashboard[Update dashboard coupon list]
    SaveLocal --> UpdatePublic[Update coupons on coupons.html]

    StaffView --> RedeemFlow[Redeem coupon at service center]
    Visitor --> UseCoupon[Uses coupon at service]
```

---

## 3. Public Coupons Page (`coupons.html`)

### 3.1 What customers see

- **Hero section**: title & description of offers.
- **Coupons grid** (from `localStorage.heromrfCoupons`):
  - Each tile shows:
    - **Save amount** (e.g. `20% OFF`, `₹150 OFF`, `FREE`)
    - **Description** (title + minimum bill)
    - **Coupon code** (with “Copy” button)
    - **Expiry date**

- If there are **no active coupons**, a message is shown:
  - `No active coupons right now.`

### 3.2 Staff/Admin login on this page

- **Login fields**:
  - **Role**: `Service Staff` or `Admin`
  - **Password**: demo passwords
    - Admin → `admin123`
    - Staff → `staff123`
- On **valid login**:
  - Store session in `localStorage.heromrfSession`, e.g.
    ```json
    { "role": "admin", "ts": 1710600000000 }
    ```
  - Redirect automatically to `coupon-system.html`.

- On **invalid login**:
  - Show a red error box: `Invalid password.`

---

## 4. Coupon Dashboard (`coupon-system.html`)

### 4.1 Access control

- On page load:
  - Check `localStorage.heromrfSession`.
  - If **no session or missing role** → redirect to `coupons.html#login`.
  - If session exists:
    - Show top bar: `Logged in as Admin` or `Logged in as Service Staff`.
    - Show **Logout** button:
      - Clears `heromrfSession`.
      - Redirects to `coupons.html#login`.

### 4.2 Top bar

- Shows:
  - **Coupon Dashboard | Logged in as …**
  - Buttons:
    - `View Public Coupons` → `coupons.html`
    - `Logout` → clear session & redirect back to login

---

## 5. Tabs / Modules inside Dashboard

Tabs (left sidebar):

- **Dashboard**
- **Customers**
- **Coupons**
- **Distribution**
- **Redemption**
- **Reports**
- **User Roles**

All tabs are front‑end only (no real backend).

### 5.1 Dashboard tab

- KPI cards:
  - Total Coupons / Redeemed / Active / Expired
  - Customers
  - Today Redemptions
- Featured coupons preview (grid of 3 demo coupons + copy buttons).

### 5.2 Customers tab

- **Customer form**:
  - Name, Mobile, Email, Bike Model, Bike Number, Address, Registration Date.
- **Customer list** (table):
  - ID, Name, Mobile, Bike Model, Bike Number, Coupons Used, Reg Date, Status.

*(Data here is static/sample today.)*

### 5.3 Coupons tab (key for Admin feature)

**Shared for both roles**:

- Coupon table built from `localStorage.heromrfCoupons`:
  - Columns: ID, Title, Code, Type, Value, Valid Till, Usage Count, Status.
- Both Staff and Admin see the same list (read-only for Staff).

**Admin-only area**:

- Extra block (visible only when session role = `admin`):
  - **Create Coupon form**:
    - Coupon Title
    - Coupon Code
    - Type (`Discount Amount`, `Discount Percentage`, `Free Service`)
    - Discount Value
    - Minimum Purchase Amount
    - Valid From / Valid Till
    - Maximum Usage Limit
    - Status (`Active` / `Inactive`)
  - When Admin submits:
    1. Read existing coupons from `localStorage.heromrfCoupons`.
    2. Build new coupon object:
       ```json
       {
         "id": "CP80x",
         "title": "...",
         "code": "...",
         "type": "amount|percent|free",
         "value": 150,
         "minPurchase": 1000,
         "validFrom": "YYYY-MM-DD",
         "validTill": "YYYY-MM-DD",
         "usageLimit": 100,
         "usageCount": 0,
         "status": "active"
       }
       ```
    3. Prepend it to the array and save back to `localStorage`.
    4. Re-render **coupon table** in the dashboard.
    5. Show green success message: `Coupon created (demo) and added to Public Coupons.`
    6. Clear the form.

### 5.4 Distribution tab

- Form:
  - Select Customer
  - Select Coupon
  - Distribution Type (Manual / SMS / WhatsApp)
  - Date & Notes
- Table:
  - Distribution ID, Customer, Mobile, Coupon Code, Date, Status.

*(Static sample rows at the moment.)*

### 5.5 Redemption tab

- Form:
  - Customer Mobile, Coupon Code
  - Service/Product Name
  - Bill Amount, Discount Applied
  - Final Amount (calculated)
  - Date, Remarks
- Logic:
  - Whenever Bill or Discount changes → update Final Amount = Bill − Discount.
  - On submit:
    - Prevent page reload.
    - Show “Redemption saved (demo)” box.

- Table:
  - Redemption ID, Customer, Coupon, Service/Product, Discount, Final Bill, Date.

### 5.6 Reports tab

- Filters:
  - From Date, To Date, Coupon Code, Customer Mobile.
- Sub-tabs:
  - **Coupon Usage**: usage by coupon.
  - **Customer Wise**: usage by customer.
  - **Daily Redemption**: redemptions per day.
- Each shown as a table with sample data.

### 5.7 User Roles tab

- Cards describing:
  - **Admin** – manage coupons, customers, distribution, reports.
  - **Service Staff** – redeem coupons, use dashboard for operations.
  - **Customer** – sees coupons publicly and uses them during service.

---

## 6. Data Storage (Current Static Implementation)

Because this is a static HTML site (no backend yet), the system uses **browser storage**:

- **`localStorage.heromrfCoupons`**
  - Array of coupon objects.
  - Seeded with 3 demo coupons on first load.
  - Admin’s “Create Coupon” adds new items here.
  - Both:
    - `coupons.html` (public view)
    - `coupon-system.html` (dashboard)
    - read from the same key.

- **`localStorage.heromrfSession`**
  - Holds the currently logged-in role:
    ```json
    { "role": "admin", "ts": 1710600000000 }
    ```
  - Checked on `coupon-system.html` to allow/deny access.
  - Cleared on Logout.

> **Note**: This makes coupons and sessions **browser-specific** (each device has its own local storage). To share coupons across all visitors, you will later need a real backend or a shared JSON/API.

---

## 7. Login / Role Behaviour Summary

- **Customer:**
  - Goes to `coupons.html` from main header/footer.
  - Sees coupons grid.
  - Can copy codes.
  - Does **not** need a login.

- **Service Staff:**
  - Opens `coupons.html` → scrolls to login.
  - Role = `Service Staff`, password = `staff123`.
  - Redirected to `coupon-system.html` (dashboard).
  - Can:
    - View all tabs.
    - Use forms and tables.
    - **Cannot create coupons** (Admin-only panel hidden).

- **Admin:**
  - Opens `coupons.html` → login section.
  - Role = `Admin`, password = `admin123`.
  - Redirected to `coupon-system.html`.
  - Sees “Create Coupon” block in **Coupons** tab.
  - Any created coupon:
    - Appears in dashboard list.
    - Appears on public **Coupons** page grid.

---

## 8. Future Backend Integration (Outline)

When ready to move beyond static demo:

1. Replace `localStorage` reads/writes with API calls:
   - `GET /coupons`
   - `POST /coupons`
   - `POST /login`
   - etc.
2. Keep the **HTML structure and UI**, but:
   - Fill tables/grids from API responses instead of `localStorage`.
   - Use session tokens instead of simple `role` in `localStorage`.
3. Backend can be built in any stack (Node/Express, PHP,
   etc.) using the same fields defined above.

