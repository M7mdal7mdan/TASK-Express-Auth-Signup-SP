const { nextTick } = require('process');
const Shop = require('../../models/Shop');
const Product = require ("../../models/Product");

exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate('products');
    return res.json(shops);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.shopCreate = async (req, res) => {
  try {

    req.body.owner = req.user._id
    const newShop = await Shop.create(req.body);
    newShop.populate("owner");
    return res.status(201).json(newShop);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.productCreate = async (req, res,next) => {
  try {
    if(!req.user._id.equals(req.shop.owner._id)){
      next({status:401, message:("you are not the owner so, get the hell out of here")})
    } else{
    const shopId = req.params.shopId;
    req.body = { ...req.body, shop: shopId };
    const newProduct = await Product.create(req.body);
    await Shop.findOneAndUpdate(
      { _id: req.params.shopId },
      { $push: { products: newProduct._id } }
    );
    return res.status(201).json(newProduct);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
