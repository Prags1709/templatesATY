const express = require("express");
const { connection } = require("./config/db");
const { variantRoute } = require("./router/variant.route")
const app = express();

app.use(express.json())

app.get("/", async (req, res)=>{
    try {
        res.send("welcome")
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.use("/variant", variantRoute);

let PORT = process.env.port || 3000;
app.listen(PORT, async ()=>{
    try {
        await connection;
        console.log("DB connected");
    } catch (error) {
        console.log("DB disconnected", error);
    }
    console.log("Server running at port 4500");
})