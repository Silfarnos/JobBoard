const Offer = require('../models/offer');
const User = require('../models/user');
const Comment = require('../models/comment');
/////////////////////////////////////////////////////////Get-All-Offers////////////////////////////////////////////////////////////////////////////

exports.functiongetAllOffres = async function (req, res, next) {
  try {
    
    let count = req.params.skip;
    let offers = await Offer.find().sort({updateTime: -1}).skip(count).limit(10);

    
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ error });
  }
}

exports.functionCountOffers = async function (req, res, next) {
  try {
    let count = await Offer.count();
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error });
  }
}

/////////////////////////////////////////////////////////Get-One-Offer////////////////////////////////////////////////////////////////////////////

exports.functionGetOneOffer = async function (req, res, next) {
  try {

    let offer = await Offer.findOne({ _id: req.params.id });

    res.status(200).json(offer);

  } catch (error) {
    res.status(500).json({ error });
  }
}

/////////////////////////////////////////////////////////Create-Offer////////////////////////////////////////////////////////////////////////////

exports.functionCreateOffer = async function (req, res, next) {
  try {

    let user = await User.findOne({ _id: req.body.creatorId });
    if(!user){
      throw error
    }

    const randomNumber = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    let offer = new Offer({
      ...req.body,
      creatorName: user.name,
      creatorEmail: user.email,
      creatorImage: user.profileImageBuffer,
      creatorImageType: user.profileImageType,
      createTime: Date.now(),
      updateTime: Date.now(),
      commentId: [],
      randomNumber: randomNumber,
    });
    await offer.save();
    let newOffer = await Offer.findOne({ randomNumber: randomNumber });

    user.postId.push(newOffer._id);
    await user.save();

    res.status(201).json({ message: 'Job-offer saved' });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
}

/////////////////////////////////////////////////////////Edit-Offer////////////////////////////////////////////////////////////////////////////

exports.functionEditOffer = async function (req, res, next) {

  try {
    
    let user = await User.findOne({ _id: req.body.creatorId });

    let offer = JSON.parse(JSON.stringify(await Offer.findOne({ _id: req.params.id })));

    
    let newOffer = {
      ...offer,
      ...req.body,
      updateTime: Date.now(),
    }
    
    try{
      await Offer.updateOne({ _id: req.params.id }, newOffer,);
    }catch(error){
      console.log(error)
      throw error
    }
    res.status(201).json({ message: 'Job-offer modified' });
  } catch (error) {
    res.status(500).json({ error });
  }
}

/////////////////////////////////////////////////////////Delete-Offer////////////////////////////////////////////////////////////////////////////
exports.functionDeleteOffer = async function (req, res, next) {
  try {
    let offer = await Offer.findOne({ _id: req.params.id });
    offer.commentId.forEach(async (commentId) => {
      await Comment.deleteOne({ _id: commentId });
    });
    await Offer.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Job-offer deleted' });

  } catch (error) {
    res.status(error).json({ error });
  }
}


/////////////////////////////////////////////////////////GetAllOfferByUserId/////////////////////////////////////////////////////////////////////
exports.functiongetAllOffersByUserId = async function (req, res, next) {
  let count = req.params.skip;
  try {
    let offers = await Offer.find({ creatorId: req.auth.userId }).sort({updateTime: -1}).skip(count).limit(10);
    res.status(200).json(offers);

  } catch (error) {
    res.status(error).json({ error });
  }
}
exports.functionCountAllOffersByUserId = async function (req, res, next) {
  try {
    let count = await Offer.count({ creatorId: req.auth.userId });
    res.status(200).json(count);
  }
  catch (error) {
    res.status(error).json({ error });
  }
}
/////////////////////////////////////////////////////////GetAllOfferBykeywords/////////////////////////////////////////////////////////////////////

exports.functiongetAllOffersByCategories = async function (req, res, next) {
  try {
    const offers = await checkCategories(req.body);
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ error });
  }
}

const checkCategories = async function (req) {
  try{

    let listKeywords = req.keywords
    let listContractType = req.contractType
  
    if (req.keywords && !req.wages && !req.location && !req.contractType) {
      let offerFound = await Offer.find({ keywords: { $in: { listKeywords } } });
      return offerFound;
    }
  
    if (req.keywords && req.wages && !req.location && !req.contractType) {
      let offerFound = await Offer.find({ keywords: { $in: { listKeywords } } }, { wages: req.wages });
      return offerFound
    }
  
    if (req.keywords && !req.wages && req.location && !req.contractType) {
      let offerFound = await Offer.find({ keywords: { $in: { listKeywords } } }, { location: req.location });
      return offerFound;
    }
  
    if (req.keywords && !req.wages && !req.location && req.contractType) {
      let offerFound = await Offer.find({ keywords: { $in: { listKeywords } } }, { contractType: { $in: { listContractType } } });
      return offerFound;
    }
  
    if (req.keywords && req.wages && req.location && !req.contractType) {
      let offerFound = await Offer.find({ keywords: { $in: { listKeywords } } }, { wages: req.wages, location: req.location });
      return offerFound;
    }

    if (req.keywords && req.wages && !req.location && req.contractType) {
      let offerFound = await Offer.find({ keywords: { $in: { listKeywords } } }, { wages: req.wages, contractType: { $in: { listContractType } } });
      return offerFound;

    }
    if (req.keywords && !req.wages && req.location && req.contractType) {
      let offerFound = await Offer.find({ keywords: { $in: { listKeywords } } }, { location: req.location, contractType: { $in: { listContractType } } });
      return offerFound;
    }

    if (!req.keywords && req.wages && req.location && req.contractType) {
      let offerFound = await Offer.find({ wages: req.wages, location: req.location, contractType: { $in: { listContractType } } });
      return offerFound;
    }

    if (!req.keywords && req.wages && req.location && !req.contractType) {
      let offerFound = await Offer.find({ wages: req.wages, location: req.location });
      return offerFound;
    }

    if (!req.keywords && req.wages && !req.location && req.contractType) {
      let offerFound = await Offer.find({ wages: req.wages, contractType: { $in: { listContractType } } });
      return offerFound;
    }

    if (!req.keywords && !req.wages && req.location && req.contractType) {
      let offerFound = await Offer.find({ location: req.location, contractType: { $in: { listContractType } } });
      return offerFound;
    }

    if (!req.keywords && req.wages && !req.location && !req.contractType) {
      let offerFound = await Offer.find({ wages: req.wages });
      return offerFound;
    }

    if (req.keywords && !req.wages && !req.location && !req.contractType) {
      let offerFound = await Offer.find({ keywords: { $in: { listKeywords } } });
      return offerFound;
    }

    if (!req.keywords && !req.wages && req.location && !req.contractType) {
      let offerFound = await Offer.find({ location: req.location });
      return offerFound;
    }

    if (!req.keywords && !req.wages && !req.location && req.contractType) {
      let offerFound = await Offer.find({ contractType: { $in: { listContractType } } });
      return offerFound;
    }

    if (!req.keywords && !req.wages && !req.location && !req.contractType) {
      let offerFound = await Offer.find();
      return offerFound;
    }
    
  }
  catch (error) {
    throw error;
  }
}
/////////////////////////////////////////////////////////GetAllOfferByPrice/////////////////////////////////////////////////////////////////////
