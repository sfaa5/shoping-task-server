import mongoose from "mongoose";

const itemShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
);


const item = mongoose.model('item', itemShema);
export default item;