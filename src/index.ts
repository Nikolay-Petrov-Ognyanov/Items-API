import dotenv from "dotenv"
import express, { Request, Response, NextFunction } from "express"
import itemsRouter from "./routes/items"

// Configure dotenv to load environment variables from .env file.
dotenv.config()

// Create an instance of an Express application.
const app = express()

// Use the PORT from environment variables or default to 5000.
const port = process.env.PORT || 5000

// Middleware to parse incoming JSON requests.
app.use(express.json())

// Define a basic route to confirm the API is working.
app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to the Items API! Use /items endpoint to manage items.")
})

// Use the items router for handling all /items routes.
app.use("/items", itemsRouter)

// Global error handler middleware to catch unhandled errors.
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack)
	res.status(500).json({ error: "Something went wrong." })
})

// Start the server and listen on the specified port.
app.listen(port, () => {
	console.log(`Server is running on port ${port}.`)
})