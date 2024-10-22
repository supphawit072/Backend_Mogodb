const mongoose = require('mongoose');

// function validateCourseId(value) {
//     return /^\d{5}$/.test(value); // ตรวจสอบว่า ID เป็นตัวเลขห้าหลัก
// }
const courseSchma = new mongoose.Schema({
    course_id: {
        type: String,
        required: true,
        unique: true,
        // validate: {
        //     validator: validateCourseId,
        //     message: props => `${props.value} course_id ไม่ถูกต้อง!.`
        //   }
      },
      coursecode: {
        type: String,
        required: true,
        unique: true, // รหัสวิชาซ้ำกัน
        maxlength: 7, // จำกัดความยาวไม่เกิน 7 ตัวอักษร
        match: /^[0-9]{1,7}$/ // ตรวจสอบให้เป็นตัวเลข 0-9 และความยาวไม่เกิน 7 ตัวอักษร
    },
    
    coursename:{
        type: String,
        required: true,
    },
    credits: {
        type: Number, // เปลี่ยนเป็นประเภทข้อมูล Number
        required: true,
        validate: {
            validator: function(value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าเป็นตัวเลขทั้งหมด
            },
            message: props => `${props.value} ไม่ใช่หน่วยกิตที่ถูกต้อง!` // ข้อความเมื่อป้อนค่าผิด
        }
    },
    instructor: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^(ผศ\.ดร|ดร\.|นาง|นางสาว|อ\.|นาย) .+$/i.test(value); // ตรวจสอบคำนำหน้าและชื่อ
            },
            message: props => `${props.value} is not a valid title or name!`
        }
    }
    
    ,
    
    groups: {
        type: String,
        required: true,
        match: /^P\d{3}$/, // ตรวจสอบรูปแบบ P000-P999
        message: props => `${props.value} ชื่อกลุ่มไม่ถูกต้อง!` // ข้อความเมื่อป้อนค่าผิด
    },
    accepting: {
        type: Number, // กำหนดให้เป็นประเภทข้อมูล Number
        required: true,
        validate: {
            validator: function(value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าเป็นตัวเลขทั้งหมด
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!` // ข้อความเมื่อป้อนค่าผิด
        },
       
    }
    
},{timestamps:true , versionKey:false});
module.exports = mongoose.model('Course',courseSchma);