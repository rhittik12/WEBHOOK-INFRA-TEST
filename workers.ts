import { Worker } from "bullmq";
import IORedis from "ioredis";

import "dotenv/config";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    throw new Error("REDIS_URL is missing");
}

const connection = new IORedis(process.env.REDIS_URL!, { maxRetriesPerRequest: null });

const worker = new Worker('my-queue', async (job: any) => {
    console.log(`Processing job ${job.id} with data:`, job.data);
}, { connection });

worker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});