const express = require("express");
const router = express.Router();
const Person = require("../MODELS/person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const savedPerson = await newPerson.save(); // Await the Promise
    console.log("Data saved successfully");

    res.status(200).json(savedPerson);
  } catch (error) {
    console.error("Error saving person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const persons = await Person.find(); // Await the Promise
    res.status(200).json(persons);
  } catch (error) {
    console.error("Error fetching persons:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:work", async (req, res) => {
  try {
    const worktype = req.params.work;
    // console.log(work)
    if (worktype == "chef" || worktype == "waiter" || worktype == "manager") {
      const response = await Person.find({ work: worktype });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid work type" });
    }
  } catch (error) {
    console.error("Error fetching person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedData = req.body;
    const response = await Person.findByIdAndUpdate(personId, updatedData, {
      new: true,
      runValidators: true,
    });
    console.log("data updated");
    res.status(200).json(response);

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
  } catch (error) {
    console.error("Error fetching person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personDeletedId = req.params.id;
    const response = await Person.findByIdAndDelete(personDeletedId);
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("data deleted");
    res.status(200).json({ error: "person deleted successfully" });
  } catch (error) {
    console.error("Error fetching person:", error);
    res.status(500).json({ error: "Internal server error" });  }
});

module.exports = router;
