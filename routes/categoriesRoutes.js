const express = require("express");

const router = express.Router();

const {
  getCategories,
  newCategories,
  deleteCategory,
  saveattr,
} = require("../controllers/categoriesController.js");

const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");

router.get("/", getCategories);

router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);

router.post("/", newCategories);

router.delete("/:category", deleteCategory);

router.post("/attr", saveattr);

module.exports = router;
