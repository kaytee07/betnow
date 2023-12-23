import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    image: {
        imageUrl: String,
        required: true
    },
    oddsType: {
        name: String,
        enum: ['two odds', 'five odds', 'seven odds'],
        required: true
    }
}, {timestamps: true})

const ticketModel = mongoose.model('Model', TicketSchema);
export default ticketModel;