const express = require('express');
const router = express.Router();
const upload = require('../../middleware/multer');
const passport = require ("passport")

const { shopCreate, getShops, productCreate,fetchShop } = require('./controllers');

router.param("shopId", async(req,res,next,shopId)=>{
    const shop =  await fetchShop(shopId,next)
    if(shop){
        req.shop = shop
    }else{
        next({status:404,messege:"shop not found"})
    }
    req.shop =shop
    next()
})

router.get('/', getShops);
router.post('/',passport.authenticate("jwt",{session:false}), shopCreate);
router.post('/:shopId/products', passport.authenticate("jwt",{session:false}),
upload.single('image'), productCreate);

module.exports = router;
