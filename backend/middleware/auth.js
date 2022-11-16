const jwt = require('jsonwebtoken');
let secretToken = process.env.token

module.exports = (req, res, next) => {
  try {
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const level = decodedToken.level;
    const name = decodedToken.name;
    const lastname = decodedToken.lastname;
    const email = decodedToken.email;
    const phone = decodedToken.phone;
    const pseudo = decodedToken.pseudo;
    const emailVerified = decodedToken.emailVerified;

    req.auth = {
      userId,
      level,
      name,
      lastname,
      email,
      phone,
      pseudo,
      emailVerified,
    };

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};