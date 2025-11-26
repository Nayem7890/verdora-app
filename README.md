🌿 Verdora – Eco-Friendly Plant & Lifestyle Store

A modern, responsive, eco-themed e-commerce application built with Next.js, Firebase Authentication, and a Node.js + Express + MongoDB backend. Verdora enables browsing plant products, viewing product details, adding new products, and managing inventory in a clean user-friendly interface.

🔗 Live Demo Links

Frontend (Vercel): https://verdora-app-umber.vercel.app/

Backend API (Vercel): https://verdora-server.vercel.app/

GitHub Repository: https://github.com/Nayem7890/verdora-app.git

📌 Short Description

Verdora is a full-stack MERN/Next.js application designed as an eco-themed online store for plants and green lifestyle items. Users can browse products, view details, register/login using Firebase, and access protected admin pages for adding and managing products.
The project includes:

Clean UI with Tailwind CSS

Firebase login (Email/Password + Google)

Admin CRUD operations

Express API with MongoDB

Deployed frontend and backend

🛠️ Tech Stack
Frontend

Next.js 14 (App Router)

React

Tailwind CSS

Firebase Authentication

Axios

React Hot Toast

Backend

Node.js

Express.js

MongoDB Atlas

CORS

Deployment:-

Client: Vercel

Server: Vercel

Database: MongoDB Atlas

📁 Project Structure
verdora-app/
│
├── app/
│   ├── page.jsx               → Home page
│   ├── products/              → Product listing + product details
│   ├── add-product/           → Admin: Add new product
│   ├── manage-products/       → Admin: Manage/Delete products
│   ├── login/                 → Login page
│   ├── register/              → Register page
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│
├── lib/
│   ├── firebase.js            → Firebase auth config
│
└── public/
    ├── hero.jpg


Backend (server folder or deployed separately):

server/
│── index.js
│── package.json
│── .env


🚀 Setup & Installation
1. Clone the project
git clone https://github.com/Nayem7890/verdora-app.git
cd verdora-app

FRONTEND SETUP (Next.js)
2. Install dependencies
npm install

3. Start development server
npm run dev


Runs at:
http://localhost:3000

BACKEND SETUP (Express.js)

If backend is inside server/ folder:

cd server
npm install
npm start


Runs at:
http://localhost:5000

📡 API Route Summary
BASE URL
https://verdora-server.vercel.app


🔐 Authentication Summary (Firebase)

Login with Email/Password

Register with Email/Password

Google Login

Show current logged-in user in Navbar

Logout functionality

Protect pages:

/add-product

/manage-products

🧪 Testing the API

Try this in browser or Postman:

GET https://verdora-server.vercel.app/plants

👨‍💻 Author

Md Nayem Hasan
Frontend Developer (MERN Stack)
📍 Chattogram, Bangladesh
📧 Email: mnhasan.2303@gmail.com

🔗 GitHub: https://github.com/Nayem7890

🔗 LinkedIn: https://www.linkedin.com/in/md-nayemhasan/

📱 WhatsApp: +8801521700687

⭐ Support

If you like this project, please give it a GitHub star ⭐ — it helps a lot!