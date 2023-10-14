import express from 'express';
import validUrl from 'valid-url';
import shortid from 'shortid';
import config from 'config';
import Url from '../model/url.js';

const router = express.Router();

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }

    const urlCode = shortid.generate();
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            if (url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                await url.save();
                res.json(url);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid long url');
    }
    
});

export default router;
