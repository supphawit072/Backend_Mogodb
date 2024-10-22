const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require('dotenv');
dotenv.config();

exports.login = async (req, res) => {
    const { user_name, password } = req.body;
    try {
        const tmpuser = await User.findOne({ user_name });
        if (!tmpuser) return res.status(400).send("ไม่พบผู้ใช้");
        const isMatch = await bcrypt.compare(password, tmpuser.password);
        if (!isMatch) return res.status(400).send("ข้อมูลประจำตัวไม่ถูกต้อง");
        const user = await User.findOne({ user_name }).select("-password");
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "2h" }
        );
        res.json({ user, accessToken, refreshToken });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.refresh = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // 'Bearer <token>'
    if (!token) return res.status(401).json({ message: 'ไม่มีการให้โทเค็น' });
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).send("โทเค็นรีเฟรชหมดอายุแล้ว กรุณาเข้าสู่ระบบอีกครั้ง.");
            }
            return res.status(403).send("โทเค็นการรีเฟรชไม่ถูกต้อง");
        }
        const accessToken = jwt.sign(
            { userId: user.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ accessToken });
    });
}

exports.refresh = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign(
            { user_id: user. user },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5h" }
        );
        res.json({ accessToken });
    });
};