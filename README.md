# 📱 CellSync - Phone Inventory Management API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v25.0.0-green)
![Express](https://img.shields.io/badge/Express-v4.x-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

**A full-stack RESTful API for managing phone inventory with complete CRUD operations**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API Docs](#-api-documentation) • [Testing](#-testing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Database Setup](#-database-setup)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**CellSync** is a modern, full-featured phone inventory management system built with Node.js, Express, and PostgreSQL. It provides a complete RESTful API with all CRUD operations (Create, Read, Update, Delete) and includes a beautiful web interface for easy testing and management.

Perfect for:
- 📱 Mobile phone retailers
- 🏪 E-commerce platforms
- 📊 Inventory management systems
- 🎓 Learning REST API development
- 🚀 Prototyping and MVP development

---

## ✨ Features

### 🔄 Complete CRUD Operations
- ✅ **Create** - Add new phones to inventory
- ✅ **Read** - View all phones, get specific phone, or search with filters
- ✅ **Update** - Modify existing phone records
- ✅ **Delete** - Remove phones from inventory

### 🔍 Advanced Search
- Filter by brand (Apple, Samsung, Google, etc.)
- Filter by price range (min/max)
- Filter by storage capacity
- Combine multiple filters

### 🎨 Interactive Web Interface
- Beautiful gradient design
- Tab-based navigation
- Real-time feedback
- Form validation
- Quick edit/delete actions
- Responsive design

### 🛡️ Best Practices
- RESTful API design
- SQL injection prevention (parameterized queries)
- Error handling
- ES6 modules
- Environment variables
- Clean code architecture

---

## 🛠️ Tech Stack

**Backend:**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client
- **dotenv** - Environment variable management

**Frontend:**
- **HTML5** - Markup
- **CSS3** - Styling (gradients, animations)
- **JavaScript (ES6+)** - Fetch API, async/await

**Development:**
- **Nodemon** - Auto-restart on file changes

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** - Package manager

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/0xYurii/cellsync.git
cd cellsync
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure your `.env` file**
```env
DB_HOST=localhost
DB_USER=postgres
DB_DATABASE=cellsync
DB_PASSWORD=your_password
DB_PORT=5432
```

---

## 💾 Database Setup

### 1. Create the Database

```bash
# Using psql
psql -U postgres
```

```sql
CREATE DATABASE cellsync;
\q
```

Or use the command directly:
```bash
createdb cellsync -U postgres
```

### 2. Create the Tables

```sql
CREATE TABLE phones (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER NOT NULL,
  color VARCHAR(50) NOT NULL,
  storage VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Add Sample Data (Optional)

```sql
INSERT INTO phones (name, brand, price, stock_quantity, color, storage) VALUES
  ('iPhone 15 Pro', 'Apple', 999.99, 12, 'Titanium Blue', '256GB'),
  ('Galaxy S24 Ultra', 'Samsung', 1199.99, 8, 'Phantom Black', '512GB'),
  ('Pixel 8 Pro', 'Google', 899.99, 15, 'Obsidian', '128GB'),
  ('iPhone 14', 'Apple', 799.99, 20, 'Purple', '128GB'),
  ('Galaxy A54', 'Samsung', 449.99, 25, 'Awesome Violet', '128GB'),
  ('OnePlus 12', 'OnePlus', 799.99, 10, 'Flowy Emerald', '256GB'),
  ('Xiaomi 13 Pro', 'Xiaomi', 699.99, 7, 'Ceramic White', '256GB');
```

Or use the provided setup file:
```bash
psql -U postgres -d cellsync -f db/setup.sql
```

---

## 🚀 Usage

### Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Access the Web Interface

Open your browser and navigate to:
```
http://localhost:3000/test.html
```

This gives you a beautiful interface with all CRUD operations!

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/phones/insert` | Create a new phone |
| GET | `/phones` | Get all phones |
| GET | `/phones/:id` | Get a specific phone by ID |
| GET | `/phones/search` | Search phones with filters |
| PUT | `/phones/:id` | Update a phone |
| DELETE | `/phones/:id` | Delete a phone |

### Detailed Examples

#### 1. Create a Phone
```bash
POST /phones/insert
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "brand": "Apple",
  "price": 999.99,
  "stock_quantity": 15,
  "color": "Titanium Blue",
  "storage": "256GB"
}
```

**Response:** `201 Created`
```
Phone inserted successfully
```

#### 2. Get All Phones
```bash
GET /phones
```

**Response:** `200 OK` - HTML list of all phones

#### 3. Get Phone by ID
```bash
GET /phones/1
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "iPhone 15 Pro",
  "brand": "Apple",
  "price": "999.99",
  "stock_quantity": 12,
  "color": "Titanium Blue",
  "storage": "256GB"
}
```

#### 4. Search Phones
```bash
GET /phones/search?brand=Apple
GET /phones/search?minPrice=500&maxPrice=800
GET /phones/search?storage=256GB
GET /phones/search?brand=Apple&minPrice=700&maxPrice=1000
```

**Response:** `200 OK` - HTML list of matching phones

#### 5. Update a Phone
```bash
PUT /phones/1
Content-Type: application/json

{
  "name": "iPhone 15 Pro Max",
  "brand": "Apple",
  "price": 1199.99,
  "stock_quantity": 20,
  "color": "Natural Titanium",
  "storage": "512GB"
}
```

**Response:** `200 OK`
```json
{
  "message": "Phone updated successfully",
  "phone": { ... }
}
```

#### 6. Delete a Phone
```bash
DELETE /phones/1
```

**Response:** `200 OK`
```json
{
  "message": "Phone deleted successfully",
  "phone": { ... }
}
```

For complete API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 🧪 Testing

### Method 1: Web Interface (Recommended)

1. Start the server: `npm run dev`
2. Open browser: `http://localhost:3000/test.html`
3. Use the tabs to test each operation:
   - ➕ Create
   - 📋 Read All
   - 🔍 Search
   - ✏️ Update
   - 🗑️ Delete

### Method 2: Browser (GET requests only)

- All phones: http://localhost:3000/phones
- Specific phone: http://localhost:3000/phones/1
- Search: http://localhost:3000/phones/search?brand=Apple

### Method 3: Command Line (curl)

**Create:**
```bash
curl -X POST http://localhost:3000/phones/insert \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Phone","brand":"TestBrand","price":599.99,"stock_quantity":10,"color":"Black","storage":"128GB"}'
```

**Read:**
```bash
curl http://localhost:3000/phones
curl http://localhost:3000/phones/1
curl "http://localhost:3000/phones/search?brand=Apple"
```

**Update:**
```bash
curl -X PUT http://localhost:3000/phones/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Phone","brand":"Apple","price":899.99,"stock_quantity":15,"color":"Blue","storage":"256GB"}'
```

**Delete:**
```bash
curl -X DELETE http://localhost:3000/phones/1
```

### Method 4: Postman or Insomnia

Import the endpoints and test with a REST client for more advanced testing.

---

## 📁 Project Structure

```
CellSync/
├── controllers/              # Business logic layer
│   ├── getPhones.js         # READ operations (all, search)
│   ├── insertPhone.js       # CREATE operation
│   ├── updatePhone.js       # UPDATE & get by ID
│   └── deletePhone.js       # DELETE operation
├── db/                      # Database layer
│   ├── pool.js             # PostgreSQL connection pool
│   ├── queries.js          # All database queries
│   └── setup.sql           # Database schema
├── routes/                  # API routes
│   └── getphones.js        # All CRUD endpoints
├── public/                  # Static files
│   └── test.html           # Interactive test interface
├── node_modules/           # Dependencies
├── .env                    # Environment variables (create this)
├── .gitignore             # Git ignore file
├── index.js               # Server entry point
├── package.json           # Project metadata
├── API_DOCUMENTATION.md   # Complete API reference
├── CRUD_SUMMARY.md        # Quick reference guide
└── README.md              # This file
```

---

## 🏗️ Architecture

### MVC Pattern (Modified)

**Models** (db/queries.js)
- Database query functions
- Data validation
- SQL operations

**Controllers** (controllers/*)
- Business logic
- Request/response handling
- Error handling

**Routes** (routes/*)
- Endpoint definitions
- HTTP method mapping
- Route organization

**Views** (public/*)
- User interface
- Interactive testing

---

## 🔒 Security Features

- ✅ **Parameterized queries** - Prevents SQL injection
- ✅ **Environment variables** - Sensitive data protection
- ✅ **Input validation** - Data integrity
- ✅ **Error handling** - Secure error messages
- ✅ **CORS ready** - Cross-origin support (if needed)

---

<div align="center">

**⭐ Star this repo if you find it helpful! ⭐**

Made with ❤️ by developers, for developers

[Report Bug](https://github.com/0xYurii/cellsync/issues) • [Request Feature](https://github.com/0xYurii/cellsync/issues)

</div>

---
