# Items API

A simple RESTful API built with **Node.js**, **Express** and **TypeScript**. It allows management of an in-memory list of items with basic CRUD operations, validation and error handling.

## Features

- GET all items
- GET a single item by ID
- POST a new item
- PUT (update) an item by ID
- DELETE an item by ID
- In-memory data storage
- Basic validation
- Global error handling middleware

## Setup Instructions

1. **Clone the repository.**

    ```bash
    git clone https://github.com/Nikolay-Petrov-Ognyanov/Items-API.git
    cd Items-API
    ```

2. **Install dependencies.**

    ```bash
    npm install
    ```

3. **Start the development server.**

    ```bash
    npm start
    ```

4. **Build and run the production server.**

    ```bash
    npm run build
    npm run serve
    ```

## Environment Variables

This project uses an environment variable to configure the server port.  
You can create a `.env` file in the root directory to override the default settings if needed.  
If no `.env` file or `PORT` variable is provided, the server defaults to port **5000**.

**Note:** The `.env` file is excluded from the repository to keep environment-specific settings private.  
Refer to the `.env.example` file for the required environment variable and its format.

## API Endpoints

All items are stored in memory and will reset when the server restarts.

For `POST` and `PUT` requests, you must include the following HTTP header: `Content-Type: application/json`.

### `GET /items`

Returns all stored items.

**Response:**

    [
      {
        "id": "abc-123",
        "name": "Item name"
      }
    ]

---

### `GET /items/:id`

Returns the item with the given ID.  
Returns `404` if not found.

---

### `POST /items`

Creates a new item.

**Request body:**

    {
      "name": "New item"
    }

Returns `400` if `name` is missing or not a string.

---

### `PUT /items/:id`

Updates an item by ID.

**Request body:**

    {
      "name": "Updated item"
    }

Returns `404` if item is not found.  
Returns `400` if `name` is missing or invalid.

---

### `DELETE /items/:id`

Deletes an item by ID.  
Returns `404` if item is not found.

---

## Project Structure

    src/
    ├── index.ts         # App entry point.
    ├── routes/
    │   └── items.ts     # Items route handlers.
    └── types/
        └── item.ts      # Item interface.

## Scripts

- `npm start` – Run development server with nodemon.  
- `npm run build` – Compile TypeScript to `dist/`.  
- `npm run serve` – Run compiled code with Node.

## Notes

- All code is written in TypeScript.  
- No database – data is stored in memory.  
- Make sure to send `Content-Type: application/json` for POST/PUT requests.