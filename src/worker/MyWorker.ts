import Queue from "bee-queue";

const queueSettings = {
    redis: {
        host: "34.142.213.241",
        port: 6379,
        password: "123123123"
    }
}

const HANDLER_WORKER_NAME = "handler-worker";


const handleWorker1 = new Queue(HANDLER_WORKER_NAME, queueSettings);


function logicForWorker () {
    // get image trong db.status == NONE ==> addJob({})
    // 5m/1 lan chay
}

export const addJob = function (jobData) {
    return handleWorker1.createJob(jobData).save();
}
