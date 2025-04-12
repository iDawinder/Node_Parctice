const mongoose = require("mongoose");

// Define the schema for the person model
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // ✅ Fixed: `unique` instead of `uniq`
  },
  address: {  // ✅ Fixed typo: "adress" → "address"
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
});

// Create the model
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
// This will be used in other files to access the Person model