import { Router, Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
import { Item } from "../types/item"

// Create a new router instance.
const router = Router()

// In-memory array to store items.
const items: Item[] = []

// GET /items endpoint to return all stored items.
router.get("/", (req: Request, res: Response) => {
	res.status(200).json(items)
})

// POST /items endpoint to add a new item.
router.post("/", (req: Request, res: Response) => {
	const { name } = req.body

	// Validate that "name" is present and is a string.
	if (!name || typeof name !== "string") {
		return res.status(400).json({ error: "Invalid or missing name." })
	}

	// Create a new item with a unique ID.
	const newItem: Item = {
		id: uuidv4(),
		name
	}

	// Add the new item to the in-memory array.
	items.push(newItem)

	// Respond with the created item.
	res.status(201).json(newItem)
})

// GET /items/:id endpoint to return an item by its ID.
router.get("/:id", (req: Request, res: Response) => {
	const { id } = req.params

	// Find the item with the matching ID.
	const item = items.find(item => item.id === id)

	// If not found, return 404.
	if (!item) {
		return res.status(404).json({ error: "Item not found." })
	}

	// Respond with the found item.
	res.status(200).json(item)
})

// PUT /items/:id endpoint to update an item by its ID.
router.put("/:id", (req: Request, res: Response) => {
	const { id } = req.params
	const { name } = req.body

	// Validate that "name" is present and is a string.
	if (!name || typeof name !== "string") {
		return res.status(400).json({ error: "Invalid or missing name." })
	}

	// Find the index of the item.
	const index = items.findIndex(item => item.id === id)

	// If not found, return 404.
	if (index === -1) {
		return res.status(404).json({ error: "Item not found." })
	}

	// Update the item name.
	items[index].name = name

	// Respond with the updated item.
	res.status(200).json(items[index])
})

// DELETE /items/:id endpoint to delete an item by its ID.
router.delete("/:id", (req: Request, res: Response) => {
	const { id } = req.params

	// Find the index of the item.
	const index = items.findIndex(item => item.id === id)

	// If not found, return 404.
	if (index === -1) {
		return res.status(404).json({ error: "Item not found." })
	}

	// Remove the item from the array.
	const deletedItem = items.splice(index, 1)[0]

	// Respond with the deleted item.
	res.status(200).json(deletedItem)
})

// Export the router as default.
export default router