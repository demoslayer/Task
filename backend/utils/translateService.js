



// utils/translateService.js
const translateGoogle = require('translate-google-api');
const Redis = require('ioredis');


class TranslationService {
    constructor() {
        this.redisClient = new Redis(process.env.REDIS_URL);
        
        this.redisClient.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });

        this.redisClient.on('connect', () => {
            console.log('Redis Client Connected');
        });
    }

    async translateText(text, targetLang) {
        try {
            const cacheKey = `trans_${text}_${targetLang}`;
            
            // Check cache
            const cached = await this.redisClient.get(cacheKey);
            if (cached) return cached;

            // Translate
            const result = await translateGoogle(text, {
                tld: "com",
                to: targetLang,
            });
            
            const translatedText = result[0];
            
            // Cache result
            await this.redisClient.setex(cacheKey, 3600, translatedText);
            
            return translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            return text;
        }
    }
}

module.exports = new TranslationService();