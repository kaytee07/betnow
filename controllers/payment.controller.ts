const paystack = require("paystack")(process.env.PAYSTACK_SECRET);
import {Request, Response} from "express";
import { MySessionData } from "../utils/SessionType";

class PaymentController {
    static async payForFiveOdds (req: Request, res: Response) {
        var sessionData: MySessionData = req.session as MySessionData;
        let kobo_amount = 30 * 100
        paystack.transaction.initialize({
            amount: kobo_amount,
            callback_url: "https://localhost:5000/api/getfiveodds"
        }).then(function(body: { data: { reference: any; authorization_url: string; }; }) {
        //extract the reference
        let reference = body.data.reference
        //create a session variable to store the reference
        sessionData.reference = reference;
        //redirect the user to the paystack payment page
        return res.redirect(body.data.authorization_url);
	}).catch(function(error: any) {
		res.redirect('/api/login');
	  });
    }

    static async payForTwoOdds (req: Request, res: Response) {

    }

    static async payForSevenOdds (req: Request, res: Response) {

    }



};

export default PaymentController;