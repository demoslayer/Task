


const FAQ = require('../models/faqModel');
const translationService = require('../utils/translateService');

exports.createFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;

        // Sanitize HTML content if needed
        const sanitizeHtml = (html) => {
            // Add your HTML sanitization logic here
            return html;
        };

        // Handle both string and object inputs
        const questionObj = typeof question === 'string' ? {
            en: question,
            hi: await translationService.translateText(question, 'hi'),
            bn: await translationService.translateText(question, 'bn'),
            te: await translationService.translateText(question, 'te'),
            ta: await translationService.translateText(question, 'ta'),
            mr: await translationService.translateText(question, 'mr'),
            kn: await translationService.translateText(question, 'kn'),
        } : question;

        const answerObj = typeof answer === 'string' ? {
            en: sanitizeHtml(answer),
            hi: sanitizeHtml(await translationService.translateText(answer, 'hi')),
            bn: sanitizeHtml(await translationService.translateText(answer, 'bn')),
            te: sanitizeHtml(await translationService.translateText(answer, 'te')),
            ta: sanitizeHtml(await translationService.translateText(answer, 'ta')),
            mr: sanitizeHtml(await translationService.translateText(answer, 'mr')),
            kn: sanitizeHtml(await translationService.translateText(answer, 'kn'))
        } : {
            en: sanitizeHtml(answer.en),
            hi: sanitizeHtml(answer.hi),
            bn: sanitizeHtml(answer.bn),
            te: sanitizeHtml(answer.te),
            ta: sanitizeHtml(answer.ta),
            mr: sanitizeHtml(answer.mr),
            kn: sanitizeHtml(answer.kn)

        };

        const faq = new FAQ({
            question: questionObj,
            answer: answerObj,
            isActive: true
        });

        await faq.save();
        res.status(201).json(faq);
    } catch (error) {
        console.error('Error creating FAQ:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getFAQ = async (req, res) => {
        try {
            const { lang = 'en' } = req.query;
            const faqs = await FAQ.find({ isActive: true });
    
            
            const languageToUse = ['en', 'hi', 'bn','te','ta','sa','pa','mr','kn'].includes(lang) ? lang : 'en';
    
            const translatedFaqs = faqs.map(faq => ({
                id: faq._id,
                question: faq.question[languageToUse],
                answer: faq.answer[languageToUse],
                createdAt: faq.createdAt,
                updatedAt: faq.updatedAt
            }));
    
            res.json({
                data: translatedFaqs,
                metadata: {
                    language: languageToUse,
                    originalRequest: lang
                }
            });
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            res.status(500).json({ error: error.message });
        }
    };
    
    