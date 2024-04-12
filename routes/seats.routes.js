const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.find((record) => record.id == req.params.id));
});

router.route('/seats').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;

    db.seats.push({ id: uuidv4(), performer: performer, genre: genre, price: price, day: day, image: image });

    res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
    const { performer, genre, price, day, image } = req.body;

    const record = db.seats.find((record) => record.id == req.params.id);

    record.performer = performer;
    record.genre = genre;
    record.price = price;
    record.day = day;
    record.image = image;

    res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
    const dbNew = db.seats.filter(function (record) {
        return record.id !== req.params.id;
    });

    db.seats = dbNew;

    res.json({ message: 'OK' });
});

module.exports = router;