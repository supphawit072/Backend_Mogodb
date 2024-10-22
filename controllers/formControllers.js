const Form = require('../models/form'); // ตรวจสอบให้แน่ใจว่าโมเดล Form ถูกนำเข้าอย่างถูกต้อง

const generateFormId = async () => {
    // หาฟอร์มล่าสุดตาม form_id ในลำดับจากมากไปน้อย
    const lastForm = await Form.findOne().sort({ form_id: -1 }).exec();
    if (!lastForm) {
        // ถ้าไม่มีฟอร์มในฐานข้อมูล ให้ใช้ form ID แรก
        return '1';
    }
    const lastFormId = lastForm.form_id;
    // ตรวจสอบว่า form_id ล่าสุดเป็นตัวเลข (เช่น '1', '2') หรือเป็นอักษรตัวเลข (เช่น 'A001')
    const isNumeric = /^\d+$/.test(lastFormId);
    if (isNumeric) {
        // ถ้าเป็นตัวเลข ให้เพิ่มเป็นจำนวน
        return (parseInt(lastFormId, 10) + 1).toString();
    }
    // ถ้า form_id เป็นอักษรตัวเลข ให้แบ่งออกเป็นส่วนตัวอักษรและส่วนตัวเลข
    let letterPart = lastFormId.slice(0, 1); // ดึงส่วนตัวอักษร (A-Z)
    let numberPart = parseInt(lastFormId.slice(1), 10); // ดึงส่วนตัวเลข (001-9999)
    // เพิ่มจำนวนตัวเลข
    numberPart += 1;
    // จัดการเมื่อจำนวนตัวเลขเกิน 9999
    if (numberPart > 9999) {
        // ถ้าจำนวนเกิน 9999 ให้ไปยังตัวอักษรถัดไปและรีเซ็ตตัวเลข
        letterPart = String.fromCharCode(letterPart.charCodeAt(0) + 1);
        numberPart = 1; // รีเซ็ตส่วนตัวเลขเป็น 1
    }
    // ประกอบ form_id ใหม่
    const newFormID = `${letterPart}${numberPart.toString().padStart(4, '0')}`;
    return newFormID;
};

exports.createForm = async (req, res) => {
    try {
        // Generate a new form_id
        const form_id = await generateFormId();
        // Destructure the form data from the request body
        const {
            curriculum,
            coursecode_FK,
            coursename_FK,
            credits_FK,
            groups_FK,
            instructor_FK,
            A,
            B_plus,
            B,
            C_plus,
            C,
            D_plus,
            D,
            E,
            F,
            F_percent,
            I,
            W,
            VG,
            G,
            S,
            U
        } = req.body;
        // Calculate the total grade
        const total = A + B_plus + B + C_plus + C + D_plus + D + E + F + F_percent + I + W + VG + G + S + U;

        // Create a new form instance with the provided data
        const form = new Form({
            form_id, // Set the generated form_id
            curriculum,
            coursecode_FK,
            coursename_FK,
            credits_FK,
            groups_FK,
            instructor_FK,
            A,
            B_plus,
            B,
            C_plus,
            C,
            D_plus,
            D,
            E,
            F,
            F_percent,
            I,
            W,
            VG,
            G,
            S,
            U,
            total // Set the calculated total
        });
        // Save the form to the database
        const newForm = await form.save();
        res.status(201).json(newForm); // Respond with the newly created form
    } catch (err) {
        res.status(400).json({ message: err.message }); // Handle errors gracefully
    }
}


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


exports.updateForm = async (req, res) => {
    try {
        const { form_id } = req.params; // ใช้ form_id จากพารามิเตอร์ใน URL
        const form = await Form.findOne({ form_id }); // ค้นหาด้วย form_id
        if (!form) return res.status(404).json({ message: 'ไม่พบฟอร์ม' });
        
        const updateData = { $set: req.body }; // เตรียมข้อมูลที่จะอัปเดต
        await Form.updateOne({ form_id }, updateData); // อัปเดตฟอร์มด้วย form_id
        
        console.log(updateData);
        res.status(200).json({ message: 'อัปเดตฟอร์มสำเร็จ' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteForm = async (req, res) => {
    try {
        const { form_id } = req.params; // ใช้ form_id จากพารามิเตอร์ใน URL
        const form = await Form.findOne({ form_id }); // ค้นหาด้วย form_id
        if (!form) return res.status(404).json({ message: 'ไม่พบฟอร์ม' });

        // ลบข้อมูลผู้ใช้ที่เชื่อมโยงกับฟอร์มที่จะลบ หากมีการเชื่อมโยง
        // สมมติว่ามีฟิลด์ form_id_fk ใน Users (ถ้าไม่มีฟิลด์นี้ในโมเดลจริงๆ ให้ลบโค้ดนี้)
        // await Users.deleteMany({ form_id_fk: form_id });

        await Form.deleteOne({ form_id }); // ลบฟอร์มด้วย form_id
        res.status(200).json({ message: 'ลบฟอร์มสำเร็จ' });
    } catch (err) {
        res.status(500).json({ message: err.message }); // เปลี่ยนเป็น status code 500 เพื่อบ่งบอกว่าเกิดข้อผิดพลาดภายในเซิร์ฟเวอร์
    }
};
