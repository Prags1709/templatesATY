const express = require("express");
const {VariantModel} = require("../model/variant.model")
const variantRoute = express.Router();

variantRoute.get("/", async (req, res)=>{
  let page = req.query.page;
    try {
      let data;
      if(page === "home"){
        data = await VariantModel.find({pages: "home"});
      }else if(page === "product"){
        data = await VariantModel.find({pages: "product"});
      }else if(page === "bothPage"){
        data = await VariantModel.find({pages: ["home", "product"]});
      }
        res.send(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

variantRoute.get("/home", async (req, res)=>{
    try {
        let data = await VariantModel.find({pages: "home"});
        res.send(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

variantRoute.get("/product", async (req, res)=>{
    try {
        let data = await VariantModel.find({pages: "product"});
        res.send(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

variantRoute.get("/bothPage", async (req, res)=>{
    try {
      console.log("BOTH pages")
        let data = await VariantModel.find({pages: ["home", "product"]});
        console.log("data", data)
        res.send(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

variantRoute.get('/pages', async (req, res) => {
    try {
      const data = await VariantModel.aggregate([
        {
          $facet: {
            homePages: [
              {
                $match: {
                  pages: 'home',
                },
              },
            ],
            productPages: [
              {
                $match: {
                  pages: 'product',
                },
              },
            ],
            bothPages: [
              {
                $match: {
                  pages: { $all: ['home', 'product'] },
                },
              },
            ],
          },
        },
      ]);
  
      res.json(data[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

variantRoute.post("/add", async (req, res)=>{
    let {name, pages} = req.body;
    try {
        const data = new VariantModel({name, pages});
        await data.save();
        res.status(201).send("data added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = {variantRoute};