import Joi from "joi";
import { Request, Response } from "express";
import { TicketModel } from "../models";
import multer from "multer";
import { cloudinary } from "../middlewares";
import { MySessionData } from "../utils/SessionType";

class TicketController {
    static async uploadFile (req: Request, res: Response) {
        //const { oddType } = req.body;
        const oddType = req.body.oddType;

        try {
            if (req.file && req.file.path){
                const result = await cloudinary.uploader.upload(req.file.path);
                const ticket = new TicketModel({
                    image: {
                        imageUrl: result.secure_url,
                    },
                    oddsType: {
                        name:  oddType
                    }
                });

                ticket.save().then(() => {
                   return res.json({ url: result.secure_url, oddType  });
                }).catch((err) => {
                    console.log(err)
                    return res.status(400).json({"error": err});
                })
                
            } else {
                res.status(500).json({ error: 'path not found' });
            }
            
        } catch (err) {
            res.status(500).json({ error: 'Upload failed' });
        }
    }

    static async getFiveOdds(req: Request, res: Response) {
        const { reference } = req.query
        if (reference || req.cookies.jwt) {
            try {
                const getAllodds = await TicketModel.find({ oddsType: {
                    name: "five odds"
                }});
                // if (getAllodds.length < 1) return res.status(400).json({error: "there are no images in five odds"});
                if (reference) {
                    return res.status(200).json({"success": getAllodds, user: "buyer"});
                } else {
                    return res.status(200).json({"success": getAllodds, user: "admin"});
                }
            } catch (err) {
                return res.status(400).json({"error": "five odds error"});
            }
        } else {
            return res.status(200).json({"fail": "no photos"});
        }
        
    }

    static async getTwoOdds(req: Request, res:Response) {
        const { reference } =   req.session as MySessionData;
        if (reference|| req.cookies.jwt) {
            try {
                const getAllodds = await TicketModel.find({ oddsType: {
                    name: "two odds"
                }});
                // if (getAllodds.length < 1) return res.status(400).json({error: "there are no images in five odds"});
                if (reference) {
                    return res.status(200).json({"success": getAllodds, user: "buyer"});
                } else {
                    return res.status(200).json({"success": getAllodds, user: "admin"});
                }
            } catch (err) {
                return res.status(400).json({"error": "five odds error"});
            }
        } else {
            return res.status(200).json({"fail": "no photos"});
        }
    }

    static async getSevenOdds(req: Request, res: Response) {
        const { reference } = req.session as MySessionData;
        if (reference || req.cookies.jwt) {
            try {
                const getAllodds = await TicketModel.find({ oddsType: {
                    name: "seven odds"
                }});
                // if (getAllodds.length < 1) return res.status(400).json({error: "there are no images in five odds"});
                if (reference) {
                    return res.status(200).json({"success": getAllodds, user: "buyer"});
                } else {
                    return res.status(200).json({"success": getAllodds, user: "admin"});
                }
            } catch (err) {
                return res.status(400).json({"error": "five odds error"});
            }
        } else {
            return res.status(200).json({"fail": "no photos"});
        }
        
    }

    static async deleteFiveOdds(req: Request, res: Response) {
        const { url } = req.body;
        try {
            const deleteOdd = await TicketModel.deleteOne({ 'image.imageUrl': url, 'oddsType.name': 'five odds' });
            res.status(200).json({ success: deleteOdd });
        } catch (err) {
            res.status(400).json({ error: err  });
        }
    }

    static async deleteTwoOdds(req: Request, res: Response) {
        const { url } = req.body;
        try {
            const deleteOdd = await TicketModel.deleteOne({ 'image.imageUrl': url, 'oddsType.name': 'two odds' });
            res.status(200).json({ success: deleteOdd });
        } catch (err) {
            res.status(400).json({ error: err  });
        }
    }

    static async deleteSevenOdds(req: Request, res: Response) {
        const { url } = req.body;
        try {
            const deleteOdd = await TicketModel.deleteOne({ 'image.imageUrl': url, 'oddsType.name': 'seven odds' });
            res.status(200).json({ success: deleteOdd });
        } catch (err) {
            res.status(400).json({ error: err  });
        }
    }

    static async getAllOdds (req: Request, res: Response) {
        try {
            const allOdds = await TicketModel.find();
            res.status(200).json({"success": allOdds});
        } catch (err) {
            res.status(200).json({error: err});
        }
    }
} 

export default TicketController;