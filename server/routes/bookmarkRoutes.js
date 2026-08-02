const express = require("express");
const router = express.Router();

const db = require("../config/db");


// Add bookmark
router.post("/", (req, res) => {

    const { user_id, question_id } = req.body;

    const sql = `
        INSERT INTO bookmarks (user_id, question_id)
        VALUES (?, ?)
    `;

    db.query(sql, [user_id, question_id], (err, result) => {

        if (err) {

            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).send("Question already bookmarked");
            }

            console.log(err);
            return res.status(500).send("Bookmark failed");
        }

        res.send("Question bookmarked successfully");

    });

});


// Get user's bookmarks
router.get("/:userId", (req, res) => {

    const { userId } = req.params;

    const sql = `
        SELECT 
            bookmarks.id,
            coding_questions.id AS question_id,
            coding_questions.title,
            coding_questions.description,
            coding_questions.difficulty,
            coding_questions.topic
        FROM bookmarks
        JOIN coding_questions
        ON bookmarks.question_id = coding_questions.id
        WHERE bookmarks.user_id = ?
    `;

    db.query(sql, [userId], (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Failed to fetch bookmarks");
        }

        res.json(results);

    });

});

router.get("/count/:userId", (req, res) => {

    const { userId } = req.params;

    const sql = `
        SELECT COUNT(*) AS count
        FROM bookmarks
        WHERE user_id = ?
    `;

    db.query(sql, [userId], (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Failed to fetch bookmark count");
        }

        res.json({
            count: results[0].count
        });

    });

});

router.delete("/:userId/:questionId", (req, res) => {

    const { userId, questionId } = req.params;

    const sql = `
        DELETE FROM bookmarks
        WHERE user_id = ? AND question_id = ?
    `;

    db.query(sql, [userId, questionId], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Failed to remove bookmark");
        }

        res.send("Bookmark removed successfully");

    });

});
module.exports = router;