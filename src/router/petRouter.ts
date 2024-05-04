import exprees from "express";
import PetController from "../controller/PetController";

const router = exprees.Router();

const petController = new PetController();

router.post("/", petController.criaPet );

export default router