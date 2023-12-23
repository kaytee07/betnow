import mongoose from 'mongoose';


class Mongoose {
     private isConnected: boolean;

    constructor() {
        this.isConnected = false;
    }

    async isAlive(): Promise<boolean> {
        await mongoose.connect("mongodb://localhost/betnow",).then(() => {
                this.isConnected = true
            }).catch((error: string) => {
                console.error(error)
            })
        return this.isConnected;
    }
}

const mongooseClient = new Mongoose();
export default mongooseClient;
