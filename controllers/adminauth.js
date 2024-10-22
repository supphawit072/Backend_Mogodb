const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const dotenv = require('dotenv');
dotenv.config();

const generateAdminId = async () => {
    const lastAdmin = await Admin.findOne().sort({ admin_id: -1 }).exec();
    if (!lastAdmin) {
        return 'A01';
    }
    const lastAdminId = lastAdmin.admin_id;
    let letterPart = lastAdminId.slice(0, 1);
    let numberPart = parseInt(lastAdminId.slice(1), 10);
    numberPart += 1;
    if (numberPart > 99) {
        letterPart = String.fromCharCode(letterPart.charCodeAt(0) + 1);
        numberPart = 1;
    }
    const newAdminId = `${letterPart}${numberPart.toString().padStart(2, '0')}`;
    return newAdminId;
};

exports.register = async (req, res) => {
    const {
        admin_username,
        admin_password,
        admin_Fname,
        admin_Lname,
        admin_tel,
        admin_email
    } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(admin_password, 10); // เข้ารหัสรหัสผ่าน
        const admin_id = await generateAdminId(); // สร้าง admin_id ใหม่
        const admin = new Admin({
            admin_id,
            admin_username,
            admin_password: hashedPassword,
            admin_Fname,
            admin_Lname,
            admin_tel,
            admin_email
        });
        await admin.save();
        res.status(201).send("ลงทะเบียนผู้ดูแลระบบแล้ว");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.login = async (req, res) => {
    const { admin_username, admin_password } = req.body;
    try {
        const tmpadmin = await Admin.findOne({ admin_username });
        if (!tmpadmin) return res.status(400).send("ไม่พบผู้ดูแลระบบ");
        const isMatch = await bcrypt.compare(admin_password, tmpadmin.admin_password);
        if (!isMatch) return res.status(400).send("ข้อมูลประจำตัวไม่ถูกต้อง");
        const admin = await Admin.findOne({ admin_username }).select("-admin_password");
        const accessToken = jwt.sign(
            { adminId: admin._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
        const refreshToken = jwt.sign(
            { adminId: admin._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "2h" }
        );
        res.json({ admin, accessToken, refreshToken });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.refresh = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, admin) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign(
            { userId: admin. admin_id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5h" }
        );
        res.json({ accessToken });
    });
};

