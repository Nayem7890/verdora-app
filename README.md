# 🌿 Verdora – Eco-Friendly Plant & Lifestyle Store

A modern, responsive, eco-themed e-commerce application built with Next.js, Firebase Authentication, and a Node.js + Express + MongoDB backend. Verdora enables browsing plant products, viewing product details, adding new products, and managing inventory in a clean user-friendly interface.

## 🔗 Live Demo Links

- **Frontend (Vercel)**: https://verdora-app-umber.vercel.app/
- **Backend API (Vercel)**: https://verdora-server.vercel.app/
- **GitHub Repository**: https://github.com/Nayem7890/verdora-app.git

---

## 📌 Short Description

Verdora is a full-stack MERN/Next.js application designed as an eco-themed online store for plants and green lifestyle items. Users can browse products, view details, register/login using Firebase or mock credentials, and access protected admin pages for adding and managing products.

---

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- React
- Tailwind CSS
- Firebase Authentication
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- CORS

### Deployment
- Client: Vercel
- Server: Vercel
- Database: MongoDB Atlas

---

## 📡 Route Summary

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page with 7 sections (Hero, Featured, Testimonial, CTA, How It Works, Why Choose Us, Newsletter) |
| `/products` | Public | Product listing with search and category filter |
| `/products/[slug]` | Public | Product details page with full description |
| `/login` | Public | Login page (Firebase + Mock credentials) |
| `/register` | Public | User registration page |
| `/add-product` | Protected | Add new product form (requires authentication) |
| `/manage-products` | Protected | View and delete products (requires authentication) |
| `/about` | Public | About page |
| `/contact` | Public | Contact page |

---

## 🔐 Authentication

### Firebase Authentication
- Login with Email/Password
- Register with Email/Password
- Google Login
- Show current logged-in user in Navbar
- Logout functionality

### Mock Authentication (Demo)
- **Email**: `demo@verdora.com`
- **Password**: `demo123`
- Credentials stored in cookies
- Works alongside Firebase auth

### Protected Pages
- `/add-product` - Only accessible when logged in
- `/manage-products` - Only accessible when logged in
- Unauthenticated users are redirected to `/login`

---

## ✨ Implemented Features

### Landing Page (7 Sections)
1. **Hero Section** - Main banner with CTA buttons
2. **Featured Products** - Showcases top 3 products from API
3. **Testimonial** - Customer review section
4. **CTA Banner** - "Ready to Go Green?" call-to-action
5. **How It Works** - 3-step process (Browse → Select → Enjoy)
6. **Why Choose Verdora** - 4 benefit cards
7. **Newsletter** - Email subscription form

### Product Features
- Product listing with search and category filter
- Product details page with full information
- Add new products (protected)
- Delete products with confirmation (protected)

### Additional Features
- Toast notifications on product creation/deletion
- Responsive design (mobile-friendly)
- Cookie-based mock authentication
- Firebase social/credential login

---

## 🚀 Setup & Installation

### 1. Clone the project
```bash
git clone https://github.com/Nayem7890/verdora-app.git
cd verdora-app
```

### 2. Frontend Setup (Next.js)
```bash
npm install
npm run dev
```
Runs at: http://localhost:3000

### 3. Backend Setup (Express.js)
If backend is inside `server/` folder:
```bash
cd server
npm install
npm start
```
Runs at: http://localhost:5000

---

## 🧪 Testing

### Test the API
```
GET https://verdora-server.vercel.app/plants
```

### Test Mock Login
Use these credentials on the login page:
- Email: `demo@verdora.com`
- Password: `demo123`

---

## 📁 Project Structure

```
verdora-app/
├── app/
│   ├── page.jsx               → Home page (7 sections)
│   ├── products/              → Product listing + details
│   ├── add-product/           → Admin: Add new product
│   ├── manage-products/       → Admin: Manage/Delete products
│   ├── login/                 → Login page
│   └── register/              → Register page
├── components/
│   ├── Navbar.jsx
│   └── Footer.jsx
├── lib/
│   ├── firebase.js            → Firebase auth config
│   └── mockAuth.js            → Mock authentication with cookies
└── public/
    └── hero.jpg
```

---

## 👨‍💻 Author

**Md Nayem Hasan**  
Frontend Developer (MERN Stack)  
📍 Chattogram, Bangladesh  
📧 Email: mnhasan.2303@gmail.com

- 🔗 GitHub: https://github.com/Nayem7890
- 🔗 LinkedIn: https://www.linkedin.com/in/md-nayemhasan/
- 📱 WhatsApp: +8801521700687

---

## ⭐ Support

If you like this project, please give it a GitHub star ⭐ — it helps a lot!