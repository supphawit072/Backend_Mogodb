const express = require('express');
const router = express.Router();

const { register, login, refresh } = require('../controllers/adminauth');

// Route สำหรับการลงทะเบียน
router.post("/register", register);

// Route สำหรับการเข้าสู่ระบบ
router.post("/login", login);

// Route สำหรับการรีเฟรช
router.post("/refresh", refresh);

module.exports = router;
