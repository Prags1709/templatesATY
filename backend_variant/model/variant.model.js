const mongoose = require("mongoose");

const variantSchema = mongoose.Schema({
    name: {type:String, required: true},
    pages: [{type:String, enum:["home", "product"] , required: true}]
})

const VariantModel = mongoose.model("variant", variantSchema);

module.exports = {VariantModel};