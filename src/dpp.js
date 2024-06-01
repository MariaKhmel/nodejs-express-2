import mongoose from "mongoose";

const DB_HOST = "mongodb+srv://mariakhmel8:nkqkQCQZ5HyF5vop@cluster0.d8eotrg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
    .then(() => console.log('connect'))
    .catch((err) => {
        console.log(err.message);
        // process.exit(1);
    });
