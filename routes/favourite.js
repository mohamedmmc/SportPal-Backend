var express = require('express');
var router = express.Router();
var multer = require('../middleware/multer')
var Player = require('../models/Player')
var Notification = require('../models/Notification')
var Match = require('../models/Match')
var Notification = require('../models/Notification');
const User = require('../models/User');
const Favorite = require('../models/Favorite');

/* GET All favs. */
router.get('/', async function (req, res, next) {
  try {
    const matchs = await Favorite.find()
      .populate('match')
      .populate('tournament')
      .populate('player')
      .populate('adversaire')

    res.json(matchs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

/* GET my fav. */
router.get('/:id', async function (req, res, next) {
  let matches = []
  try {
    let favorites = await Favorite.find({ player: req.params.id })

      .populate('adversaire')


    // .populate({ path: 'match', populate: { path: 'teamA' } })
    // .populate({ path: 'match', populate: { path: 'teamB' } })
    //.populate({ path: 'match', path: 'teamA', populate: { path: 'players' } })

    if (favorites == null) {
      return res.status(404).json({ message: "not found" })
    } else {
      for (i = 0; i < favorites.length; i++) {
        //console.log(favorites[i].match);
        matches.push(favorites[i].adversaire)
      }
      return res.status(200).json(matches[0])
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
});

/*add favorite*/
router.post('/:id', async function (req, res, next) {

  let fav

  try {
    let favorites = await Favorite.findOne({ player: req.params.id })
    //console.log(favorites);
    if (favorites == null) {
      favorites = new Favorite({
        player: req.params.id,
        match: req.body.match,
        tournament: req.body.tournament,
        adversaire: req.body.adversaire
      })
    } else {
      //console.log(!favorites.match.includes(req.body.match));
      if (req.body.match) {
        if (!favorites.match.includes(req.body.match)) {
          favorites.match.push(req.body.match)
        }

      } if (req.body.tournament) {
        if (!favorites.tournament.includes(req.body.tournament)) {
          favorites.tournament.push(req.body.tournament)
        }
      } if (req.body.adversaire && !favorites.adversaire.includes(req.body.adversaire)) {
        favorites.adversaire.push(req.body.adversaire)
      }
    }

    try {
      const newFav = await favorites.save();
      res.status(201).json({ newFav });
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

});


/* Deleting One */
router.delete("/:id", getFav, async (req, res) => {
  try {
    await res.favorites.remove()
    res.json({ message: 'Deleted match' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})




// MiddleWares

/*User by ID 
*/
async function getFav(req, res, next) {

  let favorites = []
  try {
    favorites = await Favorite.findOne({ user: req.params.id })
    if (favorites == null) {
      return res.status(404).json({ message: 'Cannot find fav' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.favorites = favorites
  next()
}

module.exports = router;
