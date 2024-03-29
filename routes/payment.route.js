import PaymentController from "../controllers/payment.controller.js";
import { Router } from "express";

const paymentRouter = Router();

paymentRouter.get("/buyfiveodds", PaymentController.payForFiveOdds);
paymentRouter.get("/buytwoodds", PaymentController.payForTwoOdds);
paymentRouter.get("/buysevenodds", PaymentController.payForSevenOdds);

export default paymentRouter;