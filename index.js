// ================= GET ALL =================
app.get("/pulsa", async (req, res) => {
  const result = await pool.query("SELECT * FROM pulsa ORDER BY id DESC");
  res.json(result.rows);
});

// ================= CREATE =================
app.post("/pulsa", async (req, res) => {
  const { nama, beli, bayar, tanggal, status, tanggal_lunas } = req.body;

  await pool.query(
    `INSERT INTO pulsa 
     (nama, beli, bayar, tanggal, status, tanggal_lunas)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [nama, beli, bayar, tanggal, status, tanggal_lunas]
  );

  res.json({ message: "Data pulsa berhasil ditambahkan" });
});

// ================= UPDATE =================
app.put("/pulsa/:id", async (req, res) => {
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
});
