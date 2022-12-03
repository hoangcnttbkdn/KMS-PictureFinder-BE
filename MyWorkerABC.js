const Queue = require("bee-queue")

const queueSettings = {
    redis: {
        host: "34.142.213.241",
        port: 6379,
        password: "123123123"
    }
}

const HANDLER_WORKER_NAME = "handler-worker";


const handleWorker1 = new Queue(HANDLER_WORKER_NAME, queueSettings);

handleWorker1.process((job, done) => {
    console.log(">>> ...");

    setTimeout(() => {
        console.log(JSON.stringify(job.data))
        console.log("save result into database");
        done();
    }, 3000);
})
