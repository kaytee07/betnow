const paystack = require("paystack")(process.env.PAYSTACK_SECRET);
import {Request, Response} from "express";
import { MySessionData } from "../utils/SessionType";
import { TicketModel } from "../models";

class PaymentController {
    static async payForFiveOdds (req: Request, res: Response) {
        var sessionData: MySessionData = req.session as MySessionData;
        try {
            const getAllodds = await TicketModel.find({ oddsType: {
                    name: "five odds"
                }});
            if (getAllodds.length === 0) return res.json(400).json({error: "no odds available"})
        } catch (err) {
            console.error(err)
        }
        
        let kobo_amount = 50 * 100;
        paystack.transaction.initialize({
            email: "kayteeofficial07@gmail.com",
            amount: kobo_amount,
            callback_url: "http://localhost:5173/api/fiveodds"
        }).then(function(body: { data: { reference: any; authorization_url: string; }; }) {
        //extract the reference
        let reference = body.data.reference
        //create a session variable to store the reference
        sessionData.reference = reference;
        //redirect the user to the paystack payment page
        return res.status(200).json({"authorization_url":body.data.authorization_url});
	}).catch(function(error: any) {
        console.log(error)
		res.status(400).json({"error": error});
	  });
    }

    static async payForTwoOdds (req: Request, res: Response) {
        var sessionData: MySessionData = req.session as MySessionData;
        const getAllodds = await TicketModel.find({ oddsType: {
                    name: "two odds"
                }});
        let kobo_amount = 30 * 100;
        paystack.transaction.initialize({
            email: "kaytee@io.com",
            amount: kobo_amount,
            callback_url: "http://localhost:5173/api/twoodds"
        }).then(function(body: { data: { reference: any; authorization_url: string; }; }) {
        //extract the reference
        let reference = body.data.reference
        //create a session variable to store the reference
        sessionData.reference = reference;
        //redirect the user to the paystack payment page
        return res.status(200).json({"authorization_url":body.data.authorization_url});
	}).catch(function(error: any) {
        console.log(error)
		res.status(400).json({"error": error});
	  });
    }

    static async payForSevenOdds (req: Request, res: Response) {
        var sessionData: MySessionData = req.session as MySessionData;
        const getAllodds = await TicketModel.find({ oddsType: {
                    name: "seven odds"
                }});
        let kobo_amount = 70 * 100;
        paystack.transaction.initialize({
            email: "kaytee@io.com",
            amount: kobo_amount,
            callback_url: "http://localhost:5173/api/sevenodds"
        }).then(function(body: { data: { reference: any; authorization_url: string; }; }) {
        //extract the reference
        let reference = body.data.reference
        //create a session variable to store the reference
        sessionData.reference = reference;
        //redirect the user to the paystack payment page
        return res.status(200).json({"authorization_url":body.data.authorization_url});
	}).catch(function(error: any) {
        console.log(error)
		res.status(400).json({"error": error});
	  });
    }



};

export default PaymentController;