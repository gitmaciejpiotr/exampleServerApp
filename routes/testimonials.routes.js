const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
    if (req.params.id === 'random') {
        res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
    } else {
        res.json(db.testimonials.find((record) => record.id == req.params.id));
    }
});

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;

    db.testimonials.push({ id: uuidv4(), author: author, text: text });

    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
    const { author, text } = req.body;

    const record = db.testimonials.find((record) => record.id == req.params.id);

    record.author = author;
    record.text = text;

    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
    const dbNew = db.testimonials.filter(function (record) {
        return record.id !== req.params.id;
    });

    db.testimonials = dbNew;

    res.json({ message: 'OK' });
});

module.exports = router;