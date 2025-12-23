const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Pulsa Railway jalan 🚀" });
});

app.get("/pulsa", (req, res) => {
  res.json([
    { id: 1, nama: "Pulsa Telkomsel", harga: 12000 },
    { id: 2, nama: "Pulsa XL", harga: 11000 },
  ]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
