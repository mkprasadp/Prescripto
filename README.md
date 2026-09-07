# 🩺 Prescripto - Doctor Appointment Booking System

Prescripto is a **MERN stack** (MongoDB, Express.js, React.js, Node.js) web application for booking doctor appointments online. It offers robust **authentication & authorization**, smooth **payment integration using Razorpay**, and a clean, user-friendly interface for patients and doctors.

---

## 🚀 Features

- 👩‍⚕️ Browse top doctors with specialization and availability  
- 🗓 Book and manage appointments  
- 🔐 Secure JWT-based authentication & role-based access control  
- 💳 Integrated Razorpay test payment gateway  
- 📄 Doctors can write prescriptions and manage availability  
- 🧑‍💼 Admin dashboard to monitor users, appointments, and doctors  
- 🧾 View booking history and prescription records  

---

## 🛠️ Tech Stack

| Frontend         | Backend        | Database | Payment Integration |
|------------------|----------------|----------|----------------------|
| React.js         | Node.js        | MongoDB  | Razorpay (Test Mode) |
| Tailwind CSS     | Express.js     | Mongoose |                      |
| React Router DOM | JWT, Bcrypt.js |          |                      |

---

## 📁 Project Structure

```
Prescripto/
│
├── client/                  # Frontend React App
│   ├── components/          # Reusable UI components
│   ├── pages/               # Route-based components
│   ├── context/             # Global state management
│   └── App.js               # Main app config
│
├── server/                  # Backend API (Node + Express)
│   ├── controllers/         # Route logic
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API endpoints
│   └── server.js            # App entry point
│
├── .env.example             # Sample environment config
├── package.json             # Root dependencies
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/mkprasadp/Prescripto.git
cd Prescripto
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `/server` with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_test_key
RAZORPAY_KEY_SECRET=your_test_secret
```

Then run the backend:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm start
```

---

## ✅ Test Credentials

| Role    | Email                | Password   |
|---------|----------------------|------------|
| Admin   | admin@prescripto.com | admin123   |
| Doctor  | doc@prescripto.com   | doctor123  |
| Patient | user@prescripto.com  | user123    |

---

## 📷 Screenshots

> Add screenshots of:
> - Home page  
> - Booking page  
> - Admin dashboard  
> - Razorpay checkout popup  

---

## 📦 Deployment

- **Frontend** hosted on: [Vercel](https://vercel.com)
- **Backend**: Render / Railway / Cyclic (Free hosting options)

---

## 🧠 Author

**Indrajeet Bhujbal**  
[MERN Stack Developer](https://github.com/mkprasadp)

---

## 💡 Future Scope

- Add video consultations  
- Email reminders and prescription download  
- Doctor availability calendar sync  
- Feedback & rating system  

---

## 📄 License

This project is licensed under the **MIT License**.
