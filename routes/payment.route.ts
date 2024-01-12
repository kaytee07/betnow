import { PaymentController } from "../controllers";
import { Router } from "express";

const paymentRouter = Router();

paymentRouter.get("/buytwoodds", PaymentController.payForFiveOdds);

export default paymentRouter;