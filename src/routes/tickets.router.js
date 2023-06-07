import { Router } from "express";
import { finishCheckout } from "../controllers/carts.controller";

const router = Router();

router.post("/:cid/finish_checkout", finishCheckout);

export default router;
