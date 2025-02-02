
const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqControllers');

router.post('/faqs', faqController.createFAQ);
router.get('/faqs', faqController.getFAQ);
router.delete('/faqs/:id', faqController.deleteFAQ);

module.exports = router;