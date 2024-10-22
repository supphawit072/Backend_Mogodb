const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
// const cors = require('cors');

dotenv.config();

// Middleware สำหรับ parse JSON
app.use(express.json());

const MONGO_DB_URL = process.env.MONGO_DB_URL;

mongoose.connect(MONGO_DB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// นำเข้าเส้นทาง (routes)
// const productRoutes = require('./routes/product');
// const authRoutes = require('./routes/auth');

// ใช้เส้นทาง (routes)
// app.use('/api/', productRoutes);
// app.use('/api/auth', authRoutes);

// admin register
const authRoute = require('./routes/adminAuth');
app.use('/api/admin/auth',authRoute);

// user login
const userloginRoute = require('./routes/userAuth');
app.use('/api/admin/ct',userloginRoute);

// admin controll user
const userRouter = require('./routes/adminaction');
app.use('/api/admin/user',userRouter);



// admin controll course
const courseRouter = require('./routes/adminaction');
app.use('/api/admin/course',courseRouter);

// admin controllers form
const formRouter = require('./routes/adminaction');
app.use('/api/admin/form',formRouter);

// user view form
const userviewformRouter = require('./routes/useraction');
app.use('/api/user/form',userviewformRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
