const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const sanitizeHtml = (html) => {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'p', 'b', 'i', 'em', 'strong', 'u', 'h1', 'h2', 'h3', 
            'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'br', 'hr'
        ],
        ALLOWED_ATTR: ['href', 'target', 'style']
    });
};

module.exports = sanitizeHtml;