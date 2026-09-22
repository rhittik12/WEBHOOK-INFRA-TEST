import express, {
    type Express,
    type Request,
    type Response,
    type NextFunction,
} from "express";

import { queue } from "./lib/queue";

const app: Express = express();
app.use(express.json());

app.post('/api/upload/', async (req: Request, res: Response, next: NextFunction) => {

    try {
        await imageFunction(req.body.imageData);

        res.status(202).json({ message: "Image jobs queued" });
    } catch (error) {
        next(error);
    }
});

async function imageFunction(imageData: string) {
    await Promise.all([
        queue.add("resize", { imageData }, { attempts: 3, backoff: { type: 'exponential', delay: 1000 } }),
        queue.add("compress", { imageData }, { attempts: 3, backoff: { type: 'exponential', delay: 1000 } }),
        queue.add("generate-thumbnail", { imageData }, { attempts: 3, backoff: { type: 'exponential', delay: 1000 } }),
    ]);
}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});