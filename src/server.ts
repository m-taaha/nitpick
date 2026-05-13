import  express  from "express";
import {config} from "./config/index"

const app = express();



app.use(express.json());


app.post("/webhook", (req, res) => {
    console.log("webhook connected:");
    console.log(req.body)

    res.status(200).json({
        success: true,
        message: "Webhooks Recieved"
    })
})


app.listen(config.port, () => {
    console.log("webhooke server is running");
})