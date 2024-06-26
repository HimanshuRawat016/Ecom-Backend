const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getBestsellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
} = require("../controllers/productController");

const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");

router.get("/category/:categoryName/search/:searchQuery", getProducts);
router.get("/category/:categoryName", getProducts);
router.get("/search/:searchQuery", getProducts);
router.get("/", getProducts);
router.get("/bestsellers", getBestsellers);
router.get("/get-one/:id", getProductById);

// admin routes:
router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.get("/admin", adminGetProducts);
router.delete("/admin/:id", adminDeleteProduct);

router.put("/admin/:id", adminUpdateProduct);

router.post("/admin", adminCreateProduct);

module.exports = router;
