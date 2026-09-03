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
// HUMAN VERIFICATION ROUTES
// ==========================================

app.get("/api/questions", (req, res) => {

    const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];

    res.json({
        id: randomQuestion.id,
        question: randomQuestion.question,
        options: randomQuestion.options
    });
});


app.post("/api/verify", (req, res) => {

    const { questionId, answer } = req.body;

    const question =
        questions.find(q => q.id === questionId);

    if (!question) {
        return res.status(404).json({
            success: false,
            message: "Question not found"
        });
    }

    if (answer === question.answer) {
        return res.json({
            success: true,
            message: "Human verified! Welcome to WhyFi 🔮"
        });
    }

    return res.json({
        success: false,
        message: "Wrong answer. Are you even human? 🤨"
    });
});


// ==========================================
// WHYFI PREDICTIONS
// ==========================================

app.post("/api/predictions", (req, res) => {

    const { wifiName, dob } = req.body;

    // Check required details
    if (!wifiName || !dob) {
        return res.status(400).json({
            success: false,
            message: "WiFi name and date of birth are required."
        });
    }

    // Get all categories
    const categories = Object.keys(predictions);

    // Pick one random prediction from each category
    const selectedPredictions = [];

    categories.forEach(category => {

        const list = predictions[category];

        if (Array.isArray(list) && list.length > 0) {

            const randomPrediction =
                list[Math.floor(Math.random() * list.length)];

            selectedPredictions.push(randomPrediction);
        }

    });

    // Shuffle predictions
    selectedPredictions.sort(
        () => Math.random() - 0.5
    );

    // Send ONLY prediction text
    res.json({
        success: true,
        predictions: selectedPredictions
    });

});


// ==========================================
// OLD SINGLE CATEGORY PREDICTION ROUTE
// ==========================================

app.get("/api/prediction/:category", (req, res) => {

    const category = req.params.category;

    const list = predictions[category];

    if (!list) {
        return res.status(404).json({
            success: false,
            message: "Category not found"
        });
    }

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `🔮 WhyFi Backend running on http://localhost:${PORT}`
    );
});