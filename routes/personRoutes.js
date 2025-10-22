import { Router } from "express";
import {
    createPersonHandler,
    getPersonByIdHandler,
    listPersonsHandler,
    listPersonsByUserHandler,
    updatePersonHandler,
    deletePersonHandler,
} from "../controllers/personController.js";


const router = Router();

router.post("/", createPersonHandler);
router.get("/", listPersonsHandler);
router.get("/user/:userId", listPersonsByUserHandler);
router.get("/:id", getPersonByIdHandler);
router.put("/:id", updatePersonHandler);
router.patch("/:id", updatePersonHandler);
router.delete("/:id", deletePersonHandler);

export default router;
