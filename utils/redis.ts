import { createClient } from 'redis';

class RedisClient {
    private client: any
    constructor () {
        this.client = createClient();
        this.client.on('error', (error: string) => console.log('Redis client error', error));
        this.client.isconnected = true;
    }

    async isAlive() {
        return this.client.isconnected
    }

    async get(key: string) {
        return await this.client.get(key, (err: string, reply: string) => {
            if (err) {
                console.error(err);
                return;
            }
            return reply
        })
    }

    async set(key: string, value: string, duration: number) {
        await this.client.setex(key, duration, value, (err: string, reply: string) => {
            if (err) console.error(err);
        })
    }
    async del(key: string) {
        await this.client.del(key, (err: string, reply: string) => {
            if (err) console.error(err);
        })
    }
}

const redisClient = new RedisClient();
export default redisClient;

