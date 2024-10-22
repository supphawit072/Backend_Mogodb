const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    curriculum: {
        type: String,
        required: true // ทำให้เป็นค่าที่ต้องป้อน
    },
    form_id: {
        type: String,
        required: true,
        unique: true,
    },
    coursecode_FK: {
        type: mongoose.Schema.Types.String, // ประเภทเดียวกันกับ coursecode
        ref: 'Course', // อ้างอิงถึงโมเดล Course
        required: true,
    },
    coursename_FK: {
        type: mongoose.Schema.Types.String,
        ref: 'Course', // อ้างอิงถึงฟิลด์ coursename จากโมเดล Course
        required: true,
    },
    credits_FK: {
        type: mongoose.Schema.Types.String,
        ref: 'Course', // อ้างอิงถึงฟิลด์ credits จากโมเดล Course
        required: true,
    },
    groups_FK: {
        type: mongoose.Schema.Types.String,
        ref: 'Course', // อ้างอิงถึงฟิลด์ groups จากโมเดล Course
        required: true,
    },
    instructor_FK: {
        type: mongoose.Schema.Types.String,
        ref: 'Course', // อ้างอิงถึงฟิลด์ instructor จากโมเดล Course
        required: true,
    },
    A: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    B_plus: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    B: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    C_plus: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    C: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    D_plus: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    D: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    E: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    F: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    F_percent: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    I: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    W: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    VG: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    G: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    S: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    U: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value.toString()); // ตรวจสอบว่าค่าเป็นตัวเลข
            },
            message: props => `${props.value} จำนวนไม่ถูกต้อง!`
        }
    },
    total: {
        type: Number,
        default: 0 // ค่าเริ่มต้นเป็น 0
    }
}, {
    timestamps: true,
    versionKey: false
});

// Pre-save middleware to calculate total
formSchema.pre('save', function (next) {
    this.total = this.A + this.B_plus + this.B + this.C_plus + this.C +
        this.D_plus + this.D + this.E + this.F + this.F_percent +
        this.I + this.W + this.VG + this.G + this.S + this.U;
    next();
});

module.exports = mongoose.model('Form', formSchema);
