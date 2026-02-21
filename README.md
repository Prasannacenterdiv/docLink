# 🩺 DocLink — Doctor Appointment Booking App

A full-featured doctor appointment booking web application built with **React**. Designed as a college project demonstrating real-world UI patterns including authentication, role-based dashboards, multi-step booking flows, and responsive design.

---

## 📸 Preview

| Landing Page | Patient Dashboard | Book Appointment |
|---|---|---|
| Search doctors by specialty | View upcoming appointments | 3-step booking with slot picker |

---

## ✨ Features

### 👤 Patient Side
- Browse and search doctors by name or specialization
- Filter by specialty + sort by rating or consultation fee
- 3-step appointment booking (Select Doctor → Choose Slot → Confirm)
- Slot conflict detection — already booked slots are disabled
- View, filter, and cancel appointments
- Profile page (name, email, phone, address, bio)

### 🩺 Doctor Side
- Dashboard with pending requests overview
- Accept or reject appointment requests
- Manage weekly schedule — add/remove time slots per day
- View patient list
- Profile page

### 🔐 Auth
- Login & Signup with form validation
- Role-based routing (patient vs doctor dashboard)
- Password strength indicator on signup
- Session persisted via `localStorage`

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/doclink.git

# 2. Navigate into the project folder
cd doclink

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Demo Credentials

Use these to log in and explore both roles:

| Role    | Email               | Password   |
|---------|---------------------|------------|
| Patient | patient@demo.com    | Demo1234   |
| Doctor  | doctor@demo.com     | Demo1234   |

---

## 🗂️ Project Structure

```
doclink/
├── src/
│   └── DocLinkApp.jsx     # Entire application (single-file architecture)
├── public/
├── index.html
├── package.json
└── README.md
```

> This project uses a **single-file component architecture** — all components live in `DocLinkApp.jsx`. This keeps it simple for a college project submission and easy to review.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev/) | UI library |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| CSS-in-JS (inline styles) | Styling via design tokens |
| [Google Fonts](https://fonts.google.com/) | Playfair Display + DM Sans |
| `localStorage` | Auth session persistence |

No external UI libraries — all components are hand-built.

---

## 📐 Design System

All design values are centralized in a single token object `T` at the top of the file:

```js
const T = {
  blue: "#1D4ED8",
  navy: "#0F172A",
  serif: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', system-ui, sans-serif",
  // ... etc
};
```

This makes it easy to update the entire color palette or typography from one place.

---

## 🔮 Possible Future Improvements

- [ ] Backend integration (Node.js + Express / Firebase)
- [ ] Real password hashing (bcrypt)
- [ ] Doctor profile pages with full bio
- [ ] Email notifications on booking confirmation
- [ ] Calendar view for appointments
- [ ] Video consultation link support
- [ ] Admin panel for managing doctors

---

## ⚠️ Disclaimer

This is a **college demo project**. It uses mock data and stores credentials in plaintext locally. **Do not use this in production** without a proper backend, authentication system, and database.

---

## 👨‍💻 Author

Made with ❤️ as a college project.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
