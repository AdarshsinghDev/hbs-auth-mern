import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Adarsh").then(() => {
    console.log(`✅ MongoDB connected successful!`)
}).catch((error) => {
    console.log(`Db error: ${error}`);
})

