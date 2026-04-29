# AmazonClone — Step 3 React Shopping App

An Amazon.com-inspired shopping app built with React, Bootstrap 5, and JSON Server.

---

## 🚀 How to Run

### 1. Start the Backend (JSON Server)

```bash
cd todo-backend
npm install
npm start
```

> The backend runs on **http://localhost:3001**
> If `npm start` doesn't work with your json-server version, try:
> `npx json-server db.json --port 3001`

### 2. Start the Frontend (React)

Open a **second terminal**:

```bash
cd todo-frontend
npm install
npm start
```

> The app opens at **http://localhost:3000**

---

## 📁 Component Structure

| File | Purpose |
|------|---------|
| `App.jsx` | Root component — manages all state, fetches data, owns CRUD handlers |
| `NavBar.jsx` | Amazon-style sticky header with logo, location, and cart button |
| `SearchBar.jsx` | Category dropdown + live search input + submit button |
| `Card.jsx` | Product card with image, rating, price, Prime badge, and Add to Cart |
| `ShoppingCart.jsx` | Sliding cart drawer with quantity controls and remove button |

---

## ⚡ Features

- **Props** — All components receive data and callbacks via props
- **State** — `useState` for products, cart, search query, active category, sort, cart open/closed
- **useEffect** — Fetches products and cart from JSON Server on initial mount
- **CRUD via Fetch API**:
  - **Create** — POST /cart (add item)
  - **Read** — GET /products, GET /cart (on load)
  - **Update** — PATCH /cart/:id (change quantity)
  - **Delete** — DELETE /cart/:id (remove item)
- **Live search** — Filters products as you type
- **Category filter** — Pills + NavBar dropdown
- **Sort** — Featured, Price Low→High, Price High→Low, Rating, Reviews
- **Persistent cart** — Cart saved in db.json via JSON Server
- **Bootstrap 5** — Responsive grid (1→2→3→4 columns), utility classes
- **CSS Modules** — Scoped, component-level styles

---

## 🗄 Database (db.json)

The backend has two collections:
- `GET /products` — 12 products across Electronics, Computers, Smart Home
- `GET /cart` — persisted cart items `{ id, productId, quantity }`
