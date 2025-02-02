
// const mongoose = require('mongoose');

// const faqSchema = new mongoose.Schema({
//     question: {
//         en: { type: String, required: true },
//         hi: { type: String },
//         bn: { type: String }
//     },
//     answer: {
//         en: { type: String, required: true },
//         hi: { type: String },
//         bn: { type: String }
//     },
//     isActive: {
//         type: Boolean,
//         default: true
//     }
// }, { timestamps: true });

// module.exports = mongoose.model('FAQ', faqSchema);



const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    question: {
        en: { type: String, required: true },
        hi: { type: String },
        bn: { type: String },
        te: { type: String },
        ta: { type: String },
        mr: { type: String },
        kn: { type: String }
    },
    answer: {
        en: { type: String, required: true, html: true }, // Allow HTML content
        hi: { type: String, html: true },
        bn: { type: String, html: true },
        te: { type: String, html: true },
        ta: { type: String, html: true },
        mr: { type: String, html: true },
        kn: { type: String, html: true }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('FAQ', faqSchema);