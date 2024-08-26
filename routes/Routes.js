import express from "express";
import { getAllFilm, addFilm, updateFilm, getFilmById, delFilm, getFilmByGenre } from "../controller/filmController.js";

const router = express.Router()

router.get("/", getAllFilm)
router.get("/find", getFilmById)
router.get("/genre", getFilmByGenre)
router.post("/add", addFilm)
router.put("/update/:id", updateFilm)
router.delete("/del/:id", delFilm)

export default router;
