# SME South Africa — Personalised Recommendation Platform
### XISD5319 | Static Design-Stage Prototype

A browser-based prototype of a three-tier personalised content recommendation platform for SME South Africa. This project simulates the complete entrepreneur-facing experience for both desktop website and mobile app, plus the shared Node.js/Express backend, CMS, advertiser, and admin workflows — all running 100% in the browser with Local Storage as the mock database.

> **Status:** Design-Stage Prototype | Desktop & Mobile Responsive

---

### ✨ Live Preview

| Section | Preview |
| :--- | :--- |
| **Desktop - Homepage** |<img width="984" height="583" alt="Screenshot 2026-09-04 154312" src="https://github.com/user-attachments/assets/11254bea-6964-4c4d-a96b-50499e9ac68b" />|
| **Desktop - Article Detail** |<img width="1854" height="925" alt="Screenshot 2026-09-04 153140" src="https://github.com/user-attachments/assets/79db51ff-901b-434b-bfc8-3da27d3106e9" />|
| **Mobile App - Home Feed** |<img width="523" height="852" alt="Screenshot 2026-09-04 154155" src="https://github.com/user-attachments/assets/a46b24af-803a-4d5f-b107-71b248d42442" />|
| **Mobile App - Article Detail** |<img width="522" height="597" alt="Screenshot 2026-09-04 154220" src="https://github.com/user-attachments/assets/b37143e9-5f04-4f51-96f7-0f345eadc0fb" />|
| **Mobile App - Profile & Settings** |<img width="530" height="522" alt="Screenshot 2026-09-04 154230" src="https://github.com/user-attachments/assets/b3ab0dce-8520-4696-9729-b7a6c1854ae8" />|
| **User Portal - Preferences** |<img width="1599" height="726" alt="Screenshot 2026-09-04 153157" src="https://github.com/user-attachments/assets/b5fbfebc-a14e-4ec2-8276-b027247daf90" />|
| **CMS Editorial Queue** |<img width="1572" height="639" alt="Screenshot 2026-09-04 153102" src="https://github.com/user-attachments/assets/7df49bd9-c1f2-4fba-abf3-d73ae5370f5b" />|
| **Admin Analytics Dashboard** |<img width="661" height="371" alt="Screenshot 2026-09-04 15301944" src="https://github.com/user-attachments/assets/5d7ca944-54f6-43d6-adc1-7760e1e41e80" />|

---

### 🚀 How to Run

#### Option 1: VS Code Live Server (Recommended)

This is the best way to run it as it simulates a proper server environment.

1.  Open the project folder in **Visual Studio Code**
2.  Install the **Live Server** extension by Ritwick Dey:
    - Go to Extensions (`Ctrl+Shift+X`)
    - Search for `Live Server`
    - Click Install
3.  Right-click on `index.html` in the Explorer
4.  Click **"Open with Live Server"**
5.  Your browser will open automatically at `http://127.0.0.1:5500/` or `http://localhost:5500/`

> Any changes you make to `app.js` or `styles.css` will hot-reload.

#### Option 2: Double-Click (Quick Test)

Simply double-click `index.html` to open it in Chrome / Edge / Firefox. Fully functional, but Live Server is preferred for presentation.

---

### 📂 Project Structure

```
/sme-sa-recommendation-platform
├── index.html          # All product layouts & screens (website + mobile app)
├── styles.css          # Responsive design system, desktop + mobile UI
├── app.js              # App logic: state, scoring, tracking, CMS, analytics
├── assets/             # Local images, icons, logos
│   └── screenshots/    # <-- Add your screenshots here for README
└── README.md
```

---

### 🧩 Included Product Areas

#### 1. Entrepreneur-Facing (Core)
- **Desktop Website:** Homepage layout, article detail layout, sidebar navigation
- **Mobile App:** Home feed, article detail, profile/settings, bottom-tab navigation
- **User Portal:** Registration/login session capture, profile setup, preference centre
- **Personalisation Engine:** Real-time recommendation scoring based on stage, industry, interests, and behaviour
- **Interaction Model:** Search, category & stage filters, clicks, reading time, bookmarks, ratings, newsletter subscription

#### 2. Platform Staff Workflows
- **CMS Editorial Queue:** Article submission, approval/rejection, publishing workflow
- **Advertiser Module:** Sponsored-content campaign creation and management
- **Admin Dashboard:** Analytics overview, user growth, engagement metrics, content performance
- **Data Export:** One-click JSON export of recommendations, logs, and reports

---

### 🗺️ How It Matches the Project Scope

This prototype represents the proposed three-tier architecture as a design demo:

| Tier | In Prototype (Simulated) | Original Scope |
| :--- | :--- | :--- |
| **Presentation Tier** | `index.html` + `styles.css` (Website & Mobile App UI) | React Website + React Native Mobile App |
| **Logic Tier** | `app.js` (Scoring, session, search, tracking) | Node.js / Express Shared API |
| **Data Tier** | `localStorage` (Browser Persistence) | MongoDB / PostgreSQL |

**Simulated Data Stores (via Local Storage):**
`Users` | `Preferences` | `Articles` | `Subscriptions` | `Campaigns` | `Recommendations` | `Search Logs` | `Behaviour Logs`

---

### 🎨 Design Stage Coverage

- [x] Complete sitemaps for website, mobile app, and shared backend services
- [x] UI/Wireframe direction for desktop homepage & article detail
- [x] UI/Wireframe direction for mobile home feed, detail & profile/settings
- [x] Navigation model: desktop sidebar + mobile bottom tabs
- [x] Full interaction tracking model for personalisation
- [x] Testing notes: browser/resolution coverage & iOS/Android validation plans

---

### 💾 Persistent Demo State

The prototype uses `window.localStorage` to simulate a database.

- All bookmarks, ratings, preferences, and CMS actions persist after refresh.
- **To Reset Everything:**
  1. Right-click > Inspect > Application Tab > Local Storage > Clear
  2. Or run `localStorage.clear()` in the console and refresh
  3. Or edit the default seed data directly in `app.js` > `DEFAULT_STATE`

---

### 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Responsive Grid + Flexbox), Vanilla JavaScript
- **Simulation:** Browser Local Storage API
- **No Build Tools Required**

---

### 👤 Author

**Module:** XISD6329       
**Project:** SME South Africa Personalised Recommendation Platform  
**Type:** Design-Stage Prototype Presentation

---

### 📄 License

For academic / demonstration purposes — XISD6329
