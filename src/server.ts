import  express  from "express";
import {config} from "./config/index"
import { webhookRouter } from "./webook/router";

const app = express();




// raw body middleware - must come before json() for hmac to work
app.use((req, res, next) => {
    let data: Buffer[] = []
    req.on('data', chunk => data.push(chunk))
    req.on('end', () => {
        (req as any).rawBody = Buffer.concat(data)
        req.body = JSON.parse((req as any).rawBody.toString() || '{}')
        next()
    })
})


app.use("/webhook", webhookRouter);
app.use(express.json());



app.listen(config.port, () => {
    console.log("webhooke server is running");
})