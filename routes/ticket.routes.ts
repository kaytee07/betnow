import {Router} from 'express';
import { TicketController } from '../controllers';
import multer from "multer";
import requireAuth from '../middlewares/authorization.middleware';
const upload = multer({ dest: 'uploads/' });
//import { storage } from "../middlewares";
//const upload = multer({ storage });

const ticketRouter = Router();

ticketRouter.post("/upload",requireAuth, upload.single('file') ,TicketController.uploadFile);
ticketRouter.get("/fiveodds", TicketController.getFiveOdds);
ticketRouter.get("/twoodds", TicketController.getTwoOdds);
ticketRouter.get("/sevenodds", TicketController.getSevenOdds);
ticketRouter.get("/allodds", requireAuth, TicketController.getAllOdds);
ticketRouter.delete("/removefiveodds", requireAuth, TicketController.deleteFiveOdds);
ticketRouter.delete("/removetwoodds", requireAuth, TicketController.deleteTwoOdds);
ticketRouter.delete("/removesevenodds", requireAuth, TicketController.deleteSevenOdds);
export default ticketRouter;