var express = require('express');
var router = express.Router();
var multer = require('../middleware/multer')
var Arbitre = require('../models/arbitre')
var Team = require('../models/Team')
var Notification = require('../models/Notification')

/* GET all notification. */
router.get('/', async function (req, res, next) {
    try {
        const notifications = await Notification.find()

        res.status(200).json(notifications)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});



/* GET User notification. */
router.get('/:id', async function (req, res, next) {
    try {
        const notifications = await Notification.find({ user: req.params.id })
        if (notifications != null) {
            res.status(200).json(notifications)
        }
        else {
            res.status(404)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

/* Creating One notificaiton */
router.post("/", async (req, res, next) => {

    const notification = new Notification({
        ...req.body
    })

    try {
        const newNotification = await notification.save();
        res.status(201).json({ newNotification });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

/* Updating One */
// router.patch("/:id", multer, getMatch, async (req, res) => {
//     if (req.body.teamA != null) {
//         res.match.teamA = req.body.teamA
//     }
//     if (req.body.teamB != null) {
//         res.match.teamB = req.body.teamB
//     }
//     if (req.body.winner != null) {
//         res.match.winner = req.body.winner
//     }
//     if (req.body.date != null) {
//         res.match.date = req.body.date
//     }
//     if (req.body.terrain != null) {
//         res.match.terrain = req.body.terrain
//     }
//     if (req.body.arbitre != null) {
//         res.match.arbitre = req.body.arbitre
//     }
//     try {
//         const updatedMatch = await res.user.save()
//         res.json({ match: updatedMatch })
//     } catch (error) {
//         res.status(400).json({ message: error.message })

//     }
// })

/* Deleting One */
router.delete("/:id", getNotification, async (req, res) => {
    try {
        await res.notification.remove()
        res.json({ message: 'Deleted match' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// MiddleWares

/*User by ID 
*/
async function getNotification(req, res, next) {
    let notification
    try {
        notification = await Notification.findById(req.params.id)
        if (notification == null) {
            return res.status(404).json({ message: 'Cannot find match' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.notification = notification
    next()
}

module.exports = router;
