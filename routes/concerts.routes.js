const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.find((record) => record.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;

    db.concerts.push({ id: uuidv4(), performer: performer, genre: genre, price: price, day: day, image: image });

    res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
    const { performer, genre, price, day, image } = req.body;

    const record = db.concerts.find((record) => record.id == req.params.id);

    record.performer = performer;
    record.genre = genre;
    record.price = price;
    record.day = day;
    record.image = image;

    res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
    const dbNew = db.concerts.filter(function (record) {
        return record.id !== req.params.id;
    });

    db.concerts = dbNew;

    res.json({ message: 'OK' });
});

module.exports = router;