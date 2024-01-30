import paystack from "paystack";
const paystackInstance = paystack(process.env.PAYSTACK_SECRET);
import TicketModel from "../models/ticket.model.js";

class PaymentController {
    static async payForFiveOdds (req, res) {
        try {
            const getAllodds = await TicketModel.find({ oddsType: {
                    name: "five odds"
                }});
            if (getAllodds.length === 0) {
                return res.status(200).json({message: "no photos available"});
            } else {
                let kobo_amount = 50 * 100;
                paystackInstance.transaction.initialize({
                    email: "bettnow2@gmail.com",
                    amount: kobo_amount,
                    callback_url: "https://www.bettnow.org/api/fiveodds"
                }).then(function(body) {
                    //extract the reference
                    let reference = body.data.reference
                    //create a session variable to store the reference
                    req.session.reference = reference
                    //redirect the user to the paystack payment page
                    return res.status(200).json({"authorization_url":body.data.authorization_url});
                }).catch(function(error) {
                console.log(error)
                res.status(400).json({"error": error});
                });
            }
        } catch (err) {
            console.error(err)
        }
        
        
    }

    static async payForTwoOdds (req, res) {
        try {
            const getAllodds = await TicketModel.find({ oddsType: {
                    name: "two odds"
                }});
            if (getAllodds.length === 0) {
                return res.status(200).json({message: "no photos available"});
            } else {
                let kobo_amount = 30 * 100;
                paystackInstance.transaction.initialize({
                    email: "bettnow2@gmail.com",
                    amount: kobo_amount,
                    callback_url: "https://www.bettnow.org/api/twoodds"
                }).then(function(body) {
                    //extract the reference
                    let reference = body.data.reference
                    //create a session variable to store the reference
                    req.session.reference = reference;
                    //redirect the user to the paystack payment page
                    return res.status(200).json({"authorization_url":body.data.authorization_url});
                }).catch(function(error) {
                console.log(error)
                res.status(400).json({"error": error});
                });
            }
        } catch (err) {
            console.error(err)
        }
       
        
    }

    static async payForSevenOdds (req, res) {
        const getAllodds = await TicketModel.find({ oddsType: {
                    name: "seven odds"
                }});
        if (getAllodds.length === 0) {
            return res.status(200).json({message: "no photos available"});
        } else {
            let kobo_amount = 70 * 100;
            paystackInstance.transaction.initialize({
            email: "bettnow2@gmail.com",
            amount: kobo_amount,
            callback_url: "https://www.bettnow.org/api/sevenodds"
             }).then(function(body) {
                 //extract the reference
                let reference = body.data.reference
                console.log(reference)
                //create a session variable to store the reference
                req.session.reference = reference
                //redirect the user to the paystack payment page
                  return res.status(200).json({"authorization_url":body.data.authorization_url});
	          }).catch(function(error) {
                 console.log(error)
		        res.status(400).json({"error": error});
	         });
        }
        
    }



};

export default PaymentController;