const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require('dotenv')
require("dotenv").config(); 


app.use(express.json());
app.use(cors());

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
    {
        id: 3,
        title: "Mouse",
        price: 300,
        description: "Wireless mouse",
        category: "electronics",
        rating: 4.2,
        thumbnail: "https://m.media-amazon.com/images/I/61YQeAUIboL._AC_.jpg"
    },
    {
        id: 4,
        title: "Keychain",
        price: 400,
        description: "Stylish keychain",
        category: "accessories",
        rating: 4.0,
        thumbnail: "https://tse3.mm.bing.net/th/id/OIP.vqqwY10GBCTkQbjk90Zn6wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
        id: 5,
        title: "Smart Watch",
        price: 450,
        description: "Fitness tracking smart watch",
        category: "electronics",
        rating: 4.4,
        thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
        id: 6,
        title: "Gaming Keyboard",
        price: 520,
        description: "RGB mechanical keyboard",
        category: "electronics",
        rating: 4.7,
        thumbnail: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae"
    },
    {
        id: 7,
        title: "Bluetooth Speaker",
        price: 380,
        description: "Portable bluetooth speaker",
        category: "electronics",
        rating: 4.3,
        thumbnail: "https://images.unsplash.com/photo-1589003077984-894e133dabab"
    },
    {
        id: 8,
        title: "Backpack",
        price: 290,
        description: "Travel backpack for daily use",
        category: "fashion",
        rating: 4.1,
        thumbnail: "https://tse1.mm.bing.net/th/id/OIP.NEV4GMUoCYJE7m0WnATH1gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        id: 9,
        title: "Sunglasses",
        price: 150,
        description: "UV protection sunglasses",
        category: "fashion",
        rating: 4.2,
        thumbnail: "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    },
    {
        id: 10,
        title: "Headphones",
        price: 650,
        description: "Noise cancelling headphones",
        category: "electronics",
        rating: 4.8,
        thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
        id: 11,
        title: "Sneakers",
        price: 430,
        description: "Comfortable casual sneakers",
        category: "fashion",
        rating: 4.5,
        thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
        id: 12,
        title: "Office Chair",
        price: 900,
        description: "Ergonomic office chair",
        category: "furniture",
        rating: 4.6,
        thumbnail: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    },
    {
        id: 13,
        title: "Table Lamp",
        price: 180,
        description: "Modern LED table lamp",
        category: "home",
        rating: 4.0,
        thumbnail: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c"
    },
    {
        id: 14,
        title: "Coffee Mug",
        price: 90,
        description: "Ceramic coffee mug",
        category: "home",
        rating: 4.1,
        thumbnail: "https://static.vecteezy.com/system/resources/previews/036/798/160/non_2x/ai-generated-hot-coffee-in-a-rustic-wooden-mug-brings-warmth-and-comfort-generated-by-ai-free-photo.jpg"
    },
    {
        id: 15,
        title: "Water Bottle",
        price: 120,
        description: "Reusable steel water bottle",
        category: "accessories",
        rating: 4.3,
        thumbnail: "https://images.unsplash.com/photo-1602143407151-7111542de6e8"
    },
    {
        id: 16,
        title: "Gaming Mouse",
        price: 310,
        description: "RGB gaming mouse",
        category: "electronics",
        rating: 4.6,
        thumbnail: "https://images.unsplash.com/photo-1527814050087-3793815479db"
    },
    {
        id: 17,
        title: "T-Shirt",
        price: 130,
        description: "Cotton casual t-shirt",
        category: "fashion",
        rating: 4.2,
        thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    },
    {
        id: 18,
        title: "Perfume",
        price: 550,
        description: "Long lasting fragrance",
        category: "beauty",
        rating: 4.5,
        thumbnail: "https://images.unsplash.com/photo-1541643600914-78b084683601"
    },
    {
        id: 19,
        title: "Hair Dryer",
        price: 340,
        description: "Professional hair dryer",
        category: "beauty",
        rating: 4.1,
        thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
    },
    {
        id: 20,
        title: "Camera",
        price: 1200,
        description: "DSLR professional camera",
        category: "electronics",
        rating: 4.9,
        thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
    },
    {
        id: 21,
        title: "Tripod",
        price: 270,
        description: "Adjustable camera tripod",
        category: "electronics",
        rating: 4.0,
        thumbnail: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9"
    },
    {
        id: 22,
        title: "Gaming Chair",
        price: 980,
        description: "Comfortable gaming chair",
        category: "furniture",
        rating: 4.7,
        thumbnail: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd"
    },
    {
        id: 23,
        title: "Wall Clock",
        price: 140,
        description: "Classic wall clock",
        category: "home",
        rating: 4.0,
        thumbnail: "https://images.unsplash.com/photo-1501139083538-0139583c060f"
    },
    {
        id: 24,
        title: "Notebook",
        price: 70,
        description: "Spiral notebook for notes",
        category: "stationery",
        rating: 4.1,
        thumbnail: "https://images.unsplash.com/photo-1517842645767-c639042777db"
    },
    {
        id: 25,
        title: "Pen Set",
        price: 60,
        description: "Luxury pen set",
        category: "stationery",
        rating: 4.2,
        thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a"
    },
    {
        id: 26,
        title: "Phone Cover",
        price: 110,
        description: "Shockproof mobile cover",
        category: "accessories",
        rating: 4.3,
        thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },
    {
        id: 27,
        title: "Power Bank",
        price: 350,
        description: "Fast charging power bank",
        category: "electronics",
        rating: 4.4,
        thumbnail: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0"
    },
    {
        id: 28,
        title: "Monitor",
        price: 1500,
        description: "4K Ultra HD monitor",
        category: "electronics",
        rating: 4.8,
        thumbnail: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc"
    },
    {
        id: 29,
        title: "Desk",
        price: 2000,
        description: "Wooden office desk",
        category: "furniture",
        rating: 4.5,
        thumbnail: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    },
    {
        id: 30,
        title: "Face Wash",
        price: 95,
        description: "Refreshing face wash",
        category: "beauty",
        rating: 4.1,
        thumbnail: "https://images.unsplash.com/photo-1556228578-8c89e6adf883"
    },
    {
        id: 31,
        title: "Lipstick",
        price: 210,
        description: "Matte finish lipstick",
        category: "beauty",
        rating: 4.4,
        thumbnail: "https://images.unsplash.com/photo-1586495777744-4413f21062fa"
    },
    {
        id: 32,
        title: "Hand Bag",
        price: 670,
        description: "Stylish leather handbag",
        category: "fashion",
        rating: 4.6,
        thumbnail: "https://images.unsplash.com/photo-1584917865442-de89df76afd3"
    },
    {
        id: 33,
        title: "Jacket",
        price: 890,
        description: "Winter leather jacket",
        category: "fashion",
        rating: 4.7,
        thumbnail: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504"
    },
    {
        id: 34,
        title: "Football",
        price: 240,
        description: "Professional football",
        category: "sports",
        rating: 4.2,
        thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623066013b"
    },
    {
        id: 35,
        title: "Cricket Bat",
        price: 760,
        description: "Hard tennis cricket bat",
        category: "sports",
        rating: 4.5,
        thumbnail: "https://tse3.mm.bing.net/th/id/OIP.FfEP-JnC1FYh8Y8BBdTYCgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        id: 36,
        title: "Yoga Mat",
        price: 230,
        description: "Non-slip yoga mat",
        category: "sports",
        rating: 4.3,
        thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a"
    },
    {
        id: 37,
        title: "Electric Kettle",
        price: 410,
        description: "Fast boiling kettle",
        category: "home",
        rating: 4.4,
        thumbnail: "https://images.unsplash.com/photo-1516315720917-231ef9acce48"
    },
    {
        id: 38,
        title: "Rice Cooker",
        price: 890,
        description: "Automatic rice cooker",
        category: "home",
        rating: 4.5,
        thumbnail: "https://images.unsplash.com/photo-1586201375761-83865001e31c"
    },
    {
        id: 39,
        title: "Tablet",
        price: 1750,
        description: "Android tablet device",
        category: "electronics",
        rating: 4.6,
        thumbnail: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"
    },
    {
        id: 40,
        title: "Microphone",
        price: 480,
        description: "Studio recording microphone",
        category: "electronics",
        rating: 4.7,
        thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81"
    },
    {
        id: 41,
        title: "Ring Light",
        price: 330,
        description: "LED ring light for videos",
        category: "electronics",
        rating: 4.3,
        thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
    },
    {
        id: 42,
        title: "Essence Mascara",
        price: 100,
        description: "Comfortable running shoes",
        category: "fashion",
        rating: 4.5,
        thumbnail: "https://th.bing.com/th/id/OIP.48ey3VTOa509xAji-Wnq6wHaE8?w=291&h=194&c=7&r=0&o=7&pid=1.7&rm=3"

    },
    {
        id: 43,
        title: "Cap",
        price: 90,
        description: "Adjustable sports cap",
        category: "fashion",
        rating: 4.0,
        thumbnail: "https://images.unsplash.com/photo-1521369909029-2afed882baee"
    },
    {
        id: 44,
        title: "Smartphone",
        price: 2200,
        description: "Latest Android smartphone",
        category: "electronics",
        rating: 4.9,
        thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    }


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