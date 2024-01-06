import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    image: {
        imageUrl: {
            type: String,
            required: true
        }
    },
    oddsType: {
        name:  {
            type: String,
            enum: ['two odds', 'five odds', 'seven odds'],
            required: true
        }
    }
}, {timestamps: true})

const ticketModel = mongoose.model('Model', TicketSchema);
export default ticketModel;