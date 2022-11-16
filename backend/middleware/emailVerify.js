const User = require('../models/user');

module.exports = (req, res, next) => {
  try{
    if(!req.auth.emailVerified){
      throw error
    }
      next();
  }catch(error){
    res.status(401).json({ error: 'You must verify your email before doing these requests' });
  }
};