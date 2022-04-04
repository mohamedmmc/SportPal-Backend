var express = require('express');
var router = express.Router();
var multer = require('../middleware/multer')
var Complexe = require('../models/Complexe');
var Terrain = require('../models/Terrain');


// GET All Terrain. /
router.get('/', async function (req, res, next) {
    try {
        const terrains = await Terrain.find()
        res.status(200).json({ terrains })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// Creating One Terrain in Complexe /
router.patch("/:id", getComplexe, multer, async (req, res, next) => {

    const terrain = new Terrain({
        ...req.body,
        complexe: res.complexe
    })

    res.complexe.terrains.push(terrain._id)
    try {
        const newComplexe = await res.complexe.save();
        const newTerrain = await terrain.save();
        res.status(201).json({ Terrain: newTerrain, Complexe: newComplexe });
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