const express = require('express'); 
const router = express.Router();

const{ getForms,getForm  }=require('../controllers/formControllers');
const authenticateToken = require('../middlewares/auth');

router.get('/viewforms', authenticateToken, getForms); //ใช้งานได้
router.get('/viewform/:form_id', authenticateToken, getForm);//ใช้งานได้

module.exports = router;