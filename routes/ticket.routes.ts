import {Router} from 'express';
import { TicketController } from '../controllers';
import multer from "multer";
const upload = multer({ dest: 'uploads/' });
//import { storage } from "../middlewares";
//const upload = multer({ storage });

const ticketRouter = Router();

ticketRouter.post("/upload", upload.single('file') ,TicketController.uploadFile);
ticketRouter.get("/fiveodds", TicketController.getFiveOdds);
ticketRouter.get("/twoodds", TicketController.getTwoOdds);
ticketRouter.get("/sevenodds", TicketController.getSevenOdds);
ticketRouter.get("/allodds", TicketController.getAllOdds);
ticketRouter.delete("/removefiveodds", TicketController.deleteFiveOdds);
ticketRouter.delete("/removetwoodds", TicketController.deleteTwoOdds);
ticketRouter.delete("/removesevenodds", TicketController.deleteSevenOdds);
export default ticketRouter;