const router = require("express").Router()
const cat = require("../models/category")

//add category
router.post("/category", async (req, res) => {
    try {
        const {categoryName} = req.body
        const catagory = new cat({categoryName})
        await catagory.save()
        return res.status(201).json({message: "Category added successfully"})
    }catch(e){
        console.log(e)
        res.status(400).json({message: "Server Error"})
    }

})

module.exports = router;