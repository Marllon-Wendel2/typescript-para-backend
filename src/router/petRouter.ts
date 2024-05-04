import exprees from "express";
import PetController from "../controller/PetController";

const router = exprees.Router();

const petController = new PetController();

router.post("/", petController.criaPet );
router.get("/", petController.listaPets );
router.get("/:id", petController.listaPetsPorId );
router.put("/:id", petController.atualizaPet );
router.delete("/:id", petController.deletaPet );

export default router