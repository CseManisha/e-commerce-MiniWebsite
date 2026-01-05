const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const sampleProducts = [
  {
    name: "Smartphone",
    price: 12000,
    description: "Budget smartphone with 4GB RAM and 64GB storage.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    category: "Electronics",
  },
  {
    name: "Laptop",
    price: 48000,
    description: "High-performance laptop with SSD storage.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    category: "Electronics",
  },
  {
    name: "Wireless Headphones",
    price: 2600,
    description: "Noise-cancelling wireless headphones.",
    image: "https://www.mytechreviewer.com/wp-content/uploads/2017/11/best-wireless-headphones-for-tv-in-2018.jpg",
    category: "Electronics",
  },
  {
    name: "Smartwatch",
    price: 4500,
    description: "Fitness tracking smartwatch with notifications.",
    image: "https://cdn.mos.cms.futurecdn.net/DxpaKaHPBL5yF8vBjh2MjX.jpg",
    category: "Electronics",
  },
  {
    name: "Bluetooth Speaker",
    price: 2200,
    description: "Portable speaker with deep bass.",
    image: "https://i5.walmartimages.com/asr/a54418d5-51f3-4150-8cba-91f4cd2a63e2.7b37a2bbd417d06611a4ea1b8be9e15f.jpeg?odnBg=FFFFFF&odnHeight=768&odnWidth=768",
    category: "Electronics",
  },
  {
    name: "Gaming Keyboard",
    price: 3200,
    description: "Mechanical RGB keyboard for gaming.",
    image: "https://m.media-amazon.com/images/I/71gR-IwIv-L._AC_SL1500_.jpg",
    category: "Electronics",
  },
  {
    name: "Wireless Mouse",
    price: 1200,
    description: "Ergonomic wireless mouse.",
    image: "https://i5.walmartimages.com/asr/4ffb1bf9-f800-41c8-ab29-4721de7f0786.7259b9d6e36950cc9a9eac3f5f958888.jpeg",
    category: "Electronics",
  },
  {
    name: "Tablet",
    price: 18000,
    description: "10-inch tablet for entertainment and work.",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400",
    category: "Electronics",
  },
  {
    name: "Power Bank",
    price: 1500,
    description: "10000mAh fast charging power bank.",
    image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=400",
    category: "Electronics",
  },
  {
    name: "LED Monitor",
    price: 9000,
    description: "24-inch Full HD LED monitor.",
    image: "https://m.media-amazon.com/images/I/81sUJtTXjZL._AC_.jpg",
    category: "Electronics",
  },
  {
    name: "DSLR Camera",
    price: 52000,
    description: "Professional DSLR camera for photography.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
    category: "Electronics",
  },
  {
    name: "Webcam",
    price: 3500,
    description: "HD webcam for online meetings.",
    image: "https://m.media-amazon.com/images/I/61-K2lXmHQL._AC_SL1500_.jpg",
    category: "Electronics",
  },
  {
    name: "Earbuds",
    price: 1800,
    description: "True wireless earbuds with long battery life.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
    category: "Electronics",
  },
  {
    name: "Printer",
    price: 11000,
    description: "All-in-one printer for home and office.",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6539/6539603_sd.jpg",
    category: "Electronics",
  },
  {
    name: "External Hard Drive",
    price: 5200,
    description: "1TB external hard drive.",
    image: "https://tse2.mm.bing.net/th/id/OIP.uwqv7Gk34_Y0Ta1kh4MNMQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    category: "Electronics",
  },
  {
    name: "Router",
    price: 2400,
    description: "High-speed WiFi router.",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6377/6377908ld.jpg",
    category: "Electronics",
  },
  {
    name: "Smart TV",
    price: 32000,
    description: "43-inch Full HD Smart TV.",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
    category: "Electronics",
  },
  {
    name: "UPS",
    price: 6000,
    description: "Power backup UPS for computers.",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=400",
    category: "Electronics",
  },
  {
    name: "VR Headset",
    price: 28000,
    description: "Virtual reality headset for gaming.",
    image: "https://scale.coolshop-cdn.com/product-media.coolshop-cdn.com/23HW5S/60bf21783a2148128e730172606eef53.jpg/f/oculus-meta-quest-3-128gb-vr-headset.jpg",
    category: "Electronics",
  },
  {
    name: "Soundbar",
    price: 14000,
    description: "Home theater soundbar with surround sound.",
    image: "https://m.media-amazon.com/images/I/71qBs1q4AGL._AC_SL1500_.jpg",
    category: "Electronics",
  },
];


const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log("✅ 10 Sample products added successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
