const mongoose = require('mongoose');
// const validateUserId = (value) => {
//     // ตรวจสอบว่ามีความยาว 4 ตัวอักษรและเริ่มต้นด้วยตัวอักษร A-Z ตามด้วยตัวเลข 3 หลัก
//     return /^[A-Z][0-9]{3}$/.test(value);
// };
const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        // validate: {
        //     validator: validateUserId,
        //     message: props => `${props.value} user_idไม่ถูกต้องA001-Z999.`
        // }
    }, //เพิ่มข้อมูลไอดีให้เองอัติโนมัติ
    user_prefix: {
        type: String,
        enum: ['ผศ.ดร', 'ดร','อ','นาย', 'นาง', 'นางสาว'],
        required: true
    },
    user_Fname: {
        type: String,
        required: true
    },
    user_Lname: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum:['User','Admin'],
    },
    user_phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    user_email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
   
}, {
    versionKey: false,
    timestamps: true
});

// const User = mongoose.model("User", userSchema);
// module.exports = User;
module.exports = mongoose.model('User',userSchema);