const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// KONEKSI DATABASE RAILWAY
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// TEST ROOT
app.get("/", (req, res) => {
  res.json({ message: "API Pulsa Railway jalan 🚀" });
});

// ================= GET ALL =================
app.get("/pulsa", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pulsa ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET BY ID =================
app.get("/pulsa/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM pulsa WHERE id = $1", [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= CREATE =================
app.post("/pulsa", async (req, res) => {
  try {
    const { nama, beli, bayar, tanggal, status, tanggal_lunas } = req.body;

    await pool.query(
      `INSERT INTO pulsa
      (nama, beli, bayar, tanggal, status, tanggal_lunas)
      VALUES ($1,$2,$3,$4,$5,$6)`,
      [nama, beli, bayar, tanggal, status, tanggal_lunas]
    );

    res.json({ message: "Data pulsa berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= UPDATE =================
app.put("/pulsa/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, beli, bayar, tanggal, status, tanggal_lunas } = req.body;

    await pool.query(
      `UPDATE pulsa SET
        nama=$1,
        beli=$2,
        bayar=$3,
        tanggal=$4,
        status=$5,
        tanggal_lunas=$6
       WHERE id=$7`,
      [nama, beli, bayar, tanggal, status, tanggal_lunas, id]
    );

    res.json({ message: "Data pulsa berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= DELETE =================
app.delete("/pulsa/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM pulsa WHERE id = $1", [id]);

    res.json({ message: "Data pulsa berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PORT (WAJIB)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
