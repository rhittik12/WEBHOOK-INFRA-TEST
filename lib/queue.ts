import { Queue } from "bullmq";
import IORedis from "ioredis";
import "dotenv/config";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    throw new Error("REDIS_URL is missing");
}

export const connection = new IORedis(process.env.REDIS_URL!, { maxRetriesPerRequest: null });

export const queue = new Queue('image', { connection });