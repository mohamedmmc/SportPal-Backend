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
        var notification = []
        const notifications = await Notification.find({}).populate('to').populate('from');
        if (notifications != null) {
            for (i = 0; i < notifications.length; i++) {

                if (notifications[i].from._id == req.params.id) {

                    notification.push(notifications[i])
                }
                for (j = 0; j < notifications[i].to.length; j++) {
                    //console.log(notifications[i].to);
                    if (notifications[i].to[j].id == req.params.id) {

                        notification.push(notifications[i])
                    }
                }
            }
            res.status(200).json(notification)
        }
        else {
            res.status(404)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

/* Creating One notificaiton */
router.post("/friend-request", getNotification, async (req, res, next) => {

    var to = []

    const notification = new Notification({
        from: req.body.from,
        to: req.body.to,
        description: "Sent you a friend request",
        type: "Friend request"
    })

    try {
        const newNotification = await notification.save();
        res.status(201).json({ newNotification });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


/* Creating One notificaiton */
router.post("/match-request", getNotification, async (req, res, next) => {

    var to = []

    const notification = new Notification({
        from: req.body.from,
        to: req.body.to,
        description: "Sent you a match request",
        type: "Match request"
    })

    try {
        const newNotification = await notification.save();
        res.status(201).json({ newNotification });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})



/* Confirm Notification */
router.post("/confirm", async (req, res, next) => {

    try {
        const notification = await Notification.find({ from: req.body.from })
        for (i = 0; i < notification.length; i++) {
            for (j = 0; j < notification[i].to.length; j++) {
                if (notification[i].to[j] == req.body.to) {
                    notification[i].accept = true;
                    const done = await notification[i].save();
                    return res.status(201).json({ done });
                }
            }
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
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
router.delete("/deleteMYnotif", async (req, res) => {

    try {
        const notification = await Notification.find({ from: req.body.from })
        for (i = 0; i < notification.length; i++) {
            for (j = 0; j < notification[i].to.length; j++) {
                if (notification[i].to[j] == req.body.to) {
                    const aaa = await notification[i].remove()
                    return res.status(200).json({ message: 'Deleted match' })
                }
            }
        }
        return res.status(400).json({message:"probleme"})

        
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
        notification = await Notification.find()
        // if (notification == null) {
        //     return res.status(404).json({ message: 'Cannot find match' })
        // }
        for (i = 0; i < notification.length; i++) {
            if (notification[i].from == req.body.to || notification[i].from == req.body.from)
                for (j = 0; j < notification[i].to.length; j++) {
                    if (notification[i].to[j] == req.body.to || notification[i].to[j] == req.body.from) {
                        if (!notification[i].accept) {
                            return res.status(401).json("duplicate")
                        }
                    }
                }
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.notification = notification
    next()
}

module.exports = router;
