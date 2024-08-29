const express = require("express")
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const {analyze} = require("./analyze.js");


app.use(cors());

dotenv.config();

port = 8000;

const key = process.env.API_KEY;

app.use(express.json());
app.use(express.static('dist'));


app.get('/', (req, res)=> {
    res.render("index.html");
})

app.post('/', async (req, res)=> {
    const url = req.body.input;
    const Analyze = await analyze(url, key);
    const {code, msg, sample} = Analyze;
    if(code == 100 || code == 212){
        return res.send({msg: msg, code: code});
    }

    return res.send({sample: sample, code: code});
})

app.listen(8000, () => {
    console.log(`Server is running on port ${port}`)
})