const express = require("express");
const cors = require("cors");

const app = express();

// Load JSON files
const questions = require("./questions.json");
const predictions = require("./predictions.json");

// Middleware
app.use(cors());
app.use(express.json());


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.send("🔮 WhyFi Astrology Backend is working!");
});


// ==========================================
// GET RANDOM HUMAN VERIFICATION QUESTION
// ==========================================

app.get("/api/question", (req, res) => {

    const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];

    res.json({
        id: randomQuestion.id,
        question: randomQuestion.question,
        options: randomQuestion.options
    });
});


// ==========================================
// VERIFY USER'S ANSWER
// ==========================================

app.post("/api/verify", (req, res) => {

    const { questionId, answer } = req.body;

    const question = questions.find(q => q.id === questionId);

    // Question doesn't exist
    if (!question) {
        return res.status(404).json({
            success: false,
            message: "Question not found"
        });
    }

    // Correct answer
    if (answer === question.answer) {
        return res.json({
            success: true,
            message: "Human verified! Welcome to WhyFi 🔮"
        });
    }

    // Wrong answer
    return res.json({
        success: false,
        message: "Wrong answer. Are you even human? 🤨"
    });
});


// ==========================================
// GET RANDOM ASTROLOGY PREDICTION
// ==========================================

app.get("/api/prediction/:category", (req, res) => {

    const category = req.params.category;

    // Get predictions for requested category
    const list = predictions[category];

    // Category doesn't exist
    if (!list) {
        return res.status(404).json({
            success: false,
            message: "Category not found"
        });
    }

    // Pick random prediction
    const randomPrediction =
        list[Math.floor(Math.random() * list.length)];

    res.json({
        success: true,
        category: category,
        prediction: randomPrediction
    });
});


// ==========================================
// START SERVER
// ==========================================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🔮 WhyFi Backend running on http://localhost:${PORT}`);
});