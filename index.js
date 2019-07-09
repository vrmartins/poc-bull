const Queue = require('bull')

console.log('Iniciando worker')

const runTestQueue = () => {
    const testQueue = new Queue('testQueue', {
        redis: {
            port: 6379,
            host: 'localhost'
        }
    }, {
        limiter: {
            max: 100,
            duration: 5000
        }
    })

    testQueue.add({ everysec: 'every1sec' }, { delay: 100, repeat: { cron: '* * * * *' } })
    testQueue.process((job, done) => {
        console.log('JOB RUNNING - Date: ', new Date())
        done()
    })
}

runTestQueue()
