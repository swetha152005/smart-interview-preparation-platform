const express = require("express");
const router = express.Router();

const db = require("../config/db");

// Get all coding questions
router.get("/coding", (req, res) => {

    const sql = "SELECT * FROM coding_questions";

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Failed to fetch coding questions");
        }

        res.json(results);

    });

});

router.get("/coding/company/:company", (req, res) => {

    const { company } = req.params;

    const sql = `
        SELECT * 
        FROM coding_questions
        WHERE company = ?
    `;

    db.query(sql, [company], (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Failed to fetch company questions");
        }

        res.json(results);

    });

});

// Get one coding question by ID
router.get("/coding/:id", (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM coding_questions WHERE id = ?";

    db.query(sql, [id], (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Failed to fetch question");
        }

        if (results.length === 0) {
            return res.status(404).send("Question not found");
        }

        res.json(results[0]);

    });

});
router.get("/mcq", (req, res) => {

    const sql = "SELECT * FROM mcq_questions";

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Failed to fetch MCQs");
        }

        res.json(results);

    });

});

router.post("/mcq-result", (req, res) => {

    const { user_id, score, total_questions } = req.body;

    const sql = `
        INSERT INTO mcq_results
        (user_id, score, total_questions)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [user_id, score, total_questions],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).send("Failed to save MCQ result");
            }

            res.send("MCQ result saved successfully");

        }
    );

});

router.get("/mcq-result/:userId", (req, res) => {

    const { userId } = req.params;

    const sql = `
        SELECT score, total_questions
        FROM mcq_results
        WHERE user_id = ?
        ORDER BY id DESC
        LIMIT 1
    `;

    db.query(sql, [userId], (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Failed to fetch MCQ result");
        }

        if (results.length === 0) {
            return res.json(null);
        }

        res.json(results[0]);

    });

});

router.post("/solved", (req, res) => {

    const { user_id, question_id } = req.body;

    const sql = `
        INSERT INTO solved_questions (user_id, question_id)
        VALUES (?, ?)
    `;

    db.query(sql, [user_id, question_id], (err, result) => {

        if (err) {

            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).send("Question already marked as solved");
            }

            console.log(err);
            return res.status(500).send("Failed to mark question as solved");
        }

        res.send("Question marked as solved");

    });

});

router.get("/solved/:userId/:questionId", (req, res) => {

    const { userId, questionId } = req.params;

    const sql = `
        SELECT id
        FROM solved_questions
        WHERE user_id = ? AND question_id = ?
        LIMIT 1
    `;

    db.query(
        sql,
        [userId, questionId],
        (err, results) => {

            if (err) {
                console.log(err);
                return res.status(500).send(
                    "Failed to check solved status"
                );
            }

            res.json({
                solved: results.length > 0
            });

        }
    );

});



router.get("/solved/count/:userId", (req, res) => {

    const { userId } = req.params;

    const sql = `
        SELECT COUNT(*) AS count
        FROM solved_questions
        WHERE user_id = ?
    `;

    db.query(sql, [userId], (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Failed to fetch solved count");
        }

        res.json({
            count: results[0].count
        });

    });

});

module.exports = router;