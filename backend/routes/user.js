const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require ('../middleware/auth');
const checkPerms = require('../middleware/checkPermission');

//Routes que va suivre l'API lors de la connexion et de l'inscription
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/edit/:id',  auth, checkPerms.checkId, userCtrl.editUser);
router.put('/admin', auth, checkPerms.checkSuperAdmin, userCtrl.editAdmin);
router.delete('/delete/:id', auth, checkPerms.checkId, userCtrl.deleteUser);
router.get('/users/:skip', auth, checkPerms.checkAdmin, userCtrl.getAllUsers);
router.get('/userscount', auth, checkPerms.checkAdmin, userCtrl.countUsers);
router.get('/:id', auth, checkPerms.checkId, userCtrl.getOneUser);
module.exports = router;