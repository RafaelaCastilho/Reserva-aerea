var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

const Day = require('../models/day').model;
const Reservation = require('../models/reservation').model;

router.post("/", async function(req, res, next) {
    try {
        const days = await Day.find({ date: req.body.date });
        if (days.length > 0) {
            let day = days[0];
            day.tables.forEach(table => {
                if (table._id == req.body.table) {
                    table.reservation = new Reservation({
                        name: req.body.name,
                        phone: req.body.phone,
                        email: req.body.email
                    });
                    table.isAvailable = false;
                    day.save();
                    console.log("Reservado");
                    res.status(200).send("Adicionada uma nova reserva");
                }
            });
        } else {
            console.log("Data não encontrada");
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;