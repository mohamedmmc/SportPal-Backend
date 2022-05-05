var express = require('express');
var router = express.Router();
var multer = require('../middleware/multer')
var Team = require('../models/Team')
var Notification = require('../models/Notification');
const User = require('../models/User');

/* GET all notification. */
router.get('/', async function (req, res, next) {
    try {
        const notifications = await Notification.find().populate('from').populate('to')

        res.status(200).json({ length: notifications })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});



/* GET User notification. */
router.get('/:id', async function (req, res, next) {
    try {
        var notification = []
        const notifications = await Notification.find().populate('to').populate('from');
        if (notifications) {
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

/* Creating friend notificaiton */
router.post("/friend-request", getNotificationFriend, async (req, res, next) => {

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

/* Creating friend notificaiton */
router.post("/join-request", getNotificationJoin, async (req, res, next) => {

    var to = []

    const notification = new Notification({
        from: req.body.from,
        to: req.body.to,
        description: "Sent you a join request",
        type: "Join request"
    })

    try {
        const newNotification = await notification.save();
        res.status(201).json({ newNotification });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


/* Creating match notificaiton */
router.post("/match-request", getNotificationMatch, async (req, res, next) => {

    var to = []

    const notification = new Notification({
        from: req.body.from,
        to: req.body.to,
        description: "Sent you a match request",
        type: "Match request",
        terrain: req.body.terrain
    })

    try {
        const newNotification = await notification.save();
        res.status(201).json({ newNotification });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})



/* Confirm Notification */
router.post("/confirm", getUsers, async (req, res, next) => {

    try {
        const notification = await Notification.find({ from: req.body.from })
        for (i = 0; i < notification.length; i++) {
            for (j = 0; j < notification[i].to.length; j++) {
                if (notification[i].to[j] == req.body.to) {
                    notification[i].accept = true;
                    if (notification[i].type == "Friend request") {
                        res.user1.friends.push(req.body.to)
                        res.user2.friends.push(req.body.from)
                        const done = await res.user1.save();
                        const aaa = await res.user2.save();

                        console.log("MY notif" + notification[i])
                        const dbone = await notification[i].save();

                        return res.status(201).json({ aaa, done, dbone });
                    }
                    if (notification[i].type == "Join request") {

                        console.log("req.body.from : " + req.body.from)
                        const team = await Team.findById(res.user2.team)
                        console.log(team + " i'am a team BOIIIIIIII");
                        team.players.push(req.body.from)

                        const newTeam = await team.save()
                        console.log("Ena team jdida !  :   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + newTeam);

                        console.log("MY notif" + notification[i])
                        const dbone = await notification[i].save();

                        return res.status(201).json({ newTeam, dbone });
                        // res.user2.friends.push(req.body.from)
                    }




                    return res.status(201).json({ dbone });

                }
            }
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


/* Confirm Notification */
router.post("/confirm-join", getUsers, async (req, res, next) => {

    try {
        const notification = await Notification.find({ from: req.body.from })
        for (i = 0; i < notification.length; i++) {
            for (j = 0; j < notification[i].to.length; j++) {
                if (notification[i].to[j] == req.body.to) {
                    notification[i].accept = true;
                    if (notification[i].type == "Join request") {
                        // res.user1.friends.push(req.body.to)
                        // res.user2.friends.push(req.body.from)
                        console.log(req.body.to);
                    }
                    // const done = await res.user1.save();
                    // const aaa = await res.user2.save();
                    console.log("MY notif" + notification[i])
                    // const dbone = await notification[i].save();
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
                if ((notification[i].to[j] == req.body.to && notification[i].type == "Match request")) {
                    const aaa = await notification[i].remove()
                    return res.status(200).json({ message: 'Deleted match' })
                }
            }
        }
        return res.status(400).json({ message: "problem" })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.delete("/:id", getMyNotification, async (req, res) => {
    try {
        await res.notification.remove()
        res.json({ message: 'Deleted notification' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// MiddleWares

/*User by ID 
*/
async function getNotificationFriend(req, res, next) {
    let notification
    try {
        notification = await Notification.find()
        for (i = 0; i < notification.length; i++) {
            if (notification[i].from == req.body.to || notification[i].from == req.body.from)
                for (j = 0; j < notification[i].to.length; j++) {
                    if (notification[i].to[j] == req.body.to || notification[i].to[j] == req.body.from) {
                        if ((notification[i].accept && notification[i].type == "Friend request") || !notification[i].accept) {
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

async function getNotificationJoin(req, res, next) {
    let notification
    try {
        notification = await Notification.find()
        for (i = 0; i < notification.length; i++) {
            if (notification[i].from == req.body.to || notification[i].from == req.body.from)
                for (j = 0; j < notification[i].to.length; j++) {
                    if (notification[i].to[j] == req.body.to || notification[i].to[j] == req.body.from) {
                        if ((notification[i].accept && notification[i].type == "Join request") || !notification[i].accept) {
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

async function getUsers(req, res, next) {
    let user1
    let user2

    try {
        user1 = await User.findById(req.body.from).populate('team')
        user2 = await User.findById(req.body.to).populate('team')
        if (user1 == null && user2 == null) {
            return res.status(404).json({ message: 'Cannot find users' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    console.log(user1 + user2);
    res.user1 = user1
    res.user2 = user2
    next()
}


async function getNotificationMatch(req, res, next) {
    let notification
    try {
        notification = await Notification.find()
        for (i = 0; i < notification.length; i++) {
            if (notification[i].from == req.body.to || notification[i].from == req.body.from)
                for (j = 0; j < notification[i].to.length; j++) {
                    if (notification[i].to[j] == req.body.to || notification[i].to[j] == req.body.from) {
                        if ((notification[i].accept && notification[i].type == "Match request") || !notification[i].accept) {
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



async function getMyNotification(req, res, next) {
    let notification
    try {
        notification = await Notification.findById(req.params.id)
        if (notification == null) {
            return res.status(404).json({ message: 'Cannot find notification' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.notification = notification
    next()
}


module.exports = router;
