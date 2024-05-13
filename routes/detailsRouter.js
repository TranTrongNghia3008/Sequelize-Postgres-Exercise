'use strict';

const express = require('express');
const controller = require('../controllers/detailsController');
const router = express.Router();

router.get('/:id', controller.showDetails);

module.exports = router;