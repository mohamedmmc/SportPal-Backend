// var express = require('express');
// var router = express.Router();
// var multer = require('../middleware/multer')
// var Player = require('../models/Player')
// var Team = require('../models/Team')
// var Tournament = require('../models/Tournament')
// var Match = require('../models/Match');
// const { checkPrime } = require('crypto');

// /* GET All Teams. */
// router.get('/', async function (req, res, next) {
//     try {
//         const tournaments = await Tournament.find().populate('participants.team')

//         res.json(tournaments)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// });

// /* GET One Tournament. */
// router.get('/:idtournament', getTournament, async function (req, res, next) {
//     try {
//         res.json(res.tournament)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// });

// //Some class
// class participant {
//     constructor(team, points, isEliminated) {
//         this.team = team;
//         this.points = points;
//         this.isEliminated = isEliminated;
//     }
// }

// /* Creating One Tournament*/
// router.post("/add-league-tournament", async (req, res, next) => {

//     const teams = []
//     const otherTeams = []
//     const matchs = []

//     const count = teams.push.apply(teams, req.body.teams)
//     otherTeams.push.apply(otherTeams, req.body.teams)
//     try {
//         if (count != 0 && count % 2 == 0) {
//             for (let i = 0; i <= count / 2 - 1; i++) {

//                 const match = new Match({
//                     teamA: teams.pop(),
//                     teamB: teams.pop()
//                 })
//                 matchs.push(match)
//             }
//         } else {
//             res.json('Number of teams not compatibale please check the teams !')
//         }

//         let x = []

//         otherTeams.forEach(element => {
//             x.push(new participant(element, 0, false))
//         })

//         // console.log(x)

//         const newTournament = new Tournament({
//             matchs: matchs,
//             participants: x,
//         })

//         await newTournament.save()

//         res.status(201).json({ newTournament });

//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }

//     // const tournament = new Tournament({
//     //     ...req.body,
//     //     matchs: req.body.matchs,
//     //     participants: [{ team: req.body.team, points: req.body.points, isEliminated: req.body.isEliminated }],
//     // })

// })

// // /* Creating One Tournament*/
// // router.post("/add-match", getTournament, async (req, res, next) => {

// //     if (res.tournament = ! null) {
// //         const match = new Match({
// //             ...req.body,
// //             matchs: req.body.matchs,
// //             participants: { teams: req.body.teams, points: req.body.points, isEliminated: req.body.isEliminated },
// //         })
// //     }

// //     try {
// //         const newTournament = await tournament.save();
// //         console.log("Posted Successfuly" + tournament)
// //         res.status(201).json({ newTournament });
// //     } catch (error) {
// //         res.status(400).json({ message: error.message })
// //     }
// // })

// /* Joining One Tournament*/
// router.patch("/add-team/:idtournament/:idteam", getTournament, getTeam, multer, async (req, res, next) => {

//     console.log(res.tournament.numberOfParticipants.count)
//     console.log(res.tournament.numberOfParticipants.length)

//     // if (res.tournament.numberOfParticipants) {
//     //     res.tournament.participants.team = res.team.id
//     //     console.log(res.tournament.participants.team)
//     // }

//     //  res.team
//     // console.log('iam a Participant--> ', res.tournament.participants)

//     // console.log('i am a team --> ', res.team)

//     // res.tournament.participants.team = res.team.team

//     // console.log('iam a team --> ', res.tournament.participants)

//     // try {
//     //     const newTournament = await res.tournament.save();
//     //     // console.log("Posted Successfuly" + tournament)
//     //     res.status(201).json({ newTournament });
//     // } catch (error) {
//     //     res.status(400).json({ message: error.message })
//     // }
// })

// /* Updating One */
// router.patch("/:idtournament", multer, getTournament, async (req, res, next) => {
//     if (req.body.participants != null) {
//         res.tournament.participants = req.body.participants
//     }
//     if (req.body.matchs != null) {
//         res.tournament.matchs = req.body.matchs
//     }
//     if (req.body.winner != null) {
//         res.tournament.winner = req.body.winner
//     }
//     if (req.body.prize != null) {
//         res.tournament.prize = req.body.prize
//     }
//     if (req.body.from != null) {
//         res.tournament.from = req.body.from
//     }
//     if (req.body.to != null) {
//         res.tournament.to = req.body.to
//     }
//     if (req.body.points != null) {
//         res.tournament.points = req.body.points
//     }
//     try {
//         const updatedTournament = await res.tournament.save()
//         res.json({ tournament: updatedTournament })
//     } catch (error) {
//         res.status(400).json({ message: error.message })

//     }
// })

// /* Deleting One */
// router.delete("/:idtournament", getTournament, async (req, res, next) => {
//     try {
//         await res.tournament.remove()
//         res.json({ message: 'Deleted tournament' })
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })


// // MiddleWares

// /*Tournament by ID 
// */
// async function getTournament(req, res, next) {
//     let tournament
//     try {
//         tournament = await Tournament.findById(req.params.idtournament)
//         if (tournament == null) {
//             return res.status(404).json({ message: 'Cannot find tournament' })
//         }
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }

//     res.tournament = tournament
//     next()
// }

// async function getMatch(req, res, next) {
//     let match
//     try {
//         match = await Match.findById(req.params.id)
//         if (match == null) {
//             return res.status(404).json({ message: 'Cannot find Match' })
//         }
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }

//     res.match = match
//     next()
// }

// async function getTeam(req, res, next) {
//     let team
//     try {
//         team = await Team.findById(req.params.idteam)
//         if (team == null) {
//             return res.status(404).json({ message: 'Cannot find Team' })
//         }
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }

//     res.team = team
//     next()
// }

// module.exports = router;


var express = require('express');
var router = express.Router();
var multer = require('../middleware/multer')
var Player = require('../models/Player')
var Team = require('../models/Team')
var Tournament = require('../models/Tournament')
var Match = require('../models/Match');
const { application } = require('express');
var mongoose = require('mongoose');

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
        //photos: ${req.protocol}://${req.get('host')}/upload/${req.file.filename},
        ...req.body
    })

    teams.push({
        team,
    })

    // const match = new Match({
    //     //photos: ${req.protocol}://${req.get('host')}/upload/${req.file.filename},
    //     ...req.body
    // })

    // matchs.push(match)
    const test = team.id
    console.log(test)
    const tournament = new Tournament({
        //photos: ${req.protocol}://${req.get('host')}/upload/${req.file.filename},
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
router.post('/addtournament', (req, res, next) => {

    req.body.owner = mongoose.Types.ObjectId(req.body.owner)
    new Tournament(req.body).save().then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error));
})
router.get('/:id', async (req, res) => {
    await Tournament.find({ owner: req.params.id }).then(data => res.json(data)).catch(erro => res.status(500).json("error !"));


})
module.exports = router;
