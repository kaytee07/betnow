import TicketModel from "../models/ticket.model.js";
import multer from "multer";
import { cloudinary } from "../middlewares/cloudinary.middleware.js";

class TicketController {
    static async uploadFile (req, res) {
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

    static async getFiveOdds(req, res) {
        const { reference } = req.query
        if (reference || req.cookies.jwt) {
            try {
                const getAllodds = await TicketModel.find({ oddsType: {
                    name: "five odds"
                }});
                // if (getAllodds.length < 1) return res.status(400).json({error: "there are no images in five odds"});
                if (req.cookies.jwt) {
                    return res.status(200).json({"success": getAllodds, user: "admin"});
                } else {
                    return res.status(200).json({"success": getAllodds, user: "buyer"});
                }
            } catch (err) {
                return res.status(400).json({"error": "five odds error"});
            }
        } else {
            return res.status(200).json({"fail": "no photos"});
        }
        
    }

    static async getTwoOdds(req, res) {
        const { reference } =   req.query;
        if (reference|| req.cookies.jwt) {
            try {
                const getAllodds = await TicketModel.find({ oddsType: {
                    name: "two odds"
                }});
                // if (getAllodds.length < 1) return res.status(400).json({error: "there are no images in five odds"});
                if (req.cookies.jwt) {
                    return res.status(200).json({"success": getAllodds, user: "admin"});
                } else {
                    return res.status(200).json({"success": getAllodds, user: "buyer"});
                }
            } catch (err) {
                return res.status(400).json({"error": "five odds error"});
            }
        } else {
            return res.status(200).json({"fail": "no photos"});
        }
    }

    static async getSevenOdds(req, res) {
        const { reference } =   req.query;;
        if (reference || req.cookies.jwt) {
            try {
                const getAllodds = await TicketModel.find({ oddsType: {
                    name: "seven odds"
                }});
                // if (getAllodds.length < 1) return res.status(400).json({error: "there are no images in five odds"});
                if (req.cookies.jwt) {
                    return res.status(200).json({"success": getAllodds, user: "admin"});
                } else {
                    return res.status(200).json({"success": getAllodds, user: "buyer"});
                }
            } catch (err) {
                return res.status(400).json({"error": "five odds error"});
            }
        } else {
            return res.status(200).json({"fail": "no photos"});
        }
        
    }

    static async deleteFiveOdds(req, res) {
        const { url } = req.body;
        try {
            const deleteOdd = await TicketModel.deleteOne({ 'image.imageUrl': url, 'oddsType.name': 'five odds' });
            res.status(200).json({ success: deleteOdd });
        } catch (err) {
            res.status(400).json({ error: err  });
        }
    }

    static async deleteTwoOdds(req, res) {
        const { url } = req.body;
        try {
            const deleteOdd = await TicketModel.deleteOne({ 'image.imageUrl': url, 'oddsType.name': 'two odds' });
            res.status(200).json({ success: deleteOdd });
        } catch (err) {
            res.status(400).json({ error: err  });
        }
    }

    static async deleteSevenOdds(req, res) {
        const { url } = req.body;
        try {
            const deleteOdd = await TicketModel.deleteOne({ 'image.imageUrl': url, 'oddsType.name': 'seven odds' });
            res.status(200).json({ success: deleteOdd });
        } catch (err) {
            res.status(400).json({ error: err  });
        }
    }

    static async getAllOdds (req, res) {
        try {
            const allOdds = await TicketModel.find();
            res.status(200).json({"success": allOdds});
        } catch (err) {
            res.status(200).json({error: err});
        }
    }
} 

export default TicketController;