import 'dotenv/config'
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';


let server: Server
const port = 5000;

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.kvlax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

        console.log('✅ Connected to MongoDB using Mongoose');

        server = app.listen(port, () => {
            console.log(`🚀 Server is listening on port ${port}`);
        })
    } catch (error) {
        console.log('❌ Error connecting to MongoDB:', error);
    }
}

main();