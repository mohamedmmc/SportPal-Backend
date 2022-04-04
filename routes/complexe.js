var express = require('express');
var router = express.Router();
var multer = require('../middleware/multer')
var Complexe = require('../models/Complexe');
var Terrain = require('../models/Terrain');



// GET All Complexe. /
router.get('/', async function (req, res, next) {
    try {
        const complexes = await Complexe.find().populate("terrains")
        res.status(200).json(complexes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// Creating One Terrain in Complexe /
router.post("/", multer, async (req, res, next) => {

    const complexe = new Complexe({
        ...req.body,
    })
    console.log("Posted Successfuly" + complexe)
    try {
        const newComplexe = await complexe.save();
        res.status(201).json({ newComplexe });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


async function getComplexe(req, res, next) {
    let complexe
    try {
        complexe = await Complexe.findById(req.params.id)
        if (complexe == null) {
            return res.status(404).json({ message: 'Cannot find complexe !' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.complexe = complexe
    next()
}

module.exports = router;