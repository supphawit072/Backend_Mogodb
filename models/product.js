
const mongoose  = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name:{type: String ,require:true},
    product_type: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    unit: { type: String, required: true },
},{versionKey: false,timestamps: true });
const Product = mongoose.model("Product",productSchema)
module.exports = Product;