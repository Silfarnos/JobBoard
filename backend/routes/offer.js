const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const offerCtrl = require('../controllers/offer');
const checkPerms = require('../middleware/checkPermission');
const emailVerify = require('../middleware/emailVerify');

//Routes que va suivre l'API lors des appels concernants les offers
router.post('/', auth, emailVerify, offerCtrl.createOffer);
router.get('/count/', offerCtrl.countOffers);
router.get('/getsomeoffers/:skip',  offerCtrl.getAllOffers);
router.get('/keyword', offerCtrl.getAllOffersByCategories);
router.put('/:id', auth, checkPerms.checkPermissionsOffer, offerCtrl.editOffer);
router.delete('/delete/:id',auth, checkPerms.checkPermissionsOffer, offerCtrl.deleteOffer);
router.get('/user/getsomeoffers/count', auth, offerCtrl.countAllOffersByUser);
router.get('/user/getsomeoffers/:skip', auth, offerCtrl.getAllOffersByUserId);
router.get('/:id', offerCtrl.getOffer);


module.exports = router;

