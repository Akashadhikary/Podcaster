const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
// const category = require("../models/category");
const Category = require("../models/category");
const Podcasts = require("../models/Podcasts");
const User = require("../models/user");
const router = require("express").Router();


// Add podcast
router.post("/add-podcast", authMiddleware, upload, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const frontImage = req.files["frontImage"]?.[0]?.path; // Safe access with optional chaining
    const audioFile = req.files["audioFile"]?.[0]?.path; // Safe access with optional chaining

    // Validate inputs
    if (!title || !description || !category || !frontImage || !audioFile) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const { user } = req; // Extract user from request
    const cat = await Category.findOne({ categoryName: category });

    // Check if category exists
    if (!cat) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const catId = cat._id;
    const userId = user._id;

    const newPodcast = new Podcasts({
      title,
      description,
      category: catId,
      frontImage,
      audioFile,
      user: userId,
    });

    await newPodcast.save();

    // console.log("New Podcast ID:", newPodcast._id);
    // console.log("Category ID:", catId);


    // Update category with new podcast ID
    await Category.findByIdAndUpdate(catId, {
      $push: { podcasts: newPodcast._id }, // Corrected 'podcast' to 'podcasts' to match schema
    });

    // Update user with new podcast ID
    await User.findByIdAndUpdate(userId, {
      $push: { podcasts: newPodcast._id }, // Corrected 'podcast' to 'podcasts' to match schema
    });

    // const updatedCategory = await Category.findById(catId);
    // console.log("Updated Category:", updatedCategory);


    return res.status(201).json({ message: "Podcast added successfully" });
  } catch (e) {
    console.error(e); // Log error for debugging
    return res.status(500).json({ message: "Failed to add podcast" });
  }
});

//get all podcastd
router.get("/get-podcasts", async (req, res) => {
  try {
    const podcast = await Podcasts.find()
      .populate("category")
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: podcast });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Failed to get podcasts" });
  }
});

//get user podcasts
router.get("/get-user-podcasts", authMiddleware, async (req, res) => {
  try {
    const { user } = req;
    const userId = user._id;
    const data = await User.findById(userId)
      .populate({ path: "podcasts", populate: { path: "category" } })
      .select("-password");

    //console.log("User data:", data); // Check entire user data
    //console.log("Populated Podcasts:", data.podcasts);

    if (data && data.podcasts) {
      data.podcasts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return res.status(200).json({ data: data.podcasts });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Failed to get user podcasts" });
  }
});

//get podcast by id
router.get("/get-podcasts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const podcast = await Podcasts.findById(id).populate("category");
    return res.status(200).json({ data: podcast });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Failed to get podcasts" });
  }
});

//get podcast by categories
router.get("/category/:cat", async (req, res) => {
  try {
    const { cat } = req.params;
    console.log("Category Name:", cat);
    const categories = await Category.find({ categoryName: cat }).populate({
      path: "podcasts",
      populate: { path: "category" },
    });

    console.log("Fetched Categories:", categories);

    let podcasts = [];
    categories.forEach((category) => {
      console.log("Category Podcasts:", category.podcasts);
      podcasts = [...podcasts, ...category.podcasts];
    });
    return res.status(200).json({ data: podcasts });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Failed to get podcasts" });
  }
});

//Delete podcast
router.post("/delete-podcasts", authMiddleware, async (req, res) => {
  try {
    const { podcastIds } = req.body;
    await Podcasts.deleteMany({ _id: { $in: podcastIds } });
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { podcasts: { $in: podcastIds } },
    });
    return res.status(200).json({ message: "Podcasts deleted successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to delete podcasts" });
  }
});

module.exports = router;
