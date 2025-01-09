import item from "../models/itemModel.js";  // Use the correct relative path with .js extension

/**
 * Add a new shopping item
 */
const addItem = async (req, res) => {
  console.log(req.body)
  const { name, category, des, priority } = req.body;

  if (!name || !category || !des || !priority) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  try {
    const newItem = new item({ name, category, des, priority });
    const savedItem = await newItem.save();
    res.status(201).json({ success: true, data: savedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

/**
 * Delete a shopping item by ID
 */
const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    res.status(200).json({ success: true, data: deletedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

/**
 * Get all shopping items or filter items based on query parameters
 */
const getItems = async (req, res) => {
  const { sort } = req.query;

  try {
    let items;

    if (sort === "priority") {
      // Custom sort for priority: high > medium > low
      items = await item.aggregate([
        {
          $addFields: {
            priorityOrder: {
              $switch: {
                branches: [
                  { case: { $eq: ["$priority", "high"] }, then: 1 },
                  { case: { $eq: ["$priority", "medium"] }, then: 2 },
                  { case: { $eq: ["$priority", "low"] }, then: 3 },
                ],
                default: 4,
              },
            },
          },
        },
        { $sort: { priorityOrder: 1 } }, // Sort by the custom priority order
      ]);
    } else {
      let sortOptions = {};

      if (sort === "name") {
        sortOptions = { name: 1 }; // Ascending order by name
      } else if (sort === "category") {
        sortOptions = { category: 1 }; // Ascending order by category
      } else if (sort === "recent") {
        sortOptions = { createdAt: -1 }; // Sort by most recent
      }

      // Use find() with sorting for other cases
      items = await item.find().sort(sortOptions);
    }

    res.json({ data: items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching items", error });
  }
};


export { addItem, deleteItem, getItems };
