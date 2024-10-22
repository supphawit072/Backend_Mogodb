const Form = require("../models/form");

exports.getForms = async (req, res) => {
    try {
        const forms = await Form.find(); // ดึงข้อมูลฟอร์มทั้งหมด
        res.status(200).json(forms); // ส่งข้อมูลฟอร์มทั้งหมด
    } catch (err) {
        res.status(500).json({ message: err.message }); // หากเกิดข้อผิดพลาด
    }
};



exports.getForm = async (req, res) => {
    try {
        const { form_id } = req.params; // ใช้ form_id จากพารามิเตอร์ใน URL
        const form = await Form.findOne({ form_id }); // ค้นหาด้วย form_id
        if (!form) return res.status(404).json({ message: "ไม่พบฟอร์ม" });
        res.status(200).json(form);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};