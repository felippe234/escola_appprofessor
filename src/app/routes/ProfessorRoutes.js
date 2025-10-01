import express from "express";
import ProfessorController from "../controller/ProfessorController.js";

const router = express.Router();

router.get("/professores", ProfessorController.index);
router.get("/professores/:id", ProfessorController.show);
router.post("/professores", ProfessorController.store);
router.put("/professores/:id", ProfessorController.update);
router.delete("/professores/:id", ProfessorController.delete);

export default router;
