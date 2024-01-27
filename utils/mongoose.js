import mongoose from 'mongoose';


//mongodb://localhost/betnow
class Mongoose {
    constructor() {
        this.isConnected = false;
    }

    async isAlive(){
        await mongoose.connect("mongodb+srv://kofitaylor07:UPsBXb5scIgRJr4q@cluster0.lroxybh.mongodb.net/",).then(() => {
                this.isConnected = true
            }).catch((error) => {
                console.error(error)
            })
        return this.isConnected;
    }
}

const mongooseClient = new Mongoose();
export default mongooseClient;
