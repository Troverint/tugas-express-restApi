import db from "../Connection.js";

export const getAllFilm = (req, res) => {
  const querySql = "SELECT * FROM film";

  db.query(querySql, (err, rows, field) => {
    if (err) {
      return res.status(500).json({ message: "Ada kesalahan", error: err });
    }

    res.status(200).json(rows);
  });
};

export const getFilmById = (req, res) => {
  const sql = `SELECT * FROM film WHERE id = ${req.query.id}`;
  db.query(sql, (error, result) => res.json(result));
};

export const getFilmByGenre = (req, res) => {
  const sql = `SELECT * FROM film WHERE genre = "${req.query.genre}"`;
  db.query(sql, (error, result) => res.json(result));
};

export const addFilm = (req, res) => {
  const data = { ...req.body };
  const querySql = "INSERT INTO film SET ?";

  db.query(querySql, data, (err, rows, field) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Gagal insert data!", error: err });
    }

    res.status(201).json({ success: true, message: "Berhasil insert data!" });
  });
};
export const delFilm = (req, res) => {
  const querySearch = "SELECT * FROM film WHERE id = ?";
  const queryDelete = "DELETE FROM film WHERE id = ?";

  db.query(querySearch, req.params.id, (err, rows, field) => {
    // error handling
    if (err) {
      return res.status(500).json({ message: "Ada kesalahan", error: err });
    }

    if (rows.length) {
      db.query(queryDelete, req.params.id, (err, rows, field) => {
        if (err) {
          return res.status(500).json({ message: "Ada kesalahan", error: err });
        }

        res
          .status(200)
          .json({ success: true, message: "Berhasil hapus data!" });
      });
    } else {
      return res
        .status(404)
        .json({ message: "Data tidak ditemukan!", success: false });
    }
  });
};
export const updateFilm = (req, res) => {
  const data = { ...req.body };
  const querySearch = "SELECT * FROM film WHERE id = ?";
  const queryUpdate = "UPDATE film SET ? WHERE id = ?";

  db.query(querySearch, req.params.id, (err, rows, field) => {
    if (err) {
      return res.status(500).json({ message: "Ada kesalahan", error: err });
    }

    if (rows.length) {
      db.query(queryUpdate, [data, req.params.id], (err, rows, field) => {
        if (err) {
          return res.status(500).json({ message: "Ada kesalahan", error: err });
        }

        res
          .status(200)
          .json({ success: true, message: "Berhasil update data!" });
      });
    } else {
      return res
        .status(404)
        .json({ message: "Data tidak ditemukan!", success: false });
    }
  });
};
