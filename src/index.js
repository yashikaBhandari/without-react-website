const express = require("express");
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const app = express();
const tempath = path.join(__dirname, '../templates');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", tempath);
hbs.registerPartials(partialsPath);

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/aboutus", (req, res) => {
    res.render("aboutus");
});
app.get("/aboutus2", (req, res) => {
    res.render("aboutus2");
});

app.get("/gallery", (req, res) => {
    res.render("gallery");
});

app.post("/signup", async (req, res, next) => {
    try {
        const data = {
            name: req.body.name,
            password: req.body.password
        };
        let finaldata = new collection(data);
        await finaldata.save();
        res.render("home");
    } catch (error) {
        next(error);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await collection.findOne({ name, password });
        if (user) {
            res.render("aboutus");
        } else {
            res.render("login", { error: "invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log("port connected");
});
