const express = require('express');
const router = express.Router();
const {  login , refresh} = require('../controllers/userauth');


router.post("/login",login); //ใช้งานได้
router.post("/refresh",refresh); //ใช้งานได้

module.exports = router;