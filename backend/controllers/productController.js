import Product from "../models/Product.js";
export const addProduct = async (req, res) => {
    try {
        const { name, price, image, category, description } = req.body;
        if (!name || !price || !category || !description) {
            return res.status(400).json({ message: "All properties are required" });
        }
        console.log(req.user.id);

        const existingProduct = await Product.findOne({
  userId: req.user._id,
  name: req.body.name,
});

if (existingProduct) {
  return res.status(400).json({ message: "You already added this product" });
}
        const product = await Product.create({
            userId: req.user._id,
            name,
            description,
            category,
            image,
            price,
        });
        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Failed to update todo", error: error.message });
    }
};

export const getallProducts = async (req, res) => {
  try {
    const userId = req.user.id; // from verified token
    const products = await Product.find({ userId }) // only this user's products
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};


export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate(
            "userId",
            "name email"
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findOne({
            _id: id,
            userId: req.user._id,
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found or not authorized" });
        }

        await product.deleteOne();

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
};
