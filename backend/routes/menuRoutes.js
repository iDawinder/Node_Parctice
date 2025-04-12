const express = require("express");
const router = express.Router();
const MenuItem = require("../MODELS/MenuItem");

router.post("/", async (req, res) => {
  try {
    let data = req.body;
    const menuitems = new MenuItem(data);
    const savedMenuItems = await menuitems.save();
    console.log("Data saved successfully");
    res.status(200).json(savedMenuItems);
  } catch (error) {
    console.error("Error saving menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched successfully");
    res.status(200).json(data);
  } catch (error) {
    console.log("Error fetching menu items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:spicy", async (req, res) => {
  try {
    const spiceChoice = req.params.spicy;

    if (
      spiceChoice === "spicy" ||
      spiceChoice === "sweet" ||
      spiceChoice === "sour"
    ) {
      const resoponse = await MenuItem.find({ taste: spiceChoice });
      console.log("data fetched");
      res.status(200).json(resoponse);
    } else {
      res.status(404).json({ error: "invalid spice type" });
    }
  } catch (error) {
    console.error("Error fetching person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let menoid = req.params.id;
    let updatedData = req.body;
    let response = await MenuItem.findByIdAndUpdate(menoid, updatedData, {
      new: true,
      runValidators: true,
    });
    console.log("data updated successfully");
    res.status(200).json(response);
  
  } catch (error) {
    console.log("error fething data", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.delete("/:id",async(req,res)=>{
 
 try {
  let menoId= req.params.id;

  let deletedItem= await MenuItem.findByIdAndDelete(menoId);

  if(!deletedItem){
    return res.status(404).json({error:"menu item not found"})
  }
  
 } catch (error) {
  console.log("error fething data", error);
  res.status(500).json({ error: "Internal server error" });
 }

})

module.exports = router;
