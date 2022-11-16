const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const email = require('./mail');
let secretToken = process.env.token

/////////////////////////////////////////////////////////Edit-User////////////////////////////////////////////////////////////////////////////
exports.functionEditUser = async function (req, res, next) {
  try {
    for (let key in req.body) {
      if (req.body[key] === '') {
        delete req.body[key];
      }
    }
 
    if (req.auth.level < 1 && (!req.body.password || !req.body.newpassword) || !req.auth.email) {
      throw error;
    }

    const user = await User.findOne({ _id: req.params.id });
    let hash = null

    if (req.auth.level < 1 || req.auth.userId === req.params.id) {
      await bcrypt.compare(req.body.password, user.password)
      hash = await bcrypt.hash(req.body.newpassword, 10)
    } else {
      hash = user.password
    }
    const userInfo = JSON.parse(JSON.stringify(user));
    const body = req.body

    let newUser = {
      ...userInfo,
      ...body,
      password: hash,
      level: user.level,
      emailVerified: user.emailVerified,
    };
    if (req.auth.level >= 1) {
      newUser.emailVerified = body.emailVerified
    }
   
    if (req.files?.profileImage) {
      newUser = await checkProfileImage(req, newUser);
    }

    if (req.files?.CV_PDF) {

      newUser = await checkProfilePDF(req, newUser);

    }

    await User.updateOne({ email: user.email }, newUser,)

    res.status(200).json({ message: 'User modified' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

let checkProfileImage = function (req, newUser) {
  try {
    
    if (req.files.profileImage.mimetype === 'image/png' || req.files.profileImage.mimetype === 'image/jpg' || req.files.profileImage.mimetype === 'image/jpeg') {

      const fileBuffer = req.files.profileImage.data;
      const fileType = req.files.profileImage.mimetype;

      newUser.profileImageBuffer = fileBuffer;
      newUser.profileImageType = fileType;
      return newUser
    }
    throw error;

  } catch (error) {
    res.status(500).json({ error: error });
  }
}
let checkProfilePDF = function (req, newUser) {
  try {
    if (req.files.CV_PDF.size > 6000000) {
      throw error;
    }
    if (req.files.CV_PDF.mimetype === 'application/pdf') {
      const fileBuffer = req.files.CV_PDF.data;
      newUser.CV_Buffer = fileBuffer;
      return newUser
    }
    throw error;
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

//////////////////////////////////////////////////////Get-One-User/////////////////////////////////////////////////////////

exports.functionGetOneUser = async function (req, res, next) {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      throw error
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
}

exports.functionGetAllUsers = async function (req, res, next) {
  try {
    let count = req.params.skip;
    const users = await User.find().sort({ createTime: -1 }).skip(count).limit(30);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
}

//////////////////////////////////////////////////////////////Sign-Up////////////////////////////////////////////////////////////////////////

exports.functionSignup = async function (req, res, next) {
  try {
    let hash = await bcrypt.hash(req.body.password, 10)

    if (!req.body.email || !req.body.password || !req.body.phone || !req.body.name || !req.body.lastname || !req.body.pseudo) {
      return res.status(400).json({ error: 'Please fill all the fields' });
    }
    await User.findOne({ email: req.body.email })
    const defaultUser = await User.findOne({_id: '634918c8e501a85b99d70cc4'})

    const user = new User({
      email: req.body.email,
      password: hash,
      level: 0,
      phone: req.body.phone,
      name: req.body.name,
      lastname: req.body.lastname,
      pseudo: req.body.pseudo,
      reponseId: [],
      postId: [],
      profileImageBuffer: defaultUser.profileImageBuffer,
      profileImageType: defaultUser.profileImageType,
      emailVerified: false,
      createTime: Date.now(),
    });

    await User.findOne({ pseudo: req.body.pseudo })
    await user.save()
 
    await email.sendConfirmationMail(req, res, user, next)
 
    res.status(201).json({ message: 'User created' });

  } catch (error) {
    res.status(error.status).json({ error: error.msg });
  }
}

//////////////////////////////////////////////////////////////Login////////////////////////////////////////////////////////////////////////

exports.functionLogin = async function (req, res, next) {
  try {
    let userInfo = await User.findOne({ email: req.body.email })
    await bcrypt.compare(req.body.password, userInfo.password)

    let user = {
      userId: userInfo._id,
      level: userInfo.level,
      name: userInfo.name,
      lastname: userInfo.lastname,
      email: userInfo.email,
      phone: userInfo.phone,
      pseudo: userInfo.pseudo,
      emailVerified: userInfo.emailVerified,
      token: jwt.sign(
        { userId: userInfo._id, emailVerified: userInfo.emailVerified, level: userInfo.level, email: userInfo.email, pseudo: userInfo.pseudo },
        secretToken,
        { expiresIn: '24h' })
    }
    if (userInfo.fileBuffer) {
      user.fileBuffer = userInfo.fileBuffer;
      user.token = jwt.sign({ userId: userInfo._id, level: userInfo.level, email: userInfo.email, pseudo: userInfo.pseudo, fileBuffer: userInfo.fileBuffer }, secretToken, { expiresIn: '24h' })
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

//////////////////////////////////////////////////////////////editAdmin///////////////////////////////////////////////////////////

exports.functionEditAdmin = async function (req, res, next) {
  try {

    await User.findOne({ email: req.body.email });
    await User.updateOne({ email: req.body.email }, { level: req.body.level });

    res.status(200).json({ message: 'User modified' });
  } catch (error) {
    res.status(500).json({ error });
  }
}

////////////////////////////////////////////////////////deleteUser////////////////////////////////////////////////

exports.functionDeleteUser = async function (req, res, next) {
  try {

    await User.deleteOne({ _id: req.params.id })

    res.status(200).json({ message: 'User deleted' });

  } catch (error) {
    res.status(500).json({ error });
  }
}
exports.functionCountUsers = async function (req, res, next) {
  try {
    const count = await User.count();
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error });
  }
}

