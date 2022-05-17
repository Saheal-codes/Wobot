const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  _createdBy: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
});


module.exports = mongoose.model("product", productSchema);
