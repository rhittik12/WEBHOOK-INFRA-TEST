import { connection } from './lib/queue';
import { Worker } from 'bullmq';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const worker = new Worker('my-queue', async (job) => {
    console.log(`Started: ${job.name} for ${job.data.imageData}`);

    if (job.name === 'resize') {
        await sleep(2000);
        console.log('resizing...');
    } else if (job.name === 'compress') {
        await sleep(1000);
        console.log('compressing...');
    } else if (job.name === 'generate-thumbnail') {
        await sleep(500);
        console.log('generating thumbnail...');
    }

    console.log(`Done: ${job.name}`);
}, { connection });

worker.on('completed', job => {
    console.log(`${job.id} (${job.name}) completed`);
});

worker.on('failed', (job, err) => {
    console.log(`${job?.id} (${job?.name}) failed:`, err.message);
});