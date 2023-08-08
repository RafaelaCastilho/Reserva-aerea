var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

const Day = require('../models/day').model;
router.post('/', async function(req, res, next) {
    console.log("request  attempted");
    console.log(req.body);
    const dateTime = new Date(req.body.date);

    try {
        const docs = await Day.find({ date: dateTime });
        if (docs.length > 0) {
            console.log("Dados já existententes");
            res.status(200).send(docs[0]);
        } else {
            const allTables = require('../data/allTables');
            const day = new Day({
                date: dateTime,
                tables: allTables
            });
            await day.save();
            console.log("Criada uma nova data");
            const newDocs = await Day.find({ date: dateTime });
            res.status(200).send(newDocs[0]);
        }
    } catch (err) {
        res.status(400).send("Erro no momento de salvar a data");
    }
})
module.exports = router;