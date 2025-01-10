
import express from 'express';
import { addItem, deleteItem, getItems } from '../controllers/itemController.js'; 

const router = express.Router();

// Add a new shopping item
router.post('/add', addItem);

// Delete a shopping item by ID
router.delete('/delete/:id', deleteItem);

// Get all shopping items or filtered items
router.get('/items', getItems);

export default router;
