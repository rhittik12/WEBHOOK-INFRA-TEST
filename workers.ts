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

    if (job.data.jobData.frogs === 'what' || job.data.jobData.bbvsahvb === 'dont') {
        throw new Error('simulated failure');
    }

}, { connection });

worker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});

worker.on('failed', job => {
    console.error(`${job?.id} has failed with error:`);
});