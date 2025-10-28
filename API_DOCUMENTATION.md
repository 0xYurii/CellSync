# 📱 CellSync API Documentation

Complete CRUD API for managing phone inventory.

---

## 🌐 Base URL
```
http://localhost:3000
```

---

## 📋 Table of Contents
- [Endpoints Overview](#endpoints-overview)
- [CREATE Operations](#create-operations)
- [READ Operations](#read-operations)
- [UPDATE Operations](#update-operations)
- [DELETE Operations](#delete-operations)
- [Testing](#testing)

---

## 🔄 Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/phones/insert` | Create a new phone |
| **GET** | `/phones` | Get all phones |
| **GET** | `/phones/:id` | Get a single phone by ID |
| **GET** | `/phones/search` | Search phones with filters |
| **PUT** | `/phones/:id` | Update a phone by ID |
| **DELETE** | `/phones/:id` | Delete a phone by ID |

---

## ➕ CREATE Operations

### Create New Phone
**Endpoint:** `POST /phones/insert`

**Request Body:**
```json
{
  "name": "iPhone 15 Pro",
  "brand": "Apple",
  "price": 999.99,
  "stock_quantity": 15,
  "color": "Titanium Blue",
  "storage": "256GB"
}
```

**Success Response:**
- **Code:** 201
- **Content:** `"Phone inserted successfully"`

**Example using curl:**
```bash
curl -X POST http://localhost:3000/phones/insert \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro",
    "brand": "Apple",
    "price": 999.99,
    "stock_quantity": 15,
    "color": "Titanium Blue",
    "storage": "256GB"
  }'
```

**Example using JavaScript:**
```javascript
const response = await fetch('http://localhost:3000/phones/insert', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 999.99,
    stock_quantity: 15,
    color: "Titanium Blue",
    storage: "256GB"
  })
});
```

---

## 📖 READ Operations

### Get All Phones
**Endpoint:** `GET /phones`

**Success Response:**
- **Code:** 200
- **Content:** HTML list of all phones

**Example:**
```bash
curl http://localhost:3000/phones
```

**Browser:** [http://localhost:3000/phones](http://localhost:3000/phones)

---

### Get Phone by ID
**Endpoint:** `GET /phones/:id`

**URL Parameters:**
- `id` - Phone ID (integer)

**Success Response:**
- **Code:** 200
- **Content:**
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

**Error Response:**
- **Code:** 404
- **Content:** `"Phone not found"`

**Example:**
```bash
curl http://localhost:3000/phones/1
```

**Browser:** [http://localhost:3000/phones/1](http://localhost:3000/phones/1)

---

### Search Phones
**Endpoint:** `GET /phones/search`

**Query Parameters:**
- `brand` (optional) - Filter by brand (e.g., "Apple", "Samsung")
- `minPrice` (optional) - Minimum price
- `maxPrice` (optional) - Maximum price
- `storage` (optional) - Filter by storage (e.g., "256GB")

**Success Response:**
- **Code:** 200
- **Content:** HTML list of matching phones

**Examples:**

Search by brand:
```bash
curl "http://localhost:3000/phones/search?brand=Apple"
```
[http://localhost:3000/phones/search?brand=Apple](http://localhost:3000/phones/search?brand=Apple)

Search by price range:
```bash
curl "http://localhost:3000/phones/search?minPrice=500&maxPrice=800"
```
[http://localhost:3000/phones/search?minPrice=500&maxPrice=800](http://localhost:3000/phones/search?minPrice=500&maxPrice=800)

Search by storage:
```bash
curl "http://localhost:3000/phones/search?storage=256GB"
```
[http://localhost:3000/phones/search?storage=256GB](http://localhost:3000/phones/search?storage=256GB)

Combine multiple filters:
```bash
curl "http://localhost:3000/phones/search?brand=Apple&minPrice=700&maxPrice=1000&storage=256GB"
```

---

## ✏️ UPDATE Operations

### Update Phone
**Endpoint:** `PUT /phones/:id`

**URL Parameters:**
- `id` - Phone ID to update (integer)

**Request Body:**
```json
{
  "name": "iPhone 15 Pro Max",
  "brand": "Apple",
  "price": 1199.99,
  "stock_quantity": 20,
  "color": "Natural Titanium",
  "storage": "512GB"
}
```

**Success Response:**
- **Code:** 200
- **Content:**
```json
{
  "message": "Phone updated successfully",
  "phone": {
    "id": 1,
    "name": "iPhone 15 Pro Max",
    "brand": "Apple",
    "price": "1199.99",
    "stock_quantity": 20,
    "color": "Natural Titanium",
    "storage": "512GB"
  }
}
```

**Error Response:**
- **Code:** 404
- **Content:** `"Phone not found"`

**Example using curl:**
```bash
curl -X PUT http://localhost:3000/phones/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro Max",
    "brand": "Apple",
    "price": 1199.99,
    "stock_quantity": 20,
    "color": "Natural Titanium",
    "storage": "512GB"
  }'
```

**Example using JavaScript:**
```javascript
const response = await fetch('http://localhost:3000/phones/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199.99,
    stock_quantity: 20,
    color: "Natural Titanium",
    storage: "512GB"
  })
});
```

---

## 🗑️ DELETE Operations

### Delete Phone
**Endpoint:** `DELETE /phones/:id`

**URL Parameters:**
- `id` - Phone ID to delete (integer)

**Success Response:**
- **Code:** 200
- **Content:**
```json
{
  "message": "Phone deleted successfully",
  "phone": {
    "id": 1,
    "name": "iPhone 15 Pro",
    "brand": "Apple",
    "price": "999.99",
    "stock_quantity": 12,
    "color": "Titanium Blue",
    "storage": "256GB"
  }
}
```

**Error Response:**
- **Code:** 404
- **Content:** `"Phone not found"`

**Example using curl:**
```bash
curl -X DELETE http://localhost:3000/phones/1
```

**Example using JavaScript:**
```javascript
const response = await fetch('http://localhost:3000/phones/1', {
  method: 'DELETE'
});
```

---

## 🧪 Testing

### Interactive Web Interface
The easiest way to test all CRUD operations is through the web interface:

**URL:** [http://localhost:3000/test.html](http://localhost:3000/test.html)

Features:
- ✅ Create new phones with a form
- ✅ View all phones with edit/delete buttons
- ✅ Search phones by brand, price, and storage
- ✅ Update existing phones
- ✅ Delete phones with confirmation
- ✅ Real-time feedback on all operations

### Command Line Testing

1. **Start the server:**
```bash
npm run dev
```

2. **Create a phone:**
```bash
curl -X POST http://localhost:3000/phones/insert \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Phone","brand":"TestBrand","price":599.99,"stock_quantity":10,"color":"Black","storage":"128GB"}'
```

3. **Get all phones:**
```bash
curl http://localhost:3000/phones
```

4. **Get specific phone:**
```bash
curl http://localhost:3000/phones/1
```

5. **Search phones:**
```bash
curl "http://localhost:3000/phones/search?brand=Apple"
```

6. **Update a phone:**
```bash
curl -X PUT http://localhost:3000/phones/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Phone","brand":"Apple","price":899.99,"stock_quantity":15,"color":"Blue","storage":"256GB"}'
```

7. **Delete a phone:**
```bash
curl -X DELETE http://localhost:3000/phones/1
```

---

## 📊 Database Schema

### Phones Table
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

---

## 🚀 Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Set up your `.env` file:**
```env
DB_HOST=localhost
DB_USER=postgres
DB_DATABASE=cellsync
DB_PASSWORD=your_password
DB_PORT=5432
```

3. **Start the server:**
```bash
npm run dev
```

4. **Open the test interface:**
```
http://localhost:3000/test.html
```

---

## 📝 Notes

- All prices are in USD
- Stock quantity must be a positive integer
- Phone IDs are auto-generated
- Search is case-sensitive for brand and storage
- All fields are required when creating or updating a phone

---

## 🔧 Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success (GET, PUT, DELETE)
- `201` - Created (POST)
- `404` - Not Found
- `500` - Internal Server Error

---

## 📧 Support

For issues or questions, please check:
- The interactive test page: `http://localhost:3000/test.html`
- This documentation
- The project README

---

**Built with ❤️ using Node.js, Express, and PostgreSQL**