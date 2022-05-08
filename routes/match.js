var express = require('express');
var router = express.Router();
var multer = require('../middleware/multer')
var Player = require('../models/Player')
var Team = require('../models/Team')
var Match = require('../models/Match')
var Notification = require('../models/Notification');
const User = require('../models/User');

/* GET All Teams. */
router.get('/', async function (req, res, next) {
    try {
        const matchs = await Match.find().populate('teamA').populate('teamB')

        res.json(matchs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

/* GET All Teams. */
router.get('/:id', async function (req, res, next) {
    let mymatchs = []
    let listPlayers
    try {
        const matchs = await Match.find()
            .populate({ path: 'teamA', populate: { path: 'players' } })
            .populate({ path: 'teamB', populate: { path: 'players' } })
            .populate('terrain')


        listPlayers = await Team.find({ teamA: matchs.teamA }).populate('players')

        //console.log(listPlayers);

        matchs.forEach((el) => {
            //console.log("hedha player fi match team A : " + el.teamB.players[0].id + " w hedha el id user mte3na : " + req.params.id)
            for (i = 0; i < el.teamB.players.length; i++) {
                if (el.teamB.players[i].id == req.params.id) {
                    mymatchs.push(el)
                }
            }
            for (i = 0; i < el.teamA.players.length; i++) {
                if (el.teamA.players[i].id == req.params.id) {
                    mymatchs.push(el)
                }
            }
        })
        // if(matchs.teamA.players)
        res.status(200).json(mymatchs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

/* Creating One Team */
router.post("/indivMatch", async (req, res, next) => {

    const matchsaaa = await Match.find()
    const matchs = await Match.find().populate("teamA").populate("teamB")

    if (matchs) {
        console.log(matchs);
        for (i = 0; i < matchs.length; i++) {
            if ((matchs[i].teamA.players[0]._id == req.body.teamA && matchs[i].teamB.players[0]._id == req.body.teamB) ||
                (matchs[i].teamB.players[0]._id == req.body.teamA && matchs[i].teamB.players[0]._id == req.body.teamA)) {
                return res.status(403).json('duplicate')
            }
        }

    } const teamA = new Team({
        players: req.body.teamA
    })
    const teamB = new Team({
        players: req.body.teamB
    })
    // const arbitre = new Arbitre({
    //     ...req.body
    // })
    // const terrain = new Terrain({
    //     ...req.body
    // })
    const match = new Match({
        ...req.body,
        teamA: teamA._id,
        teamB: teamB._id,

    })



    const notif = await Notification.findById(req.body.id)


    try {
        // await notif.remove();
        await teamA.save();
        await teamB.save();
        const newMatch = await match.save();
        res.status(201).json(newMatch);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

/* Updating One */
router.patch("/:id", multer, getMatch, async (req, res) => {
    if (req.body.teamA != null) {
        res.match.teamA = req.body.teamA
    }
    if (req.body.teamB != null) {
        res.match.teamB = req.body.teamB
    }
    if (req.body.winner != null) {
        res.match.winner = req.body.winner
    }
    if (req.body.date != null) {
        res.match.date = req.body.date
    }
    if (req.body.terrain != null) {
        res.match.terrain = req.body.terrain
    }
    if (req.body.arbitre != null) {
        res.match.arbitre = req.body.arbitre
    }
    try {
        const updatedMatch = await res.user.save()
        res.json({ match: updatedMatch })
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})

/* Deleting One */
router.delete("/:id", getMatch, async (req, res) => {
    try {
        await res.match.remove()
        res.json({ message: 'Deleted match' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


/* Add to favorite */
router.patch("/mymatch/:id", getMatch, async (req, res) => {
    try {

        res.json(res.match)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// MiddleWares

/*User by ID 
*/
async function getMatch(req, res, next) {
    let match
    try {
        match = await Match.findById(req.params.id)
        if (match == null) {
            return res.status(404).json({ message: 'Cannot find match' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.match = match
    next()
}

module.exports = router;
