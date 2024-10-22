const express  = require('express');
const app = express();


const authenticateToken = require("../middlewares/auth");
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct,  }
= require('../controllers/productController'); 

const router = express.Router();

router.get("/products",authenticateToken, getProducts);

router.get("/product/:id",authenticateToken, getProduct);

router.post("/product",authenticateToken, addProduct);

router.put("/product/:id",authenticateToken, updateProduct);

router.delete("/product/:id", authenticateToken,deleteProduct);

module.exports = router;