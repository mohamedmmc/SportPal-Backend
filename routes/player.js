var express = require('express');
var router = express.Router();
var multer = require('../middleware/multer')
var cloudinary = require('../middleware/cloudinary')
var User = require('../models/User')
var Player = require('../models/Player')
var nodemailer = require("nodemailer");
var Bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const Sport = require('../models/Sport');
/* GET users listing. */


router.get('/:id', async function (req, res, next) {
  try {
    let players = []
    const player = await Player.find({ type: "player" })
    if (player == null) {
      res.status(404).json({ message: "no users" })
    }
    else {
      for (i = 0; i < player.length; i++) {
        if (player[i].id != req.params.id) {
          players.push(player[i])
        }
      }
    }
    res.status(200).json({ players })
  } catch (error) {
      res.status(500).json({ message: error.message })
    }
  });

router.get('/findBySport/', async function (req, res, next) {
  var sportPlayer = []
  try {
    const player = await User.find({ type: "player" }).populate('')
    console.log(player.sports)
    for (i = 0; i < player.sports.length; i++) {

    }
    player.sports.forEach(element => {
      if (element.sport == req.body.sports) {
        sportPlayer.push(player)
      }
    });
    res.json(sportPlayer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

//add player
router.post('/', multer, async (req, res) => {

  await User.init();

  const player = new Player({
    ...req.body,

  })
  if (req.body.password != null) {
    try {
      const hashedPass = await Bcrypt.hash(req.body.password, 10)
      player.password = hashedPass
    } catch (error) {
      return res.json({ erreur: error.message })
    }
  }
  if (req.file != null) {
    const photoCloudinary = await cloudinary.uploader.upload(req.file.path)
    player.profilePic = photoCloudinary.url
  } else {
    player.profilePic = "https://res.cloudinary.com/dy05x9auh/image/upload/v1648226974/athlete_lxnnu3.png"
  }
  const token = jwt.sign({ username: player.email }, "SECRET")
  try {
    const newPlayer = await player.save()
    return res.status(201).json({
      user: newPlayer,
      token: token
    })
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }

  //   try {
  //       var token = new Token({ email: user.email, token: crypto.randomBytes(16).toString('hex') });
  //       await token.save();

  //       var smtpTrans = nodemailer.createTransport({
  //           service: 'gmail',
  //           auth: {
  //               user: 'fanart3a18@gmail.com',
  //               pass: 'Nf9rwxfbMohamedmalek93!'
  //           }
  //       });

  //       hname = user.lastName

  //       link = 'http:\/\/' + req.headers.host + '\/user\/confirmation\/' + user.email + '\/' + token.token
  //       var mailOptions = { from: 'fanart3a18@gmail.com', to: user.email, subject: 'Account verification', 
  //       html : 

  //   `
  //   <!DOCTYPE html>
  //   <html>

  //   <head>
  //       <title></title>
  //       <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  //       <meta name="viewport" content="width=device-width, initial-scale=1">
  //       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  //       <style type="text/css">
  //           @media screen {
  //               @font-face {
  //                   font-family: 'Lato';
  //                   font-style: normal;
  //                   font-weight: 400;
  //                   src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
  //               }

  //               @font-face {
  //                   font-family: 'Lato';
  //                   font-style: normal;
  //                   font-weight: 700;
  //                   src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
  //               }

  //               @font-face {
  //                   font-family: 'Lato';
  //                   font-style: italic;
  //                   font-weight: 400;
  //                   src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
  //               }

  //               @font-face {
  //                   font-family: 'Lato';
  //                   font-style: italic;
  //                   font-weight: 700;
  //                   src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
  //               }
  //           }

  //           /* CLIENT-SPECIFIC STYLES */
  //           body,
  //           table,
  //           td,
  //           a {
  //               -webkit-text-size-adjust: 100%;
  //               -ms-text-size-adjust: 100%;
  //           }

  //           table,
  //           td {
  //               mso-table-lspace: 0pt;
  //               mso-table-rspace: 0pt;
  //           }

  //           img {
  //               -ms-interpolation-mode: bicubic;
  //           }

  //           /* RESET STYLES */
  //           img {
  //               border: 0;
  //               height: auto;
  //               line-height: 100%;
  //               outline: none;
  //               text-decoration: none;
  //           }

  //           table {
  //               border-collapse: collapse !important;
  //           }

  //           body {
  //               height: 100% !important;
  //               margin: 0 !important;
  //               padding: 0 !important;
  //               width: 100% !important;
  //           }

  //           /* iOS BLUE LINKS */
  //           a[x-apple-data-detectors] {
  //               color: inherit !important;
  //               text-decoration: none !important;
  //               font-size: inherit !important;
  //               font-family: inherit !important;
  //               font-weight: inherit !important;
  //               line-height: inherit !important;
  //           }

  //           /* MOBILE STYLES */
  //           @media screen and (max-width:600px) {
  //               h1 {
  //                   font-size: 32px !important;
  //                   line-height: 32px !important;
  //               }
  //           }

  //           /* ANDROID CENTER FIX */
  //           div[style*="margin: 16px 0;"] {
  //               margin: 0 !important;
  //           }
  //       </style>
  //   </head>

  //   <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
  //       <!-- HIDDEN PREHEADER TEXT -->
  //       <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> LostAndFound vous souhaite la bienvenue </div>
  //       <table border="0" cellpadding="0" cellspacing="0" width="100%">
  //           <!-- LOGO -->
  //           <tr>
  //               <td bgcolor="#FFA73B" align="center">
  //                   <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
  //                       <tr>
  //                           <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
  //                       </tr>
  //                   </table>
  //               </td>
  //           </tr>
  //           <tr>
  //               <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
  //                   <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
  //                       <tr>
  //                           <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
  //                               <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome ${hname}!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
  //                           </td>
  //                       </tr>
  //                   </table>
  //               </td>
  //           </tr>
  //           <tr>
  //               <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
  //                   <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
  //                       <tr>
  //                           <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
  //                               <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
  //                           </td>
  //                       </tr>
  //                       <tr>
  //                           <td bgcolor="#ffffff" align="left">
  //                               <table width="100%" border="0" cellspacing="0" cellpadding="0">
  //                                   <tr>
  //                                       <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
  //                                           <table border="0" cellspacing="0" cellpadding="0">
  //                                               <tr>
  //                                                   <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="${link}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm Account</a></td>
  //                                               </tr>
  //                                           </table>
  //                                       </td>
  //                                   </tr>
  //                               </table>
  //                           </td>
  //                       </tr> <!-- COPY -->
  //                       <tr>
  //                           <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
  //                               <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
  //                           </td>
  //                       </tr> <!-- COPY -->
  //                       <tr>
  //                           <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
  //                               <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">https://bit.li.utlddssdstueincx</a></p>
  //                           </td>
  //                       </tr>
  //                       <tr>
  //                           <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
  //                               <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
  //                           </td>
  //                       </tr>
  //                       <tr>
  //                           <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
  //                               <p style="margin: 0;">Cheers,<br>BBB Team</p>
  //                           </td>
  //                       </tr>
  //                   </table>
  //               </td>
  //           </tr>
  //           <tr>
  //               <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
  //                   <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
  //                       <tr>
  //                           <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
  //                               <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
  //                               <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">We&rsquo;re here to help you out</a></p>
  //                           </td>
  //                       </tr>
  //                   </table>
  //               </td>
  //           </tr>
  //           <tr>
  //               <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
  //                   <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
  //                       <tr>
  //                           <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
  //                               <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
  //                           </td>
  //                       </tr>
  //                   </table>
  //               </td>
  //           </tr>
  //       </table>
  //   </body>

  //   </html>
  //   `   

  //   };
  //       smtpTrans.sendMail(mailOptions, function (err) {
  //           if (err) {
  //             console.log(err)
  //               // return res.status(500).send({ msg: 'Technical Issue!, Please click on resend for verify your Email.' });
  //           }

  //       });
  //       const newUser = await user.save()
  //       return res.status(201).json({
  //           user:user,
  //       reponse: "good"})
  // } catch (error) {
  //   return res.status(400).json({reponse: error.message})
  // }
})

/* Updating One */
router.patch("/:id/", multer, getPlayer, async (req, res) => {
  if (req.body.team != null) {
    res.player.team = req.body.team
  }
  if (req.body.sport != null) {
    res.player.sport = req.body.sport
  }
  if (req.body.rating != null) {
    res.player.rating = req.body.rating
  }
  if (req.body.description != null) {
    res.player.description = req.body.description
  }
  if (req.body.fullName != null) {
    res.player.fullName = req.body.fullName
  }
  if (req.body.birthDate != null) {
    res.player.birthDate = req.body.birthDate
  }
  if (req.body.email != null) {
    res.player.email = req.body.email
  }
  if (req.body.telNum != null) {
    res.player.telNum = req.body.telNum
  }

  // if (req.body.strongHand != null && res.sport._id == '622f5416841f4493413f276f') {
  //   res.player.sports[0].strongHand = req.body.strongHand
  //   console.log(await Sport.findById(res.sport._id))
  //   console.log("tennis")
  // }


  // if (res.sport._id == '622f543ef89ec3e99faf1042') {
  //   console.log("football")
  // }

  if (req.body.strongLeg != null) {
    res.player.sports[1].strongLeg = req.body.strongLeg
  }
  if (req.file != null) {
    const photoCloudinary = await cloudinary.uploader.upload(req.file.path)
    console.log(photoCloudinary)
    res.player.profilePic = photoCloudinary.url
  }

  try {
    const updatedTeam = await res.player.save()

    res.status(200).json({ user: updatedTeam })
  } catch (error) {
    res.status(400).json({ message: error.message })

  }
})

//middlewares
async function getPlayer(req, res, next) {
  let player
  try {
    player = await User.findById(req.params.id)
    if (player == null) {
      return res.status(404).json({ message: 'Cannot find player' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.player = player
  next()
}

async function getSport(req, res, next) {
  let sport
  try {
    sport = await Sport.findById(req.params.idSport)
    if (sport == null) {
      return res.status(404).json({ message: 'Cannot find sport' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.sport = sport
  next()
}

function authentificateToken(req, res, next) {
  const autHeader = req.headers['authorization']
  const token = autHeader && autHeader.split(' ')[1]

  if (token == null) return res.status(401).json({ reponse: "no token" })

}
module.exports = router;
