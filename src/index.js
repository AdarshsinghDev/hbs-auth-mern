import express from 'express';
import './db/mongodb.js';
import path from 'path';
import { fileURLToPath } from 'url';
import Signup from './models/signup.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

const static_path = path.join(__dirname);

app.use(express.json());
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");


app.get('/', (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/login", async (req, res) => {
    try {
        const { loginEmail, loginPassword } = req.body;

        const correctUser = await Signup.findOne({ loginEmail });
        const correctPassword = await Signup.findOne({ loginPassword });

        if (correctUser) {
            if (correctPassword) {
                res.render("index");
                console.log(`Sucessful Login!`);
            } else {
                res.send(`Wrong Password!`);
                console.log(`Wrong Password!`);
            }
        } else {
            res.send("Incorrect username");
            console.log("Incorrect username");
        }
    } catch (error) {
        console.log(`Error`)
    }
})
app.get("/signup", (req, res) => {
    res.render("signup");
});
app.post("/signup", async (req, res) => {
    try {
        const user = new Signup(req.body);
        await user.save();
        console.log(user);
        res.status(201).render("index", { message: "Signup Sucessful!" });
    } catch (error) {
        res.status(400).render("signup", { message: "Signup Failed. Try Again!" });
    }
})


app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);
})