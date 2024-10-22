const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    admin_id: {
        type: String,
        required: true,
        match: /^[A-Z][0-9]{2}$/,
        unique: true // ทำให้ admin_id ไม่ซ้ำกัน
    },
    admin_username: { type: String, required: true, unique: true },
    admin_password: { type: String, required: true },
    admin_Fname: { type: String, required: true },
    admin_Lname: { type: String, required: true },
    admin_tel: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} หมายเลขโทรศัพท์ที่ถูกต้อง!`
        }
    },
    admin_email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} อีเมล์ไม่ถูกต้อง!`
        }
    }
}, { timestamps: true, versionKey: false });

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
