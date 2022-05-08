var express = require('express');
var router = express.Router();
var multer = require('../middleware/multer')
var Player = require('../models/Player')
var Team = require('../models/Team');
const User = require('../models/User');
var cloudinary = require('../middleware/cloudinary')

/* GET my Team. */
router.get('/myteam/:idTeam', async function (req, res, next) {
    try {
        console.log(req.params.idTeam)

        const myteam = await Team.findOne({ $or: [{ captain: req.params.idTeam }, { players: req.params.idTeam }] }).populate('players').populate('captain')
        console.log(myteam)
        res.json({ myteam })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


/* GET All Teams. */
router.get('/', async function (req, res, next) {
    try {


        const team = await Team.find().populate('players').populate('captain')

        res.json(team)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

/* GET All Teams besides idplayer. */
router.get('/:idplayer', async function (req, res, next) {
    try {

        const team = await Team.find({ players: { $ne: req.params.idplayer } }).populate('players').populate('captain')

        res.json(team)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


/* Creating One Team */
router.post("/:id", multer, async (req, res, next) => {

    try {
        const player = await Player.findById(req.params.id)
        console.log(player);
        if (player) {
            for (i = 0; i < player.team.length; i++) {
                if (player.team[i].typeSport == req.body.typeSport) {
                    return res.json({ message: "already in team" })
                }
            }


            const team = new Team({
                captain: req.params.id,
                players: [player],
                typeSport: req.body.typeSport,
                ...req.body,
            })

            if (req.file != null) {
                const photoCloudinary = await cloudinary.uploader.upload(req.file.path)
                team.picture = photoCloudinary.url
            }
            console.log("team crée" + team.id)
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

/* Leave One team */
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
        team = await Team.findById(req.params.id).populate('players').populate('captain')
        if (team == null) {
            return res.status(404).json({ message: 'Cannot find team' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.team = team
    next()
}

/*Team by players id 
*/
async function getTeamByPlayer(req, res, next) {
    let team
    try {
        team = await Team.find({ players: req.params.idplayer })
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
