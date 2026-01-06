import express from "express";
import { protect } from "../authMiddleware.js";
import { addProduct,updateProduct,getallProducts,getProductById,deleteProduct } from "../controllers/productController.js";
const router = express.Router();

router.post("/",protect,addProduct);
router.get("/",protect,getallProducts);
router.get("/:id",protect,getProductById);
router.put("/:id",protect,updateProduct);
router.delete("/:id",protect,deleteProduct);


export default router;