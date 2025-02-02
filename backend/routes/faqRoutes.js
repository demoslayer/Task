
const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqControllers');

router.post('/faqs', faqController.createFAQ);
router.get('/faqs', faqController.getFAQ);

module.exports = router;