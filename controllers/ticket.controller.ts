import Joi from "joi";
import { Request, Response } from "express";
import { TicketModel } from "../models";
import multer from "multer";
import { cloudinary } from "../middlewares";
// const upload = multer({ storage });

class TicketController {
    static async uploadFile (req: Request, res: Response) {
        //const { oddType } = req.body;
        const oddType = req.body.oddType;
        console.log(oddType);
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
        const {fiveOdds} = req.body;
        try {
            const getAllodds = await TicketModel.find({ oddsType: {
                name: fiveOdds
            }});
            if (getAllodds.length < 1) return res.status(400).json({error: "there are no images in five odds"});
            res.status(200).json({"success": getAllodds});
        } catch (err) {
            res.status(400).json({"error": "five odds error"});
        }
    }

    static async getTwoOdds(req: Request, res:Response) {
        const {twoOdds} = req.body;
        try {
            const getAllodds = await TicketModel.find({ oddsType: {
                name: twoOdds
            }});
            if (getAllodds.length < 1) return res.status(400).json({error: "there are no images in two odds"});
            res.status(200).json({"success": getAllodds});
        } catch (err) {
            res.status(400).json({"error": err});
        }
    }

    static async getSevenOdds(req: Request, res: Response) {
        const {sevenOdds} = req.body;
        try {
            const getAllodds = await TicketModel.find({ oddsType: {
                name: sevenOdds
            }});
            if (getAllodds.length < 1) return res.status(400).json({error: "there are no images in seven odds"});
            res.status(200).json({"success": getAllodds});
        } catch (err) {
            res.status(400).json({"error": err});
        }
    }

    static async deleteFiveOdds(req: Request, res: Response) {
        const {imageUrl} = req.body;
        try {
            const deleteOdd = await TicketModel.deleteOne({image: {
                imageUrl
            }})
            res.status(200).json({"sucess": deleteOdd})
        } catch (err) {
            res.status(400).json({error :err})
        }
    }

    static async deleteTwoOdds(req: Request, res: Response) {
        const {imageUrl} = req.body;
        try {
            const deleteOdd = await TicketModel.deleteOne({image: {
                imageUrl
            }});
            res.status(200).json({"sucess": deleteOdd});
        } catch (err) {
            res.status(400).json({error: err});
        }
    }

    static async deleteSevenOdds(req: Request, res: Response) {
        const {imageUrl} = req.body;
        try {
            const deleteOdd = await TicketModel.deleteOne({image: {
                imageUrl
            }});
            res.status(200).json({"sucess": deleteOdd});
        } catch (err) {
            res.status(400).json({"error": err});
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