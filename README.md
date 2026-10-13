# 🍔 FoodieExpress --- Full-Stack Food Delivery Website

FoodieExpress is a food delivery web application built with **React,
Vite, Node.js, Express, and MongoDB**. Users can explore food items,
search and filter the menu, add items to a cart, register or log in,
place orders, and view their order history.

> **Project status:** The screenshots show the frontend interface.
> Verify backend, database, authentication, and order flows in your
> environment before describing every feature as production-ready.

## ✨ Features

-   Responsive homepage and food menu
-   Search food items and filter by category
-   Restaurant and food-item cards
-   Add items to cart and adjust quantities
-   Register and log in
-   Protected checkout and order history
-   Place orders with delivery address and phone number
-   Admin order dashboard and order-status updates (admin account
    required)
-   MongoDB-backed menu and order data
-   REST API built with Express

## 🧰 Tech Stack

**Frontend:** React, Vite, React Router, Axios, Lucide React, CSS\
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, dotenv,
CORS

## 📁 Project Structure

``` text
Foodie Express/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   ├── seed.js
│   └── server.js
├── docs/
│   └── screenshots/
│       ├── homepage.png
│       └── menu.png
└── README.md
```

## ⚙️ Prerequisites

-   Node.js (LTS recommended)
-   npm
-   MongoDB locally, or a MongoDB Atlas database

## 🚀 Getting Started

### 1. Clone the repository

Replace `YOUR_GITHUB_USERNAME` with your GitHub username.

``` bash
git clone https://github.com/YOUR_GITHUB_USERNAME/FoodieExpress.git
cd FoodieExpress
```

### 2. Configure and start the backend

``` bash
cd backend
npm install
```

Create `backend/.env`:

``` env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/foodieexpress
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

If you use MongoDB Atlas, replace `MONGO_URI` with your Atlas connection
string. Keep the real `.env` private.

Start the backend:

``` bash
npm run dev
```

The API should run at `http://localhost:5000`. If the health route is
enabled, check `http://localhost:5000/api/health`.

### 3. Seed sample food data

Open a **second terminal** after configuring the database:

``` powershell
cd "D:\Foodie Express\backend"
npm run seed
```

### 4. Configure and start the frontend

Open a **third terminal**:

``` powershell
cd "D:\Foodie Express\frontend"
npm install
```

Create `frontend/.env`:

``` env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

``` bash
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## 🔌 API Endpoints

  --------------------------------------------------------------------------------
  Method                  Endpoint                         Purpose
  ----------------------- -------------------------------- -----------------------
  `POST`                  `/api/auth/register`             Register a customer

  `POST`                  `/api/auth/login`                Log in

  `GET`                   `/api/auth/me`                   Get current
                                                           authenticated user

  `GET`                   `/api/restaurants`               List restaurants

  `GET`                   `/api/restaurants/menu`          List/search/filter menu
                                                           items

  `POST`                  `/api/orders`                    Place an order (login
                                                           required)

  `GET`                   `/api/orders/my-orders`          View own orders (login
                                                           required)

  `GET`                   `/api/admin/orders`              List orders (admin
                                                           required)

  `PATCH`                 `/api/admin/orders/:id/status`   Update order status
                                                           (admin required)
  --------------------------------------------------------------------------------

## 🧪 Suggested Test Flow

1.  Start MongoDB or configure MongoDB Atlas.
2.  Start the backend and check its health endpoint.
3.  Seed the sample menu.
4.  Start the frontend.
5.  Register a new customer account.
6.  Log in with the same email and password.
7.  Search/filter foods and add an item to the cart.
8.  Change quantities and verify the total.
9.  Complete checkout with a delivery address and phone number.
10. Open **My Orders** and confirm the order appears.

If login returns `Invalid email or password`, register first or verify
the email/password against the same database connected to the backend.

## 🔐 Admin Access

Public registration should create customer accounts only. To use the
admin dashboard, change a trusted account's `role` to `admin` directly
in your database. Do not allow users to select their own admin role
through public registration.

## 🔒 Security Notes

-   Do not upload `.env` files.
-   Never publish MongoDB credentials, JWT secrets, passwords, or
    tokens.
-   Keep `.env.example` files limited to placeholder values.
-   Configure production CORS, secrets, validation, rate limiting, and
    HTTPS before deploying publicly.
-   The current order flow uses Cash on Delivery (`COD`); this does not
    mean online payments are implemented.

## 🌐 Deployment Notes

The frontend and backend can be deployed separately. Before
deploying: 1. Set the production API URL in `VITE_API_URL`. 2. Configure
`MONGO_URI`, `JWT_SECRET`, and the allowed frontend origin on the
backend. 3. Confirm the host supports Node.js and MongoDB connections.
4. Test registration, login, menu loading, checkout, and order history
on the deployed site.

## 👩‍💻 Author

**Ayushi Kumari**

-   GitHub: [Ayushikumari13](https://github.com/Ayushikumari13)
-   LinkedIn: [Ayushi kumari](https://www.linkedin.com/in/ayushi-kumari-307805266)



Made with ❤️ as a full-stack web development project.
