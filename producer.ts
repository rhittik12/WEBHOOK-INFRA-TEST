import { delay, Queue } from 'bullmq';
import IORedis from 'ioredis';

import "dotenv/config";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    throw new Error("REDIS_URL is missing");
}

const connection = new IORedis(redisUrl, {
    maxRetriesPerRequest: null,
});

const queue = new Queue('my-queue', { connection });


const addJobToQueue = async () => {
    await queue.add('my-job', { jobData: { foo: 'bar' } });
    await queue.add('my-job', { jobData: { foo: 'bar' } }, {delay: 5000});
    await queue.add('my-job', { jobData: { logs: 'car' } });

    await queue.close();
    //removing the connection with redis 
    //await connection.quit();
}

const main = async () => {
    await addJobToQueue();
};

main().catch(console.error);