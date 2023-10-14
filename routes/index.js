import express from 'express';
import Url from '../model/url.js';

const router = express.Router();


router.get('/:code', async (req, res) => {
    try{
        const url = await Url.findOne({ urlCode: req.params.code });
        if(url){
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No url found');
        }
    }catch(err){
        console.log(err);
        res.status(500).json('Server error');
    }
}); 

export default router;
