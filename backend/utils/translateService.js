

const translateGoogle = require('translate-google-api');
const Redis = require('redis');

class TranslationService {
    constructor() {
        // Use Upstash Redis URL for production
        this.redisClient = Redis.createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
            socket: {
                tls: process.env.NODE_ENV === 'production'
            }
        });
        this.init();
    }



// const translateGoogle = require('translate-google-api');
// const Redis = require('redis');

// class TranslationService {
//     constructor() {
//         this.redisClient = Redis.createClient({
//             url: process.env.REDIS_URI || 'redis://localhost:6379',
//             socket: {
//                 reconnectStrategy: (retries) => {
//                     console.log(`Retrying connection... Attempt ${retries}`);
//                     return Math.min(retries * 100, 3000);
//                 }
//             }
//         });

//         this.redisClient.on('error', (err) => {
//             console.error('Redis Client Error:', err);
//         });

//         this.redisClient.on('connect', () => {
//             console.log('Redis Client Connected');
//         });

    //     this.init();
    // }

    async init() {
        try {
            await this.redisClient.connect();
        } catch (error) {
            console.error('Redis connection error:', error);
        }
    }

    async translateText(text, targetLang) {
        try {
            const cacheKey = `trans_${text}_${targetLang}`;
            
            // Check cache
            try {
                const cached = await this.redisClient.get(cacheKey);
                if (cached) {
                    console.log('Cache hit');
                    return cached;
                }
            } catch (cacheError) {
                console.warn('Cache retrieval failed:', cacheError);
            }

            // Translate
            const result = await translateGoogle(text, {
                tld: "com",
                to: targetLang,
            });
            
            const translatedText = result[0];
            
            // Cache result
            try {
                await this.redisClient.setEx(cacheKey, 3600, translatedText);
                console.log('Cached translation');
            } catch (cacheError) {
                console.warn('Cache storage failed:', cacheError);
            }
            
            return translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            return text;
        }
    }

    async close() {
        try {
            await this.redisClient.quit();
            console.log('Redis connection closed');
        } catch (error) {
            console.error('Error closing Redis connection:', error);
        }
    }
}

module.exports = new TranslationService();