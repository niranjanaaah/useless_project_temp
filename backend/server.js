const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("🔮 WhyFi Astrology Backend is working!");
});
app.get("/api/question", (req, res) => {
    const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];

    res.json({
        question: randomQuestion.question,
        options: randomQuestion.options
 });
});
app.listen(3000, () => {
    console.log("🔮 Server running on http://localhost:3000");
});
const questions = require("./questions.json");