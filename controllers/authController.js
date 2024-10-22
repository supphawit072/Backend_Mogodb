const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ฟังก์ชันสำหรับการลงทะเบียนผู้ใช้
exports.register = async (req, res) => {
    const { user_name, password, name, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ user_name, password: hashedPassword, name, role });
        await user.save();
        res.status(201).send("User registered");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// ฟังก์ชันสำหรับการเข้าสู่ระบบ
exports.login = async (req, res) => {
    const { user_name, password } = req.body;
    try {
        const user = await User.findOne({ user_name });
        if (!user) return res.status(400).send("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("Invalid credentials");

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "3h" }
        );
        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET
        );

        // ส่งค่าของ id, user_name, และ role กลับไป
       return res.json({
            user,
            accessToken,
            refreshToken,

        });
    } catch (err) {
       return res.status(500).send(err.message);
    }
};


// ฟังก์ชันสำหรับการรีเฟรช token
exports.refresh = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, admin) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign(
            { userId: admin. admin_id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.json({ accessToken });
    });
};

// exports.userlogin = async (req, res) => {
//     const { user_name, password } = req.body; // ใช้ user_name และ password จาก body
//     try {
//         const user = await User.findOne({ user_name }); // ค้นหาผู้ใช้ด้วย user_name
//         if (!user) return res.status(400).send("ไม่พบผู้ใช้");
        
//         const isMatch = await bcrypt.compare(password, user.password); // ตรวจสอบ password
//         if (!isMatch) return res.status(400).send("ข้อมูลประจำตัวไม่ถูกต้อง");
        
//         const accessToken = jwt.sign(
//             { userId: user._id }, // ใช้ userId
//             process.env.ACCESS_TOKEN_SECRET,
//             { expiresIn: "1h" }
//         );
//         const refreshToken = jwt.sign(
//             { userId: user._id }, // ใช้ userId
//             process.env.REFRESH_TOKEN_SECRET,
//             { expiresIn: "2h" }
//         );
        
//         res.json({ user, accessToken, refreshToken }); // ส่งข้อมูลผู้ใช้พร้อมโทเค็นกลับไป
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// };
// exports.uerrefresh = async (req, res) => {
//     const token = req.headers['authorization']?.split(' ')[1]; // 'Bearer <token>'
//     if (!token) return res.status(401).json({ message: 'ไม่มีการให้โทเค็น' });
    
//     jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => { // ใช้ข้อมูลจาก user
//         if (err) {
//             if (err.name === "TokenExpiredError") {
//                 return res.status(401).send("โทเค็นรีเฟรชหมดอายุแล้ว กรุณาเข้าสู่ระบบอีกครั้ง.");
//             }
//             return res.status(403).send("โทเค็นการรีเฟรชไม่ถูกต้อง");
//         }
        
//         const accessToken = jwt.sign(
//             { userId: user.userId }, // ใช้ userId
//             process.env.ACCESS_TOKEN_SECRET,
//             { expiresIn: "1h" }
//         );
        
//         res.json({ accessToken });
//     });
// };