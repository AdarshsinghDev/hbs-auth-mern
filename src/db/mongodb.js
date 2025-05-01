import mongoose from "mongoose";

mongoose.connect("mongodb+srv://adarsh:adarsh123@cluster0.psvz3uu.mongodb.net/Adarsh").then(() => {
    console.log(`✅ MongoDB connected successful!`)
}).catch((error) => {
    console.log(`Db error: ${error}`);
})

