const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require('dotenv');
require("dotenv").config(); 

// 🟢 BILKUL NEW: Auth Routes ko import kiya jo aapne banaye hain
const authRoutes = require("./routes/authRoutes"); 

app.use(express.json());
app.use(cors());

// 🟢 BILKUL NEW: Routes ko main app ke saath link kiya bina kisi prefix ke
// Taake direct http://localhost:5000/register chal sake
app.use("/", authRoutes); 

let port = 5000 || process.env.PORT ;

let products = [
    {
        id: 1,
        title: "Shoes",
        price: 560,
        description: "Running sports shoes",
        category: "fashion",
        rating: 4.5,
        thumbnail: "https://images.unsplash.com/photo-1549298916-b41d501d3772"
    },
    {
        id: 2,
        title: "Laptop",
        price: 200,
        description: "High performance laptop",
        category: "electronics",
        rating: 4.8,
        thumbnail: "https://th.bing.com/th/id/OIP.APeEC-rwhBAAZuH4SaXh0QHaE2?w=235&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
    },
];

app.get("/", (req, res) => {
    res.send("welcome to my backend");
});

app.get("/products", (req, res) => {
    res.json({
        limit: 30,
        page: 1,
        products: products
    });
});

app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((p) => p.id === id);

    if (!product) {
        return res.status(404).json({ message: "product not found" });
    }

    res.json(product);
});

app.post("/products", (req, res) => {
    const newProduct = {
        id: products.length + 1,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description || "",
        category: req.body.category || "general",
        rating: req.body.rating || 4,
        thumbnail: req.body.thumbnail || "https://i.imgur.com/1.jpg"
    };

    products.push(newProduct);

    res.status(201).json({
        message: "product added successfully!",
        product: newProduct
    });
});

app.put("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((p) => p.id === id);

    if (!product) {
        return res.status(404).json({ message: "product not found!" });
    }

    product.title = req.body.title || product.title;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.rating = req.body.rating || product.rating;
    product.thumbnail = req.body.thumbnail || product.thumbnail;

    res.json({
        message: "product updated successfully!",
        product
    });
});

app.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find((p) => p.id === id);

    if (!product) {
        return res.status(404).json({ message: "product not found!" });
    }

    products = products.filter((p) => p.id !== id);

    res.json({ message: "product deleted successfully!" });
});

app.listen(port, () => {
    console.log("server is running in port " + port);
});