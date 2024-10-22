const express = require('express'); 
const router = express.Router();
const {createUser,getUsers,getUser,updateuUser  ,deleteUser}= require('../controllers/adminActioncontrollers');
const {createCourse,getCourses,getCourseByID,updateCourse,deleteCourse} =require('../controllers/courseControllers');
const{createForm ,getForms,getForm ,updateForm,deleteForm }=require('../controllers/formControllers');
const authenticateToken = require('../middlewares/auth');



// User
router.get('/viewusers',authenticateToken,getUsers);  //ใช้งานได้
router.get('/viewuser/:user_id',authenticateToken,getUser); //ใช้งานได้
router.post('/newuser',authenticateToken,createUser); //ใช้งานได้
router.put('/:user_id',authenticateToken,updateuUser ); //ใช้งานได้
router.delete('/:user_id',authenticateToken,deleteUser); //ใช้งานได้

// Course
router.get('/viewcourses', authenticateToken, getCourses); //ใช้งานได้
router.get('/viewcourse/:course_id', authenticateToken, getCourseByID);//ใช้งานได้
router.post('/newcourse', authenticateToken, createCourse);//ใช้งานได้
router.put('/upd/:course_id', authenticateToken,updateCourse); //ใช้งานได้
router.delete('/del/:course_id', authenticateToken, deleteCourse); //ใช้งานได้

// Form

router.get('/viewforms', authenticateToken, getForms); //ใช้งานได้
router.get('/viewform/:form_id', authenticateToken, getForm); //ใช้งานได้
router.post('/newform', authenticateToken, createForm); //ใช้งานได้
router.put('/up/:form_id', authenticateToken, updateForm); //ใช้งานได้
router.delete('/de/:form_id', authenticateToken, deleteForm);//ใช้งานได้

module.exports = router;