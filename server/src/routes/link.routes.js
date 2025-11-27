import { Router } from "express";
import { validateCode } from "../middlewares/validateCode.js";
import { createLinkController, deleteLinkController, getAllLinksController, getLinksStatsController } from "../controllers/link.controller.js";

const router = Router();

router.post("/links", validateCode, createLinkController);
router.get("/links", getAllLinksController);
router.get("/links/:code", getLinksStatsController);
router.delete("/links/:code", deleteLinkController);

export default router;