import {Router, Request, Response} from 'express'
import { verifyWebHook} from './verify'
import { onPullRequest } from './handlers/pullRequests'

export const webhookRouter = Router();

webhookRouter.post('/', (req: Request, res: Response) => {
    try {
        verifyWebHook( req as any)
    } catch {
        res.status(401).send("Unauthorized")
        return
    }

    //respond 200 immediately - before nay async work
    //github will retry if you take more than 10 seconds
    res.sendStatus(200);

    const event = req.headers["x-github-event"]
    if (event === 'pull_request') onPullRequest(req.body)
})