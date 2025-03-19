// const express = require('express');
// const { analyzeIP } = require('../controllers/ipAnalysisController');

// const router = express.Router();

// router.post('/analyze', analyzeIP);

// module.exports = router;


import express from 'express';
import { analyzeIP } from '../controllers/ipAnalysisController.js';

const router = express.Router();

router.post('/analyze', analyzeIP);

export default router;