import { Queue } from 'bullmq';
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
    await queue.add('my-job', { jobData: { bjsvckab: 'bar' } }, { delay: 5000 });
    await queue.add('my-job', { jobData: { logs: 'car' } });
    await queue.add('my-job', { jobData: { frogs: 'what' } }, { attempts: 3, backoff: { type: 'fixed', delay: 1000 } });
    await queue.add('my-job', { jobData: { nihssac: 'i ' } });
    await queue.add('my-job', { jobData: { bbvsahvb: 'dont' } }, { attempts: 3, backoff: { type: 'fixed', delay: 1000 } });
    await queue.add('my-job', { jobData: { thnjiok: 'think' } });
    await queue.add('my-job', { jobData: { thankyou: 'so' } }, { attempts: 3, backoff: { type: 'fixed', delay: 1000 } });

    await queue.close();
    //removing the connection with redis 
    //await connection.quit();
}

const main = async () => {
    await addJobToQueue();
};

main().catch(console.error);