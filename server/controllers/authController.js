require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Login Failed");
        }

        if (results.length === 0) {
            return res.status(401).send("Invalid Email or Password");
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send("Invalid Email or Password");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login Successful",
            token: token
        });
    });
};

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql =
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        db.query(
            sql,
            [name, email, hashedPassword],
            (err, result) => {

                if (err) {
                    console.log(err);
                    return res.status(500).send("Registration Failed");
                }

                res.send("User Registered Successfully");
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).send("Registration Failed");
    }
};