var express = require('express');
var router = express.Router();
var multer = require('../middleware/multer')
var Player = require('../models/Player')
var Team = require('../models/Team')
var Tournament = require('../models/Tournament')
var Match = require('../models/Match')

/* GET All Teams. */
router.get('/', async function (req, res, next) {
    try {
        const tournaments = await Tournament.find()
        res.json(tournaments)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

/* Creating One Tournament*/
router.post("/add-tournament", multer, async (req, res, next) => {

    let teams = []
    let matchs = []
    let points = 5

    const team = new Team({
        //photos: `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`,
        ...req.body
    })

    teams.push({
        team,
    })

    // const match = new Match({
    //     //photos: `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`,
    //     ...req.body
    // })

    // matchs.push(match)
    const test = team.id
    console.log(test)
    const tournament = new Tournament({
        //photos: `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`,
        ...req.body,
        matchs: matchs,
        teams: { test, points },
    })

    console.log("Posted Successfuly" + tournament)

    try {
        const newTournament = await tournament.save();
        res.status(201).json({ newTournament });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

/* Updating One */
router.patch("/:id", multer, getTournament, async (req, res) => {
    if (req.body.players != null) {
        res.team.players = req.body.players
    }
    if (req.body.captain != null) {
        res.team.captain = req.body.captain
    }
    if (req.body.typeSport != null) {
        res.team.typeSport = req.body.typeSport
    }
    try {
        const updatedTeam = await res.user.save()
        res.json({ team: updatedTeam })
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})

/* Deleting One */
router.delete("/:id", getTournament, async (req, res) => {
    try {
        await res.tournament.remove()
        res.json({ message: 'Deleted tournament' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// MiddleWares

/*Tournament by ID 
*/
async function getTournament(req, res, next) {
    let tournament
    try {
        tournament = await Tournament.findById(req.params.id)
        if (tournament == null) {
            return res.status(404).json({ message: 'Cannot find team' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.tournament = tournament
    next()
}

module.exports = router;
