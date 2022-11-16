const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');
const checkPerms = require('../middleware/checkPermission');


//Routes que va suivre l'API lors des appels concernants les posts
router.get('/comment/:skip', auth, checkPerms.checkAdmin, commentCtrl.getAllComments);
router.get('/commentcount', auth, checkPerms.checkAdmin, commentCtrl.countComments);
router.delete('/:idComment', auth, checkPerms.checkAdminOrCommentCreator, commentCtrl.deleteComment);
router.put('/editComment/:idComment', auth, checkPerms.checkAdminOrCommentCreator, commentCtrl.editComment);
router.get('/:idComment', auth, checkPerms.checkPermission, commentCtrl.getOneComment);
router.get('/user/:id', auth, checkPerms.checkId, commentCtrl.getOneUserComments);
router.post('/:id', commentCtrl.createComment);
router.get('/offer/:id', auth, checkPerms.checkAdminOrOfferCreator, commentCtrl.getOneOfferComments);


module.exports = router;