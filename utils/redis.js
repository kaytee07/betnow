import { createClient } from 'redis';

class RedisClient {

    constructor () {
        this.client = createClient();
        this.client.on('error', (error) => console.log('Redis client error', error));
        this.client.isconnected = true;
    }

    async isAlive() {
        return this.client.isconnected
    }

    async get(key) {
        return await this.client.get(key, (err, reply) => {
            if (err) {
                console.error(err);
                return;
            }
            return reply
        })
    }

    async set(key, value, duration) {
        await this.client.setex(key, duration, value, (err, reply) => {
            if (err) console.error(err);
        })
    }
    async del(key) {
        await this.client.del(key, (err, reply) => {
            if (err) console.error(err);
        })
    }
}

const redisClient = new RedisClient();
export default redisClient;

