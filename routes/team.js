var express = require('express');
var router = express.Router();
var multer = require('../middleware/multer')
var Player = require('../models/Player')
var Team = require('../models/Team')

/* GET All Teams. */
router.get('/', async function (req, res, next) {
    try {
        const teams = await Team.find().populate('players')
        res.json(teams)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

/* Creating One Team */
router.post("/:id", async (req, res, next) => {
    var player
    try {
        player = await Player.findById(req.params.id).populate('team')
        if (player) {
            for (i = 0; i < player.team.length; i++) {
                if (player.team[i].typeSport == req.body.typeSport) {
                    return res.json({ message: "already in team" })
                }
            }
            const team = new Team({
                captain: req.params.id,
                players: [player],
                typeSport: req.body.typeSport
            })
            console.log("team crée" + team)
            player.team.push(team.id)
            try {
                const newPlayer = await player.save();
                const newTeam = await team.save();
                res.status(201).json({ newTeam });
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        } else {
            return res.json({ message: "invalid" })
        }
    }
    catch (error) {
        return res.json({ message: error.message })
    }

})

/* Updating One */
router.patch("/:id", multer, getTeam, async (req, res) => {
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
router.delete("/:id", getTeam, async (req, res) => {
    try {

        await res.team.remove()
        res.json({ message: 'Deleted team' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// MiddleWares

/*User by ID 
*/
async function getTeam(req, res, next) {
    let team
    try {
        team = await Team.findById(req.params.id)
        if (team == null) {
            return res.status(404).json({ message: 'Cannot find team' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.team = team
    next()
}

module.exports = router;
