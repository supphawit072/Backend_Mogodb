const User = require('../models/user');

const bcrypt = require("bcrypt");



const generateUserId = async () => {
    // Find the most recent user by user_id in descending order
    const lastUser = await User.findOne().sort({ user_id: -1 }).exec();
    if (!lastUser) {
        // If there are no users in the database, return the first user ID
        return '1';
    }
    const lastUserId = lastUser.user_id; // Extract the latest user_id

    // Check if the user_id is purely numeric (e.g. '1', '2') or alphanumeric (e.g. 'A001')
    const isNumeric = /^\d+$/.test(lastUserId);
    if (isNumeric) {
        // If the last user_id is purely numeric, increment it as a number
        return (parseInt(lastUserId, 10) + 1).toString();
    }

    // If the user_id is alphanumeric, split into letter and number parts
    let letterPart = lastUserId.slice(0, 1); // Extract the letter part (A-Z)
    let numberPart = parseInt(lastUserId.slice(1), 10); // Extract the number part (001-9999)

    // Increment the numeric part
    numberPart += 1;

    if (numberPart > 9999) {
        // If number exceeds 9999, move to the next letter and reset the number
        letterPart = String.fromCharCode(letterPart.charCodeAt(0) + 1);
        numberPart = 1; // Reset the number part to 1
    }

    // Combine the letter and the zero-padded number part for the new user ID
    const newUserID = `${letterPart}${numberPart.toString().padStart(4, '0')}`;
    return newUserID;
};

exports.createUser = async (req, res) => {
    const {
        user_prefix,
        user_Fname,
        user_Lname,
        user_name,
        password,
        role,
        user_phone,
        user_email
    } = req.body;

    // Generate a new user ID
    const user_id = await generateUserId();

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        user_id,
        user_prefix,
        user_Fname,
        user_Lname,
        user_name,
        password: hashedPassword, // Save hashed password
        role,
        user_phone,
        user_email
    });

    try {
        const newUser = await user.save();
        // Exclude the password from the response
        const responseUser = newUser.toObject();
        delete responseUser.password;
        res.status(201).json(responseUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ user_id: 1 }); // ดึงข้อมูลผู้ใช้ทั้งหมดและเรียงตาม user_id
        res.status(200).json(users); // ส่งข้อมูลผู้ใช้ทั้งหมด
    } catch (err) {
        res.status(500).json({ message: err.message }); // หากเกิดข้อผิดพลาด
    }
    
};

exports.getUser = async (req, res) => {
    try {
        const { user_id } = req.params; // ดึง user_id จากพารามิเตอร์ URL
        const user = await User.findOne({ user_id }); // ค้นหาผู้ใช้ด้วย user_id
        if (!user) return res.status(404).json({ message: 'ไม่พบผู้ใช้' }); 
        res.status(200).json(user); // ส่งข้อมูลผู้ใช้ที่พบกลับไป
    } catch (err) {
        res.status(500).json({ message: err.message }); // หากเกิดข้อผิดพลาด
    }
};

exports.updateuUser = async (req, res) => {
    const updateData = req.body; // รับข้อมูลทั้งหมดจาก body
    const userId = req.params.user_id; // รับ course_id จากพารามิเตอร์ใน URL
    console.log(updateData);
    try {
        // ค้นหาและอัปเดตรายวิชาที่มี course_id ตรงกับ courseId
        const updatedUser = await User.findOneAndUpdate(
            { user_id: userId }, // เงื่อนไขการค้นหา
            updateData, // ข้อมูลที่จะอัปเดต
            { new: true } // คืนค่าผลลัพธ์ที่อัปเดตแล้ว
        );

        if (!updatedUser) {
            return res.status(404).send("ไม่พบผู้ใช้."); // ตรวจสอบว่าพบรายวิชาหรือไม่
        }

        console.log('อัปเดตข้อมูลสำเร็จ');
        res.status(200).send("อัปเดตข้อมูลสำเร็จ.");
    } catch (err) {
        console.error(err);
        res.status(500).send("เกิดข้อผิดพลาดในการอัพเดตผู้ใช้.");
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params; // ใช้ course_id แทน id ใน params
        const user = await User.findOne({  }); // ค้นหารายวิชาด้วย course_id
        if (!user) return res.status(404).json({ message: 'ไม่พบรายวิชา' });
        await User.deleteOne({ user_id }); // ลบรายวิชาด้วย course_id
        res.status(200).json({ message: 'ลบรายวิชาสำเร็จ' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


