require("dotenv").config()

var express = require('express');
var router = express.Router();
var User = require('../models/User')
var jwt = require('jsonwebtoken')
var Bcrypt = require('bcrypt')
var Token = require('../models/Token')
var nodemailer = require("nodemailer");

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const user = await User.find()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

/* GET users listing. */
router.get('/otp', async function (req, res, next) {
  try {
    const user = await User.find()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

//Login
router.post('/login', getUserByMail, async (req, res, next) => {
  console.log(res.user)

  const token = jwt.sign({ username: res.user.email }, "SECRET")
  if (req.body.password != null) {
    console.log("bel password", res.user)
    try {
      if (await Bcrypt.compare(req.body.password, res.user.password)) {

        if (token) {
          return res.json({
            token: token,
            user: res.user
          })
        }
      } else {
        return res.status(401).json({ error: "pass incorrect" })
      }
    } catch (error) {
      return res.status(500).json({ reponse: error.message })
    }

  }



  else {
    console.log("maghir password", res.user)
    if (token) {
      return res.json({
        token: token,
        user: res.user
      })
    }

  }

})


router.post('/checkMail', async function (req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(200).json({ reponse: user })
    } else {
      return res.status(203).json({ reponse: "good" })
    }

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

/* GET users listing. */
router.get('/otp', async function (req, res, next) {
  try {
    const user = await User.find()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

// Delete one user
router.delete('/:id', getUserById, async (req, res, next) => {
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ reponse: "mail" })
    }

  } catch (error) {
    return res.status(500).json({ reponse: error.message })
  }
  res.user = user
  next()
})

async function checkToken(req, res, next) {
  let token
  try {
    token = await Token.findOne({ email: req.body.email })

  } catch (error) {
    return res.status(500).json({ reponse: error.message })
  }
  res.token = token
  next()
}
async function getUserById(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ reponse: "Utilisateur non trouve" })
    }
  } catch (error) {
    return res.status(500).json({ reponse: error.message })
  }
  res.user = user
  next()
}

function authentificateToken(req, res, next) {
  const autHeader = req.headers['authorization']
  const token = autHeader && autHeader.split(' ')[1]

  if (token == null) return res.status(401).json({ reponse: "no token" })

  jwt.verify(token, "SECRET", (err, user) => {
    if (err) return res.status(403).json({ reponse: "token invalide" })
    req.user = user
    next()
  })

}
router.get('/confirmation/:email/:token', async (req, res, next) => {
  Token.findOne({ token: req.params.token }, function (err, token) {
    // token is not found into database i.e. token may have expired 
    if (!token) {
      return res.status(400).send({ msg: 'Your verification link may have expired. Please click on resend for verify your Email.' });
    }
    // if token is found then check valid user 
    else {
      User.findOne({ email: token.email, email: req.params.email }, function (err, user) {
        // not valid user
        if (!user) {
          return res.status(401).send({ msg: 'We were unable to find a user for this verification. Please SignUp!' });
        }
        // user is already verified
        else if (user.isVerified) {
          return res.status(200).send(
            `
                          <!DOCTYPE html>
                          <html>
                          
                          <head>
                              <title></title>
                              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                              <meta name="viewport" content="width=device-width, initial-scale=1">
                              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                              <style type="text/css">
                                  @media screen {
                                      @font-face {
                                          font-family: 'Lato';
                                          font-style: normal;
                                          font-weight: 400;
                                          src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                                      }
                          
                                      @font-face {
                                          font-family: 'Lato';
                                          font-style: normal;
                                          font-weight: 700;
                                          src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                                      }
                          
                                      @font-face {
                                          font-family: 'Lato';
                                          font-style: italic;
                                          font-weight: 400;
                                          src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                                      }
                          
                                      @font-face {
                                          font-family: 'Lato';
                                          font-style: italic;
                                          font-weight: 700;
                                          src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                                      }
                                  }
                          
                                  /* CLIENT-SPECIFIC STYLES */
                                  body,
                                  table,
                                  td,
                                  a {
                                      -webkit-text-size-adjust: 100%;
                                      -ms-text-size-adjust: 100%;
                                  }
                          
                                  table,
                                  td {
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                  }
                          
                                  img {
                                      -ms-interpolation-mode: bicubic;
                                  }
                          
                                  /* RESET STYLES */
                                  img {
                                      border: 0;
                                      height: auto;
                                      line-height: 100%;
                                      outline: none;
                                      text-decoration: none;
                                  }
                          
                                  table {
                                      border-collapse: collapse !important;
                                  }
                          
                                  body {
                                      height: 100% !important;
                                      margin: 0 !important;
                                      padding: 0 !important;
                                      width: 100% !important;
                                  }
                          
                                  /* iOS BLUE LINKS */
                                  a[x-apple-data-detectors] {
                                      color: inherit !important;
                                      text-decoration: none !important;
                                      font-size: inherit !important;
                                      font-family: inherit !important;
                                      font-weight: inherit !important;
                                      line-height: inherit !important;
                                  }
                          
                                  /* MOBILE STYLES */
                                  @media screen and (max-width:600px) {
                                      h1 {
                                          font-size: 32px !important;
                                          line-height: 32px !important;
                                      }
                                  }
                          
                                  /* ANDROID CENTER FIX */
                                  div[style*="margin: 16px 0;"] {
                                      margin: 0 !important;
                                  }
                              </style>
                          </head>
                          
                          <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                              <!-- HIDDEN PREHEADER TEXT -->
                              <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> Confirmation mail</div>
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <!-- LOGO -->
                                  <tr>
                                      <td bgcolor="#FFA73B" align="center">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                              <tr>
                                                  <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                              <tr>
                                                  <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                                      <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Compte deja verifié!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                              <tr>
                                                  <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                      <p style="margin: 0;">Votre compte est deja verifié, vous pouvez commencer a poster et interagir avec les articles LostAndFound</p>
                                                  </td>
                                              </tr>
                                              
                                              
                                          </table>
                                      </td>
                                  </tr>
                                 
                              </table>
                          </body>
                          
                          </html>
                          `
          );
        }
        // verify user
        else {
          // change isVerified to true
          user.isVerified = true;
          user.save(function (err) {
            // error occur
            if (err) {
              return res.status(500).send({ msg: err.message });
            }
            // account successfully verified
            else {
              token.delete()
              return res.status(200).send(`
                          <!DOCTYPE html>
                          <html>
                          
                          <head>
                              <title></title>
                              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                              <meta name="viewport" content="width=device-width, initial-scale=1">
                              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                              <style type="text/css">
                                  @media screen {
                                      @font-face {
                                          font-family: 'Lato';
                                          font-style: normal;
                                          font-weight: 400;
                                          src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                                      }
                          
                                      @font-face {
                                          font-family: 'Lato';
                                          font-style: normal;
                                          font-weight: 700;
                                          src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                                      }
                          
                                      @font-face {
                                          font-family: 'Lato';
                                          font-style: italic;
                                          font-weight: 400;
                                          src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                                      }
                          
                                      @font-face {
                                          font-family: 'Lato';
                                          font-style: italic;
                                          font-weight: 700;
                                          src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                                      }
                                  }
                          
                                  /* CLIENT-SPECIFIC STYLES */
                                  body,
                                  table,
                                  td,
                                  a {
                                      -webkit-text-size-adjust: 100%;
                                      -ms-text-size-adjust: 100%;
                                  }
                          
                                  table,
                                  td {
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                  }
                          
                                  img {
                                      -ms-interpolation-mode: bicubic;
                                  }
                          
                                  /* RESET STYLES */
                                  img {
                                      border: 0;
                                      height: auto;
                                      line-height: 100%;
                                      outline: none;
                                      text-decoration: none;
                                  }
                          
                                  table {
                                      border-collapse: collapse !important;
                                  }
                          
                                  body {
                                      height: 100% !important;
                                      margin: 0 !important;
                                      padding: 0 !important;
                                      width: 100% !important;
                                  }
                          
                                  /* iOS BLUE LINKS */
                                  a[x-apple-data-detectors] {
                                      color: inherit !important;
                                      text-decoration: none !important;
                                      font-size: inherit !important;
                                      font-family: inherit !important;
                                      font-weight: inherit !important;
                                      line-height: inherit !important;
                                  }
                          
                                  /* MOBILE STYLES */
                                  @media screen and (max-width:600px) {
                                      h1 {
                                          font-size: 32px !important;
                                          line-height: 32px !important;
                                      }
                                  }
                          
                                  /* ANDROID CENTER FIX */
                                  div[style*="margin: 16px 0;"] {
                                      margin: 0 !important;
                                  }
                              </style>
                          </head>
                          
                          <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                              <!-- HIDDEN PREHEADER TEXT -->
                              <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <!-- LOGO -->
                                  <tr>
                                      <td bgcolor="#FFA73B" align="center">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                              <tr>
                                                  <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                              <tr>
                                                  <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                                      <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome !</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                              <tr>
                                                  <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                      <p style="margin: 0;">Votre compte est desormais active</p>
                                                  </td>
                                              </tr>
                                             
                              </table>
                          </body>
                          
                          </html>
                          `);
            }
          });
        }
      });
    }

  });

});

router.post('/forgotPassword', getUserByMail, checkToken, (req, res, next) => {
  // user is not found into database
  if (!res.user) {
    return res.status(400).send({ msg: 'We were unable to find a user with that email. Make sure your Email is correct!' });
  } else if (res.token) {
    return res.status(403).send({ token: res.token.token });

  }

  else {
    var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    var token = new Token({ email: res.user.email, token: seq });
    console.log('i am a token' + token)
    token.save(function (err) {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }

    });

    var smtpTrans = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "m'sahel.mohamedhabib@esprit.tn",
        pass: process.env.mdphMail
      }
    });

    var mailOptions = {
      from: "m'sahel.mohamedhabib@esprit.tn", to: res.user.email, subject:
        'Mot de passe oubliè SportPal', html: '<div class="es-wrapper-color">' +
          '<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">' +
          //HEADER
          '<tbody>' +
          '<tr>' +
          '<td class="esd-structure es-p20t es-p20b es-p20r es-p20l" style="background-color: #3d5ca3;" bgcolor="#3d5ca3" align="left">' +
          '<table class="es-left" cellspacing="0" cellpadding="0" align="center">' +
          '<tbody>' +
          '<tr>' +
          '<td class="es-m-p20b esd-container-frame" width="270" align="left">' +
          '<table width="100%" cellspacing="0" cellpadding="0">' +
          '<tbody>' +
          '<tr>' +
          '<td class="esd-block-image es-m-p0l es-m-txt-c" align="center" style="font-size: 0px;padding: 20px">' +
          '<a href="https://www.facebook.com/Sportpaltn/" target="_blank"><img src="https://scontent.ftun8-1.fna.fbcdn.net/v/t39.30808-6/279147670_121269590538464_6408600160629464424_n.jpg?_nc_cat=103&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=1db2m7SYrvAAX_JYSFA&_nc_oc=AQk5hX_kDMjGnnOsPj058dIPmx04da9RobIcAf-wpm6JeUFkDUyKNpA6pTg7aQoJ1lU&_nc_ht=scontent.ftun8-1.fna&oh=00_AT8b60RhSV9y2PYWFcg_ebIPrNSP4JaZEmY7z0-h650G6A&oe=627D59FC" alt style="display: block;border-top-left-radius: 50% 50%;border-top-right-radius: 50% 50%;border-bottom-left-radius: 50% 50%;border-bottom-right-radius: 50% 50%;" width="183"></a>' +
          '</td>' +
          '</tr>' +
          '</tbody>' +
          '</table>' +
          '</td>' +
          ' </tr>' +
          '</tbody>' +
          '</table>' +
          '</td>' +
          //container 
          '<tbody>' +
          '<tr>' +
          '<td class="esd-structure es-p40t es-p20r es-p20l" style="background-color: transparent;" bgcolor="transparent" align="left">' +
          '<table width="100%" cellspacing="0" cellpadding="0">' +
          '<tbody>' +
          '<tr>' +
          '<td class="esd-container-frame" width="560" valign="top" align="center">' +
          '<table style="background-position: left top;" width="100%" cellspacing="0" cellpadding="0">' +
          '<tbody>' +
          '<tr>' +
          '<td class="esd-block-image es-p5t es-p5b" align="center" style="font-size:0">' +
          '<a target="_blank"><img src="https://tlr.stripocdn.email/content/guids/CABINET_dd354a98a803b60e2f0411e893c82f56/images/23891556799905703.png" alt style="display: block;" width="175"></a>' +
          '</td>' +
          '</tr>' +
          '<tr>' +
          '<td class="esd-block-text es-p15t es-p15b" align="center">' +
          '<h1 style="color: #333333; font-size: 20px;"><strong>FORGOT YOUR </strong></h1>' +
          '<h1 style="color: #333333; font-size: 20px;"><strong>&nbsp;PASSWORD?</strong></h1>' +
          '</td>' +
          '</tr>' +
          '<tr>' +
          '<td class="esd-block-text es-p40r es-p40l" align="center">' +
          '<p>HI,' + res.user.fullName + '</p>' +
          '</td>' +
          '</tr>' +
          '<tr>' +
          '<td class="esd-block-text es-p35r es-p40l" align="left">' +
          '<p style="text-align: center;">There was a request to change your password!</p>' +
          '</td>' +
          '</tr>' +
          '<tr>' +
          '<td class="esd-block-text es-p25t es-p40r es-p40l" align="center">' +
          '<p>If did not make this request, just ignore this email. Otherwise, please copy the code bellow and past it on the app</p>' +
          '</td>' +
          '</tr>' +
          '<tr>' +
          '<td class="esd-block-text es-p25t es-p40r es-p40l" align="center">' +
          '<p>This is the code:' + token.token + '</p>' +
          '</td>' +
          '</tr>' +
          '</tbody>' +
          '</table>' +
          '</td>' +
          '</tr>' +
          '</tbody>' +
          '</table>' +
          '</td>' +
          //follow us
          '<tbody>' +
          '<tr>' +
          '<td class="esd-structure es-p20t es-p10r es-p10l" align="left">' +
          '<table class="es-left" cellspacing="0" cellpadding="0" align="left">' +
          '<tbody>' +
          '<tr>' +
          '<td class="esd-container-frame" width="199" align="left">' +
          '<table style="background-position: center center;" width="100%" cellspacing="0" cellpadding="0">' +
          '<tbody>' +
          '<tr>' +
          '<td class="esd-block-text es-p15t es-m-txt-c" align="right">' +
          '<p style="font-size: 16px; color: #666666;"><strong>Follow us:</strong></p>' +
          '</td>' +
          '</tr>' +
          '</tbody>' +
          '</table>' +
          '</td>' +
          '</tr>' +
          '</tbody>' +
          '</table>' +
          '<table class="es-right" cellspacing="0" cellpadding="0" align="right">' +
          '<tbody>' +
          '<tr>' +
          '<td class="esd-container-frame" width="361" align="left">' +
          '<table style="background-position: center center;" width="100%" cellspacing="0" cellpadding="0">' +
          '<tbody>' +
          '<tr>' +
          '<td class="esd-block-social es-p10t es-p5b es-m-txt-c" align="left" style="font-size:0">' +
          '<table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0">' +
          '<tbody>' +
          '<tr>' +
          '<td class="es-p10r" valign="top" align="center">' +
          '<a target="_blank" href><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/rounded-gray/facebook-rounded-gray.png" alt="Fb" title="Facebook" width="32"></a>' +
          '</td>' +
          '<td class="es-p10r" valign="top" align="center">' +
          '<a target="_blank" href><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/rounded-gray/twitter-rounded-gray.png" alt="Tw" title="Twitter" width="32"></a>' +
          '</td>' +
          '<td class="es-p10r" valign="top" align="center">' +
          '<a target="_blank" href><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/rounded-gray/instagram-rounded-gray.png" alt="Ig" title="Instagram" width="32"></a>' +
          '</td>' +
          '<td class="es-p10r" valign="top" align="center">' +
          '<a target="_blank" href><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/rounded-gray/youtube-rounded-gray.png" alt="Yt" title="Youtube" width="32"></a>' +
          '</td>' +
          '<td class="es-p10r" valign="top" align="center">' +
          '<a target="_blank" href><img src="https://tlr.stripocdn.email/content/assets/img/social-icons/rounded-gray/linkedin-rounded-gray.png" alt="In" title="Linkedin" width="32"></a>' +
          '</td>' +
          '</tr>' +
          '</tbody>' +
          '</table>' +
          '</td>' +
          '</tr>' +
          '</tbody>' +
          '</table>' +
          '</td>' +
          '</tr>' +
          '</tbody>' +
          '</table>' +
          '</td>' +
          //contact us
          '<tbody>' +
          '<tr>' +
          '<td class="esd-structure es-p5t es-p20b es-p20r es-p20l" align="left">' +
          '<table width="100%" cellspacing="0" cellpadding="0">' +
          '<tbody>' +
          '<tr>' +
          '<td class="esd-container-frame" width="560" valign="top" align="center">' +
          '<table width="100%" cellspacing="0" cellpadding="0">' +
          '<tbody>' +
          '<tr>' +
          '<td class="esd-block-text" esd-links-color="#666666" align="center">' +
          '<p style="font-size: 14px;">Contact us: <a target="_blank" style="font-size: 14px; color: #666666;" href="tel:123456789">+216 29 473 912</a> | <a target="_blank" href="mailto:m\'sahel.mohamedhabib@esprit.tn" style="font-size: 14px; color: #666666;">m\'sahel.mohamedhabib@esprit.tn</a></p>' +
          '</td>' +
          '</tr>' +
          '</tbody>' +
          '</table>' +
          '</td>' +
          '</tr>' +
          '</tbody>' +
          '</table>' +
          '</td>' +
          //have any question
          '<tbody>' +
          '<tr>' +
          '<td class="esd-structure es-p10t es-p30b es-p20r es-p20l" style="background-color: #0b5394;" bgcolor="#0b5394" align="left">' +
          '<table width="100%" cellspacing="0" cellpadding="0">' +
          '<tbody>' +
          '<tr>' +
          '<td class="esd-container-frame" width="560" valign="top" align="center">' +
          '<table width="100%" cellspacing="0" cellpadding="0">' +
          '<tbody>' +
          '<tr>' +
          '<td class="esd-block-text es-p5t es-p5b" align="left" style="padding-left: 20px;">' +
          '<h2 style="font-size: 16px; color: #ffffff;"><strong>Have quastions?</strong></h2>' +
          '</td>' +
          '</tr>' +
          '<tr>' +
          '<td esd-links-underline="none" esd-links-color="#ffffff" class="esd-block-text es-p5b" align="left">' +
          '<p style="font-size: 14px; padding-left: 20px; color: #ffffff;">We are here to help, learn more about us <a target="_blank" style="font-size: 14px; color: #ffffff; text-decoration: none;">here</a></p>' +
          '<p style="font-size: 14px; padding-left: 20px; color: #ffffff;">or <a target="_blank" style="font-size: 14px; text-decoration: none; color: #ffffff;">contact us</a><br></p>' +
          '</td>' +
          '</tr>' +
          '</tbody>' +
          '</table>' +
          '</td>' +
          '</tr>' +
          '</tbody>' +
          '</table>' +
          '</td>' +
          '</tr>' +
          '</tbody>' +
          '</table>' +
          '</div>'
    };
    // Send email (use credintials of SendGrid)

    //  var mailOptions = { from: 'no-reply@example.com', to: user.email, subject: 'Account Verification Link', text: 'Hello '+ user.name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n' };
    smtpTrans.sendMail(mailOptions, function (err) {
      if (err) {
        return res.status(500).send({ msg: err });
      }
      else {
        return res.status(200).send({
          succes: true,
          msg: 'A reset password  email has been sent to ' + res.user.email + '. It will be expire after one day. If you not get verification Email click on resend token.',
          token: token.token
        })
      };

    });

  }

});

/* ResetPassword */
router.post('/resetPassword/:email/:token', async (req, res, next) => {
  Token.findOne({ token: req.params.token }, function (err, token) {
    // token is not found into database i.e. token may have expired 
    if (!token) {
      return res.status(400).send({ msg: 'Your verification link may have expired. Please click on resend for verify your Email.' });
    }
    // if token is found then check valid user 
    else {
      User.findOne({ email: req.params.email }, async function (err, user) {
        // not valid user
        if (!user) {
          return res.status(401).send({ msg: 'We were unable to find a user for this verification. Please SignUp!' });
        } else {

          const salt = await Bcrypt.genSalt(10);
          user.password = await Bcrypt.hash(req.body.Password, salt);
          await token.remove();
          user.save(function (err) {
            // error occur

            if (err) {
              return res.status(500).send({ msg: err.message });
            }
            // account successfully verified
            else {
              return res.status(200).json({ reponse: 'Your password has been successfully reset' });
            }

          })

        }

      });
    }
  });

});

//middlewares 
async function getUserByMail(req, res, next) {
  let user
  try {
    user = await User.findOne({ email: req.body.email })
    if (user == null) {
      return res.status(404).json({ reponse: "mail" })
    }

  } catch (error) {
    return res.status(500).json({ reponse: error.message })
  }
  res.user = user
  next()
}

function authentificateToken(req, res, next) {
  const autHeader = req.headers['authorization']
  const token = autHeader && autHeader.split(' ')[1]

  if (token == null) return res.status(401).json({ reponse: "no token" })

}

async function getUserById(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ reponse: "Utilisateur non trouve" })
    }
  } catch (error) {
    return res.status(500).json({ reponse: error.message })
  }
  res.user = user
  next()
}

router.delete('/:id', getUserById, async (req, res) => {
  try {
    //get all user articles and delete them
    const user = await User.findById(res.user.id)

    //delete the user
    await res.user.remove()
    res.json({ reponse: "Supprime avec succes" })
  } catch (error) {
    res.json({ erreur: error.message })
  }
})

module.exports = router;