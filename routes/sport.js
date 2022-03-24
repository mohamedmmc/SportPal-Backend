var express = require('express');
var router = express.Router();
var multer = require('../middleware/multer')
var Sport = require('../models/Sport')

/* GET All Sport. /
router.get('/', async function (req, res, next) {
    try {
        const sports = await Sport.find()
        res.json(sports)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

/ Creating One Sport /
router.post("/", multer, async (req, res, next) => {

    const sport = new Sport({
        ...req.body
    })
    console.log("i am a body" + req.body.typeSport)
    console.log("Posted Successfuly" + sport)
    try {
        const newSport = await sport.save();
        res.status(201).json({ newSport });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

/ Updating One /
router.patch("/:id", multer, getSport, async (req, res) => {

    if (req.body.type != null) {
        res.sport.type = req.body.type
    }
    try {
        const updatedSport = await res.sport.save()
        res.json({ sport: updatedSport })
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})

/ Deleting One /
router.delete("/:id", getSport, async (req, res) => {
    try {
        await res.sport.remove()
        res.json({ message: 'Deleted sport' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// MiddleWares

/Sport by ID 
*/
async function getSport(req, res, next) {
    let sport
    try {
        sport = await Sport.findById(req.params.id)
        if (sport == null) {
            return res.status(404).json({ message: 'Cannot find sport' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.sport = sport
    next()
}

module.exports = router;